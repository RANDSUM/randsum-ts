import {
  CustomSidesDie,
  InternalRollParameters,
  RollResult,
  StandardDie
} from '../types'
import applyModifiers from './applicators'
import coreRandomFactory from './core-random-factory'
import generateTotalAndRolls from './generate-total-and-rolls'
import makeRolls from './make-rolls'

const generateResult = ({
  sides,
  quantity,
  modifiers,
  faces
}: InternalRollParameters):
  | Omit<RollResult<CustomSidesDie>, 'arguments'>
  | Omit<RollResult<StandardDie>, 'arguments'> => {
  const rollOne = coreRandomFactory(sides)
  const initialRolls = makeRolls(quantity, rollOne)

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
