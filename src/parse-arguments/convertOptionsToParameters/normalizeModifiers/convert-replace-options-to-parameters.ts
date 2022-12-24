import { ReplaceOptions } from 'types'

import convertGreaterLessOptionsToParameters from './convert-greater-less-options-to-parameters'

export default function convertReplaceOptionsToParameters({
  from,
  to
}: ReplaceOptions): ReplaceOptions<number> {
  return {
    from:
      typeof from === 'object'
        ? convertGreaterLessOptionsToParameters(from)
        : Number(from),
    to: Number(to)
  }
}
