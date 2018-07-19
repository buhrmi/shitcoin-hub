<template lang="pug">
  .page
    .wrapper
      table.shitcoins
        thead
          tr
            th Name
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
            td {{ shitcoin.platform }}
            td Not yet rated

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
export default
  # layout: 'soon'
  asyncData: ({app: {$axios}}) ->
    shitcoins: await $axios.$get('/shitcoins')
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

