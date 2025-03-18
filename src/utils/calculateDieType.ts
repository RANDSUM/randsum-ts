import { isCustomSidesStringArg } from '~guards/isCustomSidesStringArg'

export function caclulateDieType(
  sides: number | string[]
): 'custom' | 'numerical' {
  if (isCustomSidesStringArg(sides)) {
    return 'custom'
  }
  return 'numerical'
}
