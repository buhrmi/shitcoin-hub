<template lang="pug">
.page
  .wrapper
    h1 Tools
    h2 Rescan block for Deposits
    tr.field
      th.label Platform
      td.input
        select(v-model="platform_id")
          option(v-for="platform in $store.state.platforms" :value="platform.id") {{ platform.name }}
      tr.field
        th.label Block
        td.input
          input(v-model="block")
      tr.field
        th.label
        td.input
          button(@click="scan") Rescan 
</template>

<script lang="coffee">
module.exports =
  data: ->
    platform_id: 1
    block: ''
  methods:
    scan: ->
      result = await this.$axios.$post('/tools/rescan_block', {platform_id: this.platform_id, block: this.block})
      this.$toast.success(result)
</script>

