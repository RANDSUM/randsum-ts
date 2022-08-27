import randsum from '../dist/index.module.js'
import Benchmark from 'benchmark'

const suite = new Benchmark.Suite()

suite
  .add('Sides Num', () => {
    randsum(20)
  })
  .add('Sides String', () => {
    randsum('20')
  })
  .add('Options', () => {
    randsum({ sides: 20, quantity: 4 })
  })
  .add('Sides With Options', () => {
    randsum(20, { quantity: 4 })
  })
  .add('Notation', () => {
    randsum('1d20')
  })
  .add('Custom Sides Options', () => {
    randsum({
      quantity: 4,
      sides: ['r', 'a', 'n', 'd', 's', 'u', 'm']
    })
  })
  .add('Complicated Options', () => {
    randsum({
      quantity: 4,
      sides: 6,
      modifiers: [
        { reroll: { exact: ['2', 1] } },
        { replace: { from: '6', to: '1' } },
        { unique: true }
      ]
    })
  })
  .add('Custom Sides Notation', () => {
    randsum(`10d{++--  }`)
  })
  .add('Complicated Notation', () => {
    randsum(
      `10d20H2LV{ 1= 2,> 2=6}D{< 2,> 5, 2, 4}C < 2 > 18R{ 5, 2,< 6}3U{ 5}! + 2 - 5 + 3`
    )
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
