import { RollParameters } from 'types'

// 2d20K

// https://sophiehoulden.com/dice/documentation/notation.html#keep
//10d6 H3 L2 D{4} !
// This will roll 10d6,
// drop the highest 3,
// drop the lowest 2,
// drop any dice that landed on face 4,
// and explode dice

export function digestModifiers(_modifierString: string, _coreParams: Pick<RollParameters, 'sides' | 'rolls'>) {
  return { notificationModifiers: [] }
}
