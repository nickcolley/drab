import { attributeName } from './constants.js'

// http://me.dt.in.th/page/JavaScript-override/
function override (object, methodName, callback) {
  object[methodName] = callback(object[methodName])
}

// http://me.dt.in.th/page/JavaScript-override/
function compose (extraBehavior) {
  return function (original) {
    return function () {
      return extraBehavior.call(this, original.apply(this, arguments))
    }
  }
}

function isStateless (Component) {
  return !Component.prototype.render
}

function dehydrateAttributes () {
  var hydrateName = this.constructor.name
  var hydrateProps = {
    [`data-${attributeName}`]: hydrateName
  }
  for (var key in this.props) {
    var value = this.props[key]
    if (typeof value === 'undefined') {
      continue
    }
    var hydrateKey = `data-${attributeName}-${key}`
    if (typeof value === 'object' && typeof value[0] === 'object') {
      value = encodeURI(JSON.stringify(value))
    }
    hydrateProps[hydrateKey] = value
  }
  return hydrateProps
}

function dehydrate (Component) {
  if (typeof DISABLE_DEHYDRATOR === 'undefined') {
    if (!isStateless(Component)) {
      override(Component.prototype, 'render', compose(function (render) {
        render.attributes = Object.assign(
          render.attributes,
          dehydrateAttributes.call(this, Component.name)
        )
        return render
      }))
    }
  }
  return Component
}

export default dehydrate
