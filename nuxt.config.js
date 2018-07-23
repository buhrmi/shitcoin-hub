require('dotenv').config()

module.exports = {
  serverMiddleware: [require('cookie-parser')()],
  plugins: [
    // Sets "state.authorization" as axios token
    '~/plugins/components.js',
    '~/plugins/auth.js',
    '~/plugins/filters.js',
    '~/plugins/monkey_patches.js',
    '~/plugins/web3.js',
    '~/plugins/i18n.js',
    // { src: '~/plugins/pusher.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/font-awesome',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],
  build: {
    vendor: [
      '~/vendor/imperavi/redactor.min.css',
      '~/vendor/imperavi/redactor.min.js',
      '~/vendor/imperavi/imagemanager.min.js',
    ],
  },
  head: {
    title: 'Shitcoin Hub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "The social shilling platform" }
    ],
    script: [
      // {src: 'https://js.pusher.com/4.1/pusher.min.js'},
      // {src: 'https://connect.trezor.io/4/connect.js'},
      // {src: 'https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js'},
      {src: 'https://cdn.ckeditor.com/ckeditor5/10.0.1/classic/ckeditor.js'}
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans' }
    ]
  },
  axios: {
    credentials: true,
    baseURL: 'http://localhost:9292' // this is being overwritten by API_URL and API_URL_BROWSER env vars
  },
  toast: {
    position: 'top-center',
    iconPack : 'fontawesome'
  },
  env: {

  }
}