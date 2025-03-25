import { coreNotationPattern } from '~patterns'
import { isD } from '~src/guards/isD'
import { isDiceNotationArg } from '~src/guards/isDiceNotationArg'
import { isDicePoolOptions } from '~src/guards/isDicePoolOptions'
import { CapModifier } from '~src/modifiers/CapModifier'
import { DropModifier } from '~src/modifiers/DropModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type {
  DiceNotation,
  ModifierOptions,
  RollArgument,
  RollOptions
} from '~types'

export const optionsConverter = {
  /**
   * Converts various roll arguments to standardized RollOptions
   */
  fromArgument(argument: RollArgument): RollOptions {
    if (isDicePoolOptions(argument)) {
      return argument
    }

    if (isD(argument)) {
      return argument.toOptions
    }

    if (isDiceNotationArg(argument)) {
      return this.fromNotation(argument)
    }

    if (Array.isArray(argument)) {
      return { quantity: 1, sides: argument.map(String) }
    }

    return { quantity: 1, sides: Number(argument) }
  },

  /**
   * Converts dice notation string to RollOptions
   */
  fromNotation(notationString: DiceNotation): RollOptions {
    const coreNotationMatch = notationString.match(coreNotationPattern)
    if (!coreNotationMatch || !coreNotationMatch[0]) {
      throw new Error('Invalid dice notation')
    }

    const coreMatch = coreNotationMatch[0]
    const modifiersString = notationString.replace(coreMatch, '')
    const [quantity, sides] = coreMatch.split(/[Dd]/)

    return {
      quantity: Number(quantity),
      sides: this.parseCoreSides(sides),
      ...{
        modifiers: {
          ...DropModifier.parse(modifiersString),
          ...ExplodeModifier.parse(modifiersString),
          ...UniqueModifier.parse(modifiersString),
          ...ReplaceModifier.parse(modifiersString),
          ...RerollModifier.parse(modifiersString),
          ...CapModifier.parse(modifiersString),
          ...PlusModifier.parse(modifiersString),
          ...MinusModifier.parse(modifiersString)
        }
      }
    } as RollOptions
  },

  /**
   * Converts RollOptions back to dice notation string
   */
  toNotation(options: RollOptions): DiceNotation {
    const coreNotation = this.formatCoreNotation(options)
    const modifierNotation = this.formatModifierNotation(options.modifiers)
    return `${coreNotation}${modifierNotation}` as DiceNotation
  },

  /**
   * Converts RollOptions to human-readable description
   */
  toDescription(options: RollOptions): string[] {
    return [
      this.formatCoreDescription(options),
      ...this.formatModifierDescriptions(options)
    ]
  },

  parseCoreSides(notationString: string): number | string[] {
    if (notationString.includes('{')) {
      return [...notationString.replaceAll(/{|}/g, '')]
    }
    return Number(notationString)
  },

  formatCoreNotation(options: RollOptions): string {
    const { quantity = 1, sides } = options

    if (Array.isArray(sides)) {
      const formattedSides = sides.map((s) => (s === '' ? ' ' : s)).join('')
      return `${quantity}d{${formattedSides}}`
    }

    return `${quantity}d${sides}`
  },

  formatModifierNotation(modifiers: ModifierOptions | undefined): string {
    if (!modifiers) {
      return ''
    }

    return [
      new CapModifier(modifiers.cap).toNotation(),
      new DropModifier(modifiers.drop).toNotation(),
      new ReplaceModifier(modifiers.replace).toNotation(),
      new RerollModifier(modifiers.reroll).toNotation(),
      new ExplodeModifier(modifiers.explode).toNotation(),
      new UniqueModifier(modifiers.unique).toNotation(),
      new PlusModifier(modifiers.plus).toNotation(),
      new MinusModifier(modifiers.minus).toNotation()
    ]
      .filter((notation): notation is string => typeof notation === 'string')
      .join('')
  },

  formatCoreDescription(options: RollOptions): string {
    const { sides, quantity = 1 } = options
    const base = `Roll ${quantity}`
    const descriptor = quantity > 1 ? 'dice' : 'die'

    if (Array.isArray(sides)) {
      const formattedSides = sides.map((s) => (s === '' ? ' ' : s)).join(',')
      return `${base} ${descriptor} with the following sides: (${formattedSides})`
    }

    return `${base} ${sides}-sided ${descriptor}`
  },

  formatModifierDescriptions(options: RollOptions): string[] {
    if (!options.modifiers) {
      return []
    }

    return [
      new CapModifier(options.modifiers.cap).toDescription(),
      new DropModifier(options.modifiers.drop).toDescription(),
      new ReplaceModifier(options.modifiers.replace).toDescription(),
      new RerollModifier(options.modifiers.reroll).toDescription(),
      new ExplodeModifier(options.modifiers.explode).toDescription(),
      new UniqueModifier(options.modifiers.unique).toDescription(),
      new PlusModifier(options.modifiers.plus).toDescription(),
      new MinusModifier(options.modifiers.minus).toDescription()
    ]
      .flat()
      .filter((desc): desc is string => typeof desc === 'string')
      .filter((desc) => desc.length > 0)
  }
}
