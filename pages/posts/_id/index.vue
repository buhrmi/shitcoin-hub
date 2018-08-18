<template lang="pug">
  .page
    .wrapper
      h1 {{ post.title['en'] }}
      .redactor-styles.no-padding(v-html="post.body_html['en']")
      nuxt-link.button(v-if="$store.state.user" :to="{name: 'posts-id-edit', params: {id: post.id}}") Edit Post
      nuxt-link(:to="{name: 'posts'}") Home
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params}) ->
    post: await $axios.$get('/posts/' + params.id)
  head: ->
    title: this.post.title['en']
    meta: [
      { hid: 'og:description', property: 'og:description', content: (this.post.body_html['en'] || '').replace(/(<([^>]+)>)/ig,"") }
    ]
</script>
