<template lang="pug">
  .page
    .wrapper
      h1 benefits
      nuxt-link.button(to='/benefits/new') New benefit
      .benefit(v-for="benefit in benefits")
        .date {{ benefit.created_at }}
        nuxt-link(:to="{name: 'benefits-id', params: {id: benefit.id}}") {{ benefit.id }}
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}}) ->
    benefits: await $axios.$get('/benefits')
</script>

