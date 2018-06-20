<template lang="pug">
  .layout.default
    .top_bar
      .wrapper
        select.locale(@change="$store.dispatch('setLocale', {locale})" v-model="locale")
          option(value="en") English
          option(value="ja") 日本語

        nuxt-link.brand(to="/")
          img.logo(src="~/assets/logo.png")
          span.shitcoin shitcoin
          span.hub hub

    .wrapper
      h1 Coming soon.
    .footer
      .wrapper
        p 
          | Something wrong? 
          a(href="mailto:support@shitcoinhub") support@shitcoinhub.com
        p
          a(href="https://github.com/shitcoinhub") Get the shitty source code on GitHub
</template>

<script lang="coffee">
export default
  data: ->
    email: null
    locale: this.$store.state.locale
</script>


<style lang="scss">
$footer-height: 100px;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans', sans-serif;
  border-spacing: 0;
}
a {
  color: black;
  text-decoration: none;
}
.wrapper {
  width: 1070px;
  max-width: 100%;
  margin: 0 auto;
}
.layout {
  min-height: 100vh;
  position: relative;
  padding-bottom: $footer-height + 20px;
}
.footer {
  width: 100%;
  border-top: 1px solid #ddd;
  position: absolute;
  bottom: 0;
  padding-top: 10px;
  height: $footer-height;
}
@media screen and (max-width: 1090px) {
  .wrapper {
    margin: 0 20px;
  }
}
.top_bar {
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
  .user_area {
    float: right;
    text-align: right;
  }
  .locale {
    float: right;
  }
}
.brand {
  font-size: 30px;
  .logo {
    vertical-align: middle;
    height: 48px;
  }
  .shitcoin {
    font-weight: 700;
  }
  .hub {
    font-weight: 100;
  }
}
</style>
