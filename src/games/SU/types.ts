export enum SUCoreMechanic {
  nailedIt = 'Nailed It',
  success = 'Success',
  toughChoice = 'Tough Choice',
  failure = 'Failure',
  cascadeFailure = 'Cascade Failure'
}

export enum SUTable {
  coreMechanic = 'Core Mechanic',
  npcAction = 'NPC Action'
}

export type SUEntry = {
  label: string
  description: string
}

export type SUTableType = {
  [key in SUCoreMechanic]: SUEntry
}
