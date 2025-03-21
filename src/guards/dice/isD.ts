import type { Die } from '~types'

export function isD(argument: unknown): argument is Die {
  return (
    typeof argument === 'object' &&
    argument !== null &&
    'type' in argument &&
    'sides' in argument &&
    'roll' in argument
  )
}
