/**
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
**/

const fs = require('fs');

const readFile = filename => fs.readFileSync(filename).toString().split('\n').filter(Boolean);

const testInput = readFile('./test-input.txt');
const solutionInput = readFile('./input.txt');

const validatePassword = (idx1, idx2, letter, password) => {
  const letters = password.split('');

  const letter1 = letters[idx1];
  const letter2 = letters[idx2];

  if (letter1 === letter2) {
    return false;
  }

  if (letter1 === letter || letter2 === letter) {
    return true;
  }

  return false;
}

const validatePasswords = inputs => {
  const solution = {
    validPasswords: [],
    validPasswordsCount: 0,
  };

  for (input of inputs) {
    const [rawPolicy, rawLetter, rawPassword] = input.split(' ');

    const [pos1, pos2] = rawPolicy.split('-').map(v => parseInt(v));
    const letter = rawLetter.replace(':', '');
    const password = rawPassword;

    if (validatePassword(pos1 - 1, pos2 - 1, letter, password)) {
      solution.validPasswordsCount++;
      solution.validPasswords.push(password);
    }
  }

  return solution;
}

console.log(validatePasswords(solutionInput));

