import RollAccessor from './accessor';
import ParameterDigester, { RollParameters } from './parameters';
export declare type RollModifier = RollAccessor | RollParameters;
export { RollAccessor, ParameterDigester, RollParameters };
export default function generateTotal(results: number[], modifier?: RollModifier): number;
