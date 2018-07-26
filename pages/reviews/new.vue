<template lang="pug">
  .page
    .wrapper
      review-form(v-model="review")
</template>

<script lang="coffee">
module.exports =
  components:
    reviewForm: require('~/components/review-form').default
  
  asyncData: ({app: {$axios}, query}) ->
    review:
      shitcoin: await $axios.$get('/shitcoins/'+query.shitcoin_id)
      html:
        en: ''
      rating: 2
      shitcoin_id: query.shitcoin_id
</script>
