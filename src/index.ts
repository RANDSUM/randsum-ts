import * as _ from 'lodash';

export type RandomCore = () => number;
export type Randomizer = (sides: number) => RandomCore;

export type LiveDie = { roll: Roll, log: Log };
export type DieCreator = (sides: number) => LiveDie;
export type Log = RollResult[];

export type RollCreator = (singleRoll: RandomCore, log: Log) => Roll;
export type Roll = (number?: number) => LiveRollResult;
export type RollResult = { result: number, resultsArray: number[] };
export type LiveRollResult = RollResult & LiveDie;

export const randomizer: Randomizer = (sides) => () => _.random(1, sides);

export const rollCreator: RollCreator = (singleRoll, log) => {
  return (number) => {
    const resultsArray = Array(number).map(() => singleRoll());
    const result = _.sum(resultsArray);
    log.push({ result, resultsArray });

    const roll = rollCreator(singleRoll, log);

    return { result, resultsArray, roll, log, };
  }
}

const D: DieCreator = (sides): LiveDie => {
  const singleRoll = randomizer(sides);
  const log: Log = [];
  const roll = rollCreator(singleRoll, log);
  return { roll, log };
}

export const [ D3, D4, D5, D8, D10, D12] = [3, 4, 5, 8, 10, 12].map((sides) => D(sides));
export default D;