<template lang="pug">
  .page
    .wrapper
      h1 Hodlers
      .hodlers(v-if="$store.state.user && hodlers.length")
        .container
          .owned_hodler(v-for="hodler in hodlers")
            .hodler
              nuxt-link(:to="{name: 'hodlers-id', params: {id: hodler.id}}")
                span.name {{ hodler.name }}
                img.portrait(:src="hodler.sd_image_url")
            .actions
              button(@click="$store.dispatch('playWithHodler', hodler.id)") Enter Shitcoin Kingdom
      .container(v-else)
        .card.padded
          h2 Create your first Hodler
          p You don't have a Hodler. Create one now!
          nuxt-link.button(to="/hodlers/new") Create a Hodler
          | or 
          a(@click="$store.state.showSignup = true") log in 
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [hodlers] = await Promise.all [
      $axios.$get("/hodlers?my=1"),
    ]
    return {hodlers}
  watch:
    '$store.state.user': ->
      this.hodlers = await $axios.$get("/hodlers?my=1")
</script>

<style lang="scss" scoped>

</style>
