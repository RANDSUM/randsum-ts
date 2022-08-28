import randsum from '../dist/index.module.js'

function times(iterator) {
  return (callback) => {
    if (iterator > 0) {
      callback(iterator)
      times(iterator - 1)(callback)
    }
  }
}
console.log('simple')
const simple = () => console.log(randsum(20))
times(3)(simple)

console.log('simple detailed')
const simpleDetailed = () => console.log(randsum('20', { detailed: true }))
times(3)(simpleDetailed)

console.log('Dice Notation Custom Sides')
const diceNotationCustomSides = () => console.log(randsum('20d{++--  }'))
times(3)(diceNotationCustomSides)

console.log('complex options')
const complexOptions = () =>
  console.log(
    randsum({
      quantity: 4,
      sides: 6,
      modifiers: [
        { reroll: { exact: ['2', 1] } },
        { replace: { from: '6', to: '1' } },
        { unique: true }
      ]
    })
  )
times(3)(complexOptions)

console.log('Complex Notation')
const complexNotation = () =>
  console.log(
    randsum(
      `10d20H2LV{ 1= 2,> 2=6}D{< 2,> 5, 2, 4}C < 2 > 18R{ 5, 2,< 6}3U{ 5}! + 2 - 5 + 3`
    )
  )
times(3)(complexNotation)
