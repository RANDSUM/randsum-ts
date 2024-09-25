import { SUCoreMechanic, SUTable, SUTableType } from './types'

export const SUCoreMechanicTable: SUTableType = {
  [SUCoreMechanic.nailedIt]: {
    label: SUCoreMechanic.nailedIt,
    description:
      'You have overcome the odds and managed an outstanding success. You may achieve an additional bonus of your choice to the action. When dealing damage, you can choose to double it or pick another appropriate bonus effect.'
  },
  [SUCoreMechanic.success]: {
    label: SUCoreMechanic.success,
    description:
      'You have achieved your goal without any compromises. When attacking, you hit the target and deal standard damage.'
  },
  [SUCoreMechanic.toughChoice]: {
    label: SUCoreMechanic.toughChoice,
    description:
      'You succeed in your action, but at a cost. The Mediator gives you a Tough Choice with some kind of Setback attached. When attacking, you hit, but must make a Tough Choice.'
  },
  [SUCoreMechanic.failure]: {
    label: SUCoreMechanic.failure,
    description:
      'You have failed at what you were attempting to do. You face a Setback of the Mediator’s choice. When attacking, you miss the target.'
  },
  [SUCoreMechanic.cascadeFailure]: {
    label: SUCoreMechanic.cascadeFailure,
    description:
      'Something has gone terribly wrong. You suffer a severe conse- quence of the Mediator’s choice. When attacking, you miss the target and suffer a Setback chosen by the Mediator.'
  }
}

export const SUNPCActionTable: SUTableType = {
  [SUCoreMechanic.nailedIt]: {
    label: SUCoreMechanic.nailedIt,
    description:
      'The NPC succeeds spectacularly at their action. They get an additional bonus of the Mediator’s choice. If they are making an attack, they hit, and do double damage or get another bonus of the Mediator’s choice.'
  },
  [SUCoreMechanic.success]: {
    label: SUCoreMechanic.success,
    description:
      'The NPC achieves their action successfully. An attack hits and deals standard damage.'
  },
  [SUCoreMechanic.toughChoice]: {
    label: SUCoreMechanic.toughChoice,
    description:
      'The NPC is successful, but faces a Tough Choice. The players give the Mediator a choice between two Setbacks. In combat, a weapon attack hits, but with a choice of Setback chosen by the players.'
  },
  [SUCoreMechanic.failure]: {
    label: SUCoreMechanic.failure,
    description:
      'The NPC has failed at their action. The players choose an appropriate Setback for failure. In combat, a weapon attack misses.'
  },
  [SUCoreMechanic.cascadeFailure]: {
    label: SUCoreMechanic.cascadeFailure,
    description:
      'The NPC has catastrophically failed at their action. They suffer a Severe Setback of the player’s choice. A weapon attack misses, with a Severe Setback chosen by the players.'
  }
}

export const SURollTables = {
  [SUTable.coreMechanic]: SUCoreMechanicTable,
  [SUTable.npcAction]: SUNPCActionTable
}
