export function generateUniqueFullRolls(sides: number){
  return Array.from(new Array(sides), (_, i) => i + 1);​​​​​​
}
