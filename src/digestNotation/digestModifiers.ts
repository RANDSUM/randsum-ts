import { parseDropNotation } from './notationParsers'

export function digestModifiers(modifierString: string) {
  return [{ drop: parseDropNotation(modifierString) }].reduce((parameters, current) => {
    if (Object.values(current)[0]) {
      return { ...parameters, ...current }
    }
    return parameters
  }, {})
}
