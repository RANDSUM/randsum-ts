import randsum from '../dist/index.module.js'

console.log('simple')
console.log(randsum(20))

console.log('simple detailed')
console.log(randsum('20', { detailed: true }))

console.log('Dice Notation Custom Sides')
console.log(randsum('20d{++--  }'))

console.log('complex options')
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
