<template lang="pug">
  .page
    .wrapper
      h1 About Shitcoin World
      p Shitcoin World is operated by Shitcoin, Inc.
      h2 Company details
      p <strong>Shitcoin, Inc</strong> is registered in Japan
      table
        tbody
          tr
            td Representative Director
            td
              nuxt-link(to="/profiles/buhrmi") Stefan Buhrmester
          tr
            td Company Registration Number
            td 0112 - 01 - 019210
          tr
            td Office Address
            td Fujisoft Akihabara 12F<br>Kanda Neribeicho 3, Chiyoda<br>Tokyo 101-0022
          tr
            td Business Activities<br>(定款改正進行中)
            td
              ul
                li Development and operation of digital assets exchange
                li Development of decentralized applications
                li Game development
                li Smart Contract development
                li IT consulting
                li Marketing and PR
                li Related activities
      img(src="~/assets/wtfisthis.png" width="500")
      h2 History
      p 2016: Incorporated as IT consulting company with the name Stefan K.K. (ステファン株式会社)
      p 2017: Office moved to Akihabara, into shared DMM.make space
      p 2018: Official company name change to <strong>Shitcoin, Inc.</strong> (株式会社シットコイン)
      
</template>

