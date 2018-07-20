<template lang="pug">
  .page
    .wrapper
      .side_col
        image-uploader(v-model="$store.state.user" field="profile_image" path="/me" param="user[profile_image]")
      .main_col
        h1 Edit Profile
        form(@submit.prevent="save")
          .field
            label Email Address
            input(v-model="newProfile.email" placeholder="me@example.com")
          .field
            label Username
            input(v-model="newProfile.username" placeholder="")
          .field
            label Display name
            input(v-model="newProfile.display_name" placeholder="")
          .field
            label Bio
          .redactor_tabs
            .tab(v-for="locale in $store.state.available_locales" @click="edited_locale = locale" :class="{active: edited_locale == locale}") {{ $t(locale) }}
          redactor(v-for="locale in $store.state.available_locales" :key="locale" v-if="edited_locale == locale" v-model="newProfile.bio_html[locale]")
          button {{ $t('save_changes') }}
          nuxt-link(to="/profile") Back to profile
</template>

<script lang="coffee">
module.exports =
  components:
    imageUploader: require('~/components/image-uploader').default
    redactor: require('~/components/redactor').default
  data: ->
    edited_locale: this.$store.state.locale
    newProfile:
      display_name: this.$store.state.user.display_name
      username: this.$store.state.user.username
      email: this.$store.state.user.email
      bio_html:
        en: this.$store.state.user.bio_html.en
        ja: this.$store.state.user.bio_html.ja
  methods:
    save: ->
      this.$store.state.user = await this.$axios.$patch('/me', user: this.newProfile)
      this.$router.push('/me')
      this.$toast.success("Your profile has been saved.")
</script>
