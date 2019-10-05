import { RollLog } from '.';
import { RollModifier } from './types';
export declare class D {
    readonly sides: number;
    readonly log: RollLog[];
    constructor(sides: number);
    roll(num?: number, modifier?: RollModifier): number;
    private readonly singleRoll;
}
