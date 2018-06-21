<template lang="pug">
  .layout.default
    .top_bar
      .wrapper
        select.locale(@change="$store.dispatch('setLocale', {locale})" v-model="locale")
          option(value="en") English
          option(value="ja") 日本語
        .user_area.logged_in(v-if="$store.state.user")
          // p ETH wallet address: {{ $store.state.eth_address }}
          p Logged in as {{ $store.state.user.email }}
          button(@click="$store.dispatch('logout')") Log out
        .user_area.logged_out(v-else)
          // p ETH wallet address: {{ $store.state.eth_address }}
          input(v-model="email" placeholder="email")
          input(v-model="password" placeholder="password")
          button(@click="$store.dispatch('authorize_with_password', {email, password})") Log in

        nuxt-link.brand(to="/")
          img.logo(src="~/assets/logo.png")
          span.shitcoin shitcoin
          span.hub hub
        p (PARTY MODE is ON: Anybody can edit anything.)
    nuxt
    .footer
      .wrapper
        nuxt-link.right(to="/about") About
        p Copyright 2018 Shitcoin, Inc. All Rights Reserved.
        p 
          | Problem? 
          a(href="mailto:support@shitcoinhub.com") support@shitcoinhub.com
        p
          a(href="https://github.com/shitcoinhub") Get the shitty source code on GitHub
</template>

<script lang="coffee">
export default
  data: ->
    email: null
    password: null
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
table {
  width: 100%;
}
td {
  vertical-align: top;
}
li, ul {
  list-style-position: inside;
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
.right {
  float: right;
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
