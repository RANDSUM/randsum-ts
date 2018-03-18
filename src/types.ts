export type RollAccessor = (results: number[]) => number;
export type RollParameters = {
  plus?: number;
  minus?: number;
  drop?: {
    highest?: number | boolean;
    lowest?: number | boolean ;
  }
};
export type RollModifier = RollAccessor | RollParameters;