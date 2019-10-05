export const times = (iterator: number) => (callback: (i?: number) => void) => {
  if (iterator > 0) {
    callback(iterator)
    times(iterator - 1)(callback)
  }
}
