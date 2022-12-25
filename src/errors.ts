/* eslint-disable max-classes-per-file */
import { Match, Modifier, NumberStringArgument } from 'types'

export class UnidentifiedModifierError extends Error {
  constructor(modifier: Modifier<NumberStringArgument>) {
    super(`Unidentified Modifier provided: ${String(modifier)}`)
  }
}

export class UnidentifiedMatchError extends Error {
  constructor(match: Match) {
    super(`Unidentified Matcher provided: ${String(match)}`)
  }
}

export class InvalidUniqueError extends Error {
  constructor() {
    super(
      'You cannot have unique rolls when there are more rolls than sides of die.'
    )
  }
}

/* eslint-enable max-classes-per-file */
