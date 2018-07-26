<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="shitcoin" active="overview")
      .side_col
        image-uploader(v-model="shitcoin" field="logo" :path="`/shitcoins/${this.shitcoin.id}`" param="shitcoin[logo]")
        table.details(v-if="!editing")
          tbody
            tr
              th Platform
              td
                a(target="_blank" :href="shitcoin.explorer_url") {{ shitcoin.platform }}
            tr
              th Website
              td {{ shitcoin.details.website }}
            tr
              th Telegram
              td {{ shitcoin.details.telegram }}
            tr
              th Twitter
              td {{ shitcoin.details.twitter }}
            tr
              td 
                button(@click="edit" v-if="$store.state.user") Edit
        table.details(v-else)
          tbody
            tr
              th Platform
              td {{ shitcoin.platform_id }}
            tr
              th Website
              td 
                input(v-model="shitcoin.details.website")
            tr
              th Telegram
              td 
                input(v-model="shitcoin.details.telegram")
            tr
              th Twitter
              td 
                input(v-model="shitcoin.details.twitter")
                button(@click="save") {{ $t('save_changes') }}
      .main_col
        .reviews
          .review(v-for="review in reviews")
            .author
              | Review by 
              nuxt-link(:to="{name: 'profiles-id', params: {id: review.author.id}}") {{ review.author.display_name }}
            .review_html(v-html="$t(review.html)")
          nuxt-link.button(:to="{name: 'reviews-new', query: {shitcoin_id: shitcoin.id}}" v-if="$store.state.user") Submit review
          .login_to_edit(v-else) Log in to submit a review
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
    [shitcoin, reviews] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get("/reviews", params: {shitcoin_id: params.id})
    ]
    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })
    return
      edited_locale: store.state.locale
      editing: false
      shitcoin: shitcoin
      reviews: reviews
      redactor:
        imageData:
          attachee_id: shitcoin.id
          attachee_type: 'Shitcoin'
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
.details {
  margin-top: 12px;
  // border: 1px solid #ddd;
  width: 250px;
  th, td {
    padding: 12px;
  }
}

</style>
