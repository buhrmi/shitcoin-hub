<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="base_shitcoin" :price="book.price" active="trade")
      p(v-if="$store.state.quote_id == base_shitcoin.id") Please select another shitcoin to trade.
      .container(v-else)
        .card.padded
          .side.bids
            h2 Bids
            table
              tbody
                tr
                  th Rate
                  th Quantity
                tr.bid(v-for="bid in book.bids") 
                  td {{ bid.rate }}
                  td {{ bid.quantity }}
          .side.bids
            h2 Asks
            table.side
              tbody
                tr
                  th Rate
                  th Quantity
                tr.bid(v-for="ask in book.asks") 
                  td {{ ask.rate }}
                  td {{ ask.quantity }}
        .card.padded
          h2 New Order
          form(@submit.prevent="submitOrder")
            table.form
              tbody
                tr
                  td 
                  td You have {{ base_available }} {{ base_shitcoin.symbol }} available
                tr
                  td
                  td
                    select(v-model="newOrder.kind")
                      option(value="limit") Limit
                      option(value="market") Market
                tr
                  td
                    label Quantity
                  td 
                    input(v-model="newOrder.quantity")
                tr
                  td
                    label Price
                  td
                    input(v-model="newOrder.rate")
                tr
                  td
                  td
                    button(@click="newOrder.side = 'buy'" :disabled="!canBuy") BUY
                    button(@click="newOrder.side = 'sell'" :disabled="!canSell") SELL
                    p(v-if="!$store.state.user") Log in to trade
        .card.my_orders.padded
          h2 My active Orders
          table.orders
            thead
              tr
                th Created at
                th Type
                th Quantity
                th Rate
                th Filled
                th 
            tbody
              tr.order(v-for="order in open_orders")
                td {{ order.created_at }}
                td {{ order.side }} at {{ order.kind }}
                td {{ order.quantity }}
                td {{ order.rate }}
                td {{ order.quantity_filled }}
                td
                  button(@click="cancelOrder(order.id)") Cancel
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
      if @$store.state.balances[@$store.state.quote_id]
        @$store.state.balances[@$store.state.quote_id].available
      else
        0
    canBuy: ->
      @$store.state.user && @newOrder.kind == 'limit'
    canSell: ->
      @$store.state.user
    open_orders: ->
      @$store.state.open_orders.filter((order) => order.base_shitcoin_id == @base_shitcoin.id)
  subscriptions:
    OrderbookChannel:
      params: ->
        base_id: @base_shitcoin.id
        quote_id: @$store.state.quote_id
      received: (book) ->
        @book = book
  asyncData: ({app: {$axios}, params, error, store}) ->
    base_id = params.id
    [base_shitcoin, book] = await Promise.all [
      $axios.$get("/shitcoins/#{base_id}"),
      
      $axios.$get('/order_book/depth', params: {base: base_id, quote: store.state.quote_id})
    ]

    return
      newOrder:
        base_shitcoin_id: base_shitcoin.id
        rate: null
        quantity: null
        side: 'sell'
        kind: 'limit'
      book: book
      base_shitcoin: base_shitcoin
  methods:
    cancelOrder: (id) ->
      this.$axios.$delete('/orders/'+id)
    submitOrder: ->
      this.newOrder.quote_shitcoin_id = this.$store.state.quote_id
      this.$axios.$post('/orders', order: this.newOrder)
  head: ->
    title:
      "#{this.base_shitcoin.name} | Shitcoin World"
    meta: [
      { hid: 'og:image', property: 'og:image', content: this.base_shitcoin.logo_url },
      { hid: 'og:description', property: 'og:description', content: "Rating: #{Array(this.base_shitcoin.cached_rating).join '⭐'}. Trade your #{this.base_shitcoin.name} on Shitcoin World and get amazing rewards." }
    ]    

</script>

<style lang="scss">
.card.my_orders {
  flex-basis: 100%;
}
.side {
  width: 50%;
  display: inline-block;
  vertical-align: top;
}
</style>
