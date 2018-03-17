import RollLog from './RollLog';
declare class D {
    readonly sides: number;
    log: RollLog[];
    total?: number;
    results?: number[];
    constructor(sides: number);
    roll(number: string): this;
    private singleRoll();
}
export default D;
