import { roll as baseRoll } from '~src/roll'
import { RollMods } from './type'

function roll(bonus: number = 0, mod: RollMods): number {
  const isAdvantage = RollMods.Advantage === mod
  const isDisadvantage = RollMods.Disadvantage === mod
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
import * as types from './type'

export default { roll, ...types }
