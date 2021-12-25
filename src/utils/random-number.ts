import { NumberString } from 'types'

export function randomNumber(max: NumberString) {
  return Math.floor(Math.random() * Number(max)) + 1
}
