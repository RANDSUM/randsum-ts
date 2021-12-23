import { parseDropNotation } from './notationParsers'

export function digestModifiers(modifierString: string) {
  return [
    { drop: parseDropNotation(modifierString) },
    { plus: undefined },
    { minus: undefined },
    { cap: undefined },
    { replace: undefined },
    { reroll: undefined },
    { explode: undefined },
    { unique: undefined },
  ].reduce((parameters, current) => {
    if (Object.values(current).every(val => val !== undefined)) {
      return { ...parameters, ...current }
    }
    return parameters
  }, {})
}
