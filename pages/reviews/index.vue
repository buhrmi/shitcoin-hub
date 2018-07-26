<template lang="pug">
  .page
    .wrapper
      h1 reviews
      nuxt-link.button(to='/reviews/new') New review
      .review(v-for="review in reviews")
        .date {{ review.created_at }}
        nuxt-link(:to="{name: 'reviews-id', params: {id: review.id}}") {{ review.id }}
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}}) ->
    reviews: await $axios.$get('/reviews')
</script>

