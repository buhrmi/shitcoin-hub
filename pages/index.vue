<template lang="pug">
  .page
    .wrapper
      .section.welcome
        h1 Welcome to Shitcoin Kingdom
        h2 Create a Hodler, join the fight against the FUD and earn Original Shitcoins™
        p The Sodler is infesting Shitcoin Kingdom with the FUD. Can you defeat his army of FUD once and for all and become the greatest Hodler of Shitcoin World?
        p Total amount of Original Shitcoins™ earned: {{ $store.state.status.shitcoins_earned }} / {{ Number.parseFloat($store.state.status.shitcoins_supplied) }}
        nuxt-link.button(to="/hodlers/new") Create a Hodler
        nuxt-link(to="/faq") or learn more about Original Shitcoins™
      .section
        h1 Say hello to new Hodlers
        .container
          hodler.card(v-for="hodler in hodlers" :key="hodler.id" :hodler="hodler")
      .section
        h1 Hodl News
        .container
          .post.card.redactor-styles(v-for="post in posts")
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
.section {
  margin-bottom: 100px;
}
.welcome {
  h1 {
    font-size: 40px;
    margin: 30px 0;
  }
  h2 {
    margin: 20px 0;
  }
  text-align: center;
}
</style>
