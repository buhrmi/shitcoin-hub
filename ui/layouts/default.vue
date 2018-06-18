<template lang="pug">
  .layout.default
    .top_bar
      .wrapper
        nuxt-link(to="/")
          .logo
            span.poo 💩
            span.shitcoin shitcoin
            span.hub hub
          .user.logged_in(v-if="$store.state.user")
            p Your ETH wallet: {{ $store.state.eth_address }}
            p Logged in as {{ $store.state.user.email }}
            button(@click="$store.dispatch('logout')") Log out
          .user.logged_out(v-else)
            p Your ETH wallet: {{ $store.state.eth_address }}
            input(v-model="email")
            button(@click="$store.dispatch('authorize_with_email', {email})") Log in
            p (ADMIN PARTY IS ON: Anybody can log in as anyone and edit anything.)
    nuxt
    .footer
      .wrapper
        p Copyright 2018 by buhrmi. All Rights Reserved.
        p 
          | Problem? 
          a(href="mailto:wtf@buhrmi.de") wtf@buhrmi.de
        p
          a(href="https://github.com/buhrmi/shitcoinhub") Shitty source code published on GitHub
</template>

<script lang="coffee">
export default
  data: ->
    email: null
</script>


<style lang="scss">
$footer-height: 60px;
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
  padding-bottom: $footer-height;
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
}
.logo {
  font-size: 30px;
  .shitcoin {
    font-weight: 700;
  }
  .hub {
    font-weight: 100;
  }
}
</style>
