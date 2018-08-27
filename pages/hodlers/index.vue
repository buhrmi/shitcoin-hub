<template lang="pug">
  .page
    .wrapper
      h1 Hodlers
      .hodler(v-for="hodler in hodlers")
        nuxt-link(:to="{name: 'hodlers-id', params: {id: hodler.id}}")
          span.name {{ hodler.name }}
          img.portrait(:src="hodler.sd_image_url")
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [hodlers] = await Promise.all [
      $axios.$get("/hodlers"),
    ]
    return {hodlers}
</script>

<style lang="scss" scoped>

</style>
