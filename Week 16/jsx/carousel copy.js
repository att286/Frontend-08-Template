import { Component } from './framework.js'
import { enableGesture } from './gesture/gesture.js'
import { TimeLine, Animation } from './animation.js'
import { ease } from './ease.js'

export class Carousel extends Component {
  constructor(type) {
    super()
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
    this.attributes[name] = value
  }
  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    for (let record of this.attributes.src) {
      let child = document.createElement('div')
      child.style.backgroundImage = `url('${record}')`
      this.root.appendChild(child)
    }

    enableGesture(this.root)
    let timeline = new TimeLine
    timeline.start()

    let children = this.root.children

    let handler = null
    let position = 0
    let aniStartTime = 0
    let aniMovedX = 0
    let width = 500
    let duration = 1500
    let delay = 0

    this.root.addEventListener('start', () => {
      timeline.pause()
      clearInterval(handler)
      let progress = (Date.now() - aniStartTime) / duration
      aniMovedX = ease(progress) * width - width
    })

    this.root.addEventListener('panMove', (event) => {
      let x = event.clientX - event.startX - aniMovedX
      let current = position - ((x - x % width) / width)

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length//?
        children[pos].style.transition = 'none'
        children[pos].style.transform = `translateX(${-pos * width + offset * width + x % width}px)`
      }
    })

    this.root.addEventListener('end', (event) => {
      timeline.reset()
      timeline.start()
      handler = setInterval(nextPicture, 3000)

      let x = event.clientX - event.startX - aniMovedX
      let current = position - ((x - x % width) / width)

      let direction = Math.round((x % width) / width)

      if (event.isFlick) {
        if (event.velocity < 0) {
          direction = Math.ceil((x % width) / width)
        } else {
          direction = Math.floor((x % width) / width)
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length
        children[pos].style.transition = 'none'
        timeline.add(new Animation(children[pos].style, 'transform',
          -pos * width + offset * width + x % width,
          -pos * width + offset * width + direction * width,
          duration, delay, ease, v => `translateX(${v}px)`))
      }

      position = position - ((x - x % width) / width) - direction// * width
      position = (position % children.length + children.length) % children.length
    })

    let nextPicture = () => {
      let children = this.root.children
      let nextIndex = (position + 1) % children.length

      let current = children[position]
      let next = children[nextIndex]

      aniStartTime = Date.now()

      timeline.add(new Animation(current.style, 'transform', -position * width, -width - position * width, duration, delay, ease, v => `translateX(${v}px)`))
      timeline.add(new Animation(next.style, 'transform', width - nextIndex * width, -nextIndex * width, duration, delay, ease, v => `translateX(${v}px)`))

      position = nextIndex
    }
    handler = setInterval(nextPicture, 3000)


    /*拖拽版本*
    this.root.addEventListener('mousedown', event => {
      let children = this.root.children
      let startX = event.clientX

      let move = event => {
        let x = event.clientX - startX
        let current = position - Math.round((x - x % width) / width)

        for (let offset of [-1, 0, 1]) {
          let pos = current + offset
          pos = (pos + children.length) % children.length//?
          children[pos].style.transition = 'none'
          children[pos].style.transform = `translateX(${-pos * width + offset * width + x % width}px)`
        }
      }

      let up = event => {
        let x = event.clientX - startX
        position = position - Math.round(x / width)

        for (let offset of [0, -Math.sign(Math.round(x / width) - x + width / 2 * Math.sign(x))]) {
          let pos = position + offset
          pos = (pos + children.length) % children.length
          children[pos].style.transition = ''
          children[pos].style.transform = `translateX(${-pos * width + offset * width}px)`
        }

        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
    /**/

    /*不完美版本*
    let current = 0
    setInterval(() => {
      let children = this.root.children
      ++current
      current = current % children.length
      for (let child of children) {
        child.style.transform = `translateX(-${100 * current}%)`
      }
    }, 3000)
    /**/

    /*完美版本*
    let currentIndex = 0
    setInterval(() => {
      let children = this.root.children
      let nextIndex = (currentIndex + 1) % children.length

      let current = children[currentIndex]
      let next = children[nextIndex]

      next.style.transition = 'none'
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`

      setTimeout(() => {
        next.style.transition = ''
        next.style.transform = `translateX(${- nextIndex * 100}%)`
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`

        currentIndex = nextIndex
      }, 16)//requestAnimationFrame
    }, 3000)
    /**/

    return this.root
  }
  mountTo(parent) {
    parent.appendChild(this.render())
  }
}
