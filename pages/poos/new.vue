<template lang="pug">
  .page.news
    .wrapper.flex-grid
      .col
        .poo
          .layer
            img(:src="body.sd_image_url")
          .layer
            img(:src="face.sd_image_url")
          .layer
            img(:src="outfit.sd_image_url" v-if="outfit")
        button(v-if="$store.state.user" :disabled="creating" @click="createPoo") Create this Poo
        p(v-else) Log in to create this Poo
      .col
        .part(v-for="part in bodies")
          img(:src="part.icon_url" @click="body = part")
        .part(v-for="part in faces")
          img(:src="part.icon_url" @click="face = part")
        .part(v-for="part in outfits")
          img(:src="part.icon_url" @click="outfit = part")
      
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [bodies, faces, outfits] = await Promise.all [
      $axios.$get("/poo_parts?layer=1"),
      $axios.$get("/poo_parts?layer=2"),
      $axios.$get("/poo_parts?layer=3"),
    ]
    body = bodies[0]
    face = faces[0]
    outfit = null
    creating = false
    return {bodies, faces, outfits, body, face, outfit, creating}
  head: ->
    title:
      "Shitcoin World Poo Creator"
    meta: [
      { hid: 'og:description', property: 'og:description', content: "Create your own Poo and start your shitcoin adventure in Shitcoin World." }
    ]
  
  methods:
    createPoo: ->
      this.creating = true
      composition = "#{this.body.id}-#{this.face.id}"
      composition += "-#{this.outfit.id}" if this.outfit
      result = await this.$axios.$post('/poos', {composition})
      this.$router.push('/poos/' + result.id)
</script>

<style lang="scss" scoped>
.part {
  display: inline;
}
.poo {
  position: relative;
  // make it square aspect ratio
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  .layer {
    width: 100%;
    position: absolute;
  }
  img {
    width: 100%;
  }
}
</style>
