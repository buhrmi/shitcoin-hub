import Vue from 'vue';
import ActionCable from 'actioncable'

export default async ({store, app}) => {
  const socket_url = process.env.SOCKET_URL || process.env.API_URL_BROWSER.replace('https', 'wss').replace('http', 'ws') + '/cable'
  const cable = ActionCable.createConsumer(socket_url)
  window.cable = cable
  
  // Reconnect if authorization changes
  store.watch(() => store.state.authorization, reconnect)
  reconnect()
  
  // GLOBAL SUBSCRIPTIONS
  cable.subscriptions.create('BalancesChannel', {
    received(data) {
      store.state.balances = data
    }
  })

  cable.subscriptions.create('GameChannel', {
    received(entity) {
      store.dispatch('updateEntity', entity)
    }
  })

  // TODO: change in Orders that are updated between page load and subscription setup are not synced
  // TODO: show toast when order updates
  cable.subscriptions.create('OrdersChannel', {
    received(order) {
      if (order.cancelled_at) {
        app.$toast.success("Order cancelled.")
        store.state.open_orders.delete(order)
      }
      else if (order.filled_at) {
        app.$toast.success("Order filled.")
        store.state.open_orders.delete(order)
      }
      else {
        if (order.quantity_filled > 0) {
          app.$toast.success("Order partially filled.")
        }
        else {
          app.$toast.show("Order submitted.")
        }
        store.state.open_orders.upsert(order)
      }
    }
  })

  // TODO: submit store.state.quote_id as parameter
  cable.subscriptions.create('TickerChannel', {
    received(data) {
      store.state.prices = Object.assign({}, store.state.prices, data)
    }
  })

  function reconnect() {
    cable.disconnect()
    cable.connect()
  }

  Vue.use(plugin, cable)
}

const plugin = {
  install(Vue, cable) {
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

