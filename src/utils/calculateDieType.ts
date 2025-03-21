import { isCustomSidesStringArg } from '~guards/sides/isCustomSidesStringArg'

export function caclulateDieType(
  sides: number | string[]
): 'custom' | 'numerical' {
  if (isCustomSidesStringArg(sides)) {
    return 'custom'
  }
  return 'numerical'
}
