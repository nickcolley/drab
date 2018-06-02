const hydrate = require('./hydrate.js')

var dehydratedComponents = {
  TimerButton: require(`./components/TimerButton.js`)
}

hydrate(dehydratedComponents)
