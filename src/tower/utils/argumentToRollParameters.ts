import { D } from '~dice'
import { isD } from '../guards'
import { RollArgument, RollParameters } from '../types'
import { argumentToRollConfig } from '../../utils/argumentToRollConfig'
import { configToDescription } from '~src/utils/configToDescription'
import { configToNotation } from '~src/utils/configToNotation'

export function argumentToRollParameters(
  argument: RollArgument
): RollParameters {
  const rollConfig = argumentToRollConfig(argument)
  return {
    argument,
    config: rollConfig,
    die: isD(argument) ? argument : new D(rollConfig.sides),
    notation: configToNotation(rollConfig),
    description: configToDescription(rollConfig)
  }
}
