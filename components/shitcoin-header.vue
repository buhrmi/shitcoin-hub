<template lang="pug">
  .shitcoin_header
    h1.title
      img.logo_thumb(:src="shitcoin.logo_thumb" v-if="shitcoin.logo_thumb")
      | {{ shitcoin.name }}
    .nav_bar
      nuxt-link(:class="{active: active == 'overview'}" :to="{name: 'shitcoins-id', params: {id: shitcoin.id}}") Overview
      // nuxt-link(:class="{active: active == 'wallet'}" :to="{name: 'shitcoins-id-wallet', params: {id: shitcoin.id}}") Wallet
</template>

<script lang="coffee">
module.exports =
  props: ['shitcoin', 'active']
</script>

<style lang="scss" scoped>
.nav_bar {
  margin-bottom: 13px;

}
.title {
  margin: 12px 0;
  .logo_thumb {
    margin-right: 12px;
    // width: 48px;
    // height: 48px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    background: #fff;
    padding: 5px;
    vertical-align: middle;
  }
}
</style>
