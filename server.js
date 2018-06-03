import fs from 'fs'
import { promisify } from 'util'

import render from 'preact-render-to-string'
import express from 'express'
import nunjucks from 'nunjucks'

import Index from './pages/index.js'
import About from './pages/about.js'

const readdir = promisify(fs.readdir)

const app = express()

nunjucks.configure('./', {
  autoescape: true,
  express: app
})

const setPagesRoutes = async () => {
  try {
    const pageFiles = await readdir('./pages')
    const availablePages = pageFiles.map(file => { return file.replace('.js', '') })
    app.get(`/:page?`, async (request, response) => {
      const page = request.params.page || 'index'
      if (!availablePages.includes(page)) {
        return;
      }
      const title = page
      const Page = await import(`./pages/${page}.js`)
      const content = render(<Page.default />)
      response.render('index.html', { title, content })
    })
  } catch (error) {
    console.log(error)
  }
}

setPagesRoutes()

app.use(express.static('./dist'))

const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
