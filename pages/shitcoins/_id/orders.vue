<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="base_shitcoin")
      p Available {{ base_shitcoin.name }}: {{ base_available }}
      p Available {{ quote_shitcoin.name }}: {{ quote_available }}
      h2 My Orders
      .order(v-for="order in orders")
        | {{ order }}
        .cancel(@click="cancelOrder(order.id)") Cancel
      form.new_order(@submit.prevent="submitOrder")
        .field
          label Quantity
          input(v-model="newOrder.quantity")
        .field
          label Price
          input(v-model="newOrder.rate")
        .field
          label Side
          select(v-model="newOrder.side")
            option(value="sell") Sell
            option(value="buy") Buy
        .field
          label Kind
          select(v-model="newOrder.kind")
            option(value="limit") Limit
            option(value="market") Market
        .field
          button Submit {{ newOrder.side }} {{ newOrder.kind }} Order
</template>

<script lang="coffee">
module.exports =
  computed:
    base_available: ->
      if @$store.state.balances[@base_shitcoin.id]
        @$store.state.balances[@base_shitcoin.id].available
      else
        0
    quote_available: ->
      if @$store.state.balances[@quote_shitcoin.id]
        @$store.state.balances[@quote_shitcoin.id].available
      else
        0
  subscriptions:
    # TODO: somehow subscribe to order notification globally, even if component is not shown.
    OrdersChannel:
      params: ->
        base_shitcoin_id: @base_shitcoin.id
      received: (order) ->
        if order.cancelled_at
          @orders.delete(order)
        else if order.filled_at
          @orders.delete(order)
        else
          @orders.upsert(order)
  asyncData: ({app: {$axios}, params, error, store}) ->
    [base_shitcoin, quote_shitcoin, orders] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get("/shitcoins/9"), # ETC
      $axios.$get('/orders', params: {base_shitcoin_id: params.id})
    ]

    return
      newOrder:
        base_shitcoin_id: base_shitcoin.id
        quote_shitcoin_id: quote_shitcoin.id
        rate: null
        quantity: null
        side: 'sell'
        kind: 'limit'
      orders: orders
      quote_shitcoin: quote_shitcoin
      base_shitcoin: base_shitcoin
   methods:
     cancelOrder: (id) ->
       this.$axios.$delete('/orders/'+id)
     submitOrder: ->
       this.$axios.$post('/orders', order: this.newOrder)
       

</script>
