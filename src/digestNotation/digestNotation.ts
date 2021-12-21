import { digestCore } from './digestCore'

export function digestNotation(notationString: string) {
  return { ...digestCore(notationString) }
}
