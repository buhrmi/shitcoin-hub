<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="shitcoin" active="overview")
      .main_col
        .reviews
          .review(v-for="review in reviews")
            .author
              | Review by 
              nuxt-link(:to="{name: 'profiles-id', params: {id: review.author.id}}") {{ review.author.display_name }}
            .review_html(v-html="$t(review.html)")
          nuxt-link.button(:to="{name: 'reviews-new', query: {shitcoin_id: shitcoin.id}}" v-if="$store.state.user") Submit review
          .login_to_edit(v-else) Log in to submit a review
      .side_col
        p Related Shitcoins
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
      "#{this.shitcoin.name} Reviews - Shitcoin World"
    meta: [
      { hid: 'og:image', property: 'og:image', content: this.shitcoin.logo_url },
      { hid: 'og:description', property: 'og:description', content: "Average rating: ⭐⭐ | Get all your #{this.shitcoin.name} news and reviews on Shitcoin World" }
    ]
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin, reviews] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get("/reviews", params: {shitcoin_id: params.id})
    ]
    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })
    return
      edited_locale: store.state.locale
      shitcoin: shitcoin
      reviews: reviews
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
