export declare type RollAccessor = (results: number[]) => number;
export interface DropParameters {
    highest?: number | boolean;
    lowest?: number | boolean;
}
export interface RollParameters {
    plus?: number;
    minus?: number;
    drop?: DropParameters;
}
export declare type RollModifier = RollAccessor | RollParameters;
