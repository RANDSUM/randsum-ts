import {
  isCapModifier,
  isDropModifier,
  isExplodeModifier,
  isMinusModifier,
  isPlusModifier,
  isReplaceModifier,
  isRerollModifier,
  isUniqueModifier
} from 'typeguards'
import {
  CustomSidesDie,
  InternalRollParameters,
  RollResult,
  StandardDie
} from 'types'

import applyDrop from './applicators/apply-drop'
import applyExplode from './applicators/apply-explode'
import applyReplace from './applicators/apply-replace'
import applyReroll from './applicators/apply-reroll'
import applySingleCap from './applicators/apply-single-cap'
import applyUnique from './applicators/apply-unique'
import generateRolls from './generate-rolls'
import generateTotalAndRolls from './generate-total-and-rolls'

export default function generateResult(
  { sides, quantity, modifiers, randomizer, faces }: InternalRollParameters,
  rollGenerator = generateRolls
):
  | Omit<RollResult<StandardDie>, 'arguments'>
  | Omit<RollResult<CustomSidesDie>, 'arguments'> {
  const { rollOne, initialRolls } = rollGenerator(sides, quantity, randomizer)

  let rolls = [...initialRolls]
  let simpleMathModifier = 0

  modifiers.forEach((modifier) => {
    if (isRerollModifier(modifier)) {
      rolls = applyReroll(rolls, modifier.reroll, rollOne)
    }

    if (isUniqueModifier(modifier)) {
      rolls = applyUnique(
        rolls,
        { sides, quantity, unique: modifier.unique },
        rollOne
      )
    }

    if (isReplaceModifier(modifier)) {
      rolls = applyReplace(rolls, modifier.replace)
    }

    if (isCapModifier(modifier)) {
      rolls = rolls.map(applySingleCap(modifier.cap))
    }

    if (isDropModifier(modifier)) {
      rolls = applyDrop(rolls, modifier.drop)
    }

    if (isExplodeModifier(modifier)) {
      rolls = applyExplode(rolls, { sides }, rollOne)
    }

    if (isPlusModifier(modifier)) {
      simpleMathModifier += Number(modifier.plus)
    }

    if (isMinusModifier(modifier)) {
      simpleMathModifier += Number(modifier.minus)
    }
  })

  return {
    ...generateTotalAndRolls({ faces, rolls, simpleMathModifier }),
    rollParameters: {
      sides,
      quantity,
      modifiers,
      initialRolls,
      faces,
      randomizer,
      rollOne
    }
  }
}
