import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      locale: 'en',
      available_locales: ['en', 'ja'],
      translations: {},
      eth_address: null,
      user: null,
      authorization: null
    },
    actions: {
      async nuxtServerInit ({state, dispatch}, {req}) {
        let locale = (req.cookies.locale || req.headers['accept-language'] || 'en').substr(0, 2)
        if (!state.available_locales.includes(locale)) locale = 'en'
        await dispatch('setLocale', {locale})
        await dispatch('setAuthorization', 'Bearer ' + req.cookies.authorization)
      },

      async authorize_with_password({dispatch}, data) {
        // TODO: use different way of get an authorization string instead of just posting email address
        let authorizationToken = await this.$axios.$post('/authorization', data, {withCredentials: true})
        await dispatch('setAuthorization', 'Bearer ' + authorizationToken)
      },

      async authorize_with_web3({state, dispatch}) {
        // TODO: use different way of get an authorization string instead of just posting email address
        web3.personal.sign(web3.fromUtf8('shitcoin hub'), state.eth_address, async (err, signature) => {
          let authorizationToken = await this.$axios.$post('/authorization', {signature}, {withCredentials: true})
          dispatch('setAuthorization', 'Bearer ' + authorizationToken)
        })
      },

      async setLocale({state, dispatch}, {locale}) {
        state.locale = locale
        if (process.env.VUE_ENV == 'client') document.cookie = "locale=" + locale
        console.log(locale)
        // TODO: load translations from somewhere
        state.translations = {
          'welcome': "Welcome to Shitcoin Hub"
        }
      },

      async logout({state, dispatch}) {
        await this.$axios.$delete('/authorization', {withCredentials: true})
        await dispatch('setAuthorization', null)
      },

      async setAuthorization({state, dispatch}, authorization) {
        state.authorization = authorization
        this.$axios.setToken(authorization)
        
        if (authorization) {
          state.user = await this.$axios.$get('/me')
        }
        else {
          state.user = null
        }
      }
    }
  })
}
  