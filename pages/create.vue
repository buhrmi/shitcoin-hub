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
                  tr.field(v-if="newCoin.mintable")
                    th.label
                    td.input
                      label
                        input(type="checkbox" name="crowdsale" v-model="newCoin.crowdsale")
                        |  Enable Crowd Sales
                  tr.field(v-if="newCoin.crowdsale && newCoin.mintable")
                    th.label Start Date
                    td.input
                      input(name="start_date" type="datetime-local" v-model="newCoin.start_date")
                      |  UTC (GMT+0)
                  tr.field(v-if="newCoin.crowdsale && newCoin.mintable")
                    th.label Price
                    td.input
                      | 1 {{ newCoin.symbol }} = 
                      input(name="price" v-model="newCoin.price")
                      |  ETH
                  tr.field(v-for="(phase, index) in newCoin.phases" v-if="newCoin.crowdsale && newCoin.mintable")
                    th.label
                      | Phase {{ index + 1}} 
                      a(@click="newCoin.phases.splice(index, 1)") Remove phase
                    td.input
                      .bonus
                        | % Bonus: 
                        input(:name="`phases[]bonus`" v-model="phase.bonus")
                      .end
                        | End: 
                        input(:name="`phases[]end`" type="datetime-local" v-model="phase.end")
                  tr.field(v-if="newCoin.crowdsale && newCoin.mintable")
                    th.label
                    td.input
                      label
                        button(@click.prevent="addphase") Add Phase
                  tr.field(v-if="newCoin.crowdsale && newCoin.mintable")
                    th.label End Date
                    td.input
                      input(name="end_date" type="datetime-local" v-model="newCoin.end_date")
                      |  UTC (GMT+0)
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
        crowdsale: false
        start_date: new Date()
        end_date: new Date()
        price: 1
        phases: []
  methods:
    addphase: ->
      this.newCoin.phases.push bonus: 0, start: new Date()
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

