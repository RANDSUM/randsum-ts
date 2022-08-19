function defaultRandomizer (max: number): number {
  return Math.floor(Math.random() * Number(max)) + 1
}

export function rollOneFactory (sides: number, randomizer = defaultRandomizer) {
  return function rollOne () {
    return randomizer(sides)
  }
}
