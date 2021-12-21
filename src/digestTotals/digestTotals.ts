import { RollParameters, RollTotals } from 'types'
import { randomNumber, sumArray } from 'utils'
import { dropDigester } from './drop/dropDigester'
import { capDigester } from './cap/capDigester'
import { replacementDigester } from './replacement/replacementDigester'
import { uniqueDigester } from './unique/uniqueDigester'
import { rerollDigester } from './reroll/rerollDigester'
import { explodeDigester } from './explode/explodeDigester'
import { parseReroll } from './reroll'

export function digestTotals(
  rollTotals: RollTotals,
  { accessor, sides, rolls, reroll, unique, explode, notUnique, cap, drop, replace, plus, minus }: RollParameters,
  roller = randomNumber,
) {
  const rollDie = () => roller(sides)
  if (accessor) {
    return accessor(rollTotals.slice())
  }
  let modifiedTotals = rollTotals.slice()

  modifiedTotals = parseReroll(modifiedTotals, reroll, rollDie)

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
