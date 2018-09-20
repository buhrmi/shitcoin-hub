<template lang="pug">
  .page
    .wrapper
      h1 {{ hodler.name }}
      .container
        .hodler
          img(:src="hodler.sd_image_url")
        .item
          p Birthday: {{ hodler.created_at }}
          .my_hodler_actions(v-if="$store.state.user && hodler.owner_id == $store.state.user.id")
            button(@click="$store.dispatch('playWithHodler', hodler.id)") Start Game
          .other_hodler(v-else)
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
    title: this.hodler.name
    meta: [
      { hid: 'og:image', property: 'og:image', content: this.hodler.sd_image_url },
      { hid: 'og:description', property: 'og:description', content: "#{this.hodler.name} is a Level 1 Hodler in Shitcoin World. Create your own Hodler and start your shitcoin adventure." }
    ]
</script>

<style lang="scss" scoped>

</style>
