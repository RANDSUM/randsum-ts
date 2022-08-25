import { defaultRandomizer } from './default-randomizer'

export function rollOneFactory(sides: number, randomizer = defaultRandomizer) {
  return function rollOne() {
    return randomizer(sides)
  }
}
