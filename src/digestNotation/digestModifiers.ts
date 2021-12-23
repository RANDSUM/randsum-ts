import { parseDropNotation } from './notationParsers'
import { parseMinusNotation } from './notationParsers/parseMinusNotation'
import { parsePlusNotation } from './notationParsers/parsePlusNotation'

export function digestModifiers(modifierString: string) {
  return [
    { drop: parseDropNotation(modifierString) },
    { plus: parsePlusNotation(modifierString) },
    { minus: parseMinusNotation(modifierString) },
    { cap: undefined },
    { replace: undefined },
    { reroll: undefined },
    { explode: undefined },
    { unique: undefined },
  ].reduce((parameters, current) => {
    if (Object.values(current).every(val => val != {} || !!val)) {
      return { ...parameters, ...current }
    }
    return parameters
  }, {})
}
