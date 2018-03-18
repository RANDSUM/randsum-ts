import RollLog from './RollLog';
import { RollModifier } from './RollModifier';
declare class D {
    readonly sides: number;
    readonly log: RollLog[];
    constructor(sides: number);
    roll(number?: number, modifier?: RollModifier): number;
    private readonly singleRoll;
}
export default D;
