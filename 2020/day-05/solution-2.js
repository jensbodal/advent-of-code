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

const getSeatIds = boardingPasses => {
  const ids = [];

  boardingPasses.forEach(pass => {
    ids.push(getSeatId(pass));
  });

  return ids.sort((a, b) => a - b);
}

const getMySeatId = seatIds => {
  const len = seatIds.length;
  const missing = [];

  let before = -1;
  let after = -1;

  for (let i = 0; i < len; i++) {
    if (i === 0 || i === len - 1) {
      continue;
    }
    const current = seatIds[i];
    before = seatIds[i - 1];
    after = seatIds[i + 1];

    if (current - 1 !== before) {
      missing.push(current - 1)
    }
    if (current + 1 !== after) {
      missing.push(current + 1)
    }
  }

  return missing;
}

console.log(getMySeatId(getSeatIds(input)));
