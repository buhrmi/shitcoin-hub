<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="shitcoin")
      .container
        .card.padded(v-if="!$store.state.user")
          h2 Log in
          p Please log in to manage your account funding
        .card.padded(v-if="$store.state.balances[shitcoin.id]")
          h2 Balances
          p Balance: {{ $store.state.balances[shitcoin.id].balance }}
          p In orders: {{ $store.state.balances[shitcoin.id].in_orders }}
          p Available: {{ $store.state.balances[shitcoin.id].available }}
        .card.history.padded(v-if="$store.state.user")
          h2 History
          table
            thead
              tr
                td Type
                td Amount
                td Date
                td Status
                td Notes
            tbody
              tr(v-for="change in history")
                td {{ change.type }}

                td(v-if="change.type == 'Deposit'") {{ change.amount }}
                td(v-if="change.type == 'Withdrawal'") -{{ change.amount }}
                
                td {{ change.created_at }}

                td(v-if="change.type == 'Deposit'")
                  | {{ change.status }} 
                  a(:href="change.url" target="_blank") Check Transaction  
                td(v-if="change.type == 'Withdrawal'")
                  | {{ change.status }} 
                  a(:href="change.url" target="_blank") Check Transaction  
                
                td(v-if="change.type == 'Deposit'")
                td(v-if="change.type == 'Withdrawal'")
                  .to To: {{ change.to_address }}
                  .error(v-if="change.status == 'error'")
                    span {{change.error}}

        .card.padded(v-if="$store.state.user")
          h2 Deposit
          p Your deposit address: {{ $store.state.addresses[shitcoin.platform_id] }}
        .card.padded(v-if="$store.state.user")
          h2 New Withdrawal
          .field
            label
              span Address: 
              input(v-model="newWithdrawal.to_address")
          .field
            label
              span Amount: 
              input(v-model="newWithdrawal.amount" type="number")
          .fees(v-if="shitcoin.user_transfer_fee")
            p The network applies a flat transfer fee of {{ shitcoin.user_transfer_fee }} {{ shitcoin.symbol }}
            p You will receive <b>{{ Big(newWithdrawal.amount || 0).minus(shitcoin.user_transfer_fee).toString() }} {{ shitcoin.symbol }}</b>.
            p
              | To receive {{ newWithdrawal.amount }}, please enter 
              a(@click="newWithdrawal.amount = Big(newWithdrawal.amount || 0).add(shitcoin.user_transfer_fee).toString()") {{ Big(newWithdrawal.amount || 0).add(shitcoin.user_transfer_fee).toString() }}
          button(@click="requestWithdrawal") Submit
        
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin, history] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get('/balance_history', params: {shitcoin_id: params.id})
    ]
    # [withdrawals, deposits] = await Promise.all [
    #   $axios.$get('/withdrawals', params: {shitcoin_id: params.id}),
    #   $axios.$get('/deposits', params: {shitcoin_id: params.id}),
    # ]
    

    return
      newWithdrawal:
        shitcoin_id: shitcoin.id
        to_address: null
        amount: shitcoin.user_transfer_fee
      history: history
      shitcoin: shitcoin
   methods:
     requestWithdrawal: ->
       await this.$axios.$post('/withdrawals', withdrawal: this.newWithdrawal)
       this.$toast.success("Withdrawal submitted.")
       this.history = await this.$axios.$get('/balance_history', params: {shitcoin_id: this.shitcoin.id})

</script>
