export declare type RollParameters = {
    plus?: number;
    minus?: number;
    drop?: {
        highest?: number | true;
        lowest?: number | true;
    };
};
export default function ParameterDigester(results: number[], parameters: RollParameters): number;
