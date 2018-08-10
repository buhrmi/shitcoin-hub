<template lang="pug">
  .page
    .wrapper.flex-grid
      .col
        img(:src="poo.sd_image_url")
      .col
        h1 {{ poo.user.display_name }}'s Poo
        p Level 1
        p Health: 65 / 65 (100%)
        p Items: -
        p Current location: Unknown
        button(disabled) Start new game
        button(disabled) Feed
        button(disabled) Sell
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
      { hid: 'og:description', property: 'og:description', content: "Shitcoin World brings you #{this.poo.user.display_name}'s amazing creation. Create your own Poo on Shitcoin World and start your shitcoin adventure." }
    ]
</script>

<style lang="scss" scoped>

</style>
