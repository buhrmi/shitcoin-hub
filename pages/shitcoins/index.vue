<template lang="pug">
  .page
    .wrapper
      .container
        .item
          h2 Your personal deposit addresses
          .deposits(v-if="$store.state.user")
            .platform(v-for="platform in $store.state.platforms")
              .address {{ platform.name }}: {{ $store.state.addresses[platform.id] }}
          .deposits(v-else) Please log in to see your deposit addresses.
        .item
          h2 All Shitcoins
          table.shitcoins
            thead
              tr
                th Name
                th
                  | Rating 
                  //- span(v-tooltip="'The higher the Shittiness rating, the more powerful<br> your Poo will become when you feed it this Shitcoin.'") (?)
                    
                th Balance
                th Available
                th Platform
            tbody
              tr.shitcoin(v-for="shitcoin in shitcoins")
                td
                  nuxt-link(:to="`/shitcoins/${shitcoin.param}/trade`")
                    .logo
                      img.logo_thumb(:src="shitcoin.logo_thumb" v-if="shitcoin.logo_thumb")
                      .placeholder(v-else)
                    | {{ shitcoin.name }}
                td
                  .rating(v-if="shitcoin.cached_rating > 0")
                    span(v-for="i in shitcoin.cached_rating") 💩
                  .rating(v-else) No reviews
                td(v-if="$store.state.user")
                  .balance(v-if="$store.state.balances[shitcoin.id]") {{ $store.state.balances[shitcoin.id].balance }}
                td(v-if="$store.state.user")
                  .balance(v-if="$store.state.balances[shitcoin.id]") {{ $store.state.balances[shitcoin.id].available }}
                td(v-else colspan="2") log in to see balance
                td {{ shitcoin.platform }}
</template>

<style lang="scss">
table.shitcoins {
  td, th {
    padding: 8px;
    
  }
  tr:hover {
    background: #f4f4f4;
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

