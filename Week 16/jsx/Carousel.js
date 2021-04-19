import { Component, STATE, ATTRIBUTE } from './framework.js'
import { enableGesture } from './gesture/gesture.js'
import { TimeLine, Animation } from './animation.js'
import { ease } from './ease.js'

export { STATE, ATTRIBUTE } from './framework.js'

export class Carousel extends Component {
  constructor(type) {
    super()
  }
  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    for (let record of this[ATTRIBUTE].src) {
      let child = document.createElement('div')
      child.style.backgroundImage = `url('${record.img}')`
      this.root.appendChild(child)
    }

    enableGesture(this.root)
    let timeline = new TimeLine
    timeline.start()

    let children = this.root.children

    let handler = null
    this[STATE].position = 0
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

    this.root.addEventListener('tap', () => {
      this.triggerEvent('click', { position: this[STATE].position, data: this[ATTRIBUTE].src[this[STATE].position] })
    })

    this.root.addEventListener('panMove', (event) => {
      let x = event.clientX - event.startX - aniMovedX
      let current = this[STATE].position - ((x - x % width) / width)

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
      let current = this[STATE].position - ((x - x % width) / width)

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

      this[STATE].position = this[STATE].position - ((x - x % width) / width) - direction// * width
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length
      this.triggerEvent('change', { position: this[STATE].position })
    })

    let nextPicture = () => {
      let children = this.root.children
      let nextPosition = (this[STATE].position + 1) % children.length

      let current = children[this[STATE].position]
      let next = children[nextPosition]

      aniStartTime = Date.now()

      timeline.add(new Animation(current.style, 'transform',
        -this[STATE].position * width,
        -width - this[STATE].position * width,
        duration, delay, ease, v => `translateX(${v}px)`))
      timeline.add(new Animation(next.style, 'transform', width - nextPosition * width, -nextPosition * width, duration, delay, ease, v => `translateX(${v}px)`))

      this[STATE].position = nextPosition
      this.triggerEvent('change', { position: this[STATE].position })
    }
    handler = setInterval(nextPicture, 3000)

    return this.root
  }
  mountTo(parent) {
    parent.appendChild(this.render())
  }
}
