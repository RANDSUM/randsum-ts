<div align="center">
  <img width="150" height="150" src="https://raw.githubusercontent.com/RANDSUM/randsum-ts/main/icon.webp">
  <h1>randsum</h1>
  <h3>A flexible, type-safe dice roller for TypeScript/JavaScript</h3>

[![npm version](https://img.shields.io/npm/v/randsum)](https://www.npmjs.com/package/randsum)
[![bundle size](https://img.shields.io/bundlephobia/minzip/randsum)](https://bundlephobia.com/package/randsum)
[![build status](https://github.com/RANDSUM/randsum-ts/actions/workflows/main.yml/badge.svg)](https://github.com/RANDSUM/randsum-ts/actions/workflows/main.yml)
[![code quality](https://github.com/RANDSUM/randsum-ts/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/RANDSUM/randsum-ts/actions/workflows/github-code-scanning/codeql)
[![Made with Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://github.com/oven-sh/bun)

</div>

## Installation

```bash
npm install randsum
# or
yarn add randsum
# or
bun add randsum
```

## Quick Start

```typescript
import { roll } from 'randsum'

// Roll a d20
roll(20)

// Roll 4d6, drop lowest
roll('4d6L')

// Roll with options
roll({
  quantity: 4,
  sides: 6,
  modifiers: {
    drop: { lowest: true }
  }
})
```

## API Reference

### Creating Dice (`D` Class)

The `D` class is the foundation of randsum, allowing you to create both numerical and custom-faced dice:

```typescript
import { D } from 'randsum'

// Numerical die
const d20 = new D(20)
d20.roll() // Returns number 1-20
d20.rollSpread(3) // Returns [n, n, n]

// Custom-faced die
const coin = new D(['heads', 'tails'])
coin.roll() // Returns "heads" or "tails"
```

### Pre-made Dice

Common dice are available as ready-to-use exports:

```typescript
import { D4, D6, D8, D10, D12, D20, D100 } from 'randsum'

D20.roll() // Roll a d20
D6.roll(4) // Roll 4d6
```

### Roll Function

The `roll` function provides a flexible interface for complex dice rolls:

```typescript
import { roll } from 'randsum'

// Basic rolls
roll(20) // Roll 1d20
roll('4d6') // Roll 4d6

// Advanced notation
roll('4d6L') // 4d6, drop lowest
roll('2d20H') // 2d20, keep highest
roll('4d6R{<3}') // 4d6, reroll values below 3
roll('3d8U') // 3d8, unique values only

// Options object
roll({
  quantity: 4,
  sides: 6,
  modifiers: {
    drop: { lowest: true },
    reroll: { below: 3 }
  }
})
```

### Notation Validation

Validate dice notation before rolling:

```typescript
import { validateNotation } from 'randsum'

const result = validateNotation('4d6L')
if (result.valid) {
  console.log(result.description) // ["Roll 4 six-sided dice", "Drop lowest roll"]
}
```

## Advanced Features

- **Rerolling**: `4d6R{<3}` - Reroll values below 3
- **Dropping**: `4d6L` - Drop lowest roll
- **Keeping**: `2d20H` - Keep highest roll
- **Unique Values**: `3d6U` - Force unique results
- **Custom Faces**: Support for non-numeric dice faces
- **Exploding Dice**: `4d6!` - Roll again on maximum values
- **Math Modifiers**: `2d8+4` - Add/subtract from total

See [Dice Notation Reference](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more examples!

## Type Safety

randsum is written in TypeScript with comprehensive type definitions:

```typescript
import type { RollResult, DicePool, ModifierOptions } from 'randsum'

const result: RollResult = roll('2d20H')
console.log(result.total) // Final sum
console.log(result.rawRolls) // Original rolls
console.log(result.modifiedRolls) // After modifiers
```

## Documentation

- [Getting Started Guide](https://github.com/RANDSUM/randsum-ts/blob/main/GETTING_STARTED.md)
- [Dice Notation Reference](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md)
- [Contributing Guidelines](https://github.com/RANDSUM/randsum-ts/blob/main/CONTRIBUTING.md)

## Why randsum?

Sometime around 2012, I decided to learn programming. My first project? A simple dice roller in Ruby. I spent 30 minutes trying to make `rand(n)` return `1...n` instead of `0...(n-1)`. When I finally found the answer, I laughed and laughed. I've been chasing that high ever since.

## License

MIT © Alex Jarvis
