<template lang="pug">
  .page
    .wrapper
      h1 Create your Poo

</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}}) ->
    availablePooParts: await $axios.$get('/poo_parts')
</script>

