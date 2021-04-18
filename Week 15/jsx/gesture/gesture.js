let element = document.documentElement//代表html元素

//事件派发
export class Dispatcher {
  constructor(element) {
    this.element = element
  }
  dispatch(type, properties) {
    // let event = new CustomEvent(type, {})
    let event = new Event(type)
    // console.log(event)
    for (let name in properties) {
      event[name] = properties[name]
    }
    this.element.dispatchEvent(event)
  }
}

//listen => recognize => dispatch

//new Listener(new Recognizer(dispatch))

export class Listener {
  constructor(element, recognizer) {
    let contexts = new Map()

    let isListeningMouse = false

    //鼠标事件监听
    element.addEventListener('mousedown', event => {
      // console.log('mousedown button', event.button)
      let context = Object.create(null)
      contexts.set('mouse' + (1 << event.button), context)

      recognizer.start(event, context)

      let mousemove = event => {
        let button = 1
        while (button <= event.buttons) {
          if (button & event.buttons) {
            //order of buttons & button property is not same
            let key
            if (button === 2)
              key = 4
            else if (button === 4)
              key = 2
            else
              key = button
            let context = contexts.get('mouse' + key)
            recognizer.move(event, context)
          }
          button = button << 1
        }
      }

      let mouseup = event => {
        let context = contexts.get('mouse' + (1 << event.button))
        recognizer.end(event, context)
        contexts.delete('mouse' + (1 << event.button))

        if (event.buttons === 0) {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
          isListeningMouse = false
        }
      }

      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        isListeningMouse = true
      }
    })

    //触摸事件监听
    element.addEventListener('touchstart', event => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        recognizer.start(touch, context)
      }
    })

    element.addEventListener('touchmove', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.move(touch, context)
      }
    })

    element.addEventListener('touchend', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.end(touch, context)
        contexts.delete(touch.identifier)
      }
    })

    element.addEventListener('touchcancel', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.cancel(touch, context)
        contexts.delete(touch.identifier)
      }
    })
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }
  //事件封装
  start(point, context) {
    // console.log('start', point.clientX, point.clientY)
    context.startX = point.clientX, context.startY = point.clientY
    context.points = [{ t: Date.now(), x: point.clientX, y: point.clientY }]

    context.isTap = true
    context.isPan = false
    context.isPress = false

    context.handler = setTimeout(() => {
      context.isTap = false
      context.isPan = false
      context.isPress = true
      context.handler = null
      this.dispatcher.dispatch('press', {})
    }, 500)
  }

  move(point, context) {
    // console.log('move', point.clientX, point.clientY, point.buttons)
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY
    let d = dx ** 2 + dy ** 2
    if (!context.isPan && d > 100) {
      context.isTap = false
      context.isPan = true
      context.isPress = false
      context.isVertical = Math.abs(dx) < Math.abs(dy) //dx ** 2 < dy ** 2
      this.dispatcher.dispatch('panStart', {
        startX: context.startX, startY: context.startY, clientX: point.clientX, clientY: point.clientY,
        isVertical: context.isVertical
      })
      clearTimeout(context.handler)
    }
    if (context.isPan) {
      this.dispatcher.dispatch('panMove', {
        startX: context.startX, startY: context.startY, clientX: point.clientX, clientY: point.clientY,
        isVertical: context.isVertical
      })
    }

    context.points = context.points.filter(point => Date.now() - point.t < 500)
    context.points.push([{ t: Date.now(), x: point.clientX, y: point.clientY }])
  }

  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch('tap', {})
      clearTimeout(context.handler)
    } else if (context.isPan) {
      context.points = context.points.filter(point => Date.now() - point.t < 500)
      let d, v = 0
      if (context.points.length) {
        d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2)
        v = d / (Date.now() - context.points[0].t)
      }

      if (v > 1.5) {
        context.isFlick = true
        this.dispatcher.dispatch('flick', {
          startX: context.startX, startY: context.startY, clientX: point.clientX, clientY: point.clientY,
          isVertical: context.isVertical, isFlick: context.isFlick, velocity: v
        })
      } else {
        context.isFlick = false
      }
      // console.log('pan speed ', v)

      this.dispatcher.dispatch('panEnd', {
        startX: context.startX, startY: context.startY, clientX: point.clientX, clientY: point.clientY,
        isVertical: context.isVertical, isFlick: context.isFlick, velocity: v
      })
    } else if (context.isPress) {
      this.dispatcher.dispatch('pressEnd', {})
    }
    // console.log('end', point.clientX, point.clientY)
  }

  cancel(point, context) {
    clearTimeout(context.handler)
    spatch('cancel', {})
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)))
}