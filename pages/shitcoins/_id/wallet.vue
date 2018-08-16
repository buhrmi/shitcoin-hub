<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="shitcoin")
      .balances(v-if="$store.state.balances[shitcoin.id]")
        p Balance: {{ $store.state.balances[shitcoin.id].balance }}
        p In orders: {{ $store.state.balances[shitcoin.id].in_orders }}
        p Available: {{ $store.state.balances[shitcoin.id].available }}
      .withdrawals
        h1 Withdrawals
        .withdrawal(v-for="withdrawal in withdrawals") {{ withdrawal }}
        h2 New Withdrawal
        .field
          label
            span Address: 
            input(v-model="newWithdrawal.to_address")
        .field
          label
            span Amount: 
            input(v-model="newWithdrawal.amount")
        button(@click="requestWithdrawal") Submit
        
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}")
    ]
    withdrawals = await $axios.$get('/withdrawals', params: {shitcoin_id: params.id})

    return
      newWithdrawal:
        shitcoin_id: shitcoin.id
        to_address: null
        amount: null
      withdrawals: withdrawals
      shitcoin: shitcoin
   methods:
     requestWithdrawal: ->
       await this.$axios.$post('/withdrawals', withdrawal: this.newWithdrawal)
       this.withdrawals = await $axios.$get('/withdrawals', params: {shitcoin_id: params.id})

</script>
