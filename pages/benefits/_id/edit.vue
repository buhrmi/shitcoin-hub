<template lang="pug">
  .page
    .wrapper
      benefit-form(v-model="benefit")
</template>

<script lang="coffee">
module.exports =
  components:
    benefitForm: require('~/components/benefit-form').default
  asyncData: ({app: {$axios}, params}) ->
    benefit: await $axios.$get('/benefits/' + params.id)
</script>
