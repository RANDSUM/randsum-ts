export function times(iterator: number) {
  return (callback: (index?: number) => void): void => {
    if (iterator > 0) {
      callback(iterator)
      times(iterator - 1)(callback)
    }
  }
}
