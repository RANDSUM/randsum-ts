import { NewRollParameters } from '../..'

export function mergeModifier(
  modifier: Record<string, unknown>,
  rollParameters: NewRollParameters,
  type: 'roll' | 'total' = 'roll',
): NewRollParameters {
  const modifiersKey: 'rollModifiers' | 'totalModifiers' = `${type}Modifiers`
  const existingModifiers = rollParameters[modifiersKey]

  if (existingModifiers !== undefined) {
    return { ...rollParameters, [modifiersKey]: [...existingModifiers, modifier] }
  }
  return { ...rollParameters, [modifiersKey]: [modifier] }
}
