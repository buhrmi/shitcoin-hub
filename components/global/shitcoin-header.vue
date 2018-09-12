<template lang="pug">
  .shitcoin_header
    .details_bar
      .image
        image-uploader(v-model="shitcoin" field="logo" :path="`/shitcoins/${shitcoin.id}`" param="shitcoin[logo]")
      .stats
        p Price: {{ $store.state.prices[shitcoin.id] || '¯\\_(ツ)_/¯' }} {{ $store.state.quote_shitcoin.symbol }}
        p 24h volume: ?
      h1.name {{ shitcoin.name }} ({{ shitcoin.symbol }})
      a(target="_blank" :href="shitcoin.explorer_url") Open in Block Explorer
      //- .details(v-if="!editing")
      //-   ul
      //-     li  
          //- li
          //-   span Website: {{ shitcoin.details.website }}
          //- li
          //-   span Telegram: {{ shitcoin.details.telegram }}
          //- li
          //-   span Twitter: {{ shitcoin.details.twitter }}
          //- li
          //-   button(@click="edit" v-if="$store.state.user") Edit
      //- .details(v-else)
      //-   ul
      //-     li
      //-       span Platform: 
      //-       | {{ shitcoin.platform }}
      //-     li
      //-       span Website: 
      //-       input(v-model="shitcoin.details.website")
      //-     li
      //-       span Telegram: 
      //-       input(v-model="shitcoin.details.telegram")
      //-     li
      //-       span Twitter: 
      //-       input(v-model="shitcoin.details.twitter")
      //-   button(@click="save") {{ $t('save_changes') }}
    .nav_bar
      nuxt-link(:class="{active: active == 'trade'}" :to="{name: 'shitcoins-id-trade', params: {id: shitcoin.id}}") Trade
      nuxt-link(:class="{active: active == 'funding'}" :to="{name: 'shitcoins-id-funding', params: {id: shitcoin.id}}") Funding
      nuxt-link(:class="{active: active == 'benefits'}" :to="{name: 'shitcoins-id-benefits', params: {id: shitcoin.id}}") Benefits
</template>

<script lang="coffee">
module.exports =
  # components:
  #   imageUploader: require('~/components/image-uploader').default
  props: ['shitcoin', 'active']
  data: ->
    editing: false
  mounted: ->
    this.editing = true if this.$route.params.edit
  methods:
    edit: ->
      this.editing = true
    save: ->
      this.shitcoin = await this.$axios.$put('/shitcoins/' + this.shitcoin.id, {shitcoin: this.shitcoin})
      this.editing = false
</script>

<style lang="scss" scoped>
.nav_bar {
  margin-bottom: 12px;
}
.details_bar {
  height: 125px;
  .image {
    padding: 2px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    background: #fff;
    padding: 5px;
    vertical-align: middle;
    float: left;
    margin-right: 16px;
    margin-bottom: 16px;
  }
  .name {
    padding-top: 16px;
  }
  .details {
    li {
      display: inline-block;
      margin-right: 32px;
    }
  }
}
.shitcoin_header {
  margin-bottom: 12px;
  .name {
    margin-bottom: 0;
  }
  .stats {
    float: right;
  }
}
.image-uploader {
  width: 96px;
  height: 96px;
}
.title {
  margin: 12px 0;
}
</style>
