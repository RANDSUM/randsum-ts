export function defaultRandomizer(max: number): number {
  return Math.floor(Math.random() * Number(max)) + 1
}
