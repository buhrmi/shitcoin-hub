<template lang="pug">
  .game
    nuxt-link.button(to="/") Exit
    .hodler_status
      p Name: {{ $store.state.hodler.name }}
      p 💩: {{ $store.state.balances[$store.state.status.original_shitcoin_id] ? $store.state.balances[$store.state.status.original_shitcoin_id].balance : 0}}
      p ❤️: {{ $store.state.hodler.stats.hp }} / {{ $store.state.hodler.stats.maxhp }}
      img(:src="$store.state.hodler.md_image_url")
    .actions(v-if="$store.state.hodler.stats.hp > 0")
      p A Level 1 Fuddler manifests itself in front of you. Killing it will yield Original Shitcoins.
      button(@click="attack") Attack
    .actions(v-else)
      p {{$store.state.hodler.name}} is dead.
      p Wait for resurrection ({{ this.$store.state.hodler.stats.remaining_downtime }})
</template>

<script lang="coffee">
updater = null
module.exports =
  methods:
    attack: ->
      battle = {
        attacker_id: this.$store.state.hodler.id,
        target_id: this.$store.state.hodler.id,
        attacker_type: 'Hodler',
        target_type: 'Hodler'
      }
      this.$axios.$post('/battles', {battle})
    updateStats: ->
      # TODO: use Opalrb to compile ruby stats module into js, and use that to calculate stats
      this.$store.state.hodler.stats.remaining_downtime -= 1
      if (this.$store.state.hodler.stats.remaining_downtime <= 0)
        this.$store.state.hodler.stats.hp += 1
        if (this.$store.state.hodler.stats.hp > this.$store.state.hodler.stats.maxhp)
          this.$store.state.hodler.stats.hp = this.$store.state.hodler.stats.maxhp
  subscriptions:
    GameChannel:
      received: (entity) ->
        if (entity.id == this.$store.state.hodler.id)
          this.$store.state.hodler = Object.assign({}, this.$store.state.hodler, entity)
  mounted: ->
    console.log("mounted")
    clearInterval(updater)
    updater = setInterval(this.updateStats, 1000)
</script>


<style lang="scss">

</style>
