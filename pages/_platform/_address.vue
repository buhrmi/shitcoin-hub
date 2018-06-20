<template lang="pug">
  .content
    .wrapper
      h1 {{ asset.symbol }} on {{ asset.platform }}
      p {{ asset.address }}
      .summary(v-if="!editing")
        .html(v-html="asset.summary_html[$store.state.locale]")
        button(@click="edit") Edit
      .summary(v-else="editing")
        form(@submit.prevent="submitAsset(asset)")
          .redactor_tabs
            .tab(v-for="locale in $store.state.available_locales" @click="edited_locale = locale" :class="{active: edited_locale == locale}") {{ locale }}
          redactor(v-for="locale in $store.state.available_locales" :key="locale" v-if="edited_locale == locale" v-model="asset.summary_html[locale]" :options="redactor")
          
          button Save changes

</template>

<script lang="coffee">
export default
  components:
    redactor: require('~/components/redactor').default
  data: ->
    edited_locale: this.$store.state.locale
    editing: false
  asyncData: ({app: {$axios}, params, error, store}) ->
    assets = await $axios.$get('/assets/', {params})
    if (assets.length > 0)
      asset = assets[0]
    else
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })
    return
      asset: asset
      redactor:
        imageData:
          attachee_id: asset.id
          attachee_type: 'Asset'
  mounted: ->
    # TODO: extract this into default options
    $R.ajax.settings =
      headers:
        Authorization: this.$store.state.authorization
  methods:
    edit: ->
      this.editing = true        
    submitAsset: (asset) ->
      this.asset = await this.$axios.$put('/assets/' + asset.id, {asset})
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
