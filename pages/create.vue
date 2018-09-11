<template lang="pug">
  .page
    .wrapper
      .redactor-styles.no-padding
        h1 Shitcoin Maker™
        p An ICO platform as easy as 1 2 3...
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
          .card.padded
            h2 Step 2: Deposit Token
            p 
              | After downloading, open the file in  
              a(target="_blank" href="http://remix.ethereum.org/") Remix
              |  to deploy the contract to the network.
            .deposit(v-if="$store.state.user")
              p After you have deployed your contract, deposit some tokens in your personal deposit address.
              p Your deposit address: {{ $store.state.addresses[1]}}
              img(:src="`https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${this.$store.state.addresses[1]}&choe=UTF-8`")
            .signup(v-else)
              p You need to sign up or log in to view your deposit address.
              button(@click="$store.state.showSignup = true") Sign up
              |  or 
              a(@click="$store.state.showSignup = true") Log in
          .card.padded
            h2 Step 3: Trade Token
            p Waiting for deposit... Once your deposit has been confirmed, you will be automatically redirected to the trading view.
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

