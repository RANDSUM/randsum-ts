import d from './d'

export const [ 
  D4, 
  D6, 
  D8, 
  D10, 
  D12,
  D20,
  D100,
] = [
  4, 
  6, 
  8, 
  10, 
  12,
  20,
  100,
].map((sides) => new d(sides));