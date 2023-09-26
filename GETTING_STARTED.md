# Getting Started

## Insalling

Add `randsum` to your package.json, or copy and paste one of these:

`npm install randsum`

`yarn add randsum`

`bun add randsum`

Then require it in your project!

```js
import { roll } from 'randsum'
```

or

```js
const { roll } = require('randsum')
```

## using `roll`

`randsum` exports a function, `roll`, that will perform a dice roll of the provided parameters.

```ts
import { roll } from 'randsum'

const result = roll()

console.log(result.total) // a random number between 1 and 20
```

### The Roll Result

`roll()` returns a `RollResult` object, which has the following keys under normal circumstances:

- `total` (`number`): The numeric total of the rolls
- `rolls` (`number[]`): An array of individual rolls, summed to make the `total`.
- `rollParameters`: an object containing the properties used to calculate the roll.
- `arguments`: an array containing the arguments passed to the `randsum` function.

`roll()` always returns a `RollResult`, but it offers a few different ways of configuring your roll.

Note: if you are using Custom Sides, the return value of some of these fields change. Check out the docs for more info.

### Passing a `number` (or number-like `string`)

---

You can give `randsum` a number or number-like string, like so:

```ts
roll(20).total // A random number between 1 and 20
roll('200').total // A random number between 1 and 200
```

This argument represents the `sides` of the die that we're going to roll.

### Passing a Dice Notation `string`

---

See the [Randsum Dice Notation](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) syntax document for more info.

```ts
roll('4d20H+2') // Roll 4 20 sided die, drop highest, add 2
```

### Passing in Options

---

You can pass in a `RollOptions` as the first argument. While rolling standard numerical die, `sides` is the only required value, representing the number of distinct sides of the die.

```ts
roll({ sides: 20 }) // Roll a single 20 sided die
```

The other commonly used key will be `quantity`, which tells you how many dice to roll.

```ts
roll({ sides: 20, quantity: 4 }) // Roll 4 distinct 20 sided die, and give me the total.
```

You can use the `modifier` key of `RollOptions` to further modify your roll. `modifiers` is an array that you can fill with Modifier objects. For instance:

```ts
roll({
  sides: 20,
  quantity: 4,
  modifiers: [{ drop: { highest: true } }, { plus: 2 }]
}) // Roll 4 20 sided die, drop highest, plus 2
```

### Custom Sides

As of [1.7.0](https://github.com/RANDSUM/randsum-ts/releases/tag/v1.7.0), `roll()` now supports rolling die and getting results with _custom sides_.

```ts
roll({
  sides: ['+', '+', '-', '-', '_', '_'], // fudge dice!
  quantity: 4
}) // Roll 4 fudge dice, return a string result like `+, -, _, _`
```

See the [Randsum Dice Notation](https://github.com/RANDSUM/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more usage information.

Generating Custom Sides changes the typing of `RollResult`. Specifically:

- `total` becomes a `string`, representing the comma-separated results of your custom sides roll
- `results` becomes a `string[]`, representing the individual faces rolled
- `rollParameters` internals all reference these new string results
