<template lang="pug">
  .page
    .wrapper
      h1(v-if="value.id") Edit Post
      h1(v-else) New Post
      input(v-model="value.title['en']" placeholder="Title")
      redactor(v-model="value.body_html['en']")
      button(@click="save") Save Post
      nuxt-link(v-if="value.id" :to="{name: 'posts-id', params: {id: value.id}}") Cancel
      nuxt-link(v-else :to="{name: 'posts'}") Cancel
</template>

<script lang="coffee">
module.exports =
  props: ['value']
  methods:
    save: ->
      if this.value.id
        result = await this.$axios.$patch('/posts/' + this.value.id, post: this.value)
      else
        result = await this.$axios.$post('/posts', post: this.value)
      this.$router.push('/posts/' + result.id)
</script>
