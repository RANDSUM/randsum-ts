import { GreaterLessOptions } from 'types'

export default function convertGreaterLessOptionsToParameters({
  greaterThan,
  lessThan
}: GreaterLessOptions): GreaterLessOptions<number> {
  return {
    greaterThan: greaterThan === undefined ? undefined : Number(greaterThan),
    lessThan: lessThan === undefined ? undefined : Number(lessThan)
  }
}
