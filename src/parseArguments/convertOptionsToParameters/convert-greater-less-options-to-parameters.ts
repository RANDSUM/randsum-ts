import { GreaterLessOptions } from 'types'

export function convertGreaterLessOptionsToParameters({ greaterThan, lessThan }: GreaterLessOptions): GreaterLessOptions<number> {
  return {
    greaterThan: greaterThan !== undefined ? Number(greaterThan) : undefined,
    lessThan: lessThan !== undefined ? Number(lessThan) : undefined
  }
}
