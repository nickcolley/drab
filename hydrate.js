import { h, render } from 'preact'

import { attributeName } from './constants.js'

function jsonParseIfJson (maybeJson) {
  try {
    return JSON.parse(decodeURI(maybeJson))
  } catch (error) {
    return maybeJson
  }
}

function hydrate () {
  const $componentsToHydrate = document.querySelectorAll(`[data-${attributeName}]`)

  $componentsToHydrate.forEach($component => {
    var dataset = $component.dataset
    var componentName = dataset[attributeName]
    var props = Object
      .keys(dataset)
      .filter(key => {
        // Filter out the root property
        if (key === attributeName) {
          return false
        }
        return key.startsWith(attributeName)
      }).map(key => {
        console.log(key, jsonParseIfJson(dataset[key]))
        return {
          [key.replace(attributeName, '').toLowerCase()]: jsonParseIfJson(dataset[key])
        }
      }).reduce((a, b) => {
        return Object.assign(a, b)
      }, {})
    import(/* webpackMode: "lazy-once" */ `./components/${componentName}.js`
    ).then(Component => {
      console.log(props)
      render(h(Component.default, props), $component.parentNode, $component)
    })
  })
}

export default hydrate
