<template lang="pug">
  .page
    .wrapper
      h1(v-if="value.id") Edit {{ value.shitcoin.name }} Benefit
      h1(v-else) Submit {{ value.shitcoin.name }} Benefit
      redactor(v-model="value.html['en']")
      .shittiness
        h2 How many shits are given?
        select(v-model="value.rating")
          option(v-for="i in 5" :value="i") {{ i }}
        |  out of 5 shits.
      button(@click="save") Save Benefit
      nuxt-link(v-if="value.id" :to="{name: 'benefits-id', params: {id: value.id}}") Cancel
      nuxt-link(v-else :to="{name: 'benefits'}") Cancel
</template>

<script lang="coffee">
module.exports =
  props: ['value']
  methods:
    save: ->
      if this.value.id
        result = await this.$axios.$patch('/benefits/' + this.value.id, benefit: this.value)
      else
        result = await this.$axios.$post('/benefits', benefit: this.value)
      this.$router.push('/benefits/' + result.id)
</script>

<style lang="scss">
.star {
  .empty {
    
  }
}
</style>
