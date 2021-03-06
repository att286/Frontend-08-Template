/**
 * 查找字符串：状态机版本
 * abcabx
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
  if (c === 'a') {
    return foundA2;
  }
  return start(c);
}

function foundA2(c) {
  if (c === 'b') {
    return foundB2;
  }
  return start(c);
}

function foundB2(c) {
  if (c === 'x') {
    return end;
  }
  return foundB(c);
}

let rlt = match('abcabcabx groot');
console.log(rlt);
