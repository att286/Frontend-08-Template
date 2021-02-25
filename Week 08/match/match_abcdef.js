/**
 * 查找字符串：状态机版本
 * abcdef
 */
function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === 'a') {
    return foundA;
  }
  return start;
}

//这是一个trap，进入到这个状态就不会再进入别的状态
function end(c) {
  return end;
}

function foundA(c) {
  if (c === 'b') {
    return foundB;
  }
  //reCosume
  return start(c);
}

function foundB(c) {
  if (c === 'c') {
    return foundC;
  }
  return start(c);
}

function foundC(c) {
  if (c === 'd') {
    return foundD;
  }
  return start(c);
}

function foundD(c) {
  if (c === 'e') {
    return foundE;
  }
  return start(c);
}

function foundE(c) {
  if (c === 'f') {
    return end;
  }
  return start(c);
}

// let rlt = match('abcdef groot');
// console.log(rlt);
let rlt2 = match('ababcdef groot');
console.log(rlt2);
