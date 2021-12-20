import { CapOptions } from 'types'

export const singleCapDigester = ({above, below}: CapOptions, newVal?: number) => (num: number) => {
  if(above && (num > above)) { return newVal || above }
  if(below && (num < below)) { return newVal || below }
  return num
}
