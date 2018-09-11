<template lang="pug">
  .page
    .wrapper
      .redactor-styles.no-padding
        h1 Shitcoin Maker™
        p Shitcoin Maker will become the Shitcoin World ICO Platform
        form(:action="createUrl")
          table.form
            tbody
              tr.field
                th.label Name
                td.input
                  input(name="name" v-model="newCoin.name")
              tr.field
                th.label Symbol
                td.input
                  input(name="symbol" v-model="newCoin.symbol")
              tr.field
                th.label Decimals
                td.input
                  input(name="decimals" v-model="newCoin.decimals")
              tr.field
                th.label {{ newCoin.mintable ? 'Initial Supply' : 'Total (max) Supply'}}
                td.input
                  input(name="initial_supply" v-model="newCoin.initialSupply")
                  label
                    input(type="checkbox" name="mintable" v-model="newCoin.mintable")
                    |  Enable minting
                    
              tr.field(v-if="newCoin.mintable")
                th.label Max supply
                td.input
                  input(name="max_supply" v-model="newCoin.maxSupply")
              tr.field
                th.label
                td.input
                  label
                    input(type="checkbox" name="pausable" v-model="newCoin.pausable")
                    |  Enable pausing
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
        pausable: false
        maxSupply: '20000000'
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

