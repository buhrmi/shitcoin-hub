import Vue from 'vue';
import ActionCable from 'actioncable'

export default async ({store, app: { $axios }}) => {
  const socket_url = process.env.SOCKET_URL || process.env.API_URL_BROWSER.replace('https', 'wss').replace('http', 'ws') + '/cable'
  const cable = ActionCable.createConsumer(socket_url)
  window.cable = cable
  
  // Reconnect if authorization changes
  store.watch(() => store.state.authorization, reconnect)
  reconnect()
  
  cable.subscriptions.create('BalancesChannel', {
    received(data) {
      store.state.balances = data
    }
  })

  cable.subscriptions.create('TickerChannel', {
    received(data) {
      store.state.prices = Object.assign(store.state.price, data)
    }
  })

  function reconnect() {
    cable.disconnect()
    cable.connect()
  }  
}

const plugin = {
  install(Vue, options) {
    Vue.mixin({
      destroyed() {
        if (!this._subscriptions) return
        Object.keys(this._subscriptions).map((key) => {
          this._subscriptions[key].unsubscribe()
        })
      },
      mounted() {
        this.$cable = cable
        let subscriptionsOptions = this.$options.subscriptions
        if (!subscriptionsOptions) return
        this._subscriptions = {}
        if (typeof subscriptionsOptions == 'function') subscriptionsOptions = subscriptionsOptions()
        Object.keys(subscriptionsOptions).map((channelName) => {
          let subOptions = subscriptionsOptions[channelName]
          if (!subOptions.params) subOptions.params = {}
          let paramsFn = subOptions.params
          if (typeof paramsFn !== 'function') {
            paramsFn = function() { return subOptions.params }
          }
          this.$watch(paramsFn, function(params) {
            if (this._subscriptions[channelName]) this._subscriptions[channelName].unsubscribe()
            params.channel = channelName
            this._subscriptions[channelName] = this.$cable.subscriptions.create(params, {
              received: subOptions.received.bind(this)
            })
          }, {
            immediate: true
          })
        })
      }
    })
  }
}

Vue.use(plugin)