<template lang="pug">
  .page
    .wrapper
      h1(v-if="value.id") Edit {{ value.shitcoin.name }} Review
      h1(v-else) New {{ value.shitcoin.name }} Review
      redactor(v-model="value.html['en']")
      button(@click="save") Save Review
      nuxt-link(v-if="value.id" :to="{name: 'reviews-id', params: {id: value.id}}") Cancel
      nuxt-link(v-else :to="{name: 'reviews'}") Cancel
</template>

<script lang="coffee">
module.exports =
  props: ['value']
  methods:
    save: ->
      if this.value.id
        result = await this.$axios.$patch('/reviews/' + this.value.id, review: this.value)
      else
        result = await this.$axios.$post('/reviews', review: this.value)
      this.$router.push('/reviews/' + result.id)
</script>
