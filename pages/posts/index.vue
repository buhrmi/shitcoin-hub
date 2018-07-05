<template lang="pug">
  .page
    .wrapper
      h1 Posts
      nuxt-link.button(to='/posts/new') New Post
      .post(v-for="post in posts")
        .date {{ post.created_at }}
        nuxt-link(:to="{name: 'posts-id', params: {id: post.id}}") {{ post.title['en'] }}
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}}) ->
    posts: await $axios.$get('/posts')
</script>

