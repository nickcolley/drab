import express from 'express'
import compression from 'compression'

import nunjucks from 'nunjucks'
import render from 'preact-render-to-string'

import Index from './pages/index.js'
import About from './pages/about.js'

const app = express()

nunjucks.configure('./', {
  autoescape: true,
  express: app
})

app.use(compression())

app.get('/', (request, response) => {
  const title = 'Home'
  const content = render(<Index />)

  response.render('index.html', { title, content })
})

app.get('/about', (request, response) => {
  const title = 'About'
  const content = render(<About />)

  response.render('index.html', { title, content })
})

app.use(express.static('./dist'))

const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
