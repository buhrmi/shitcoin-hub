<template lang="pug">
  .page
    .wrapper
      h1 {{ $t('welcome') }}
      h2 List of Shitcoins
      .shitcoin(v-for="shitcoin in shitcoins")
        nuxt-link(:to="`/shitcoins/${shitcoin.param}`") {{ shitcoin.name}}

      h2 Register Shitcoin
      .create_asset(v-if="$store.state.user")
        form(@submit.prevent="createShitcoin")
          .field
            label Symbol
            input(v-model="new_shitcoin.symbol")
          .field
            label
            button Register
      .unregistered(v-else) Please log in to register your Shitcoin
</template>

<script lang="coffee">
export default
  # layout: 'soon'
  asyncData: ({app: {$axios}}) ->
    shitcoins: await $axios.$get('/shitcoins')
  data: ->
    new_shitcoin:
      symbol: null
  methods:
    createShitcoin: ->
      newShitcoin = await this.$axios.$post('/shitcoins', {shitcoin: this.new_shitcoin})
      this.$router.push(name: 'shitcoins-id', params: {id: newShitcoin.param, edit: true})

</script>

