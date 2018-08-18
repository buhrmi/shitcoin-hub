<template lang="pug">
  .layout.default
    .modal_background(v-if="!$store.state.accepted_terms_on")
      .modal_window
        p NOTE: The game database will be reset before official launch. Until the official launch, all deposits of shitcoins will be considered a donation towards the development of the game.
        button(@click="$store.dispatch('acceptTerms')") OK, sure. Whatever, bro.
    .top_bar
      .wrapper
        select.locale(@change="$store.dispatch('setLocale', {locale})" v-model="locale")
          option(value="en") English
          option(value="ja") 日本語

        nuxt-link.brand(to="/")
          img.logo(src="~/assets/logo.png")
          img.fontmark(src="~/assets/fontmark.png") 
    .nav_bar
      .wrapper
        .user_nav.logged_in(v-if="$store.state.user")
          // p ETH wallet address: {{ $store.state.eth_address }}
          nuxt-link(to="/me") {{ $store.state.user.email }}
          button(@click="$store.dispatch('logout')") Log out
        .user_nav.logged_out(v-else)
          // button.login_with_telegram(@click="$store.dispatch('authorize_with_telegram')") Log In With Telegram
          form(@submit.prevent="$store.dispatch('authorize_with_password', {email, password})")
            input(v-model="email" placeholder="email" type="email")
            input(v-model="password" placeholder="password" type="password")
            button Log in
        nuxt-link(to="/") Home
        nuxt-link(to="/shitcoins") Shitcoins
        // nuxt-link(to="/orders") Orders
        nuxt-link(to="/poos/new") Poo Creator
        // nuxt-link(to="/submit") Submit
    .wrapper
      .disclaimer NOTE: The game database will be reset before official launch. Until the official launch, all deposits of shitcoins will be considered a donation towards the development of the game.
    nuxt
    .footer
      .wrapper
        .right.links
          // a(target="_blank" href="https://docs.google.com/document/d/18P6Y1LIAkbHJ6pbjrHmLRCNljgPkNRTNVcxD8UTVX-E/edit?usp=sharing") Whitepaper 
          // a(target="_blank" href="https://github.com/shitcoinworld/api") API 
          nuxt-link(to="/status") Status
          // nuxt-link(to="/about") About
      
        p 
          | Copyright 2018 Shitcoin, Inc. All Rights Reserved. <br>
          | Problem? 
          a(href="mailto:support@shitcoinworld.com") support@shitcoinworld.com
          | <br>
          // a(href="https://github.com/shitcoinworld") Get the shitty source code on GitHub
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
  -webkit-font-smoothing: antialiased;
}
img {
  max-width: 100%;
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
  color: #1a0dab;
  // font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
p {
  line-height: 1.5;
  margin-bottom: 1em;
}
table {
  width: 100%;
}
th {
  text-align: left;
}
td {
  vertical-align: top;
}
li, ul {
  list-style-position: inside;
}
.wrapper {
  position: relative;
  max-width: 1070px;
  margin: 0 auto;
  @media screen and (max-width: 1090px) {
    margin: 0 20px;
  }
}
.disclaimer {
  margin: 12px 0;
  border: 1px solid burlywood;
  background: white;
  padding: 12px;
  background: #fafada;
}
.layout {
  min-height: 100vh;
  position: relative;
  padding-bottom: $footer-height + 20px;
}
.no-padding {
  padding: 0 !important;
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
  .links a {
    margin-left: 10px;
  }
}
.right {
  float: right;
}

.flex-grid {
  display: flex;
  // @media (max-width: 700px) {
  //   display: block;
  // }
}
.col {
  flex: 1;
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
  &:disabled {
    background: #eee;
    color: #999;
    cursor: not-allowed;
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
  position: relative;
  a {
    display: inline-block;
    padding: 5px 12px;
    color: black;
    &.active, &.nuxt-link-exact-active {
      font-weight: bold;
      border-bottom: 3px solid #ddd;
    }
  }
  .user_nav {
    position: absolute;
    right: 0;
  }
  button {
    padding: 3px 10px;
    box-shadow: none;
    border: 1px solid #ddd;
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

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
