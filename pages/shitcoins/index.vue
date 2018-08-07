<template lang="pug">
  .page
    .wrapper
      .platforms
        .platform(v-for="platform in $store.state.platforms")
          .address Your deposit address for {{ platform.name }}: {{ $store.state.addresses[platform.id] }}
      table.shitcoins
        thead
          tr
            th Name
            th Balance
            th Available
            th Platform
            th Shittiness
        tbody
          tr.shitcoin(v-for="shitcoin in shitcoins")
            td
              nuxt-link(:to="`/shitcoins/${shitcoin.param}`")
                .logo
                  img.logo_thumb(:src="shitcoin.logo_thumb" v-if="shitcoin.logo_thumb")
                  .placeholder(v-else)
                | {{ shitcoin.name}}
            td(v-if="$store.state.user")
              .balance(v-if="$store.state.balances[shitcoin.id]") {{ $store.state.balances[shitcoin.id].balance }}
            td(v-if="$store.state.user")
              .balance(v-if="$store.state.balances[shitcoin.id]") {{ $store.state.balances[shitcoin.id].available }}
            td(v-else colspan="2") log in to see balance
            td {{ shitcoin.platform }}
            td
              .rating(v-if="shitcoin.cached_rating > 0")
                span(v-for="i in shitcoin.cached_rating") 💩
              .rating(v-else) No reviews
</template>

<style lang="scss">
table.shitcoins {
  td, th {
    padding: 8px;
    border-top: 1px solid #eee;
  }
  .logo {
    vertical-align: middle;
    display: inline-block;
    .placeholder {
      margin-right: 38px;
    }
    .logo_thumb {
      height: 32px;
      width: 32px;
      margin-right: 6px
    }
  }
}
</style>


<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}}) ->
    shitcoins: await $axios.$get('/shitcoins')
</script>

