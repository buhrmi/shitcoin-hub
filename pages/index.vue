<template lang="pug">
  .page.news
    .wrapper
      h1 Shitty news
      .post(v-for="post in posts")
        .date {{ post.created_at }}
        h2.title
          nuxt-link(:to="{name: 'posts-id', params: {id: post.id}}") {{ post.title['en'] }}
        p.preview(v-html="post.body_html['en']")
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
