import { CapOptions } from 'types'

export function convertCapOptionsToParameters({ above, below }: CapOptions): CapOptions<number> {
  return {
    above: above !== undefined ? Number(above) : undefined,
    below: below !== undefined ? Number(below) : undefined,
  }
}
