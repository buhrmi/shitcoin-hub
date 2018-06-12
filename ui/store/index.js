import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      user: null,
      authorization: null
    },
    actions: {
      async nuxtServerInit ({commit, dispatch, state}, {req}) {
        await dispatch('setAuthorizationToken', req.cookies.authorization)
      },

      async authorize({state, dispatch}, {email}) {
        // TODO: use different way of get an authorization string instead of just posting email address
        let authorizationToken = await this.$axios.$post('/authorizations', {email}, {withCredentials: true})
        await dispatch('setAuthorizationToken', 'Bearer ' + authorizationToken)
      },

      async logout({state, dispatch}) {
        await this.$axios.$delete('/authorization', {withCredentials: true})
        await dispatch('setAuthorizationToken', null)
      },

      async setAuthorizationToken({state, dispatch}, authorization) {
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
  