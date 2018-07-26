<template lang="pug">
  .page
    .wrapper
      review-form(v-model="review")
</template>

<script lang="coffee">
module.exports =
  components:
    reviewForm: require('~/components/review-form').default
  asyncData: ({app: {$axios}, params}) ->
    review: await $axios.$get('/reviews/' + params.id)
</script>
