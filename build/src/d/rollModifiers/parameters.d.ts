export declare type RollParameters = {
    plus?: number;
    minus?: number;
    drop?: {
        highest?: number | boolean;
        lowest?: number | boolean;
    };
};
export default function ParameterDigester(results: number[], parameters: RollParameters): number;
