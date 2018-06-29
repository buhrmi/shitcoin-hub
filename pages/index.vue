<template lang="pug">
  .page
    .wrapper
      h1 {{ $t('welcome') }}
      h2 Shitcoin list
      table.shitcoins
        tbody
          tr.shitcoin(v-for="shitcoin in shitcoins")
            td
              nuxt-link(:to="`/shitcoins/${shitcoin.param}`")
                .logo
                  img.logo_thumb(:src="shitcoin.logo_thumb" v-if="shitcoin.logo_thumb")
                  .placeholder(v-else)
                | {{ shitcoin.name}}
      h2 Submit Shitcoin
      .create_asset(v-if="$store.state.user")
        form(@submit.prevent="createShitcoin")
          .field
            label Name
            input(v-model="new_shitcoin.name")
          .field
            label
            button Submit
      .unregistered(v-else) Please log in to submit your Shitcoin
</template>

<style lang="scss">
table.shitcoins {
  td {
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
  data: ->
    new_shitcoin:
      name: null
  methods:
    createShitcoin: ->
      newShitcoin = await this.$axios.$post('/shitcoins', {shitcoin: this.new_shitcoin})
      this.$router.push(name: 'shitcoins-id', params: {id: newShitcoin.param, edit: true})

</script>

