<template lang="pug">
  .layout.default
    h1 Shitcoin Master Deluxe Premium
    input(v-model="email")
    button(@click="$store.dispatch('authorize', {email})") Log in
    nuxt
    .footer
</template>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans', sans-serif;
  border-spacing: 0;
}
</style>
