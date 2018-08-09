<template lang="pug">
  .page.news
    .wrapper
      .poo
        .layer
          img(:src="body.sd_image_url")
        .layer
          img(:src="face.sd_image_url")
        .layer
          img(:src="outfit.sd_image_url" v-if="outfit")
      .parts
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
    return {bodies, faces, outfits, body, face, outfit}
</script>

<style lang="scss" scoped>
.part {
  display: inline;
}
.parts {
  margin-left: 50%;
}
.poo {
  width: 50%;
  float: left;
  height: 750px;
  position: relative;
  .layer {
    width: 100%;
    position: absolute;
  }
  img {
    width: 100%;
  }
}
</style>
