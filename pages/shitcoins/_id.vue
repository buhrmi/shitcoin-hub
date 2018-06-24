<template lang="pug">
  .content
    .wrapper
      h1 {{ shitcoin.name }}
      .summary(v-if="!editing")
        .html(v-html="shitcoin.summary_html[$store.state.locale]")
        button(@click="edit") Edit
      .summary(v-else="editing")
        form(@submit.prevent="updateShitcoin(shitcoin)")
          .redactor_tabs
            .tab(v-for="locale in $store.state.available_locales" @click="edited_locale = locale" :class="{active: edited_locale == locale}") {{ $t(locale) }}
          redactor(v-for="locale in $store.state.available_locales" :key="locale" v-if="edited_locale == locale" v-model="shitcoin.summary_html[locale]" :options="redactor")
          
          button {{ $t('save_changes') }}
      .create_asset(v-if="$store.state.user")
        h2 Link asset to {{ shitcoin.name }}
        form(@submit.prevent="createAsset")
          .field
            label Platform
            select(v-model="new_asset.platform")
              option(value="erc20" selected) Ethereum ERC20
          .field
            label Address
            input(v-model="new_asset.address")
          .field
            label
            button Link
</template>

<script lang="coffee">
module.exports =
  components:
    redactor: require('~/components/redactor').default
  data: ->
    edited_locale: this.$store.state.locale
    editing: false
  asyncData: ({app: {$axios}, params, error, store}) ->
    shitcoin = await $axios.$get("/shitcoins/#{params.id}")
    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })
    return
      shitcoin: shitcoin
      new_asset:
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
