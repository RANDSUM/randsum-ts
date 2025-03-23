import { ExplodeModifier } from '../../modifiers/ExplodeModifier'

export function explodeNotation(): string {
  return new ExplodeModifier().toNotation()
}
