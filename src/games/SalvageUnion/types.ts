export enum CoreMechanic {
  nailedIt = 'Nailed It',
  success = 'Success',
  toughChoice = 'Tough Choice',
  failure = 'Failure',
  cascadeFailure = 'Cascade Failure'
}

export enum Table {
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

export type Entry = {
  label: string
  description: string
}

export type TableType = {
  [key in CoreMechanic]: Entry
}
