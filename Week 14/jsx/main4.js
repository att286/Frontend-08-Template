/**
 * 拖拽轮播 - 不完美版
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

    // 不完美拖拽
    let position = 0;
    let width = 500;

    this.root.addEventListener('mousedown', event => {
      let children = this.root.children;
      let startX = event.clientX;

      let move = event => {
        let x = event.clientX - startX;
        for (let child of children) {
          child.style.transition = 'nonde';
          child.style.transform = `translateX(${-position * width + x}px)`;
        }
      }

      let up = event => {
        let x = event.clientX - startX;
        position = position - Math.round(x / width);
        for (let child of children) {
          child.style.transition = '';
          child.style.transform = `translateX(${-position * width}px)`;
        }
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      }

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    })

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
