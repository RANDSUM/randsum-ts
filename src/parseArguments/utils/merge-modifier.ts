import { RollParameters } from '../../types'

export function mergeModifier<T extends string>(
  modifier: Record<T, unknown>,
  rollParameters: RollParameters,
  type: 'roll' | 'total' = 'roll',
): RollParameters {
  const modifiersKey: 'rollModifiers' | 'totalModifiers' = `${type}Modifiers`
  const existingModifiers = rollParameters[modifiersKey]

  if (existingModifiers !== undefined) {
    return { ...rollParameters, [modifiersKey]: [...existingModifiers, modifier] }
  }
  return { ...rollParameters, [modifiersKey]: [modifier] }
}
