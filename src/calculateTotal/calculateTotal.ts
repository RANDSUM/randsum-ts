import { RollParameters } from 'types'
import { sumArray } from 'utils'
import { dropDigester } from './dropDigester'
import { capDigester } from './capDigester'
import { replacementDigester } from './replacementDigester'

export function calculateTotal(rollTotals: number[], { accessor, cap, drop, replace, plus, minus }: RollParameters) {
  if (accessor) {
    return accessor(rollTotals)
  }

  let modifiedTotals = rollTotals.slice()

  if (replace !== undefined ) {
    if (Array.isArray(replace)){
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

  let total = sumArray(modifiedTotals)

  if (plus !== undefined) {
    total += plus
  }

  if (minus !== undefined) {
    total -= minus
  }

  return total
}
