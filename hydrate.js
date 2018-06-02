const Preact = require('preact')
const h = Preact.h
const render = Preact.render

const constants = require('./constants.js')
const attributeName = constants.attributeName

function hydrate (dehydratedComponents) {
  const $componentsToHydrate = document.querySelectorAll(`[data-${attributeName}]`)

  $componentsToHydrate.forEach($component => {
    var dataset = $component.dataset
    var componentName = dataset[attributeName]
    var props = Object
      .keys(dataset)
      .filter(key => {
        return key.startsWith(attributeName)
      }).map(key => {
        return {
          [key.replace(attributeName, '').toLowerCase()]: dataset[key]
        }
      }).reduce((a, b) => {
        return Object.assign(a, b)
      }, {})
    var Component = dehydratedComponents[componentName]
    render(h(Component, props), $component.parentNode, $component)
  })
}

module.exports = hydrate
