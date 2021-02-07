function StringToNumber(string, system = 10) {
  let reg = /^-?0|[1-9]\d*(\.\d*)?$/;
  switch (system) {
    case 2:
      reg = /^-?[0-1]+$/;
      break;
    case 8:
      reg = /^-?[0-7]+$/;
      break;
    case 16:
      reg = /^-?[0-9a-fA-F]+$/;
      break;
    default:
      reg = /^-?0|[1-9]\d*(\.\d*)?$/;
  }
  if (!reg.test(string)) return NaN;
  let isMinus = false;
  let charts = string.split('');
  if (charts[0] === '-') {
    charts.splice(0, 1);
    isMinus = true;
  }

  let number = 0;
  let i = 0;
  const len = charts.length;
  while (i < len && charts[i] !== '.') {
    let currentNum = charts[i];
    if (charts[i] === 'a' || charts[i] === 'A') currentNum = ":";
    if (charts[i] === 'b' || charts[i] === 'B') currentNum = ";";
    if (charts[i] === 'c' || charts[i] === 'C') currentNum = "<";
    if (charts[i] === 'd' || charts[i] === 'D') currentNum = "=";
    if (charts[i] === 'e' || charts[i] === 'E') currentNum = ">";
    if (charts[i] === 'f' || charts[i] === 'F') currentNum = "?";
    number *= system;
    number += currentNum.codePointAt() - '0'.codePointAt();
    i++
  };
  if (charts[i] === '.') i++;
  let fraction = 1;
  while (system === 10 && i < len) {
    fraction = fraction / system;
    number += (charts[i].codePointAt() - '0'.codePointAt()) * fraction;
    i++;
  }

  if (isMinus) return -number;
  return number;
}
// console.log(StringToNumber('67', 16));

function NumberToString(number, system = 10) {
  let integer = Math.floor(number);
  let fraction = number - integer;
  let string = '';
  while (integer > 0) {
    let remainder = integer % system;
    if (remainder === 10) remainder = 'a';
    if (remainder === 11) remainder = 'b';
    if (remainder === 12) remainder = 'c';
    if (remainder === 13) remainder = 'd';
    if (remainder === 14) remainder = 'e';
    if (remainder === 15) remainder = 'f';
    string = remainder + string;
    integer = Math.floor(integer / system);
  }
  if (fraction > 0) {
    string += '.';
    while (fraction > Number.EPSILON) {
      string += Math.floor(fraction * system);
      fraction = fraction * system - Math.floor(fraction * system)
    }
  }

  return string;
}
// console.log(NumberToString(100, 8));

