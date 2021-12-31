import { Modifier, RollParameters } from '../../types'

export function mergeModifier(modifier: Modifier<number>, rollParameters: RollParameters): RollParameters {
  const existingModifiers = rollParameters?.modifiers !== undefined ? rollParameters.modifiers : []

  const newModifiers = [...existingModifiers, modifier]

  return {
    ...rollParameters,
    modifiers: newModifiers,
  }
}
