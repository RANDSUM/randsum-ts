import { CapModifier } from '~src/modifiers/CapModifier'
import { DropModifier } from '~src/modifiers/DropModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { DiceNotation, RollOptions } from '~types'

export function optionsToNotation(options: RollOptions): DiceNotation {
  return `${formatCoreNotation(options)}${[
    new CapModifier(options.modifiers?.cap).toNotation(),
    new DropModifier(options.modifiers?.drop).toNotation(),
    new ReplaceModifier(options.modifiers?.replace).toNotation(),
    new RerollModifier(options.modifiers?.reroll).toNotation(),
    new ExplodeModifier(options.modifiers?.explode).toNotation(),
    new UniqueModifier(options.modifiers?.unique).toNotation(),
    new PlusModifier(options.modifiers?.plus).toNotation(),
    new MinusModifier(options.modifiers?.minus).toNotation()
  ]
    .flat()
    .filter((i) => typeof i === 'string')
    .join('')}` as DiceNotation
}

function formatCoreNotation({
  quantity = 1,
  sides
}: RollOptions): DiceNotation {
  if (Array.isArray(sides)) {
    return baseFormatCoreNotation(
      quantity,
      `{${sides
        .map((s) => {
          if (s === '') return ' '
          return s
        })
        .join('')}}`
    )
  }

  return baseFormatCoreNotation(quantity, sides)
}

function baseFormatCoreNotation(
  quantity: number,
  sides: string | number
): DiceNotation {
  return `${quantity}d${sides}` as DiceNotation
}
