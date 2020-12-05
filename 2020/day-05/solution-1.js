const { readLinesAsArray} = require('utils');

// const input = readLinesAsArray('./input-test.txt');
const input = readLinesAsArray('./input-solution.txt');

const SEATS = 128;

const getSeatId = boardingPass => {
  const rows = boardingPass.substring(0, 7).split('');
  const columns = boardingPass.substring(7).split('');

  const possibleRows = [];
  const possibleColumns = [];

  for (let i = 0; i < 128; i++) {
    possibleRows.push(i);
  }

  for (let i = 0; i < 8; i++) {
    possibleColumns.push(i);
  }

  rows.forEach(row => {
    if (row === 'F') {
      possibleRows.splice(possibleRows.length / 2)
    }
    if (row === 'B') {
      possibleRows.splice(0, possibleRows.length / 2)
    }
  });

  columns.forEach(row => {
    if (row === 'L') {
      possibleColumns.splice(possibleColumns.length / 2)
    }
    if (row === 'R') {
      possibleColumns.splice(0, possibleColumns.length / 2)
    }
  });

  const row = possibleRows[0];
  const column = possibleColumns[0]

  return (row * 8) + column;
}

const getHighestSeatId = boardingPasses => {
  let max = -1;

  boardingPasses.forEach(pass => {
    const id = getSeatId(pass);

    if (id > max) {
      max = id;
    }
  })

  return max;
}

console.log('expecting 820')
console.log(getHighestSeatId(input));
// console.log(getHighestSeatId(['FBFBBFFRLR']));
