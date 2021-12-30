export interface Match extends Record<string, undefined | string> {
  coreNotationMatch: string
  dropHighMatch?: string
  dropLowMatch?: string
  dropConstraintsMatch?: string
  explodeMatch?: string
  uniqueMatch?: string
  replaceMatch?: string
  rerollMatch?: string
  capMatch?: string
  plusMatch?: string
  minusMatch?: string
}
