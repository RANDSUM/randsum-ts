// -----------------------
// --- MODIFIER OPTIONS ---
// -----------------------

export interface ComparisonOptions {
  greaterThan?: number
  lessThan?: number
}

export interface DropOptions extends ComparisonOptions {
  highest?: number
  lowest?: number
  exact?: number[]
}

export interface RerollOptions extends ComparisonOptions {
  exact?: number[]
  max?: number
}

export interface ReplaceOptions {
  from: number | ComparisonOptions
  to: number
}

export interface UniqueOptions {
  notUnique: number[]
}

export interface ModifierOptions {
  cap?: ComparisonOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: RerollOptions
  unique?: boolean | UniqueOptions
  explode?: boolean
  plus?: number
  minus?: number
}

// -----------------------
// --- ROLL BONUSES ---
// -----------------------

export interface NumericRollBonus {
  rolls: number[]
  simpleMathModifier: number
}

// -----------------------
// --- ROLL OPTIONS ---
// -----------------------

export interface BaseRollOptions {
  quantity?: number
}

export interface NumericRollOptions extends BaseRollOptions {
  sides: number
  modifiers?: ModifierOptions
}

// -----------------------
// --  ROLL PARAMETERS ---
// -----------------------


export type RequiredNumericRollParameters = Required<
  Omit<NumericRollOptions, 'modifiers'>
>
