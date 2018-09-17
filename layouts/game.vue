<template lang="pug">
  .game
    nuxt-link.button(to="/") Exit
    .hodler_status
      p Name: {{ $store.state.hodler.name }}
      p HP: {{ $store.state.hodler.stats.hp }} / {{ $store.state.hodler.stats.maxhp }}
      img(:src="$store.state.hodler.md_image_url")
    .actions(v-if="$store.state.hodler.stats.hp > 0")
      p A Level 1 Fuddler manifests itself in front of you. Killing it will yield Original Shitcoins.
      button(@click="attack") Attack
    .actions(v-else)
      p {{$store.state.hodler.name}} is dead.
      p Wait for resurrection.
</template>

<script lang="coffee">
module.exports =
  methods:
    attack: ->
      this.$axios.$post('/battles', {battle: {target_id: 1}})
  subscriptions:
    GameChannel:
      received: (entity) ->
        if (entity.id == this.$store.state.hodler.id)
          this.$store.state.hodler = Object.assign({}, this.$store.state.hodler, entity)
</script>


<style lang="scss">

</style>
