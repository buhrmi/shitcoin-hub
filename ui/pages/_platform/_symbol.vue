<template lang="pug">
  .content
    .wrapper
      h1 {{ symbol }} on {{ platform }}
      h2 Details about this shitcoin
      p Address:
      p Website:

</template>

<script lang="coffee">
export default
  asyncData: ({app: {$axios}, params}, store) ->
    asset: await $axios.$get('/assets/', data: params)
  data: ->
    symbol: this.$route.params.symbol
</script>
