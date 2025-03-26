<div align="center">
  <img width="150" height="150" src="https://raw.githubusercontent.com/RANDSUM/randsum-ts/main/icon.webp">
  <h1>@randsum/dice</h1>
  <h3>Core dice rolling implementation for randsum</h3>

[![npm version](https://img.shields.io/npm/v/@randsum/dice)](https://www.npmjs.com/package/@randsum/dice)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@randsum/dice)](https://bundlephobia.com/package/@randsum/dice)
[![Types](https://img.shields.io/npm/types/@randsum/dice)](https://www.npmjs.com/package/@randsum/dice)
[![License](https://img.shields.io/npm/l/@randsum/dice)](https://github.com/RANDSUM/randsum-ts/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@randsum/dice)](https://www.npmjs.com/package/@randsum/dice)

</div>

A flexible, type-safe dice rolling implementation that supports:

- 🎲 Standard dice notation (`4d6`, `2d20H`, etc.)
- 🎯 Complex modifiers (drop lowest, reroll, exploding dice)
- 🔒 Full TypeScript support
- 🎮 Perfect for games, RPGs, and simulations
- 🪶 Tree-shakeable implementation

## Installation

```bash
npm install @randsum/dice
# or
yarn add @randsum/dice
# or
bun add @randsum/dice
```

## Usage

```typescript
import { D, D20, D6, roll } from '@randsum/dice'

// Using premade dice
D20.roll() // Roll a d20
D6.roll(4) // Roll 4d6

// Create custom dice
const d12 = new D(12)
d12.roll() // Returns number 1-12
d12.rollSpread(3) // Returns [n, n, n]

// Create dice with custom faces
const coin = new D(['heads', 'tails'])
coin.roll() // Returns "heads" or "tails"

// Using the roll function
roll('4d6L') // 4d6, drop lowest
roll('2d20H') // 2d20, keep highest
roll('4d6R{<3}') // 4d6, reroll values below 3
```

## Available Dice

- `D4`, `D6`, `D8`, `D10`, `D12`, `D20`, `D100`: Standard numeric dice
- `Coin`: Two-sided die with 'heads' and 'tails'
- `FudgeDice`: Fate/Fudge dice with +, -, and blank faces
- `AlphaNumDie`: Custom die with alphanumeric faces

## API Reference

### `D` Class

```typescript
// Create numeric die
const d20 = new D(20)
d20.roll() // Returns 1-20

// Create custom die
const colorDie = new D(['red', 'blue', 'green'])
colorDie.roll() // Returns random color
```

### `roll` Function

```typescript
// Basic rolls
roll(20) // Roll 1d20
roll('4d6') // Roll 4d6

// With modifiers
roll('4d6L') // Drop lowest
roll('2d20H') // Keep highest
roll('3d8!') // Exploding dice
```

See [Dice Notation Reference](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for all supported modifiers.

## Related Packages

- [@randsum/notation](https://github.com/RANDSUM/randsum-ts/tree/main/packages/notation): Dice notation parser
- [@randsum/core](https://github.com/RANDSUM/randsum-ts/tree/main/packages/core): Core utilities and types

## License

MIT © Alex Jarvis
