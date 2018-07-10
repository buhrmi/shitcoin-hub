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
