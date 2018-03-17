import * as _ from 'lodash';
import RollLog from './RollLog';

class D {
  readonly sides: number;
  public log: RollLog[] = [];
  public total?: number;
  public results?: number[];

  constructor(sides: number){
   this.sides = sides;
  }

  public roll(number: string) {
    this.results = Array(number).map(() => this.singleRoll());
    this.total = _.sum(this.results);
    this.log.push( new RollLog(this.total, this.results));
    return this;
  }

  private singleRoll() {
    return _.random(1, this.sides);
  }
}

export default D;