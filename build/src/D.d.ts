import RollLog from './RollLog';
import { RollModifier } from './rollModifiers';
declare class d {
    readonly sides: number;
    readonly log: RollLog[];
    constructor(sides: number);
    roll(number?: number, modifier?: RollModifier): number;
    private readonly singleRoll;
}
export default d;
