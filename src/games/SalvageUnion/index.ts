import { RollTables } from './tables'
import { CoreMechanic, Entry, Table } from './types'
import { roll as baseRoll } from '~src/roll'

function interpretResult(result: number): CoreMechanic {
  switch (true) {
    case result === 20:
      return CoreMechanic.nailedIt
    case result >= 11 && result <= 19:
      return CoreMechanic.success
    case result >= 6 && result <= 10:
      return CoreMechanic.toughChoice
    case result >= 2 && result <= 5:
      return CoreMechanic.failure
    default:
      return CoreMechanic.cascadeFailure
  }
}

function roll(tableKey: Table = Table.coreMechanic): [Entry, number] {
  const { total } = baseRoll(20)
  return [RollTables[tableKey][interpretResult(total)], total]
}

import * as types from './types'
import * as tables from './tables'

export default { interpretResult, roll, ...tables, ...types }
