<div align="center">
  <img width="150" height="150" src="https://raw.githubusercontent.com/RANDSUM/randsum-ts/main/icon.webp">
  <h1>randsum</h1>
  <h3>A flexible, type-safe dice rolling ecosystem for TypeScript/JavaScript</h3>

[![License](https://img.shields.io/npm/l/randsum)](https://github.com/RANDSUM/randsum-ts/blob/main/LICENSE)
[![CI Status](https://github.com/RANDSUM/randsum-ts/workflows/CI/badge.svg)](https://github.com/RANDSUM/randsum-ts/actions)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat&logo=bun&logoColor=white)](https://bun.sh)

</div>

## 📦 Packages

This monorepo contains the following packages:

### [`randsum`](https://www.npmjs.com/package/randsum)

[![npm version](https://img.shields.io/npm/v/randsum)](https://www.npmjs.com/package/randsum)
[![bundle size](https://img.shields.io/bundlephobia/minzip/randsum)](https://bundlephobia.com/package/randsum)

The main package that most users should install. Provides a complete dice rolling solution with all features enabled.

```bash
npm install randsum
```

### [`@randsum/dice`](https://www.npmjs.com/package/@randsum/dice)

[![npm version](https://img.shields.io/npm/v/@randsum/dice)](https://www.npmjs.com/package/@randsum/dice)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@randsum/dice)](https://bundlephobia.com/package/@randsum/dice)

Core dice rolling implementation, where it all started.

```bash
npm install @randsum/dice
```

### [`@randsum/notation`](https://www.npmjs.com/package/@randsum/notation)

[![npm version](https://img.shields.io/npm/v/@randsum/notation)](https://www.npmjs.com/package/@randsum/notation)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@randsum/notation)](https://bundlephobia.com/package/@randsum/notation)

Dice notation parser and validator, for parsing the powerful Randsum Dice Notation.

```bash
npm install @randsum/notation
```

### [`@randsum/core`](https://www.npmjs.com/package/@randsum/core)

[![npm version](https://img.shields.io/npm/v/@randsum/core)](https://www.npmjs.com/package/@randsum/core)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@randsum/core)](https://bundlephobia.com/package/@randsum/core)

Shared utilities and types. Don't install this directly. Unless...?

## 🚀 Quick Example

```typescript
import { D20, roll } from 'randsum'

// Simple d20 roll
D20.roll() // Returns 1-20

// Complex dice notation
roll('4d6L') // Roll 4d6, drop lowest
```

## 🛠️ Development

This is a monorepo using Bun workspaces. To get started:

```bash
# Clone the repository
git clone https://github.com/RANDSUM/randsum-ts.git
cd randsum-ts

# Install dependencies for all packages
bun run install:all

# Build all packages
bun run build:all

# Run tests
bun test

# Run type checks
bun ts:check

# Lint and format
bun lint
bun format
```

### Package Scripts

- `build:all`: Build all packages
- `clean:all`: Clean build artifacts
- `install:all`: Install dependencies for all packages
- `test`: Run all tests
- `lint`/`format`: Code quality checks

## Further Reading

- [Getting Started](https://github.com/RANDSUM/randsum-ts/blob/main/GETTING_STARTED.md) - Installation and Documentation for using `randsum`

- [Randsum Dice Notation](https://github.com/RANDSUM/randsum-ts/blob/main/packages/notation/RANDSUM_DICE_NOTATION.md) - A guide for using [Dice Notation](https://en.wikipedia.org/wiki/Dice_notation) with `randsum`.

- [Contributing](https://github.com/RANDSUM/randsum-ts/blob/main/CONTRIBUTING.md) - help make `randsum` better!

- [Sophie's Dice Notation](https://sophiehoulden.com/dice/documentation/notation.html) - a great dice notation guide that helped me along the way

- [\_why's poignant guide to ruby](https://poignant.guide/) - \_why not?

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Why did you make this?

Sometime around 2012, I decided I wanted to learn to program. I had installed ruby on the best laptop six-hundred dollars could buy, set to make a dice roller as an easy first project.

I spent an easy 30 minutes trying to figure out how to make `rand(n)` return `1...n` instead of `0...(n-1)`.

When I found the answer, I laughed and laughed. I've been chasing that high ever since.

---

<div align="center">
Made with 👹 by <a href="https://github.com/RANDSUM">RANDSUM</a>
</div>
