<template lang="pug">
  .game
    nuxt-link.button(to="/") Exit
    p UNDER CONSTRUCTION. CHECK BACK LATER.
    .hodler_status
      p Name: {{ $store.state.hodler.name }}
      p HP: {{ $store.state.hodler.stats.hp }} / {{ $store.state.hodler.stats.maxhp }}
      img(:src="$store.state.hodler.md_image_url")
</template>

<style lang="scss">

</style>
