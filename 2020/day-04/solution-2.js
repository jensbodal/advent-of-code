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

validateNumberRange = (v, min, max) => {
  const num = parseInt(v);
  return num >= min && num <= max;
}

validateHeight = (v, min, max) => {
  const parsed = v.match(/^(\d+)(in|cm)/);
  if (!parsed) {
    return false;
  }
  const [_, height, units ] = parsed;
  if (units === 'in') {
    return validateNumberRange(height, 59, 76);
  }
  if (units === 'cm') {
    return validateNumberRange(height, 150, 193);
  }
  return false;
}

const validateHair = str => {
  return /^#[0-9a-f]{6}$/.test(str);
}

const validateEyeColor = str => {
  const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  return validEyeColors.includes(str);
}

const validatePassportId = str => {
  return /^[0-9]{9}$/.test(str);
}

const validatePassport = passport => {
  const keys = Object.keys(passport);
  if (!requiredFields.every(field => keys.includes(field))) {
    return false;
  }

  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;

  // console.log( {
  //   byr: validateNumberRange(byr, 1920, 2002),
  //   iyr: validateNumberRange(iyr, 2010, 2020),
  //   eyr: validateNumberRange(eyr, 2020, 2030),
  //   hgt: validateHeight(hgt, 1920, 2002),
  //   hcl: validateHair(hcl),
  //   ecl: validateEyeColor(ecl, 1920, 2002),
  //   pid: validatePassportId(pid),
  // });

  return [
    validateNumberRange(byr, 1920, 2002),
    validateNumberRange(iyr, 2010, 2020),
    validateNumberRange(eyr, 2020, 2030),
    validateHeight(hgt, 1920, 2002),
    validateHair(hcl),
    validateEyeColor(ecl),
    validatePassportId(pid),
  ].every(Boolean);

}

const validatePassports = passports => {
  return passports.filter(passport => validatePassport(passport));
}

console.log(validatePassports(parsePassports(testInput)).length);
