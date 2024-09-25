import { RollTables } from './tables'
import { CoreMechanic, Entry, Table } from './types'
import { roll as baseRoll } from '~src/roll'

function interpretRelt(relt: number): CoreMechanic {
  switch (true) {
    case relt === 20:
      return CoreMechanic.nailedIt
    case relt >= 11 && relt <= 19:
      return CoreMechanic.ccess
    case relt >= 6 && relt <= 10:
      return CoreMechanic.toughChoice
    case relt >= 2 && relt <= 5:
      return CoreMechanic.failure
    default:
      return CoreMechanic.cascadeFailure
  }
}

function roll(tableKey: Table = Table.coreMechanic): [Entry, number] {
  const { total } = baseRoll(20)
  return [RollTables[tableKey][interpretRelt(total)], total]
}

import * as types from './types'
import * as tables from './tables'

export default { interpretRelt, roll, ...tables, ...types }
