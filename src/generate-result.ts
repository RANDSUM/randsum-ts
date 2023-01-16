import {
  CustomSidesDie,
  DropOptions,
  GreaterLessOptions,
  InternalRollParameters,
  isCapModifier,
  isDropModifier,
  isExplodeModifier,
  isPlusModifier,
  isReplaceModifier,
  isRerollModifier,
  isUniqueModifier,
  Randomizer,
  ReplaceOptions,
  RerollOptions,
  RollParameters,
  RollResult,
  StandardDie,
  UniqueModifier
} from 'types'

function makeRolls(quantity: number, rollOne: () => number): number[] {
  return Array.from({ length: quantity }, rollOne)
}

function rollOneFactory(sides: number, randomizer: Randomizer) {
  return function rollOne() {
    return randomizer(sides)
  }
}

export class InvalidUniqueError extends Error {
  constructor() {
    super(
      'You cannot have unique rolls when there are more rolls than sides of die.'
    )
  }
}

function applyUnique(
  rolls: number[],
  {
    unique,
    quantity,
    sides
  }: Pick<RollParameters, 'quantity' | 'sides'> & UniqueModifier<number>,
  rollOne: () => number
): number[] {
  if (quantity > sides) {
    throw new InvalidUniqueError()
  }
  const notUnique =
    unique === undefined || typeof unique === 'boolean'
      ? []
      : unique.notUnique.map(Number)

  const filteredArray = new Set(
    rolls.filter((n) => !notUnique.includes(Number(n)))
  )
  return rolls.map(Number).map((roll, index, array) => {
    let newRoll: number
    if (array.indexOf(roll) === index || notUnique.includes(roll)) {
      return roll
    }
    do {
      newRoll = rollOne()
    } while (filteredArray.has(newRoll))
    return newRoll
  })
}

function applySingleCap(
  { greaterThan, lessThan }: GreaterLessOptions<number>,
  value?: number
) {
  return (roll: number) => {
    if (greaterThan !== undefined && roll > greaterThan) {
      return value ?? greaterThan
    }
    if (lessThan !== undefined && roll < lessThan) {
      return value ?? lessThan
    }
    return roll
  }
}

function rerollRoll(
  roll: number,
  { greaterThan, lessThan, exact, maxReroll }: RerollOptions<number>,
  rollOne: () => number,
  index = 0
): number {
  if (maxReroll === index) {
    return roll
  }
  if (index === 99) {
    return roll
  }

  const exactValue =
    exact !== undefined && Array.isArray(exact)
      ? exact.includes(roll)
      : exact === roll
  if (
    (greaterThan !== undefined && roll > greaterThan) ||
    (lessThan !== undefined && roll < lessThan) ||
    exactValue
  ) {
    return rerollRoll(
      rollOne(),
      { greaterThan, lessThan, exact, maxReroll },
      rollOne,
      index + 1
    )
  }
  return roll
}

function applyReroll(
  rolls: number[],
  reroll: RerollOptions<number> | Array<RerollOptions<number>>,
  rollOne: () => number
): number[] {
  const parameters = Array.isArray(reroll) ? reroll : [reroll]

  let rerollRolls = rolls
  parameters.forEach((rerollModifier) => {
    rerollRolls = rerollRolls.map((roll) =>
      rerollRoll(roll, rerollModifier, rollOne)
    )
  })
  return rerollRolls
}

function applyReplace(
  rolls: number[],
  replace: ReplaceOptions<number> | Array<ReplaceOptions<number>>
): number[] {
  const parameters = Array.isArray(replace) ? replace : [replace]

  let replaceRolls = rolls

  parameters.forEach(({ from, to }) => {
    replaceRolls = replaceRolls.map((roll) => {
      if (from !== undefined) {
        if (typeof from === 'object') {
          return applySingleCap(from, to)(roll)
        }
        if (roll === from) {
          return to
        }
      }
      return roll
    })
  })

  return replaceRolls
}

function applyExplode(
  rolls: number[],
  { sides }: Pick<RollParameters, 'sides'>,
  rollOne: () => number
): number[] {
  const explodeCount = rolls.filter((roll) => roll === sides).length
  const explodeResults = makeRolls(explodeCount, rollOne)
  return [...rolls, ...explodeResults]
}

