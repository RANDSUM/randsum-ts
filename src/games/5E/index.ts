import { roll as baseRoll } from '~src/roll'
import { RollMods5E } from './type'

function roll(bonus: number = 0, mod: RollMods5E): number {
  const isAdvantage = RollMods5E.Advantage === mod
  const isDisadvantage = RollMods5E.Disadvantage === mod
  const rollResult = baseRoll({
    sides: 20,
    quantity: isAdvantage || isDisadvantage ? 2 : 1,
    modifiers: {
      plus: bonus,
      ...(isAdvantage ? { drop: { lowest: 1 } } : {}),
      ...(isDisadvantage ? { drop: { highest: 1 } } : {})
    }
  })

  return rollResult.total
}

export default { roll, RollMods5E }
