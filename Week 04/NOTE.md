# 学习笔记

## 知识点
### Symbol作为属性名
```JavaScript
const mySymbol = Symbol();
const a = {};
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```
- Symbol作为属性名时，必须用[]访问。因为.后面总是字符串，所以不会读取mySymbol作为标识名所指代的值，导致a的属性名实际上是个字符串，而不是一个Symbol值。

```JavaScript
let s = Symbol();
let obj = {
  [s]: function(art){...}
};
ojb[s](123);
```
- 在对象内部，使用Symbol值定义属性时，Symbol值必须放在[]中。如果s不放在[]中，该属性的键名就是字符串s，而不是s所代表的那个Symol值。

