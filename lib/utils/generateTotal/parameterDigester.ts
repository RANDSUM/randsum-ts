import { isNumber, times, sum} from 'lodash';
import { RollParameters } from '../../types';

export default function ParameterDigester(results: number[], parameters: RollParameters) {
  const modifiedResults = results.slice().sort();

  if (parameters.drop) {
    if (parameters.drop.highest){
      isNumber(parameters.drop.highest)
      ? times(parameters.drop.highest, () => modifiedResults.pop())
      : modifiedResults.pop();

    }
    if (parameters.drop.lowest){
      isNumber(parameters.drop.lowest)
      ? times(parameters.drop.lowest, () => modifiedResults.shift())
      : modifiedResults.shift();
    }
  }

  let total = sum(modifiedResults);

  if( parameters.plus) { total = total + parameters.plus }
  if( parameters.minus) { 
    parameters.minus < 0
    ? total = total + parameters.minus
    : total = total - parameters.minus
  }
  return total;
}