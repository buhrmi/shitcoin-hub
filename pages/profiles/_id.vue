<template lang="pug">
  .page
    .wrapper
      .side_col
        img.user_image(:src="user.profile_image_url")
      .main_col
        h1 {{ user.display_name }}
        .bio(v-html="$t(user.bio_html)")
        nuxt-link.button(v-if="" :to="`/profiles/edit`") Edit profile
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app:{$axios}, params}) ->
    user: await $axios.$get('/users/' + params.id)
</script>

<style>
.user_image {
  height: 250px;
  width: 250px;
  display: inline-block;
  background-color: #eee;
}
</style>
