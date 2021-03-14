# 学习笔记

## 知识点
### CSS2.1知识框架
1. At-rules(at规则)
  - @charset
  - @import
  - @media
  - @page
  - @counter-style
  - @keyframes
  - @fontface
  - @support
  - @namespace
2. rule(普通规则)
  - Selector(选择器)(成熟的level3，制定中的level4)
    - selector-group
    - selector(连接符)
      1. >(父子)
      2. <sp>(子孙)
      3. +
      4. ~
      5. ||(level4才有，表示table中选中某一列)
    - simple-selector(简单连接符)
      1. type(类型)
      2. *
      3. .
      4. #
      5. []
      6. :(伪类)
      7. ::(伪元素)
      8. :not()
  - Declaration(声明)
    - Key
      1. variables(变量)
      2. properties(属性)
    - Value
      1. calc
      2. number
      3. length
      4. ...

### CSS选择器
  1. 简单选择器
    - *(通用选择器)
    - div svg|a(类型选择器，对应tagName。HTML中命名空间分隔符是:，CSS选择器里是|)
    - .cls
    - #id
    - [attr=value]
    - :hover
    - ::before(也可以:为开头，不推荐)
  2. 复合选择器
    - <简单选择器><简单选择器><简单选择器>
    - *或div必须在最前
  3. 复杂选择器
    - <复合选择器><连接符><复合选择器>

### HTML命名空间
  1. HTML
  2. SVG
  3. MathML## 学习心得

### 选择器优先级
  1. 选择器优先级其实是对一个选择器里面包含的所有简单选择器进行计数
  2. 练习：写出下面选择器的优先级
    - div#a.b .c[id=x]
    - #a:not(#b)
    - *.a
    - div.a

### 伪类
  1. 链接/行为
    - :any-link(任何超链接)
    - :line(没有访问过的) :visited(已经访问过的)
    - :hover
    - :active
    - :focus
    - :target
  2. 树结构
    - :empty(是否有子元素，破坏css计算，不建议使用)
    - :nth-child()
    - :nth-last-child()(非常不建议使用)
    - :first-child :last-child :only-child(后两个同empty，不建议使用)
  3. 逻辑性
    - :not伪类
    - :where :has(level4)

### 伪元素
  1. ::before(在元素内容之前插入一个伪元素，一旦应用该属性，则可以在declaration里就可以写一个content属性，content可以像真正的dom元素一样生成盒，参与后续的排版盒渲染，可以为其制定border/background之类的属性。可以理解为伪元素是通过选择器向街面上添加了一个不存在的元素)
  2. :after(同before)
  3. ::first-line(选中第一行，本身包含content。第一行是已经完成排版之后的结果。)
    - font系列
    - color系列
    - background系列
    - word-spacing
    - letter-spacing
    - text-decoration
    - text-transform
    - line-height
  4. ::first-letter(选中第一个字母，本身包含content。用一个不存在的元素把一部分文本括了起来)
    - font系列
    - color系列
    - background系列
    - word-spacing
    - letter-spacing
    - text-decoration
    - text-transform
    - line-height
    - float
    - vertical-align
    - 盒模型系列：margin/padding/border
  >5. 思考：为什么first-letter可以设置display:block/float之类，而first-line不行？
  >  - 因为first-line选中的第一行是【已经排版之后】的第一行，即使设置diaplay:block/float之类的属性也不会生效。
  6. 作业：编写一个 match 函数。它接收两个参数，第一个参数是一个选择器字符串性质，第二个是一个 HTML 元素。这个元素你可以认为它一定会在一棵 DOM 树里面。通过选择器和 DOM 元素来判断，当前的元素是否能够匹配到我们的选择器。（不能使用任何内置的浏览器的函数，仅通过 DOM 的 parent 和 children 这些 API，来判断一个元素是否能够跟一个选择器相匹配。）以下是一个调用的例子。
  ``` JavaScript
    function match(selector, element){
      return true;
    }
    math('div #id.class', document.getElementById('id'));
  ```