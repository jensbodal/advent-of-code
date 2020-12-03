const { readLinesAsArray } = require('utils');

const testInput = readLinesAsArray('./input.txt');

const navigate = forest => {
  const solution = {
    treeCounter: 0,
  };
  const movesRight = 3;
  const movesDown = 1;
  const TREE = '#';
  const OPEN = '.';
  const len = forest.length;
  const pathLength = forest[0].length;

  for (let posRight = movesRight, posDown = 0; posDown < len - movesDown; posRight+=movesRight, posDown+=movesDown) {
    const nextPath = forest[posDown+1];
    const nextPosition = nextPath[posRight % pathLength];

    if (nextPosition === TREE) {
      solution.treeCounter++;
    }
  }

  return solution;
}

console.log(navigate(testInput));
