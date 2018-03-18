import RollAccessor from './accessor';
import { RollParameters } from './parameters';
export declare type RollModifier = RollAccessor | RollParameters;
export default function generateTotal(results: number[], modifier?: RollModifier): number;
