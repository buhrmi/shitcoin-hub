<template lang="pug">
  .content
    .wrapper
      .summary(v-if="!editing")
        .html(v-html="shitcoin.summary_html[$store.state.locale]")
        button(@click="edit") Edit
      .summary(v-else="editing")
        form(@submit.prevent="updateShitcoin(shitcoin)")
          .redactor_tabs
            .tab(v-for="locale in $store.state.available_locales" @click="edited_locale = locale" :class="{active: edited_locale == locale}") {{ $t(locale) }}
          redactor(v-for="locale in $store.state.available_locales" :key="locale" v-if="edited_locale == locale" v-model="shitcoin.summary_html[locale]" :options="redactor")
          
          button {{ $t('save_changes') }}
      // h2 Rewards
      // p
      //   | Are you currently hodling?
      //   button(@click="$store.dispatch('authorize_with_web3')") Check rewards
      h2 Linked asset
      .assets
        .asset(v-for="asset in assets")
          .name {{ asset.details.name }} ({{ asset.details.symbol }})
      h3 Link asset to {{ shitcoin.name }}
      .create_asset(v-if="$store.state.user")
        form(@submit.prevent="linkAsset(new_asset)")
          .field
            label Platform
            select(v-model="new_asset.platform")
              option(value="erc20") Ethereum ERC20
              option(value="stellar") Stellar
              option(value="native") none / native
          .field
            label Address
            input(v-model="new_asset.address")
          .field
            label
            button Link
      .create_asset(v-else) Log in to link an asset
</template>

<script lang="coffee">
module.exports =
  head: ->
    title:
      "Should you invest into #{this.shitcoin.name}? - Shitcoin Hub"
  components:
    redactor: require('~/components/redactor').default
  data: ->
    edited_locale: this.$store.state.locale
    editing: false
  asyncData: ({app: {$axios}, params, error, store}) ->
    shitcoin = await $axios.$get("/shitcoins/#{params.id}")
    assets = await $axios.$get('/assets', params: {shitcoin_id: params.id})
    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })
    return
      assets: assets
      shitcoin: shitcoin
      new_asset:
        address: null
        platform: null
        shitcoin_id: shitcoin.id
      redactor:
        imageData:
          attachee_id: shitcoin.id
          attachee_type: 'Shitcoin'
  mounted: ->
    this.editing = true if this.$route.params.edit
  methods:
    edit: ->
      this.editing = true
    linkAsset: (asset) ->
      await this.$axios.$post('/assets', {asset})
      this.assets = assets = await this.$axios.$get('/assets', params: {shitcoin_id: this.shitcoin.id})
    updateShitcoin: (shitcoin) ->
      this.shitcoin = await this.$axios.$put('/shitcoins/' + shitcoin.id, {shitcoin})
      this.editing = false
</script>

<style lang="scss">
.redactor_tabs {
  margin-bottom: -1px;
  z-index: 1;
  position: relative;
  .tab {
    cursor: pointer;
    padding: 9px 38px;
    border-bottom: 1px solid transparent;
    display: inline-block;
    &:not(.active):hover {
      background-color: #449aef;
      color: white;
    }
    &.active {
      border: 1px solid #82b7ec;
      border-bottom: 1px solid white;
      font-weight: bold;
    }
  }
}
</style>
