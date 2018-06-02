const Preact = require('preact')
const h = Preact.h

const TimerButton = require('../components/TimerButton.js')

module.exports = function () {
  return (
    h(
      'div',
      null,
      h('a', { href: '/about' }, 'about'),
      h(TimerButton, { label: 'Seconds' })
    )
  )
}
