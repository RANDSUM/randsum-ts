import { sum, isPlainObject, isFunction} from '../../utils';
import { RollModifier, RollAccessor, RollParameters } from '../../types';
import parameterDigester from './parameterDigester';

function total(results: number[], modifier?: RollModifier) {
  if (isPlainObject(modifier)) {
    modifier = modifier as RollParameters;
    return parameterDigester(results, modifier);
  }

  if (isFunction(modifier)) {
    modifier = modifier as RollAccessor;
    return modifier(results);
  }
  return sum(results);
}


export default total;

