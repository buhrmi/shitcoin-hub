<template lang="pug">
  .page.news
    .wrapper
      h1 Welcome to Shitcoin World
      p Oh no! The dark Sodler is spreading FUD in Shitcoin World. Can you help your Poo become the greatest Hodler of all time and defeat the army of FUD once and for all? And which shitcoin will become the shittiest shitcoin of all time?
      h1 What's new?
      .post(v-for="post in posts")
        .date {{ post.created_at }}
        h2.title
          nuxt-link(:to="{name: 'posts-id', params: {id: post.id}}") {{ post.title['en'] }}
        .preview(v-html="post.body_html['en']")
        .creator {{ post.creator.name }}
      nuxt-link.button(v-if="$store.state.user" to="/posts/new") New Post
      p(v-else) Log in to post
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params}) ->
    posts: await $axios.$get('/posts')
</script>

<style lang="scss" scoped>
.post {
  margin: 30px 0;
  
}
</style>
