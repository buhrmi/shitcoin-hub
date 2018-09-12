<template lang="pug">
  .page
    .wrapper
      benefit-form(v-model="benefit")
</template>

<script lang="coffee">
module.exports =
  components:
    benefitForm: require('~/components/benefit-form').default
  
  asyncData: ({app: {$axios}, query}) ->
    benefit:
      shitcoin: await $axios.$get('/shitcoins/'+query.shitcoin_id)
      html:
        en: ''
      rating: 2
      shitcoin_id: query.shitcoin_id
</script>
