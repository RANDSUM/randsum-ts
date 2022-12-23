import { DropOptions } from 'types'

export function convertDropOptionsToParameters({
  highest,
  lowest,
  greaterThan,
  lessThan,
  exact
}: DropOptions): DropOptions<number> {
  return {
    highest: highest === undefined ? undefined : Number(highest),
    lowest: lowest === undefined ? undefined : Number(lowest),
    greaterThan: greaterThan === undefined ? undefined : Number(greaterThan),
    lessThan: lessThan === undefined ? undefined : Number(lessThan),
    exact: exact === undefined ? undefined : exact.map(Number)
  }
}
