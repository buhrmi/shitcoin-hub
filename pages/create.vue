<template lang="pug">
  .page
    .wrapper
      .redactor-styles.no-padding
        h1 Shitcoin Maker™
        p Create and list your token in 3 easy steps
        .container
          .card.padded
            h2 Step 1: Create Token
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
                      |  (0 for unlimited)
                  tr.field
                    th.label
                    td.input
                      label
                        input(type="checkbox" name="pausable" v-model="newCoin.pausable")
                        |  Enable pausing
              button Download Contract
        .container
          .card.padded
            h2 Step 2: Deploy Token
            p 
              | After downloading, open the contract in  
              a(target="_blank" href="http://remix.ethereum.org/") Remix
              |  and deploy it to the network.
        .container
          .card.padded
            h2 Step 3: List Token
            p Once you have deployed the contract on the network, please enter the details below.
            form(@submit.prevent="createShitcoin")
              table.form
                tbody
                  tr.field
                    th.label Platform
                    td.input
                      select(v-model="newCoin.platform_id")
                        option(v-for="platform in $store.state.platforms" :value="platform.id") {{ platform.name }}
                    tr.field
                      th.label Address
                      td.input
                        input(v-model="newCoin.address")          
              button Submit
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
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
        address: ''
        platform_id: 1
  methods:
    createShitcoin: ->
      newShitcoin = await this.$axios.$post('/shitcoins', {shitcoin: this.newCoin})
      this.$router.push(name: 'shitcoins-id-funding', params: {id: newShitcoin.param})
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

