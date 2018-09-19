<template lang="pug">
.page
  .wrapper
    .actions(v-if="$store.state.hodler.hp() > 0")
      p A Level 1 Fuddler manifests itself in front of you. Killing it will yield Original Shitcoins.
      button(@click="attack") Attack
    .actions(v-else)
      p You are dead.
      p Wait for resurrection ({{ Math.round(this.$store.state.hodler.remaining_downtime()) }} seconds remaining)
</template>

<script lang="coffee">
module.exports =
  layout: 'game'
  methods:
    attack: ->
      battle = {
        attacker_id: this.$store.state.hodler.id,
        target_id: this.$store.state.hodler.id,
        attacker_type: 'Hodler',
        target_type: 'Hodler'
      }
      this.$axios.$post('/battles', {battle})
  mounted: ->
    clearInterval(this._updater)
    this._updater = setInterval((=> this.$forceUpdate()), 1000)
</script>



