import { RollConfig } from '~src/types'
import { isRollConfigArgument, isD } from '../tower/guards'
import { RollArgument } from '../tower/types'
import { isDiceNotation } from '~notation'
import { notationToRollConfig } from '~src/utils/notationToRollConfig'

export function argumentToRollConfig(argument: RollArgument): RollConfig {
  switch (true) {
    case isRollConfigArgument(argument):
      return { quantity: 1, ...argument }
    case isD(argument):
      return argument.toRollConfig()
    case isDiceNotation(argument):
      return notationToRollConfig(argument)
    default:
      return {
        quantity: 1,
        sides: Number(argument)
      }
  }
}
