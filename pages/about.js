const Preact = require('preact')
const h = Preact.h

const TimerButton = require('../components/TimerButton.js')

module.exports = function () {
  return (
    h(
      'div',
      null,
      h('a', { href: '/' }, 'home'),
      h(TimerButton, { label: 'test', randomProp: Math.random() }),
      h(TimerButton, { label: 'test-two' })
    )
  )
}
