<template lang="pug">
  .page
    .wrapper
      h1 {{ user.display_name }} (This is you)
      nuxt-link.button(to="/profile/edit") Edit Profile
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app:{$axios}, params})->
    user: await $axios.$get('/me')
</script>
