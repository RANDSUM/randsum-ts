import { RollParameters } from '../types'
import makeRolls from './make-rolls'

const generateInitialRolls = (
  sides: number,
  quantity: number
): Pick<RollParameters, 'rollOne' | 'initialRolls'> => {
  const rollOne = (): number => Math.floor(Math.random() * Number(sides)) + 1
  const initialRolls = makeRolls(quantity, rollOne)
  return { rollOne, initialRolls }
}

export default generateInitialRolls
