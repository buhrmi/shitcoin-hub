<template lang="pug">
  .page
    .wrapper
      .redactor-styles.no-padding
        h1 Shitcoin World API
        p Shitcoin World provides some public API endpoints that might be of interest (or not).
        p The API base URL for all requests is <span class="code">{{ api_url }}</span>
        .container
          .item
            h2 <span class="code">/order_book/ticker</span>
            p Can be used to get price quotes for shitcoins
            h3 Example
            p Get price (in ETC) for token with the contract address `0x123456` on Ethereum Classic:
            pre curl https://api.shitcoinworld.com/order_book/ticker?address=0x123456&amp;platform_id=61
            h3 Response
            pre
              | {
              |   "13": "4.1156", // 13 is the internal ID of the shitcoin. 4.1156 is the price
              |   "11": "1.5115",
              |   ...
              | }
            p
          
          .item
            h2 <span class="code">/shitcoins</span>
            p Get a list of all shitcoins and their internal IDs
            h3 Example
            pre curl https://api.shitcoinworld.com/shitcoins
            h3 Response
            pre
              | [
              |   {"id": "100", "name": "WubCoin", "symbol": "WUB", "address":"0xded90b4ed5131890809e4f6102d0a8c11a20a246", "platform_id": "1"},
              |   ...
              | ]
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [status] = await Promise.all [
      $axios.$get("/status"),
    ]
    return
      api_url: process.env.API_URL_BROWSER
      status: status
</script>

<style lang="scss">
.code {
  background: #eee;
  padding: 4px;
  border: 1px solid #ddd;
  font-family: 'Courier New', Courier, monospace;
}
</style>

