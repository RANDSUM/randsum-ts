import { RollModifier } from './types';
export declare class RollLog {
    readonly total: number;
    readonly results: number[];
    readonly modifier?: RollModifier;
    readonly dateRolled: Date;
    constructor(total: number, results: number[], modifier?: RollModifier);
}
