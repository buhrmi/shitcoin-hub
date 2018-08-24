<template lang="pug">
  .page
    .wrapper
      h1 {{ hodler.name }}
      .flex-grid
        .col
          img(:src="hodler.sd_image_url")
        .col
          p Level 1
          p Birthday: {{ hodler.created_at }}
          p Currently Hodling: Nothing
          p Original Shitcoins™ earned: 0
          p Current location: Unknown
          button(disabled) Attack
          button(disabled) Invite
          button(disabled) Send message
          button(disabled) Hodl Shitcoins
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [hodler] = await Promise.all [
      $axios.$get("/hodlers/"+params.id),
    ]
    return {hodler}
  head: ->
    title:
      "Check out #{this.hodler.user.display_name}'s Hodler on Shitcoin World"
    meta: [
      { hid: 'og:image', property: 'og:image', content: this.hodler.sd_image_url },
      { hid: 'og:description', property: 'og:description', content: "#{this.hodler.user.display_name}'s Hodler is a Level 1 Hodler in Shitcoin World. Create your own Hodler and start your shitcoin adventure." }
    ]
</script>

<style lang="scss" scoped>

</style>
