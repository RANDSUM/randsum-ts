export type AdvantageDisadvantage5E = 'Advantage' | 'Disadvantage'
export interface RollArgument5E {
  modifier: number
  rollingWith?: AdvantageDisadvantage5E
}
