#!/usr/bin/env node
const { readLinesAsArray } = require('utils');

const testInput = readLinesAsArray('./input.txt');

const navigate = (forest, movesRight, movesDown) => {
  const solution = {
    treeCounter: 0,
  };
  const TREE = '#';
  const len = forest.length;
  const pathLength = forest[0].length;

  for (let posRight = movesRight, posDown = 0; posDown < len - movesDown; posRight+=movesRight, posDown+=movesDown) {
    const nextPath = forest[posDown+movesDown];
    const nextPosition = nextPath[posRight % pathLength];

    if (nextPosition === TREE) {
      solution.treeCounter++;
    }
  }

  return solution;
}

const { treeCounter: treeCount1 } = navigate(testInput, 1, 1);
const { treeCounter: treeCount2 } = navigate(testInput, 3, 1);
const { treeCounter: treeCount3 } = navigate(testInput, 5, 1);
const { treeCounter: treeCount4 } = navigate(testInput, 7, 1);
const { treeCounter: treeCount5 } = navigate(testInput, 1, 2);

console.log({
  treeCount1,
  treeCount2,
  treeCount3,
  treeCount4,
  treeCount5,
  product: treeCount1 * treeCount2 * treeCount3 * treeCount4 * treeCount5
});
