'use strict'

const resolve = require('path').resolve

module.exports = {
  router: {
    middleware: 'check-auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Meeting Planner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meeting Planner For Next Gen' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Add axios and element-ui globally
  */
  build: {
    vendor: ['axios', 'element-ui']
  },
  /*
  ** Plugins to run before each component renders
  */
  plugins: ['~plugins/axios', '~plugins/element-ui'],
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css', 'element-ui/lib/theme-default/index.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#13CE66' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources')
}
