import { h, render } from 'preact'

import { attributeName } from './constants.js'

function hydrate () {
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
    import(`./components/${componentName}.js`).then(Component => {
      render(h(Component.default, props), $component.parentNode, $component)
    })
  })
}

export default hydrate
