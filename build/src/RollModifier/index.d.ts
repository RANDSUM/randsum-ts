import RollAccessor from './Accessor';
import { RollParameters } from './Parameters';
export declare type RollModifier = RollAccessor | RollParameters;
export default function generateTotal(results: number[], modifier?: RollModifier): number;
