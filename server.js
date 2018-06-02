const h = require('preact').h
const render = require('preact-render-to-string')

const express = require('express')
const nunjucks = require('nunjucks')

var app = express()

nunjucks.configure('./', {
  autoescape: true,
  express: app
})

app.get('/', function (request, response) {
  const title = 'Home'
  const content = render(
    h(require('./pages/index.js'))
  )

  response.render('index.html', { title, content })
})

app.get('/about', function (request, response) {
  const title = 'About'
  const content = render(
    h(require('./pages/about.js'))
  )

  response.render('index.html', { title, content })
})

app.use(express.static('./dist'))

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
