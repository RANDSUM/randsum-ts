import { sum, isPlainObject, isFunction} from 'lodash';
import RollAccessor from './Accessor';
import ParameterDigester, { RollParameters } from './Parameters';

export type RollModifier = RollAccessor | RollParameters;

export default function generateTotal(results: number[], modifier?: RollModifier) {
  if (isPlainObject(modifier)) {
    modifier = modifier as RollParameters;
    return ParameterDigester(results, modifier);
  }

  if (isFunction(modifier)) {
    modifier = modifier as RollAccessor;
    return modifier(results);
  }
  return sum(results);
}

