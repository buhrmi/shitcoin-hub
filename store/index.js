import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      locale: 'en',
      quote_id: null,
      quote_shitcoin: null,
      available_locales: ['en', 'ja'],
      translations: {},
      eth_address: null,
      user: null,
      authorization: null,
      accepted_terms_on: null,
      showSignup: false,
      balances: {},
      open_orders: [],
      prices: {},
      status: {},
      platforms: {},
      addresses: {},
      hodler: null
    },
    getters: {
      balance(state) {
        return state.balances[state.quote_id] ? state.balances[state.quote_id].available : 0
      }
    },
    actions: {
      async nuxtServerInit ({state, dispatch}, {req}) {
        if (req.cookies.accepted_terms_on) state.accepted_terms_on = req.cookies.accepted_terms_on
        let locale = (req.cookies.locale || req.headers['accept-language'] || 'en').substr(0, 2)
        if (!state.available_locales.includes(locale)) locale = 'en'
        await dispatch('setLocale', {locale})
        if (req.cookies.authorization) {
          await dispatch('setAuthorization', 'Bearer ' + req.cookies.authorization)
        }
        if (req.cookies.hodler) {
          state.hodler = await this.$axios.$get('/hodlers/'+req.cookies.hodler)
        }
        state.platforms = await this.$axios.$get('/platforms')
        state.status = await this.$axios.$get('/status')
        state.platforms.map((p) => {
          if (p.default) state.quote_id = p.native_shitcoin_id
        })
        state.prices = await this.$axios.$get('/order_book/ticker?quote_id=' + state.quote_id)
        state.quote_shitcoin = await this.$axios.$get('/shitcoins/'+state.quote_id)
      },

      async authorize_with_password({dispatch, state}, data) {
        // TODO: use different way of get an authorization string instead of just posting email address
        let authorizationToken = await this.$axios.$post('/authorization', data, {withCredentials: true})
        await dispatch('setAuthorization', 'Bearer ' + authorizationToken)
        state.showSignup = false
      },

      async authorize_with_telegram() {
        let bot_id = process.env.TELEGRAM_BOT_ID
        let scope = ['email'] // require nothing... #['personal_details']
        let public_key = process.env.TELEGRAM_PUBLIC_KEY
        let payload = '123'
        Telegram.Passport.auth({bot_id, scope, public_key, payload})
      },

      async authorize_with_web3({state, dispatch}) {
        web3.personal.sign(web3.fromUtf8('shitcoin world'), state.eth_address, async (err, signature) => {
          let authorizationToken = await this.$axios.$post('/authorization', {signature}, {withCredentials: true})
          dispatch('setAuthorization', 'Bearer ' + authorizationToken)
        })
      },

      async playWithHodler({state}, hodlerId) {
        state.hodler = await this.$axios.$get('/hodlers/' + hodlerId)
        document.cookie = "hodler="+hodlerId+";path=/" + process.VUE_ENV == "production" ? ';domain=.shitcoinworld.com' : ''
        this.app.router.push('/game')
      },

      async acceptTerms({state}) {
        state.accepted_terms_on = new Date().toUTCString()
        document.cookie = "accepted_terms_on="+new Date().toUTCString()
      },

      async setLocale({state, dispatch}, {locale}) {
        state.locale = locale
        if (process.env.VUE_ENV == 'client') document.cookie = "locale=" + locale
        state.translations = await this.$axios.$get('/locales/' + locale)
      },

      async logout({state, dispatch}) {
        await this.$axios.$delete('/authorization', {withCredentials: true})
        await dispatch('setAuthorization', null)
      },

      async receiveBalance(store, data) {
        store.state.balances = data
      },

      async setAuthorization({state, dispatch}, authorization) {
        state.authorization = authorization
        this.$axios.setToken(authorization)
        if (authorization) {
          state.user = await this.$axios.$get('/me')
          state.balances = await this.$axios.$get('/balances')
          state.addresses = await this.$axios.$get('/addresses')
          state.open_orders = await this.$axios.$get('/orders') // TODO: create a vuex plugin that syncs automatically
        }
        else {
          state.user = null
        }
      }
    }
  })
}
  