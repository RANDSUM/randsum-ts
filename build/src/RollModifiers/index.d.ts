import { RollParameters } from './Parameters';
export declare type RollAccessor = (results: number[]) => number;
declare type RollModifier = RollAccessor | RollParameters;
export default RollModifier;
