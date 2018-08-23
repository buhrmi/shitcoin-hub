<template lang="pug">
  .page.news
    .wrapper
      h1 Create a Poo and defeat the FUD
      p An evil Sodler is infesting Shitcoin World with the FUD. Can you help your Poo defeat the army of FUD once and for all and become the greatest Hodler of all time?
      h1 New Poos have arrived
      poo(v-for="poo in poos" :key="poo.id" :poo="poo")
      h1 Shitcoin News
      .post(v-for="post in posts")
        .date {{ post.created_at }}
        h2.title
          nuxt-link(:to="{name: 'posts-id', params: {id: post.id}}") {{ post.title['en'] }}
        .redactor-styles.no-padding(v-html="post.body_html['en']")
        .creator {{ post.creator.name }}
      nuxt-link.button(v-if="$store.state.user" to="/posts/new") New Post
      p(v-else) Log in to post
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params}) ->
    [posts, poos] = await Promise.all [
      await $axios.$get('/posts'),
      await $axios.$get('/poos')
    ]
    return {posts, poos}
</script>

<style lang="scss" scoped>

</style>
