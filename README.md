# `randsum`

`rand` for the rest of us

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/alxjrvs/randsum/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/alxjrvs/randsum/branch/master/graph/badge.svg)](https://codecov.io/gh/alxjrvs/randsum)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat)](https://github.com/alxjrvs/randsum/blob/main/CODE_OF_CONDUCT.md)

[![NPM](https://nodei.co/npm/randsum.png?downloads=true)](https://www.npmjs.com/package/randsum)

## Getting Started

### Insalling

Add `randsum` to your package.json, or copy and paste one of these:

`npm install randsum --save-dev`

`yarn add randsum -D`

### using `randsum`

`randsum` exports a default function, which can be imported normally:

```ts
import randsum from 'randsum'

const foo = randsum(20)

console.log(foo) // a random number between 1 and 20
```

#### Passing a `number` (or number-like `string`)

When a `number` (or `number`-like `string`)

```ts
randsum(20) // A random number between 1 and 20
randsum('20') // A random number between 1 and 20
```

You can pass in an Object as the second parameter, which can include any key of `RandsumOptions` (except `sides`).

```ts
randsum('20', { quantity: 4, randomizer: ... }) // Roll 4 20 sided die, using a custom randomizer function
```

#### Passing a Dice Notation `string`

See the Randsum Dice Notation syntax document for more info.

```ts
randsum('4d20H+2') // Roll 4 20 sided die, drop highest, add 2
```

You can pass in a `UserOptions` object as the second argument to further modify the rolls, but you can't override any settings that would be set by the Dice Notation.

```ts
randsum('4d20H+2', { randomizer: ... }) // Roll 4 20 sided die, drop highest, add 2, using a custom randomizer function
```

#### Passing in Options

You can pass in a `RandsumOptions` as the first argument. The only required key is `sides`, which represents the number of sides on the die.

```ts
randsum({sides: 20}) // Roll a single 20 sided die
```

You can use any keys of `RandsumOptions` to further modify your roll:

```ts
randsum({ sides: 20, quantity: 4, drop: { highest: true }, plus: 2, randomizer: ... }) // Roll 4 20 sided die, drop highest, plus 2, using a custom randomizer function
```

#### returning a `RollResult`

You can mark a roll as `detailed` to return a `RollResult` instead of a simple number.

```ts
randsum(20, { quantity: 4 }) // Roll 4 20 sided die, returns a number
randsum('4d20') // Roll 4 20 sided die, returns a number
randsum({ sides: 20, quantity: 4 }) // Roll 4 20 sided die, returns a number

randsum(20, { quantity: 4, detailed: true}) // Roll 4 20 sided die, returns a RollResult
randsum('4d20', { detailed: true }) // Roll 4 20 sided die, returns a RollResult
randsum({ sides: 20, quantity: 4, detailed: true }) // Roll 4 20 sided die, returns a RollResult
```

If you are using typescript, the types should be helpful here, as `randsum` will correctly identify the return value based on the presence and `truthiness` of `detailed`.

With a `RollResult`, you can look at the specific details of your roll.

```ts
const result = randsum(20, { quantity: 4, detailed: true}) // Roll 4 20 sided die, returns a RollResult

result.rolls =

Check out the Typedocs RollResult page for more information.

#### Regarding order
`randsum` will attempt to resolve modifiers in a particular order. Check out [Regarding Order](/ORDER.md) for more.

## Further Reading

- [TypeDoc Types](https://alxjrvs.github.io/randsum)
- [Randsum Dice Notation](/RANDSUM_DICE_NOTATION.md)
- [Sophie's Dice Notation](https://sophiehoulden.com/dice/documentation/notation.html)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Why did you make this?

Sometime around 2012, I decided I wanted to learn to program. I was living at my friends apartment rent-free, and I was using a banged up laptop. I had installed ruby, set to make a dice roller as an easy first project.

I spent an easy 30 minutes trying to figure out how to make `rand(n)` return `1-n` instead of `0-(n-1)`.

When I found the answer, I laughed and laughed. I've been chasing that high ever since.
