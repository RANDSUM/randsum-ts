export declare type RollAccessor = (results: number[]) => number;
export declare type RollParameters = {
    plus?: number;
    minus?: number;
    drop?: {
        highest?: number | boolean;
        lowest?: number | boolean;
    };
};
export declare type RollModifier = RollAccessor | RollParameters;
