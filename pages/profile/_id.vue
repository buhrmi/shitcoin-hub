<template lang="pug">
  .page
    .wrapper
      h1 {{ user.display_name }}
      .side_col
        img(:src="user.profile_image_url")
      .main_col
        .bio(v-html="$t(user.bio_html)")
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app:{$axios}, params})->
    user: await $axios.$get('/users/' + params.id)
</script>
