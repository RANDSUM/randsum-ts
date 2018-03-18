import { RollModifier } from './RollModifier';

export default class RollLog {
  readonly total: number;
  readonly results: number[];
  readonly modifier: RollModifier
  readonly dateRolled: Date;

  constructor(
    total: number, 
    results: number[], 
    modifier: RollModifier = {} 

  ) {
    this.total = total;
    this.results = results;
    this.modifier = modifier;
    this.dateRolled = new Date(Date.now());

  }
}