export enum SUCoreMechanic {
  nailedIt = 'Nailed It',
  success = 'Success',
  toughChoice = 'Tough Choice',
  failure = 'Failure',
  cascadeFailure = 'Cascade Failure'
}

export enum SUTable {
  npcAction = 'NPC Action',
  npcReaction = 'Reaction',
  npcMorale = 'Morale',
  coreMechanic = 'Core Mechanic',
  groupInitiative = 'Group Initiative',
  retreat = 'Retreat',
  criticalDamage = 'Critical Damage',
  criticalInjury = 'Critical Injury',
  reactorOverload = 'Reactor Overload',
  areaSalvage = 'Area Salvage',
  mechSalvage = 'Mech Salvage'
}

export type SUEntry = {
  label: string
  description: string
}

export type SUTableType = {
  [key in SUCoreMechanic]: SUEntry
}
