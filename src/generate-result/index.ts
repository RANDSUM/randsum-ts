import {
  CustomSidesDie,
  InternalRollParameters,
  Randomizer,
  RollParameters,
  RollResult,
  StandardDie
} from 'types'
import { makeRolls } from 'utils'
import {
  applyDrop,
  applyExplode,
  applyReplace,
  applyReroll,
  applySingleCap,
  applyUnique
} from './applicators'

export function rollOneFactory(sides: number, randomizer: Randomizer) {
  return function rollOne() {
    return randomizer(sides)
  }
}

export function generateRolls(
  sides: number,
  quantity: number,
  randomizer: Randomizer
): Pick<RollParameters, 'rollOne' | 'initialRolls'> {
  const rollOne = rollOneFactory(sides, randomizer)
  const initialRolls = makeRolls(quantity, rollOne)
  return { rollOne, initialRolls }
}

export function generateTotalAndRolls({
  faces,
  rolls,
  simpleMathModifier
}: Pick<InternalRollParameters, 'faces'> & {
  rolls: number[]
  simpleMathModifier: number
}):
  | Pick<RollResult<StandardDie>, 'total' | 'rolls'>
  | Pick<RollResult<CustomSidesDie>, 'total' | 'rolls'> {
  if (faces == undefined) {
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

export function generateResult(
  { sides, quantity, modifiers, randomizer, faces }: InternalRollParameters,
  rollGenerator = generateRolls
):
  | Omit<RollResult<StandardDie>, 'arguments'>
  | Omit<RollResult<CustomSidesDie>, 'arguments'> {
  const { rollOne, initialRolls } = rollGenerator(sides, quantity, randomizer)

  let rolls = [...initialRolls]
  let simpleMathModifier = 0

  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    key === 'reroll' && (rolls = applyReroll(rolls, value, rollOne))
    key === 'unique' &&
      (rolls = applyUnique(rolls, { sides, quantity, unique: value }, rollOne))
    key === 'replace' && (rolls = applyReplace(rolls, value))
    key === 'cap' && (rolls = rolls.map(applySingleCap(value)))
    key === 'drop' && (rolls = applyDrop(rolls, value))
    key === 'explode' && (rolls = applyExplode(rolls, { sides }, rollOne))
    key === 'plus' && (simpleMathModifier += Number(value))
    key === 'minus' && (simpleMathModifier -= Math.abs(Number(value)))
  }

  return {
    ...generateTotalAndRolls({ faces, rolls, simpleMathModifier }),
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
