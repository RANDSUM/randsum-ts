import {
  CustomSidesDie,
  InternalRollParameters,
  Randomizer,
  RollParameters,
  RollResult,
  StandardDie
} from 'types'
import {
  isCapModifier,
  isDropModifier,
  isExplodeModifier,
  isPlusModifier,
  isReplaceModifier,
  isRerollModifier,
  isUniqueModifier,
  makeRolls
} from 'utils'

import {
  applyDrop,
  applyExplode,
  applyReplace,
  applyReroll,
  applySingleCap,
  applyUnique
} from './applicators'

function rollOneFactory(sides: number, randomizer: Randomizer) {
  return function rollOne() {
    return randomizer(sides)
  }
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
