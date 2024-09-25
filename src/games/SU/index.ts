import { SUCoreMechanic } from './types'

function interpretResult(result: number): SUCoreMechanic {
  switch (true) {
    case result === 20:
      return SUCoreMechanic.nailedIt
    case result >= 11 && result <= 19:
      return SUCoreMechanic.success
    case result >= 6 && result <= 10:
      return SUCoreMechanic.toughChoice
    case result >= 2 && result <= 5:
      return SUCoreMechanic.failure
    default:
      return SUCoreMechanic.cascadeFailure
  }
}

export default { interpretResult }
