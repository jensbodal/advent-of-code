const { data } = require('./input.json');

const find2020 = arr => {
  const sorted = arr.sort((a,b) => a-b);
  console.log(sorted);
  const len = sorted.length;

  let left = 0;
  let right = len - 1;

  while (left < right) {
    const l = arr[left];
    const r = arr[right];
    const sum = l + r;

    if (sum === 2020) {
      return l * r;
    }

    if (sum > 2020) {
      right--;
    } else {
      left++;
    }
  }
}

console.log(find2020(data));
