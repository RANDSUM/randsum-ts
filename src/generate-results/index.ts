import {
  CustomSidesDie,
  InternalRollParameters,
  RollResult,
  StandardDie
} from '../types'
import applyModifiers from './applicators'
import generateInitialRolls from './generate-initial-rolls'
import generateTotalAndRolls from './generate-total-and-rolls'

const generateResult = (
  { sides, quantity, modifiers, faces }: InternalRollParameters,
  initialRollGenerator = generateInitialRolls
):
  | Omit<RollResult<CustomSidesDie>, 'arguments'>
  | Omit<RollResult<StandardDie>, 'arguments'> => {
  const { rollOne, initialRolls } = initialRollGenerator(sides, quantity)

  const totalAndRolls = generateTotalAndRolls({
    ...applyModifiers(modifiers, initialRolls, rollOne, sides, quantity),
    faces
  })

  return {
    ...totalAndRolls,
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

export default generateResult
