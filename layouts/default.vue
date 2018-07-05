<template lang="pug">
  .layout.default
    .modal_background(v-if="!$store.state.accepted_terms_on")
      .modal_window
        p {{ $t('simpleterms') }}
        button(@click="$store.dispatch('acceptTerms')") I agree
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
          form(@submit.prevent="$store.dispatch('authorize_with_password', {email, password})")
            input(v-model="email" placeholder="email" type="email")
            input(v-model="password" placeholder="password" type="password")
            button Log in

        nuxt-link.brand(to="/")
          img.logo(src="~/assets/logo.png")
          img.fontmark(src="~/assets/fontmark.png") 

        | because everything is a shitcoin
    .nav_bar
      .wrapper
        nuxt-link(to="/") News
        nuxt-link(to="/shitcoins") Shitcoins
        nuxt-link(to="/balances") Balances
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

html {
  font-family: 'Noto Sans', sans-serif;
  font-size: 15px;
}
* {
  font-family: inherit;
  font-size: inherit;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-spacing: 0;
}
h1 {
  font-size: 32px;
}
h2 {
  font-size: 26px;
}
a {
  color: black;
  text-decoration: none;
}
p {
  line-height: 1.5;
  margin-bottom: 1em;
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
.modal_background {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(16, 16, 18, .18);
  z-index: 1000;
  .modal_window {
    position: absolute;
    width: 600px;
    min-width: 50vw;
    max-width: 95vw;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    padding: 20px;
    background: white;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .07), 0 2px 15px rgba(80, 80, 80, .25);
    border-radius: 3px;
    color: #000;
  }
}
.footer {
  clear: both;
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
button, .button {
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  padding: 10px 15px 9px 15px;
  outline: 0;
  border: none;
  vertical-align: middle;
  text-decoration: none;
  zoom: 1;
  position: relative;
  color: rgba(0, 0, 0, .85);
  border-radius: 2px;
  background: rgba(255, 255, 255, .97);
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .22);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .22);
  margin-right: 5px;
  margin-bottom: 4px;  
  &.primary, &:hover {
    outline: 0;
    color: #fff;
    background: #449aef;
  }
}
.side_col {
  vertical-align: top;
  width: 260px;
  display: inline-block;
}
.main_col {
  vertical-align: top;
  width: calc(100% - 260px);
  display: inline-block;
}


.top_bar {
  padding: 16px 0;
  
  .user_area {
    float: right;
    text-align: right;
  }
  .locale {
    float: right;
  }
}
.nav_bar {
  border-bottom: 1px solid #ddd;
  a {
    display: inline-block;
    padding: 5px 12px;
    &.nuxt-link-exact-active {
      font-weight: bold;
      border-bottom: 3px solid #ddd;
    }
  }
}
.brand {
  font-size: 30px;
  .logo {
    vertical-align: middle;
    height: 48px;
  }
  .fontmark {
    vertical-align: middle;
    height: 36px;
    margin-left: 10px;
  }
}
</style>
