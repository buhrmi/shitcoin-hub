<template lang="pug">
  .page
    .wrapper
      h1 {{ poo.name }}
      .flex-grid
        .col
          img(:src="poo.sd_image_url")
        .col
          p 
            | Owner:  
            nuxt-link(:to="{name: 'profiles-id', params: {id: poo.user.id}}") {{ poo.user.display_name }}
          p Level 1
          p Value: 65 / 65 (100%)
          p Currently Hodling: Nothing
          p Current location: Unknown
          button(disabled) Attack
          button(disabled) Invite
          button(disabled) Send Shitcoins
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [poo] = await Promise.all [
      $axios.$get("/poos/"+params.id),
    ]
    return {poo}
  head: ->
    title:
      "Check out #{this.poo.user.display_name}'s Poo on Shitcoin World"
    meta: [
      { hid: 'og:image', property: 'og:image', content: this.poo.sd_image_url },
      { hid: 'og:description', property: 'og:description', content: "#{this.poo.user.display_name}'s Poo is a Level 1 Poo in Shitcoin World. Create your own Poo and start your shitcoin adventure." }
    ]
</script>

<style lang="scss" scoped>

</style>
