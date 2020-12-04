const fs = require('fs');
const { readLinesAsArray } = require("utils");

const testInput = fs.readFileSync("./solution-input.txt").toString().split('\n');

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  // 'cid',
].sort();

const parsePassports = data => {
  const passports = [];
  let entryBuilder = '';

  data.forEach(line => {
    if (line === '') {
      passports.push(entryBuilder.trim());
      entryBuilder = '';
    } else {
      entryBuilder += `${line} `;
    }
  })

  return passports.map(passport => {
    const passportData = passport.split(' ');
    return passportData.reduce((acc, val) => {
      const [key,value] = val.split(':');
      acc[key] = value;
      return acc;
    },{})
  });
}

const validatePassport = passport => {
  const keys = Object.keys(passport);
  return requiredFields.every(field => keys.includes(field));
}

const validatePassports = passports => {
  return passports.filter(passport => validatePassport(passport));
}

console.log(validatePassports(parsePassports(testInput)).length);
