# Randsum

`rand` for the rest of us, **Currently Being Re-Written! ~1.0 Release to come soon.**

[![codecov](https://codecov.io/gh/alxjrvs/randsum/branch/master/graph/badge.svg)](https://codecov.io/gh/alxjrvs/randsum)

## Installation

You can use yarn:

`yarn add randsum`

or NPM

`npm install randsum`

Then, include it in your project however you'd like:

```js
import { D } from 'randsum'

const D10 = require('randsum').D10
```

## How to Use

`randsum` supplies a new class, `D`, that lets you create instances of N-sided dice.

```js
import { D } from 'randsum'

const D6 = new D(6)
```

### Rolling One Die

`D`ice objects have one major function: `roll`.

```js
D6.roll()
// { total: 5, rolls: [5] }
```

With no arguments, `DN.roll()` will roll an `N`-sided die once, and return an object with two keys: `total` and `rolls`. `total` returns the result of the die roll, and the `rolls` array has that same value once.

```js
D6.roll()
// { total: 2, rolls: [2] }

D6.roll()
// { total: 4, rolls: [4] }

D6.roll()
// { total: 1, rolls: [1] }
```

### Rolling Many Dice

```js
D6.roll(3)
// { total: 13, rolls: [6, 3, 4] }
```

You can pass a `n`umber into `roll`, and that will roll the die `n` many times. The `rolls` array will have `n` items in it, each the result of the individual roll!

```Js
D6.roll(3)
// { total: 7, rolls: [2, 1, 4] }
D6.roll(3)
// { total: 12, rolls: [6, 4, 2] }
D6.roll(3)
// { total: 13, rolls: [6, 3, 4] }
```

### Modifying Rolls

`roll` takes an optional second argument, `options`, which can be either a `function` or a special configuration object.

Here's an example of rolling a D6 twice, then multipying each individual roll by 2.

```js
D6.roll(2, roll => roll * 2)
// { total: 34, rolls: [6, 5, 1], modifier: roll => roll *2 }
```

When calling `roll` with a modifier, a new key, `modifier`, is included in the result. This also works when using a configuration object. Here's an example of rolling 4 d6, dropping the lowest, and adding four:

```js
D6.roll(4, { drop: { lowest: true }, plus: 4 })
// { total: 15, rolls: [5, 1, 4, 2], modifier: { drop: { lowest: true }, plus: 4 } }
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
