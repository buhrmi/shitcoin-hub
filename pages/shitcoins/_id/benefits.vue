<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="shitcoin" active="overview")
      .container
        
        .card.redactor-styles(v-for="benefit in benefits")
          h2 
            | Submitted by
            nuxt-link(:to="{name: 'profiles-id', params: {id: benefit.author.id}}") {{ benefit.author.display_name }}
          .benefit_html(v-html="$t(benefit.html)")
        .card.padded
          nuxt-link.button(:to="{name: 'benefits-new', query: {shitcoin_id: shitcoin.id}}" v-if="$store.state.user") Submit benefit
          .login_to_edit(v-else) Log in to submit a benefit
      
      // h2 Rewards
      // p
      //   | Are you currently hodling?
      //   button(@click="$store.dispatch('authorize_with_web3')") Check rewards
</template>

<script lang="coffee">
require('nuxt-dropzone/dropzone.css')
module.exports =
  head: ->
    title:
      "#{this.shitcoin.name} Benefits - Shitcoin World"
    meta: [
      { hid: 'og:image', property: 'og:image', content: this.shitcoin.logo_url },
      { hid: 'og:description', property: 'og:description', content: "Shittiness rating: #{Array(shitcoin.cached_rating).join '💩'}. Get all your #{this.shitcoin.name} news and benefits on Shitcoin World" }
    ]
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin, benefits] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get("/benefits", params: {shitcoin_id: params.id})
    ]
    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })
    return
      edited_locale: store.state.locale
      shitcoin: shitcoin
      benefits: benefits
      redactor:
        imageData:
          attachee_id: shitcoin.id
          attachee_type: 'Shitcoin'
</script>

<style lang="scss" scoped>
.details {
  margin-top: 12px;
  // border: 1px solid #ddd;
  width: 250px;
  th, td {
    padding: 12px;
  }
}
</style>