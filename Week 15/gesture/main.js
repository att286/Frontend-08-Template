import { enableGesture } from './gesture.js'
enableGesture(document.documentElement)
document.documentElement.addEventListener('tap', () => {
  console.log('tap event trigger!')
})
