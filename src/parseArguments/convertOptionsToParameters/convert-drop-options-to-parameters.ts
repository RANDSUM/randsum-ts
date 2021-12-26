import { DropOptions } from 'types'

export function convertDropOptionsToParameters({
  highest,
  lowest,
  greaterThan,
  lessThan,
  exact,
}: DropOptions<'options'>): DropOptions<'parameters'> {
  return {
    highest: highest ? Number(highest) : undefined,
    lowest: lowest ? Number(lowest) : undefined,
    greaterThan: greaterThan ? Number(greaterThan) : undefined,
    lessThan: lessThan ? Number(lessThan) : undefined,
    exact: exact ? exact.map(number => Number(number)) : undefined,
  }
}
