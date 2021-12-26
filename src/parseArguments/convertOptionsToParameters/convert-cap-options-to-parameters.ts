import { CapOptions } from 'types'

export function convertCapOptionsToParameters({ above, below }: CapOptions): CapOptions<'strict'> {
  return {
    above: above ? Number(above) : undefined,
    below: below ? Number(below) : undefined,
  }
}