function times(iterator: number) {
  return (callback: (index?: number) => void) => {
    if (iterator > 0) {
      callback(iterator)
      times(iterator - 1)(callback)
    }
  }
}

function applyDrop(
  rolls: number[],
  { highest, lowest, greaterThan, lessThan, exact }: DropOptions<number>
): number[] {
  const sortedResults = rolls
    .filter(
      (roll) =>
        !(
          (greaterThan !== undefined && roll > greaterThan) ||
          (lessThan !== undefined && roll < lessThan) ||
          exact?.map((number) => number).includes(roll) === true
        )
    )
    .sort((a, b) => a - b)

  if (highest !== undefined) {
    times(highest)(() => sortedResults.pop())
  }

  if (lowest !== undefined) {
    times(lowest)(() => sortedResults.shift())
  }

  return sortedResults
}

function generateRolls(
  sides: number,
  quantity: number,
  randomizer: Randomizer
): Pick<RollParameters, 'rollOne' | 'initialRolls'> {
  const rollOne = rollOneFactory(sides, randomizer)
  const initialRolls = makeRolls(quantity, rollOne)
  return { rollOne, initialRolls }
}

function generateTotalAndRolls({
  faces,
  rolls,
  simpleMathModifier
}: Pick<InternalRollParameters, 'faces'> & {
  rolls: number[]
  simpleMathModifier: number
}):
  | Pick<RollResult<StandardDie>, 'total' | 'rolls'>
  | Pick<RollResult<CustomSidesDie>, 'total' | 'rolls'> {
  if (faces === undefined) {
    return {
      total:
        Number([...rolls].reduce((total, roll) => total + roll, 0)) +
        simpleMathModifier,
      rolls
    }
  }

  const newRolls = rolls.map((roll) => faces[roll - 1] || ' ')
  return { total: newRolls.join(', '), rolls: newRolls }
}

export default function generateResult(
  { sides, quantity, modifiers, randomizer, faces }: InternalRollParameters,
  rollGenerator = generateRolls
):
  | Omit<RollResult<StandardDie>, 'arguments'>
  | Omit<RollResult<CustomSidesDie>, 'arguments'> {
  const { rollOne, initialRolls } = rollGenerator(sides, quantity, randomizer)

  const rollBonuses = {
    simpleMathModifier: 0,
    rolls: initialRolls
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const modifiedRollBonuses = modifiers.reduce((accumulator, modifier) => {
    if (isRerollModifier(modifier)) {
      return {
        ...accumulator,
        rolls: applyReroll(accumulator.rolls, modifier.reroll, rollOne)
      }
    }

    if (isUniqueModifier(modifier)) {
      return {
        ...accumulator,
        rolls: applyUnique(
          accumulator.rolls,
          { sides, quantity, unique: modifier.unique },
          rollOne
        )
      }
    }

    if (isReplaceModifier(modifier)) {
      return {
        ...accumulator,
        rolls: applyReplace(accumulator.rolls, modifier.replace)
      }
    }

    if (isCapModifier(modifier)) {
      return {
        ...accumulator,
        rolls: accumulator.rolls.map(applySingleCap(modifier.cap))
      }
    }

    if (isDropModifier(modifier)) {
      return {
        ...accumulator,
        rolls: applyDrop(accumulator.rolls, modifier.drop)
      }
    }

    if (isExplodeModifier(modifier)) {
      return {
        ...accumulator,
        rolls: applyExplode(accumulator.rolls, { sides }, rollOne)
      }
    }

    if (isPlusModifier(modifier)) {
      return {
        ...accumulator,
        simpleMathModifier:
          accumulator.simpleMathModifier + Number(modifier.plus)
      }
    }

    return {
      ...accumulator,
      simpleMathModifier:
        accumulator.simpleMathModifier - Number(modifier.minus)
    }
  }, rollBonuses)

  return {
    ...generateTotalAndRolls({ faces, ...modifiedRollBonuses }),
    rollParameters: {
      sides,
      quantity,
      modifiers,
      initialRolls,
      faces,
      randomizer,
      rollOne
    }
  }
}
