# 学习笔记

## 重学HTML｜HTML的定义：XML与SGML
1. HTML的源流主要来自于XML和SGML
2. 在HTML立普通的spcce，多个会被合成一个。使用&nbsp;(no-break space)代替空格问题很多，因为用它连接的词不会被分开，会把两个词连成一个词。它的Unicode码为U+00A0，可通过使用00A0实现多个空格，但是并不建议这么做。更好的做法是使用CSS的white-space属性。
3. &Lambda;
4. quot("双引号)放在属性立会报错，amp(&)/lt(<)/gt(>)放在HTML里会抛错。
5. URL代表一个namespace？最常用HTML/MathML/SVG的namespace。

## 重学HTML｜HTML标签语义
1. 语义话的标签写法。
2. strong加粗表示这个词在文章中的重要性，不改变语义，说明这个词很重要。em表示这个词在句子里的重音是什么，是一种辅助的语气表示，表达的是在句子里面强调的重点的词是什么。

## 重学HTML｜HTML语法
1. 合法元素
  - 元素 Element: <tagname>...</tagname>
  - 文本 Text: text
  - 注释 Comment: <!-- comments -->
  - H5只有一种 DocumentType: <!Doctype html>
  - 预处理语法 ProcessingInstruction: <?a 1?>
  - 文本节点，不需要考虑转义 CDATA: <![CDATA[ ]]>
2. 字符引用
  - &#161; 表示ASIC为161的字符
  - &amp;
  - &lt;
  - &quot;

## 浏览器API｜事件API
1. Event：冒泡与捕获
  - 任何事件都有一个先捕获再冒泡的过程。
    - 捕获：从外到内一层一层计算事件到底发生在哪个元素上。
    - 冒泡：已经算出来点在哪个元素，层层向外触发，然后让元素去响应这个事件。（事件的默认行为）
  - 先加的事件先触发。

## 浏览器API｜DOM API
1. 节点类API
  - DOM树中的节点（Node）类型。所有DOM树上能挂着的东西统一继承自Node。
    - Element：元素节点，跟标签对应
      - HTMLElement
        - HTMLAnchorElement：a标签
        - HTMLAppletElement
        - HTMLAreaElement
        - HTMLAudioElement
        - HTMLBaseElement
        - HTMLBodyElement
        - ...
      - SVGElement
        - SVGAElement：SVG里面的a标签
        - SVGAltGlyphElement
        - ...
    - Document节点：文档根节点
    - CharacterData：字符数据
      - Text：文本节点
        - CDATASection：CDATA节点
      - Comment：注释
      - ProcessingInstruction：处理信息。不应该出现在DOM树中。
    - DocumentFragment：文档片段。无法挂在DOM树上，但也继承自Node。可以执行挂在DOM树上的操作，执行时会把自己所有的自节点挂上去。
    - DocumentType：文档类型
  - 导航类操作（节点导航/元素导航）
    - parentNode/parentElement（这两个必然相等，因为非Element的Node是不可能有子节点的）
    - childNodes/children
    - firstChild/firstElementChild
    - lastChild/lastElementChild
    - nextSibling/nextElementSibling（下一个邻居）
    - previousSibling/previousElementSibling（上一个邻居）
  - 修改操作
    - appendChild
    - insertBefore
    - removeChild
    - replaceChild（一次remove加上一次insert，多余）
  - 高级操作
    - compareDocumentPosition 比较两个节点中关系，可以得到一个前后的关系。
    - contains 检查一个节点是否包含另一个节点。
    - isEqualNode 检查两个节点是否完全相同（DOM树结构是否相同）。
    - isSameNode 检查两个节点是否是同一个节点，在JavaScript中可以使用 === 比较。
    - cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝。
2. 事件类API
3. Range API。功能强大，性能更好，应用性差。
4. traversal系列API。不推荐使用。
5. iterator迭代器。可以被淘汰。

## 浏览器API｜Range API（可操作半个节点，或者批量节点）
1. 问题把一个元素所有的子元素逆序（如果原来是12345，则改为54321）
  - DOM的collection是living collection，操作一个node时，取出的childNodes会跟着变化。
  - 元素的子元素在insert的时候不需要先把它从原来的位置挪掉。DOM树的性质决定了，insert操作的时候，如果节点已经在DOM树中，不管它在不在目标DOM树，都会先把节点remove下来，再把它append到目标树上。 
2. Range API
  - let range = new Range()
  - range.setStart(element, 9)
  - range.setEnd(element, 4)
  - let range = document.getSelection().getRangeAt(0)
    - getSelection：鼠标选中的区域，一般一个selection只有一个range。
  - range.setStartBefore
  - range.setEndBefore
  - range.setStartAfter
  - range.setEndAfter
  - range.selectNode
  - range.selectNodeContents
  - let fragment = range.extractContents()
    - 把range里面选取的内容从DOM树上摘下来，取出来的是fragment对象，也是node的一个子类
  - range.insertNode(document.createTextNode('aaa'))

## 浏览器API｜CSSOM
1. document.styleSheets
2. Rules
  - document.styleSheets[0].cssRules
  - document.styleSheets[0].insertRule('p {color: pink;}', 0)
  - document.styleSheets[0].removeRule(0)
3. Rule
  - CSSStyleRule
    - selectorText String
    - style K-V结构
  - CSSChartsetRule
  - CSSImportRule
  - CSSMediaRule
  - CSSFontFaceRule
  - CSSPageRule
  - CSSNamespaceRule
  - CSSKeyframesRule
  - CSSKeyframeRule
  - CSSSupportsRule
  - ...
4. getComputedStyle
  - window.getComputedStyle(elt, pseudoElt)
    - elt 想要获取的元素
    - pseudoElt 可选，伪元素

## 浏览器API｜CSSOM View
1. window
  - window.innerHeight, window.innerWidth
  - window.outerHeight, window.outerWidth
  - window.devidePixelRatio
  - window.screen
    - window.screen.width
    - window.screen.height
    - window.screen.availWidth
    - window.screen.availHeight
2. window API
  - window.open('about:blank', ' blank', 'width=100, height=100, left=100, right=100')
  - moveTo(x, y)
  - moveBy(x, y)
  - resizeTo(x, y)
  - resizeBy(x, y)
3. scroll
  - 元素
    - scrollTop
    - scrollLeft
    - scrollWidth
    - scrollHeight
    - scroll(x, y)
    - scrollBy(x, y)
    - scrollIntoView()
  - window
    - scrollX
    - scrollY
    - scroll(x, y)
    - scrollBy(x, y)
    - scrollTo?
  - layout
    - getClientRects() 获取元素生成的所有的盒的区域
    - getBoundingClientRect() 获取包裹元素生成的所有盒的一个区域

## 浏览器API｜其他API
1. 标准化组织
  - khronos
   - OpenGL/WebGL
  - ECMA
    - ECMAScript
  - WHATWG
    - HTML
  - W3C
    - webaudio
    - CG/WG
  - 作业与实验：全部API的分类整理
