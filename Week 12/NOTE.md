# 学习笔记

## 知识点
### CSS排版｜盒
1. 基本概念
  - 源代码：标签Tag
  - 语义：元素Element
  - 表现：盒Box
2. 基本知识
  - HTML代码中可以书写开始标签，结束标签，和自封闭标签。
  - 一对起止标签，表示一个元素。
  - DOM树中存储的是元素和其他类型的节点（Node）。文本节点，注释节点等都会存进DOM树，但它们不是节点。
  - CSS选择器选中的是元素。
  - CSS选择器选中的元素或伪元素，在排版时可能产生多个盒。
  - 排版盒渲染的基本单位是盒。
3. 盒模型
  - box-sizing
    - content-box width只包含content
    - border-box width包含padding和border

### CSS排版｜正常流
1. CSS只排两种东西：盒和文字。
2. 正常流排版
  - 收集盒和文字进行
  - 计算盒和文字在行中的排布
  - 计算行与行之间的排布
3. 概念
  - IFC：inline-level-formatting-context 行内排布 从左往右
  - BFC：block-level-formatting-context 块级排布 从上到下

### CSS排版｜正常流的行级排布
1. 任何文字都有基线baseline
2. 行模型：五条线。
  - line-top/text-top/base-line/text-bottom/line-bottom
  - 只要字体大小不变，text-top和text-bottom是不会变的，如果有多种字体混排则由font-size最大的字体决定。
  - 如果行高大于文字高度，则会有line-top和line-bottom。
  - 如果文字跟盒混排，则line-top和line-bottom会受盒影响。
  - 行内盒inline-block的基线是随着自己里面的文字变化的。不建议给行内盒使用基线对齐，可以使用vertical-align。

### CSS排版｜正常流的块级排布
1. float与clear
  - float会影响它所占据的范围内行盒的尺寸。
  - float的位置会受其他float元素的影响。
  - clear找一个干净的空间来执行浮动，避免受其他float元素影响。
  - 可以使用float模拟行内正常流，结合clear达到换行目的。
  - float会导致预期外的重排。
2. Margin Collapse（折叠）
  - 相邻两个元素的margin会重叠，最终的maring由更大的那个决定。
  - 起源于印刷行业，只会发生在正常流的BFC中。

### CSS排版｜BFC合并
1. Block
  - Block Container：里面能装BFC的盒。能容纳正常流的盒，里面就有BFC。
    - block
    - inline-block
    - table-cell
    - flex item
    - grid item
    - table-caption
  - Block-Level Box：外面有BFC的盒，能放进BFC的盒。正常流，文字只能放在IFC。
    - 大多数Block level都有对应的Inline level。
    - block/flex/table/grid...
  - Block Box = Block Container + Block-Level Box：里外都有BFC。
2. 设立BFC
  - floats
  - asbolutely positioned elements
  - block containers that are not block boxes
  - block boxes with 'overflow' other than 'visible'
3. BFC合并
  - 能容纳正常流的盒都会创建BFC，只有一种例外就是Block Box（里外都是BFC）并且overflow:visible，此时会发生BFC合并。overflow:hidden创建新的BFC。
    - BFC合并与float（可以对父元素使用overflow:hidden避免文字环绕）
    - BFC合并与边距折叠（可以对父元素使用overflow:hidden避免边距折叠）

### CSS排版｜Flex排版
1. Flex排版（不存在文字排版，会先把文字放进盒）
  - 收集盒进行
  - 计算盒在主轴方向的排布
  - 计算盒在交叉轴方向的排布
2. 分行
  - 根据主轴尺寸，把元素分进行
  - 若设置了no-wrap，则强行分配进第一行
2. 计算主轴方向
  - 找出所有Flex元素
  - 把主轴方向的剩余尺寸按比例分配给这些元素
  - 若剩余空间为负数，则所有flex元素分配为0，等比压缩剩余元素
3. 计算交叉轴方向
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高flex-align和item-align确定元素具体位置

### CSS排版｜动画
1. animation执行时，元素的属性不会发生变化，但是computed属性会随着动画不断变化。
2. Animation
  - animation-name 名称
  - animation-duration 时长
  - animation-timing-function 时间曲线
  - animation-delay 延迟
  - animation-iteration-count 播放次数
  - animation-direction 方向
3. @keyframes
  - from大致相当于0%，to大致相当于100%
  - 可以使用transition而不是timing-function，这样使每次的function都不一样
4. transition
  - transition-property 要变换的属性
  - transition-duratoin
  - transition-timing-function
  - transition-delay

### CSS排版｜颜色
1. CMYK和RGB
2. HSL和HSV

### CSS排版｜绘制
1. 绘制
  - 几何图形
    - border
    - box-shadow
    - border-radius
  - 文字
    - font
    - text-decoration
  - 位图
    - background-image
    - img标签
  - 不建议用border-radius去拼一个五角星，属性应该用来干对应它本身定义的事。
2. 应用技巧
  - data rui + svg
  - data:image/svg+xml...

### 练习
  - 在CSS脑图上对CSS的属性进行分类，最好能分到layout和render的下一层
