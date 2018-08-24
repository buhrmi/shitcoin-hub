require('dotenv').config()

module.exports = {
  serverMiddleware: [require('cookie-parser')()],
  plugins: [
    // Sets "state.authorization" as axios token
    '~/plugins/components.js',
    '~/plugins/axios.js',
    '~/plugins/filters.js',
    '~/plugins/monkey_patches.js',
    '~/plugins/web3.js',
    '~/plugins/i18n.js',
    {src: '~/plugins/actioncable.js', ssr: false}
    // { src: '~/plugins/pusher.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/font-awesome',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],
  css: [
    '~/assets/styles/poo.scss'
  ],
  build: {
    vendor: [
      '~/vendor/imperavi/redactor.min.css',
      '~/vendor/imperavi/redactor.min.js',
      '~/vendor/imperavi/imagemanager.min.js',

      // https://github.com/TelegramMessenger/TGPassportJsSDK/blob/master/telegram-passport.js
      '~/vendor/telegram-passport.js',
    ],
  },
  head: {
    title: 'Shitcoin World',    
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Help! The dark Sodler is spreading FUD in Shitcoin World. Can you help your Poo become the greatest Hodler of all time and defeat the army of FUD once and for all?" }
    ],
    script: [
      // {src: 'https://js.pusher.com/4.1/pusher.min.js'},
      // {src: 'https://connect.trezor.io/4/connect.js'},
      // {src: 'https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js'},
      // {src: 'https://cdn.ckeditor.com/ckeditor5/10.0.1/classic/ckeditor.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
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
    API_URL_BROWSER: process.env.API_URL_BROWSER,
    TELEGRAM_BOT_ID: process.env.TELEGRAM_BOT_ID,
    TELEGRAM_PUBLIC_KEY: (process.env.TELEGRAM_PUBLIC_KEY || '').replace(/\\n/g,'\n')
  }
}