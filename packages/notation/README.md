<div align="center">
  <img width="150" height="150" src="https://raw.githubusercontent.com/RANDSUM/randsum-ts/main/icon.webp">
  <h1>@randsum/notation</h1>
  <h3>Dice notation parser and validator for randsum</h3>

[![npm version](https://img.shields.io/npm/v/@randsum/notation)](https://www.npmjs.com/package/@randsum/notation)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@randsum/notation)](https://bundlephobia.com/package/@randsum/notation)
[![Types](https://img.shields.io/npm/types/@randsum/notation)](https://www.npmjs.com/package/@randsum/notation)
[![License](https://img.shields.io/npm/l/@randsum/notation)](https://github.com/RANDSUM/randsum-ts/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@randsum/notation)](https://www.npmjs.com/package/@randsum/notation)

</div>

A powerful dice notation parser that supports:

- 🎲 Standard dice notation parsing (`4d6`, `2d20H`, etc.)
- 🎯 Complex modifier validation
- 🔒 Full TypeScript support
- 📝 Human-readable descriptions
- 🪶 Tree-shakeable implementation

## Installation

```bash
npm install @randsum/notation
# or
yarn add @randsum/notation
# or
bun add @randsum/notation
```

## Usage

```typescript
import {
  validateNotation,
  isDiceNotation,
  notationToOptions
} from '@randsum/notation'

// Validate notation
const result = validateNotation('4d6L')
if (result.valid) {
  console.log(result.description) // ["Roll 4 six-sided dice", "Drop lowest roll"]
}

// Check if string is valid notation
isDiceNotation('2d20') // true
isDiceNotation('invalid') // false

// Convert notation to options object
const options = notationToOptions('4d6R{<3}')
console.log(options)
// {
//   sides: 6,
//   quantity: 4,
//   modifiers: {
//     reroll: { lessThan: 3 }
//   }
// }
```

## Supported Notation

### Basic Syntax

- `NdS`: Roll N S-sided dice (e.g., `4d6`)
- `NdS+X`: Add X to total (e.g., `2d8+3`)
- `NdS-X`: Subtract X from total (e.g., `2d8-1`)

### Modifiers

- `L`: Drop lowest (e.g., `4d6L`)
- `H`: Keep highest (e.g., `2d20H`)
- `R{<N}`: Reroll below N (e.g., `4d6R{<3}`)
- `!`: Exploding dice (e.g., `3d8!`)
- `U`: Unique results (e.g., `3d6U`)

See [Dice Notation Reference](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for complete documentation.

## API Reference

### `validateNotation`

```typescript
const result = validateNotation('4d6L')
// Returns:
// {
//   valid: true,
//   type: 'numeric',
//   description: ['Roll 4 six-sided dice', 'Drop lowest roll'],
//   notation: { quantity: 4, sides: 6, modifiers: { drop: { lowest: 1 } } }
// }
```

### `isDiceNotation`

```typescript
isDiceNotation('2d20') // true
isDiceNotation('2d{HT}') // true (custom faces)
isDiceNotation('invalid') // false
```

### `notationToOptions`

```typescript
notationToOptions('4d6L')
// Returns options object compatible with @randsum/dice
```

## Related Packages

- [@randsum/dice](https://github.com/RANDSUM/randsum-ts/tree/main/packages/dice): Dice rolling implementation
- [@randsum/core](https://github.com/RANDSUM/randsum-ts/tree/main/packages/core): Core utilities and types

## License

MIT © Alex Jarvis
