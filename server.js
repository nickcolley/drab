import fs from 'fs'
import { promisify } from 'util'

import posthtml from 'posthtml';
import beautify from 'posthtml-beautify';

import render from 'preact-render-to-string'
import express from 'express'

import Template from './pages/template.js'

const NODE_ENV = process.env.NODE_ENV || 'development'

const readdir = promisify(fs.readdir)
const readfile = promisify(fs.readFile)

const app = express()

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
      const template = render(
        <Template title={title}>
          <Page.default />
        </Template>
      )
      let html = '<!DOCTYPE html>' + template
      if (NODE_ENV === 'development') {
        const beautifyOptions = {
          rules :{
            blankLines: false
          }
        }
        const processedHtml = await posthtml().use(beautify(beautifyOptions)).process(html)
        html = processedHtml.html
      }
      response.send(html)
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
