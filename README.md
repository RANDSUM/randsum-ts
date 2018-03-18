# droll 
## Random Numbers, but for Humans

[![Build Status](https://travis-ci.org/alxjrvs/droll.svg?branch=master)](https://travis-ci.org/alxjrvs/droll)
[![codecov](https://codecov.io/gh/alxjrvs/droll/branch/master/graph/badge.svg)](https://codecov.io/gh/alxjrvs/droll)

## Installation
You can use yarn: 

`yarn add droll` 

or NPM 

`npm install droll`

Then, include it in your project however you'd like: 

```
import d from 'droll';

const D10 = require('droll').D10;
```

## Usage

### `d`
`d` represents an instance of a single Die, which can then be rolled with the `roll()` method. 

#### `constructor: (sides: number)`
`const D4 = new d(4);`

### `sides: number`
`D4.sides // 4`
This represents the number of sides on the die, represeting the highest value in the range of numbers this die can produce.

### `roll: (number?, RollModifier?) => number`
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

### `log: rollLog[]`
```
const D4 = new d(4);
D4.log // [];
D4.roll();
D4.log  /* [ { 
  total: 4, 
  results: [ 4 ],
  dateRolled: '2018-03-18T15:10:28.833Z'
}]
*/
```
`d` objects keep a log of every roll they've made. See `rollLog` for more information.

### The `Dn` Constants
```
import { D10 } from 'droll'

console.log(D10.roll()) // 1-10
```
`droll` also provides several constants based on popular Dice Sizes:

- D4
- D6
- D8
- D12
- D20 
- D100

These are all the equivalent of `const D6 = new d(6)`. Keep in mind that these constants will share a `log`, if you care about that sort of thing.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D