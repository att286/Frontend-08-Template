/**
// 基础实现
setInterval(() => { }, 16)
// 更优
let tick = () => {
  setTimeout(() => { }, 16)
}
// 推荐
let tick = () => {
  let handler = requestAnimationFrame(tick)
  // cancelAnimationFrame(handler)
}
/**/
const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('start-time')
const PAUSE_START = Symbol('pause-start')
const PAUSE_TIME = Symbol('pause-time')

export class TimeLine {
  constructor() {
    this.state = 'inited'
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
  }
  start() {
    if (this.state !== 'inited')
      return
    this.state = 'started'
    let startTime = Date.now()
    this[PAUSE_TIME] = 0
    this[TICK] = () => {
      let now = Date.now()
      for (let animation of this[ANIMATIONS]) {
        let t
        if (this[START_TIME].get(animation) < startTime)
          t = now - startTime - this[PAUSE_TIME]
        else
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME]
        t -= animation.delay

        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }

        if (t > 0)
          animation.reviceTime(t)
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }
  // get rate() { }
  // set rate() { }
  pause() {
    if (this.state !== 'started')
      return
    this.state = 'paused'
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  resume() {
    if (this.state !== 'paused')
      return
    this.state = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }
  reset() {
    this.pause()
    this.state = 'inited'
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
  }
  add(animation, startTime) {
    startTime = startTime || Date.now()
    this[ANIMATIONS].add(animation)
    this[START_TIME].set(animation, startTime)
    this[PAUSE_START] = 0
    this[PAUSE_TIME] = 0
    this[TICK_HANDLER] = null
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction || (v => v)
    this.template = template || (v => v)
  }
  reviceTime(time) {
    let range = this.endValue - this.startValue
    let progress = this.timingFunction(time / this.duration)
    this.object[this.property] = this.template(this.startValue + range * progress)
  }
}