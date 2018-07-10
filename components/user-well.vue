<template lang="pug">
  .card.user
    .display_name {{ user.display_name }}
</template>

<script lang="coffee">
module.exports =
  props: ['user']
</script>
