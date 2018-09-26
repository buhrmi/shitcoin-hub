<template lang="pug">
  .layout.default
    //- .modal_background(v-if="!$store.state.accepted_terms_on")
    //-   .modal_window
    //-     p Please join our <a target="_blank" href="https://t.me/shitcoinworld/">Telegram channel</a> to receive free <b>Original Shitcoins™</b>
    //-     button(@click="$store.dispatch('acceptTerms')") OK, sure. Whatever, bro.
    .modal_background(v-if="$store.state.showSignup")
      .modal_window
        .close_button(@click="$store.state.showSignup = false")
          i.fa.fa-close
        h2 Sign up
        form(@submit.prevent="$store.dispatch('authorize_with_password', {email, password})")
          table.form
            tbody
              tr.field
                td.label
                  label Email
                td.input
                  input(v-model="email" type="email")
              tr.field
                td.label
                  label Password
                td.input
                  input(v-model="password" type="password")
              tr.field
                td.label
                td.input
                  label
                    input(type="checkbox" v-model="liablilty_removed")
                    |  I accept the Terms &amp; Conditions (coming soon).
              tr.field
                td.label
                td.input
                  button(:disabled="!liablilty_removed") Sign up
    .top_bar
      .user_area.logged_in(v-if="$store.state.user")
        //- p ETH wallet address: {{ $store.state.eth_address }}
        nuxt-link(to="/me") {{ $store.state.user.email }}
        button(@click="$store.dispatch('logout')") Log out
      .user_area.logged_out(v-else)
        //- button.login_with_telegram(@click="$store.dispatch('authorize_with_telegram')") Log In With Telegram
        form(@submit.prevent="$store.dispatch('authorize_with_password', {email, password})")
          //- input(v-model="email" placeholder="email" type="email")
          //- input(v-model="password" placeholder="password" type="password")
        button(@click="$store.state.showSignup = true") Sign up
        | or 
        a(@click="$store.state.showSignup = true") Log in 
      nuxt-link.brand(to="/")
        img.logo(src="~/assets/logo.png")
        img.fontmark(src="~/assets/fontmark.png")

      span All prices are in {{ $store.state.quote_shitcoin.symbol }}. Your balance: {{ $store.getters.balance }} {{ $store.state.quote_shitcoin.symbol }}
   
      .nav_bar
        .wrapper
          nuxt-link(to="/") Home
          nuxt-link(to="/hodlers/my") My Hodlers
          nuxt-link(to="/shitcoins") Shitcoin Market
          //- nuxt-link(to="/orders") Orders
          //- nuxt-link(to="/submit") Submit
    .wrapper
      .disclaimer
        span Hi there, fellow wanderer. I see, you found your way into Shitcoin World. Please note that everything here is still under construction. That means: MANY BUGS. Only the toughest hodlers should proceed.
        span Character wipes can occur at any time without prior announcement. Your Shitcoin balance is tied to your account, not your character.
    nuxt
    .footer
      .wrapper
        .container
          .copyright
            h3 Shitcoin World™
            p Copyright 2018 Shitcoin, Inc. All Rights Reserved.
            p Contact: <a href="mailto:support@shitcoinworld.com">support@shitcoinworld.com</a>
          .status
            h3 Status
            p Deposits: {{ $store.state.status.deposits ? 'Seems OK' : 'Not running' }}
            p Withdrawals: {{ $store.state.status.withdrawals ? 'Seems OK' : 'Not running' }}
          .links
            h3 More Poop
            p
              nuxt-link(to="/create") Shitcoin Maker
            p 
              nuxt-link(to="/faq") FAQ
            p 
              nuxt-link(to="/api") API
          //- nuxt-link(to="/status") Status
          //- select.locale(@change="$store.dispatch('setLocale', {locale})" v-model="$store.state.locale")
          //-   option(value="en") English
          //-   option(value="ja") 日本語
          //- nuxt-link(to="/about") About
      
</template>

<script lang="coffee">
export default
  data: ->
    liablilty_removed: false
    email: null
    password: null
    showSignup: false
</script>


<style lang="scss">
$footer-height: 200px;


.layout {
  min-height: 100vh;
  position: relative;
  padding-bottom: $footer-height + 20px;
}

.disclaimer {
  margin: 24px 0;
  border: 1px solid burlywood;
  background: white;
  padding: 12px;
  background: #fafada;
}

.footer {
  clear: both;
  width: 100%;
  color: white;
  background: #272727;
  position: absolute;
  bottom: 0;
  padding-top: 42px;
  height: $footer-height;

  a {
    color: white;
    margin-left: 10px;
  }
}

</style>
