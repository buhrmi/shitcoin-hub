import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      eth_address: null,
      user: null,
      authorization: null
    },
    actions: {
      async nuxtServerInit ({commit, dispatch, state}, {req}) {
        await dispatch('setAuthorization', 'Bearer ' + req.cookies.authorization)
      },

      async authorize_with_email({state, dispatch}, {email}) {
        // TODO: use different way of get an authorization string instead of just posting email address
        let authorizationToken = await this.$axios.$post('/authorizations', {email}, {withCredentials: true})
        await dispatch('setAuthorization', 'Bearer ' + authorizationToken)
      },

      async authorize_with_web3({state, dispatch}) {
        // TODO: use different way of get an authorization string instead of just posting email address
        web3.personal.sign(web3.fromUtf8('shitcoin hub'), state.eth_address, async (err, signature) => {
          let authorizationToken = await this.$axios.$post('/authorizations', {signature}, {withCredentials: true})
          dispatch('setAuthorization', 'Bearer ' + authorizationToken)
        })
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
  