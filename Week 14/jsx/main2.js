/**
 * 简单轮播 - 不完美版
 */

import { Component, createElement } from './framework.js'

class Carousel extends Component {
  constructor(type) {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (let record of this.attributes.src) {
      // let child = document.createElement('img');
      // child.src = record;
      let child = document.createElement('div');
      child.style.backgroundImage = `url('${record}')`;
      // child.style.display = 'none';
      this.root.appendChild(child);
    }

    // 不完美轮播
    let current = 0;
    setInterval(() => {
      let children = this.root.children;
      ++current;
      current = current % children.length;
      for (let child of children) {
        child.style.transform = `translateX(-${100 * current}%)`;
      }
    }, 3000)

    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'
]

let a = <Carousel src={d} />

a.mountTo(document.body);
