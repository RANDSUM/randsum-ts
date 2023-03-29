import { CustomSidesOption } from '../types/options'

// eslint-disable-next-line import/prefer-default-export
export const isCustomSidesOptions = (
  sides: unknown
): sides is CustomSidesOption => Array.isArray(sides)
