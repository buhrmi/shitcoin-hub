<template lang="pug">
  .page
    .wrapper
      h1 {{ benefit.shitcoin.name}} Benefit
      .body(v-html="benefit.html['en']")
      nuxt-link.button(v-if="$store.state.user" :to="{name: 'benefits-id-edit', params: {id: benefit.id}}") Edit Benefit
      nuxt-link(:to="{name: 'benefits'}") Back to
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params}) ->
    benefit: await $axios.$get('/benefits/' + params.id)
  head: ->
    title: 'Shitcoin Benefit'
    meta: [
      { hid: 'og:description', property: 'og:description', content: (this.benefit.html['en'] || '').replace(/(<([^>]+)>)/ig,"") }
    ]
</script>
