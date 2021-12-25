import { CapOptions } from 'types'

export function convertCapOptionsToParameters({ above, below }: CapOptions<'options'>): CapOptions<'parameters'> {
  return {
    above: above ? Number(above) : undefined,
    below: below ? Number(below) : undefined,
  }
}
