import { random } from 'lodash';
import RollLog from './RollLog';

import generateTotal, { RollModifier } from './rollModifiers';

class d {
  readonly sides: number;
  readonly log: RollLog[] = [];

  constructor(sides: number){
   this.sides = sides;
  }

  roll(number = 1, modifier?: RollModifier ) {
    const results = Array.from(Array(number), () => this.singleRoll)
    const total = generateTotal(results, modifier)
    this.log.push(new RollLog(total, results, modifier));

    return total;
  }

  private get singleRoll() {
    return random(1, this.sides);
  }
}

export default d;