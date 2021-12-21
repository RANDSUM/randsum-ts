import { RollParameters } from 'types'
import { randomNumber, sumArray } from 'utils'
import { dropDigester } from './dropDigester'
import { capDigester } from './capDigester'
import { replacementDigester } from './replacementDigester'
import { uniqueDigester } from './uniqueDigester'
import { rerollDigester } from './rerollDigester'
import { explodeDigester } from './explodeDigester'

export function digestTotals(
  rollTotals: number[],
  { accessor, sides, rolls, reroll, unique, explode, notUnique, cap, drop, replace, plus, minus }: RollParameters,
  roller = randomNumber,
) {
  if (accessor) {
    return accessor(rollTotals)
  }

  let modifiedTotals = rollTotals.slice()
  const rollDie = () => roller(sides)

  if (reroll !== undefined) {
    if (Array.isArray(reroll)) {
      reroll.forEach(rerollModifier => {
        modifiedTotals = rerollDigester(modifiedTotals, rerollModifier, rollDie)
      })
    } else {
      modifiedTotals = rerollDigester(modifiedTotals, reroll, rollDie)
    }
  }

  if (unique !== undefined && unique) {
    modifiedTotals = uniqueDigester(modifiedTotals, { sides, rolls, notUnique }, rollDie)
  }

  if (replace !== undefined) {
    if (Array.isArray(replace)) {
      replace.forEach(replaceModifier => {
        modifiedTotals = replacementDigester(modifiedTotals, replaceModifier)
      })
    } else {
      modifiedTotals = replacementDigester(modifiedTotals, replace)
    }
  }

  if (cap !== undefined) {
    modifiedTotals = capDigester(modifiedTotals, cap)
  }

  if (drop !== undefined) {
    modifiedTotals = dropDigester(modifiedTotals, drop)
  }

  if (explode) {
    modifiedTotals = explodeDigester(modifiedTotals, { sides }, rollDie)
  }

  let total = sumArray(modifiedTotals)

  if (plus !== undefined) {
    total += plus
  }

  if (minus !== undefined) {
    total -= minus
  }

  return total
}
