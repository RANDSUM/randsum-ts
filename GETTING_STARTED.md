# Getting Started

## Insalling

Add `randsum` to your package.json, or copy and paste one of these:

`npm install randsum --save-dev`

`yarn add randsum -D`

## using `randsum`

`randsum` exports a default function, which can be imported normally:

```ts
import randsum from 'randsum'
// or
const randsum = require('randsum').default

const foo = randsum(20)

console.log(foo) // a random number between 1 and 20
```

### Passing a `number` (or number-like `string`)

---

When a `number` (or `number`-like `string`)

```ts
randsum(20) // A random number between 1 and 20
randsum('20') // A random number between 1 and 20
```

You can pass in an Object as the second parameter, which can include any key of `RandsumOptions` (except `sides`).

```ts
randsum('20', { quantity: 4, randomizer: ... }) // Roll 4 20 sided die, using a custom randomizer function
```

### Passing a Dice Notation `string`

---

See the Randsum Dice Notation syntax document for more info.

```ts
randsum('4d20H+2') // Roll 4 20 sided die, drop highest, add 2
```

You can pass in a `UserOptions` object as the second argument to further modify the rolls, but you can't override any settings that would be set by the Dice Notation.

```ts
randsum('4d20H+2', { randomizer: ... }) // Roll 4 20 sided die, drop highest, add 2, using a custom randomizer function
```

### Passing in Options

---

You can pass in a `RandsumOptions` as the first argument. The only required key is `sides`, which represents the number of sides on the die.

```ts
randsum({ sides: 20 }) // Roll a single 20 sided die
```

You can use any keys of `RandsumOptions` to further modify your roll:

```ts
randsum({ sides: 20, quantity: 4, drop: { highest: true }, plus: 2, randomizer: ... }) // Roll 4 20 sided die, drop highest, plus 2, using a custom randomizer function
```

### returning a `RollResult`

---

You can mark a roll as `detailed` to return a `RollResult` instead of a simple number.

```ts
randsum(20, { quantity: 4 }) // Roll 4 20 sided die, returns a number
randsum('4d20') // Roll 4 20 sided die, returns a number
randsum({ sides: 20, quantity: 4 }) // Roll 4 20 sided die, returns a number

randsum(20, { quantity: 4, detailed: true }) // Roll 4 20 sided die, returns a RollResult
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
```