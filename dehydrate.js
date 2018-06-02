const constants = require('./constants.js')
const attributeName = constants.attributeName

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
    if (key === 'children') {
      continue
    }
    var hydrateKey = `data-${attributeName}-${key}`
    hydrateProps[hydrateKey] = this.props[key]
  }
  return hydrateProps
}

function dehydrate (Component) {
  if (!isStateless(Component)) {
    override(Component.prototype, 'render', compose(function (render) {
      render.attributes = Object.assign(
        render.attributes,
        dehydrateAttributes.call(this, Component.name)
      )
      return render
    }))
  }
  return Component
}

module.exports = dehydrate
