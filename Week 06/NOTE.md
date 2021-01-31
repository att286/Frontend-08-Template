# 学习笔记

## 知识点
### JavaScript
1. 类型转换。对于表达式String == Boolean，js会先把Boolean转换为Number，再进行对比。
2. 7 + 1种类型。
  - Number：实际为双精度浮点数Double Float。1个符号位（0正1负）+11个指数位+52个精度位。每个位是一个bit。
    1. 小数运算必有精度损失，0.1加0.2不等于0.3。
    2. 十进制语法奇特，只要小数点前面或者后年有数字，就可以省略另一边，所以0.是一个值为0的数字，0.toString()会报错，必须使用0. toString()。
  - String
    1. 属性的key值可以是Symbol和String两种类型。
    2. 基本的面向对象能力：{} . [] Object.defineProperty
    3. 基于原型的对象API：Object.create Object.setPropertyOf Object.getPropertyOf
    4. 基于分类的方式描述对象：new class extends
    5. 不伦不类：new function prototype
    6. Function的typeof的结果是function，是一个带call方法的对象。
    7. fo() = 2; 成立但无意义。
  - Boolean
  - Object
    1. 设计原则：行为改变状态。
  - Null：有值，为空。
    1. typeof Null 的值是Object。
  - Undefined：未定义过它的值。
    1. 是一个全局变量，所以可以被赋值。
    2. void 0;产生undefined，void是关键字，后边不管跟什么，都会变成undefined。
  - Symbol：可用于Object中的索引。
  - BigInt：制定中。

## 学习心得
