<template lang="pug">
  .page
    .wrapper
      .redactor-styles.no-padding
        h1 Shitcoin Maker™
        form(:action="createUrl")
          table.form
            tbody
              tr
                th.field Name
                td.input
                  input(name="name" v-model="newCoin.name")
              tr
                th.field Symbol
                td.input
                  input(name="symbol" v-model="newCoin.symbol")
              tr
                th.field Decimals
                td.input
                  input(name="decimals" v-model="newCoin.decimals")
              tr
                th.field Total (Max) Supply
                td.input
                  input(name="initial_supply" v-model="newCoin.initialSupply")
          button Download Contract
          p 
            | After downloading, open the file in  
            a(target="_blank" href="http://remix.ethereum.org/") Remix
            |  to deploy the contract to the network.

</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [status] = await Promise.all [
      $axios.$get("/status"),
    ]
    return
      api_url: process.env.API_URL_BROWSER
      newCoin:
        symbol: 'MT'
        name: 'My Token'
        decimals: '8'
        initialSupply: '10000000'
        mintable: false
        has_cap: false
        maxSupply: '10000000'
  computed:
    createUrl: ->
      process.env.API_URL_BROWSER + '/shitcoins/contract'
  head: ->
    title: "Shitcoin Maker™"
    meta: [
      { hid: 'og:description', property: 'og:description', content: "Create your own Shitcoin with the patent-pending Shitcoin Maker™!" }
    ]
      
</script>

<style lang="scss">
.code {
  background: #eee;
  padding: 4px;
  border: 1px solid #ddd;
  font-family: 'Courier New', Courier, monospace;
}
</style>

