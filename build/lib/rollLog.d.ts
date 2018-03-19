import { RollModifier } from './types';
export default class rollLog {
    readonly total: number;
    readonly results: number[];
    readonly modifier?: RollModifier;
    readonly dateRolled: Date;
    constructor(total: number, results: number[], modifier?: RollModifier);
}
