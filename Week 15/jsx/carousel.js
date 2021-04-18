import { Component } from './framework.js'

export class Carousel extends Component {
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

    let position = 0;
    let width = 500;

    this.root.addEventListener('mousedown', event => {
      let children = this.root.children;
      let startX = event.clientX;

      let move = event => {
        let x = event.clientX - startX;
        let current = position - Math.round((x - x % width) / width);

        for (let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length;//?
          children[pos].style.transition = 'none';
          children[pos].style.transform = `translateX(${-pos * width + offset * width + x % width}px)`;
        }
      }

      let up = event => {
        let x = event.clientX - startX;
        position = position - Math.round(x / width);

        for (let offset of [0, -Math.sign(Math.round(x / width) - x + width / 2 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = '';
          children[pos].style.transform = `translateX(${-pos * width + offset * width}px)`;
        }

        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      }

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    })

    /** 不完美版本
    let current = 0;
    setInterval(() => {
      let children = this.root.children;
      ++current;
      current = current % children.length;
      for (let child of children) {
        child.style.transform = `translateX(-${100 * current}%)`;
      }
    }, 3000)
    /**/

    /*完美版本*
    let currentIndex = 0;
    setInterval(() => {
      let children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length;

      let current = children[currentIndex];
      let next = children[nextIndex];

      next.style.transition = 'none';
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

      setTimeout(() => {
        next.style.transition = '';
        next.style.transform = `translateX(${- nextIndex * 100}%)`;
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;

        currentIndex = nextIndex;
      }, 16)//requestAnimationFrame
    }, 3000)
    /**/

    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}
