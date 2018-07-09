<template lang="pug">
  .content
    .wrapper
      .side_col
        image-uploader(v-model="shitcoin" field="logo" :path="`/shitcoins/${this.shitcoin.id}`" param="shitcoin[logo]")
        h2 Linked assets
        .assets
          .asset(v-for="asset in assets")
            .name {{ asset.details.name }} ({{ asset.details.symbol }})
        h3 Link asset to {{ shitcoin.name }}
        .create_asset(v-if="$store.state.user")
          form(@submit.prevent="linkAsset(new_asset)")
            .field
              label Platform
              select(v-model="new_asset.platform_id")
                option(v-for="platform in platforms" :value="platform.id") {{ platform.name }}
            .field
              label Address
              input(v-model="new_asset.address")
            .field
              label
              button Link
        .create_asset(v-else) Log in to link an asset
      .main_col
        .summary(v-if="!editing")
          nuxt-link.button(:to="{name: 'shitcoins-id-wallet', params: {id: shitcoin.id}}") Go to wallet
          .html(v-html="shitcoin.summary_html[$store.state.locale]")
          button(@click="edit" v-if="$store.state.user") Edit
          .login_to_edit(v-else) Log in to edit
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
</template>

<script lang="coffee">
require('nuxt-dropzone/dropzone.css')

module.exports =
  components:
    imageUploader: require('~/components/image-uploader').default
  head: ->
    title:
      "Should I invest into #{this.shitcoin.name}? - Shitcoin Hub"
    meta: [
      { hid: 'og:image', property: 'og:image', content: this.shitcoin.logo_url },
      { hid: 'og:description', property: 'og:description', content: (this.shitcoin.summary_html[this.$store.state.locale] || '').replace(/(<([^>]+)>)/ig,"") }
    ]
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin, assets, platforms] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get('/assets', params: {shitcoin_id: params.id})
      $axios.$get('/platforms')
    ]
    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })
    return
      edited_locale: store.state.locale
      editing: false
      assets: assets
      platforms: platforms
      shitcoin: shitcoin
      new_asset:
        address: null
        platform_id: null
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
.image-uploader {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  background: #888;
  color: white;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
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
