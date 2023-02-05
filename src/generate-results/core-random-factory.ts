const coreRandomFactory = (sides: number) => () =>
  Math.floor(Math.random() * Number(sides)) + 1

export default coreRandomFactory
