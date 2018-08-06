<template lang="pug">
  .page
    .wrapper
      table.shitcoins
        thead
          tr
            th Name
            th Your Balance
            th Platform
            th Rating
        tbody
          tr.shitcoin(v-for="shitcoin in shitcoins")
            td
              nuxt-link(:to="`/shitcoins/${shitcoin.param}`")
                .logo
                  img.logo_thumb(:src="shitcoin.logo_thumb" v-if="shitcoin.logo_thumb")
                  .placeholder(v-else)
                | {{ shitcoin.name}}
            td(v-if="$store.state.user") 0 (0 available)
            td(v-else) log in to see balance
            td {{ shitcoin.platform }}
            td Not yet rated
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

