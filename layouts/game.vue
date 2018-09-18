<template lang="pug">
  .game
    nuxt-link.button(to="/") Exit
    .wrapper
      .hodler_status
        img(:src="$store.state.hodler.md_image_url" style="height: 60px;border:2px solid #aaa;border-radius:60px;float:left;margin-right:10px")
        p {{ $store.state.hodler.name }}
        p 💩 {{ $store.state.balances[$store.state.status.original_shitcoin_id] ? $store.state.balances[$store.state.status.original_shitcoin_id].balance : 0}}
        p ❤️ {{ $store.state.hodler.stats.hp }} / {{ $store.state.hodler.stats.maxhp }}
    .nav_bar
      .wrapper
        nuxt-link(to="/game") World
        nuxt-link(to="/game/inventory") Inventory
        nuxt-link(to="/game/messages") Messages
    .wrapper
      nuxt
</template>

<script lang="coffee">
updater = null
module.exports =
  methods:
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
    clearInterval(updater)
    updater = setInterval(this.updateStats, 1000)
</script>


<style lang="scss">

</style>
