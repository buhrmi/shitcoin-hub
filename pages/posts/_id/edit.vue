<template lang="pug">
  .page
    .wrapper
      edit-post(v-model="post")
</template>

<script lang="coffee">
module.exports =
  components:
    editPost: require('~/components/post-form').default
  asyncData: ({app: {$axios}, params}) ->
    post: await $axios.$get('/posts/' + params.id)
</script>
