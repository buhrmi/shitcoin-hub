<template lang="pug">
  .page.news
    .wrapper
      .redactor-styles.no-padding
        h1 Welcome to Shitcoin Kingdom
        h2 Create a Hodler, join the fight against the FUD and earn Original Shitcoins™
        p The Sodler is infesting Shitcoin Kingdom with the FUD. Can you defeat his army of FUD once and for all and become the greatest Hodler of Shitcoin World?
        p Total amount of Original Shitcoins™ earned: {{ $store.state.status.shitcoins_earned }} / {{ Number.parseFloat($store.state.status.shitcoins_supplied) }}
        nuxt-link(to="/faq") Learn more about Original Shitcoins™
        h2 Say hello to new Hodlers
        hodler(v-for="hodler in hodlers" :key="hodler.id" :hodler="hodler")
        h1 Hodl News
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
    [posts, hodlers] = await Promise.all [
      await $axios.$get('/posts'),
      await $axios.$get('/hodlers')
    ]
    return {posts, hodlers}
</script>

<style lang="scss" scoped>

</style>
