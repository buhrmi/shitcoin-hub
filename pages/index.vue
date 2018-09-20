<template lang="pug">
  .page
    .wrapper
      .section.welcome
        h1 Welcome to Shitcoin Kingdom
        h2 Create a Hodler, join the fight against the FUD and get Shitcoins!
        .shitcoin_info
          .half
            .total Total amount of 💩 distributed
            .distributed {{ $store.state.status.shitcoins_earned }}
          .half
            .total Last Price
            .distributed 1💩 = {{ $store.state.prices[$store.state.status.original_shitcoin_id] }} {{ $store.state.quote_shitcoin.symbol }}
        .main_coa
          nuxt-link.button(to="/hodlers/new") Make your own FREE Hodler
        | or 
        nuxt-link(to="/faq") learn more about Original Shitcoins™
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
.shitcoin_info {
  margin: 80px 0;
  .half {
    display: inline-block;
    width: 50%;
  }
}
.main_coa {
  .button {
    padding: 19px 30px;
    font-size: 27px;
  }
}
.welcome {
  text-align: center;
  h1 {
    font-size: 50px;
    margin: 40px 0;
  }
  h2 {
    margin: 30px 0;
  }
  .total {
    font-size: 22px;
  }
  .distributed {
    font-weight: bold;
    font-size: 40px;
  }
}
</style>
