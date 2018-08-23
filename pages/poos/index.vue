<template lang="pug">
  .page
    .wrapper
      h1 Poos
      .poo(v-for="poo in poos")
        nuxt-link(:to="{name: 'poos-id', params: {id: poo.id}}")
          span.name {{ poo.name }}
          img.portrait(:src="poo.sd_image_url")
        
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [poos] = await Promise.all [
      $axios.$get("/poos"),
    ]
    return {poos}
</script>

<style lang="scss" scoped>

</style>
