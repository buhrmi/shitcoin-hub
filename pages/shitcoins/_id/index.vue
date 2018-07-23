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
      .main_col
        .summary(v-if="!editing")
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
    [shitcoin] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}")
    ]
    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })
    return
      edited_locale: store.state.locale
      editing: false
      shitcoin: shitcoin
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
