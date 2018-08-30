<template lang="pug">
  .page.news
    .wrapper
      .side
        .hodler
          .layer
            img(:src="body.sd_image_url")
          .layer
            img(:src="face.sd_image_url")
          .layer
            img(:src="outfit.sd_image_url" v-if="outfit")
        button(:disabled="creating" @click="createHodler") Create this Hodler
      .side
        .part(:class="{active: body.id == part.id}" v-for="part in bodies")
          img(:src="part.icon_url" @click="body = part")
        .part(:class="{active: face.id == part.id}" v-for="part in faces")
          img(:src="part.icon_url" @click="face = part")
        .part(:class="{active: outfit && outfit.id == part.id}" v-for="part in outfits")
          img(:src="part.icon_url" @click="outfit = part")
      
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [bodies, faces, outfits] = await Promise.all [
      $axios.$get("/hodler_parts?layer=1"),
      $axios.$get("/hodler_parts?layer=2"),
      $axios.$get("/hodler_parts?layer=3"),
    ]
    body = bodies[0]
    face = faces[0]
    outfit = null
    creating = false
    return {bodies, faces, outfits, body, face, outfit, creating}
  head: ->
    title:
      "Shitcoin World Hodler Creator"
    meta: [
      { hid: 'og:description', property: 'og:description', content: "Create your own Hodler and start your shitcoin adventure in Shitcoin World." }
    ]
  
  methods:
    createHodler: ->
      if !this.$store.state.user
        this.$store.state.showSignup = true
      else
        this.creating = true
        composition = "#{this.body.id}-#{this.face.id}"
        composition += "-#{this.outfit.id}" if this.outfit
        result = await this.$axios.$post('/hodlers', {composition})
        this.$router.push('/hodlers/' + result.id)
</script>

<style lang="scss" scoped>
.side {
  display: inline-block;
  width: 50%;
  vertical-align: top;
}
.part {
  display: inline-block;
  border-radius: 20px;
  // border: 1px solid #eee;
  &.active {
    // box-shadow: 0px 2px 5px rgba(189, 151, 101, 0.4);
    border: 2px solid rgba(189, 151, 101, 0.4);
    
    // border: 1px solid red;
  }
}
.hodler {
  position: relative;
  // make it square aspect ratio
  width: 100%;
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
