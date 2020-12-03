/**
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
**/

const {readLinesAsArray: readFile} = require('utils');

const testInput = readFile('./test-input.txt');
const solutionInput = readFile('./input.txt');

const validatePassword = (min, max, letter, password) => {
  const letterCount = password.split('').filter(c => c === letter).length;

  if (letterCount >= min && letterCount <= max) {
    return true;
  }

  return false;
}

const validatePasswords = inputs => {
  const solution = {
    validPasswordsCount: 0,
    validPasswords: []
  };

  for (input of inputs) {
    const [rawPolicy, rawLetter, rawPassword] = input.split(' ');

    const [min, max] = rawPolicy.split('-').map(v => parseInt(v));
    const letter = rawLetter.replace(':', '');
    const password = rawPassword;

    if (validatePassword(min, max, letter, password)) {
      solution.validPasswordsCount++;
      solution.validPasswords.push(password);
    }
  }

  return solution;
}

console.log(validatePasswords(solutionInput));

