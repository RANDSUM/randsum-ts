import { RollOptions, RollParameters} from 'types'

export function digestArgs(
  firstArg: string | number,
  modifier?: RollOptions
): RollParameters {
  if(Number(firstArg)) {
    return { sides: Number(firstArg), rolls: modifier?.rolls || 1, ...modifier }
  }

  // Actually Digest dice notation here, el-oh-el. Standby code until then.
  return { sides: 20, rolls: modifier?.rolls || 1, ...modifier }
}
