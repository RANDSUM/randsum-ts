import { DropOptions } from '../../types'

export function convertDropOptionsToParameters({
  highest,
  lowest,
  greaterThan,
  lessThan,
  exact,
}: DropOptions): DropOptions<number> {
  return {
    highest: highest !== undefined ? Number(highest) : undefined,
    lowest: lowest !== undefined ? Number(lowest) : undefined,
    greaterThan: greaterThan !== undefined ? Number(greaterThan) : undefined,
    lessThan: lessThan !== undefined ? Number(lessThan) : undefined,
    exact: exact !== undefined ? exact.map(Number) : undefined,
  }
}
