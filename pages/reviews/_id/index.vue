<template lang="pug">
  .page
    .wrapper
      h1 {{ review.shitcoin.name}} Review
      .body(v-html="review.html['en']")
      nuxt-link.button(v-if="$store.state.user" :to="{name: 'reviews-id-edit', params: {id: review.id}}") Edit Review
      nuxt-link(:to="{name: 'reviews'}") Back to
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params}) ->
    review: await $axios.$get('/reviews/' + params.id)
  head: ->
    title: 'Shitcoin Review'
    meta: [
      { hid: 'og:description', property: 'og:description', content: (this.review.html['en'] || '').replace(/(<([^>]+)>)/ig,"") }
    ]
</script>
