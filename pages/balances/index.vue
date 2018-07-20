<template lang="pug">
  .page
    .wrapper
      h1 Shitcoin Balances
      table
        tbody
          tr.balance(v-for="balance in balances")
            td {{ balance.shitcoin.name }}
            td {{ balance.balance }}
            td 
              nuxt-link.button(:to="{name: 'shitcoins-id-wallet', params: {id: balance.shitcoin.id}}") Go to wallet
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}}) ->
    balances: await $axios.$get('/balances')

</script>


<style lang="scss" scoped>
.balance {
  td {
    vertical-align: middle;
  }
}
</style>
