import rollLog from './rollLog';
import { random, generateTotal } from './utils';
import { RollModifier } from './types';

class d {
  readonly sides: number;
  readonly log: rollLog[] = [];

  constructor(sides: number){
   this.sides = sides;
  }

  roll(number = 1, modifier?: RollModifier ) {
    const results = Array.from(Array(number), () => this.singleRoll)
    const total = generateTotal(results, modifier)
    this.log.push(new rollLog(total, results, modifier));

    return total;
  }

  private get singleRoll() {
    return random(this.sides);
  }
}

export default d;
