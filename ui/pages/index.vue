<template lang="pug">
  .page
    .wrapper
      h1 Welcome
      .create_asset(v-if="$store.state.user")
        h2 Register Asset
        select(v-model="new_asset.platform")
          option(value="STR") Stellar
          option(value="EOS") EOS
          option(value="ETH") ETH
          option(value="Waves") Waves
          option(value="native") none/native
        input(v-model="new_asset.website")
      .unregistered(v-else) Please log in to register your asset
</template>

<script lang="coffee">
export default
  data: ->
    new_asset:
      platform: 'STR'
      website: null
</script>
