const { data } = require('./input.json');

// const data = [
//   1721,
//   979,
//   366,
//   299,
//   675,
//   1456
// ];

const find2020 = arr => {
  const sorted = arr.sort((a,b) => a-b);
  const len = sorted.length;

  let left = 0;
  let runner = 1;
  let right = len - 1;

  const solution = {
    left: -1,
    runner: -1,
    right: -1,
    sum: -1,
    product: -1,
  };

  while (left < right) {
    if (runner === right) {
      left++;
      runner = left + 1;
      right = len - 1;
      continue;
    }

    solution.left = arr[left];
    solution.runner = arr[runner];
    solution.right = arr[right];
    solution.sum = solution.left + solution.runner + solution.right;

    if (solution.sum === 2020) {
      solution.product = solution.left * solution.runner * solution.right;
      return solution;
    }

    if (solution.sum < 2020) {
      runner++;
      continue;
    }

    if (solution.sum > 2020) {
      right--;
      continue;
    }

    left++; // shouldn't ever be reached
  }

  return solution;
}

console.log(find2020(data));
