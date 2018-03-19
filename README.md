# Randsum
Random Numbers, for Humans

[![Build Status](https://travis-ci.org/alxjrvs/randsum.svg?branch=master)](https://travis-ci.org/alxjrvs/randsum)
[![codecov](https://codecov.io/gh/alxjrvs/randsum/branch/master/graph/badge.svg)](https://codecov.io/gh/alxjrvs/randsum)

## Installation
You can use yarn: 

`yarn add randsum` 

or NPM 

`npm install randsum`

Then, include it in your project however you'd like: 

```
import d from 'randsum';

const D10 = require('randsum').D10;
```

## API

## `d`
`d` represents an instance of a single Die, which can then be rolled with the `roll()` method. 

### `constructor: (sides: number)`
`const D4 = new d(4);`

### `sides: number`
`D4.sides // 4`
This represents the number of sides on the die, represeting the highest value in the range of numbers this die can produce.

### `roll: (n: number?, modifier: RollModifier?) => number`
```
D4.roll() // a random number between 1-4
D4.roll(2) // a random number between 2-8
D4.roll(2, (results) => (_.sum(results) + 2)) // a random number between 2-8, + 2
D4.roll(2, { drop: { highest: true } }) // A random number between 2-8, with the highest roll dropped
```
`roll` rolls the virtual die any number of times, returning the sum of all the dice rolls. 

It takes two optional arguments: 
  - a `number`, representing the number of times you want to roll the die in this `roll`. 
  - a `RollModifier`, a function or object you can use to modify the result of the die roll. see `RollModifier` for more information.

`roll` will also record the results of the roll to the `log`. 

### `log: rollLog[]`
```
const D4 = new d(4);
D4.log // [];
D4.roll(2);
D4.log  // [{ total: 6, results: [ 2, 4 ], dateRolled: '2018-03-18T15:10:28.833Z' }]
```
`d` objects keep a log of every roll they've made. See `rollLog` for more information.

## The `D{n}` Constants
```
import { D10 } from 'randsum'

console.log(D10.roll()) // 1-10
```
`randsum` also provides several constants based on popular Dice Sizes:

- D4
- D6
- D8
- D12
- D20 
- D100

These are all the equivalent of `const D6 = new d(6)`. 

## Types 
### `RollModifier: { plus?: number; minus?: number; drop?: { highest?: number | boolean; lowest?: number | boolean ; } }`

`RollModifier` describes a configuration object that can be passed to `d#roll`'s second argument. 

#### `drop?: { highest?: number | boolean; lowest?: number | boolean }`
`drop` takes an object that you can use to remove dice from the result pool of dice rolled. 

#### `drop.highest` 
`drop.highest` will remove the highest-value dice from the dice pool. 

if `drop.highest` is set to `true`, the highest die will be removed from the results pool before the total is calculated.

`D4.roll(2, { drop: { highest: true }}) // A random number between 1-4 (2 dice rolled, the highest removed)`

if `drop.highest` is set to a number (n), the highest n die will be removed from the results pool before the total is calculated.
`D4.roll(3, { drop: { highest: 2 }}) // A random number between 1-4 ( 3 dice rolled, the highest 2 removed)`

#### `drop.lowest` 
`drop.lowest` will remove the lowest-value dice from the dice pool. 

if `drop.lowest` is set to `true`, the lowest die will be removed from the results pool before the total is calculated.

`D4.roll(2, { drop: { lowest: true }}) // A random number between 1-4 (2 dice rolled, the lowest removed)`

if `drop.lowest` is set to a number (n), the lowest n die will be removed from the results pool before the total is calculated.
`D4.roll(3, { drop: { lowest: 2 }}) // A random number between 1-4 ( 3 dice rolled, the lowest 2 removed)`


#### `plus?: number`
`plus` will add the provided number to the total calculation of die rolled.

`D4.roll(2, { plus: 2}) // A random number between 2-8, +2`

#### `minus?: number`
`minus` will subtract the provided number (or add, if the provided number is negative itself) from the total calculation of die rolled.

`D4.roll(2, { minus: 2}) // A random number between 2-8, -2`

`D4.roll(2, { minus: -2}) // A random number between 2-8, -2`

### `RollAccessor: (results: number[]) => number`
`RollAccessor` describes the optional function that can be passed to `d#roll`'s second argument. 

An array of individual roll results will be made available to the callback. You can operate on this array to manipulate the total however you'd like! 

For instance, if you wanted to double each number rolled (and were using a cool library like `lodash` for the math!), we could do something like this: 

`D4.roll(4, (results) => _.sum(results.map( n => n*2)))`

### `RollModifier: RollAccessor | RollParameters`
`RollModifier` is a wrapper for `RollAccessor` and `RollParameters`. It represents the allowed types for the second argument to `roll`.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
