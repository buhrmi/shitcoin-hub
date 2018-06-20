<template lang="pug">
  .page
    .wrapper
      h1 {{ $t('welcome') }}
      h2 List of Shitcoins
      .shitcoin(v-for="shitcoin in shitcoins")
        nuxt-link(:to="`/${shitcoin.platform}/${shitcoin.address}`") {{ shitcoin.symbol}} ({{ shitcoin.platform }})

      h2 Register Shitcoin
      .create_asset(v-if="$store.state.user")
        form(@submit.prevent="handleSubmit")
          .field
            label Symbol
            input(v-model="new_asset.symbol")
          .field
            label Platform
            select(v-model="new_asset.platform")
              option(value="STR") Stellar
              option(value="EOS") EOS
              option(value="ETH") ETH
              option(value="Waves") Waves
              option(value="native") none/native
          .field
            label Address
            input(v-model="new_asset.address")
          .field
            label
            button Register
      .unregistered(v-else) Please log in to register your Shitcoin
</template>

<script lang="coffee">
export default
  asyncData: ({app: {$axios}}) ->
    shitcoins: await $axios.$get('/assets')
  data: ->
    new_asset:
      platform: 'ETH'
      symbol: null
  methods:
    handleSubmit: ->
      newAsset = this.$axios.$post('/assets', {asset: this.new_asset})

</script>

