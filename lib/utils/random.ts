export const random = (max: number) => {
  const zeroIndexedMax = max - 1
  return Math.floor(Math.random() * zeroIndexedMax) + 1
}
