import { RollOptions } from 'types'

export function isRollOptions(arg: string | number | RollOptions): arg is RollOptions {
  return typeof arg === 'object'
}
