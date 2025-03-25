import { isValidModifier } from '~guards/isValidModifier'
import { CapModifier } from '~src/modifiers/CapModifier'
import { DropModifier } from '~src/modifiers/DropModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollOptions } from '~types'

export function optionsToDescription(options: RollOptions): string[] {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

function formatCoreDescriptions({ sides, quantity }: RollOptions): string {
  const base = `Roll ${quantity}`
  const descriptor = dieDescriptor(quantity)
  if (Array.isArray(sides)) {
    const formattedSides = `${descriptor} with the following sides: (${sides
      .map((s) => {
        if (s === '') return ' '
        return s
      })
      .join(',')})`
    return `${base} ${formattedSides}`
  }

  return `${base} ${sides}-sided ${descriptor}`
}

function dieDescriptor(quantity = 1): string {
  if (quantity > 1) return 'dice'
  return 'die'
}

function formatModifierDescriptions({ modifiers }: RollOptions): string[] {
  if (!isValidModifier(modifiers)) return []

  return [
    new CapModifier(modifiers.cap).toDescription(),
    new DropModifier(modifiers.drop).toDescription(),
    new ReplaceModifier(modifiers.replace).toDescription(),
    new RerollModifier(modifiers.reroll).toDescription(),
    new ExplodeModifier(modifiers.explode).toDescription(),
    new UniqueModifier(modifiers.unique).toDescription(),
    new PlusModifier(modifiers.plus).toDescription(),
    new MinusModifier(modifiers.minus).toDescription()
  ]
    .flat()
    .filter((i) => typeof i === 'string')
    .filter((i) => i.length > 0)
}
