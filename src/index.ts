import D from './D';

export const [ 
  D3, 
  D4, 
  D5, 
  D6, 
  D8, 
  D10, 
  D12
] = [
  3, 
  4, 
  5, 
  6, 
  8, 
  10, 
  12
].map((sides) => new D(sides));
export default D;