export function generateCustomFacesTotal({
  initialRolls,
  faces
}: {
  initialRolls: number[]
  faces: Array<number | string>
}) {
  return initialRolls.map((roll) => faces[roll - 1]).join(',')
}
