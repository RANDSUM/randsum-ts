export function generateNumericTotal({
  rolls,
  simpleMathModifier
}: {
  rolls: number[]
  simpleMathModifier: number
}) {
  return (
    Number([...rolls].reduce((total, roll) => total + roll, 0)) +
    simpleMathModifier
  )
}
