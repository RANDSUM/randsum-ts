import { ExplodeModifier } from '../../modifiers/ExplodeModifier'

export function explodeString(): string {
  return new ExplodeModifier().toDescription()
}
