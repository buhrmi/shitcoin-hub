<template lang="pug">
  .page
    .wrapper
      edit-post(v-model="post")
</template>

<script lang="coffee">
module.exports =
  components:
    editPost: require('~/components/post-form').default
  data: ->
    post:
      title:
        en: ''
      body_html:
        en: ''
      shitcoin_list: []
</script>
