import { RollParameters } from 'types'

export function digestModifiers(_modifierString: string, _coreParas: Pick<RollParameters, 'sides' | 'rolls'>) {
  return { notificationModifiers: [] }
}
