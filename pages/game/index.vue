<template lang="pug">
.page
  .wrapper
    h2 Prologue
    p 
    p It was a beautiful day in Shitcoin Kingdom when dangerous Fudsters appeared seemingly out of nowhere and started to attack everybody.
    .entities
      .entity(v-for="entity in $store.state.entities")
        p {{ entity.name }}
        button(:disabled="$store.state.hodler.hp() <= 0" @click="attack(entity.id, entity.type)") Attack  
      .empty(v-if="$store.state.entities.length == 0")
        p All Fudsters have been killed. Don't go away, they will respawn!
    .actions(v-if="$store.state.hodler.hp() <= 0")
      p You are dead. Tip: Only attack with full health.
      p Wait for resurrection ({{ Math.round(this.$store.state.hodler.remaining_downtime()) }} seconds remaining)
</template>

<script lang="coffee">
module.exports =
  layout: 'game'
  methods:
    attack: (id, type)->
      battle = {
        target_id: id,
        target_type: type
      }
      this.$axios.$post('/battles', {battle})
  mounted: ->
    clearInterval(this._updater)
    this._updater = setInterval((=> this.$forceUpdate()), 1000)
</script>



