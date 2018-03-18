import { random } from 'lodash';
import RollLog from './RollLog';

import generateTotal, { RollModifier } from './RollModifier';

class D {
  readonly sides: number;
  public log: RollLog[] = [];

  constructor(sides: number){
   this.sides = sides;
  }

  public roll(number: number = 1, modifier?: RollModifier ) {
    const results = Array.from(Array(number), () => this.singleRoll)
    const total = generateTotal(results, modifier)
    this.log.push(new RollLog(total, results, modifier));

    return total;
  }

  private get singleRoll() {
    return random(1, this.sides);
  }
}

export default D;