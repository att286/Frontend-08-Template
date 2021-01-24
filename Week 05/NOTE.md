# 学习笔记

## 知识点
### range对象
是一种fragment(HTML片断)，它包含了节点或文本节点的一部分。一般情况下，同一时刻页面中只可能有一个range，也有可能是多个range（使用Ctrl健进行多选，不过有的浏览器不允许，例如Chrome）。
可以从selection中获得range对象，也可以使用document.createRange()方法获得
1. getSelection(): 获取页面选中的信息;
2. selection.rangeCount: 区间数，选中几个内容;
3. selection.getRangeAt(i): 获取Selection对象中的某个Range对象;
4. createRange(): 创建range对象;
5. setStart(): 将某个节点中的某个位置指定为Range对象所代表区域的起点位置。
6. setEnd(): 将某个节点中的某处位置指定为Range对象所代表区域的结束位置。
