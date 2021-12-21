export function isDiceNotation(arg: string | number): arg is string {
  return !Number(arg)
}
