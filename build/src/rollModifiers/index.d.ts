import ParameterDigester, { RollParameters } from './parameters';
export declare type RollAccessor = (results: number[]) => number;
export declare type RollModifier = RollAccessor | RollParameters;
export { ParameterDigester, RollParameters };
declare function generateTotal(results: number[], modifier?: RollModifier): number;
export default generateTotal;
