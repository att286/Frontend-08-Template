/**
 * 查找字符串：非状态机版本
 */
//在string中找出字符char
function findChar(char, string) {
  for (let c of string) {
    if (c === char) return true;
  }
  return false;
}
let rlt = findChar('a', 'abcdef');
console.log(rlt)

//在string中找出字符串char
function findChar2(char, string) {
  for (let k = 0; k < string.length; k++) {
    if (string[k] === char[0]) {
      if (string.substr(k, char.length) === char) {
        return true;
      }
    }
  }
  return false;
}
let rlt2 = findChar2('ab', 'abcdef');
console.log(rlt2)
let rlt3 = findChar2('abc', 'abcdef');
console.log(rlt3)
