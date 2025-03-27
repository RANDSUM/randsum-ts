# @randsum/core

⚠️ **This is an internal package**

This package contains shared utilities and types for the `@randsum` ecosystem. It is not intended for direct installation or usage.

## Usage

Instead of installing this package directly, use one of our public packages which re-export all necessary types and utilities:

- [`@randsum/dice`](https://www.npmjs.com/package/@randsum/dice) - Core dice rolling implementation
- [`@randsum/notation`](https://www.npmjs.com/package/@randsum/notation) - Dice notation parser

## For Contributors

This package contains:

- Shared TypeScript types
- Common utilities
- Internal testing helpers
- Shared constants

If you're contributing to randsum, you'll interact with this package through the monorepo setup:

```bash
# From root directory
bun run install
bun run build:all
```

## License

MIT © Alex Jarvis
