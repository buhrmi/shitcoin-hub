<template lang="pug">
  .page
    .wrapper
      h2 Submit Shitcoin
      .create_asset(v-if="$store.state.user")
        form(@submit.prevent="createShitcoin")
          .field
            label Platform
            select(v-model="new_shitcoin.platform_id")
              option(v-for="platform in platforms" :value="platform.id") {{ platform.name }}
          .field
            label Address
            input(v-model="new_shitcoin.address")
          .field
            label
            button Submit
      .unregistered(v-else) Please log in to submit your Shitcoin
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}})->
    platforms: await $axios.$get('/platforms')
  data: ->
    new_shitcoin:
      platform_id: null
      address: null
  methods:
    createShitcoin: ->
      newShitcoin = await this.$axios.$post('/shitcoins', {shitcoin: this.new_shitcoin})
      this.$router.push(name: 'shitcoins-id', params: {id: newShitcoin.param, edit: true})
</script>
