import {
  CustomSidesDie,
  DropOptions,
  GreaterLessOptions,
  InternalRollParameters,
  isCapModifier,
  isDropModifier,
  isExplodeModifier,
  isMinusModifier,
  isPlusModifier,
  isReplaceModifier,
  isRerollModifier,
  isUniqueModifier,
  Modifier,
  ReplaceOptions,
  RerollOptions,
  RollParameters,
  RollResult,
  StandardDie,
  UniqueModifier
} from './types'

function makeRolls(quantity: number, rollOne: () => number): number[] {
  return Array.from({ length: quantity }, rollOne)
}

export function rollOneFactory(sides: number) {
  return function rollOne() {
    return Math.floor(Math.random() * Number(sides)) + 1
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

export function generateRolls(
  sides: number,
  quantity: number
): Pick<RollParameters, 'rollOne' | 'initialRolls'> {
  const rollOne = rollOneFactory(sides)
  const initialRolls = makeRolls(quantity, rollOne)
  return { rollOne, initialRolls }
}

type RollBonuses = {
  rolls: number[]
  simpleMathModifier: number
}

function generateTotalAndRolls({
  faces,
  rolls,
  simpleMathModifier
}: Pick<InternalRollParameters, 'faces'> & RollBonuses):
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

const applyModifiers = (
  modifiers: Modifier<number>[],
  initialRolls: number[],
  rollOne: () => number,
  sides: number,
  quantity: number
): RollBonuses => {
  let rollBonuses = {
    simpleMathModifier: 0,
    rolls: initialRolls
  }

  modifiers.forEach((modifier) => {
    if (isRerollModifier(modifier)) {
      rollBonuses = {
        ...rollBonuses,
        rolls: applyReroll(rollBonuses.rolls, modifier.reroll, rollOne)
      }
    }

    if (isUniqueModifier(modifier)) {
      rollBonuses = {
        ...rollBonuses,
        rolls: applyUnique(
          rollBonuses.rolls,
          { sides, quantity, unique: modifier.unique },
          rollOne
        )
      }
    }

    if (isReplaceModifier(modifier)) {
      rollBonuses = {
        ...rollBonuses,
        rolls: applyReplace(rollBonuses.rolls, modifier.replace)
      }
    }

    if (isCapModifier(modifier)) {
      rollBonuses = {
        ...rollBonuses,
        rolls: rollBonuses.rolls.map(applySingleCap(modifier.cap))
      }
    }

    if (isDropModifier(modifier)) {
      rollBonuses = {
        ...rollBonuses,
        rolls: applyDrop(rollBonuses.rolls, modifier.drop)
      }
    }

    if (isExplodeModifier(modifier)) {
      rollBonuses = {
        ...rollBonuses,
        rolls: applyExplode(rollBonuses.rolls, { sides }, rollOne)
      }
    }

    if (isPlusModifier(modifier)) {
      rollBonuses = {
        ...rollBonuses,
        simpleMathModifier:
          rollBonuses.simpleMathModifier + Number(modifier.plus)
      }
    }

    if (isMinusModifier(modifier)) {
      rollBonuses = {
        ...rollBonuses,
        simpleMathModifier:
          rollBonuses.simpleMathModifier - Number(modifier.minus)
      }
    }
  })
  return rollBonuses
}

export default function generateResult(
  { sides, quantity, modifiers, faces }: InternalRollParameters,
  rollGenerator = generateRolls
):
  | Omit<RollResult<CustomSidesDie>, 'arguments'>
  | Omit<RollResult<StandardDie>, 'arguments'> {
  const { rollOne, initialRolls } = rollGenerator(sides, quantity)
  const rollBonuses = applyModifiers(
    modifiers,
    initialRolls,
    rollOne,
    sides,
    quantity
  )

  return {
    ...generateTotalAndRolls({ faces, ...rollBonuses }),
    rollParameters: {
      sides,
      quantity,
      modifiers,
      initialRolls,
      faces,
      rollOne
    }
  }
}
