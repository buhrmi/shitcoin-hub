<template lang="pug">
  .page.news
    .wrapper.flex-grid
      .col.poo
        .layer
          img(:src="body.sd_image_url")
        .layer
          img(:src="face.sd_image_url")
        .layer
          img(:src="outfit.sd_image_url" v-if="outfit")
      .col.parts
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
.poo {
  position: relative;
  // &:after {
  //   content: "";
  //   display: block;
  //   padding-bottom: 100%;
  // }
  .layer {
    width: 100%;
    position: absolute;
  }
  img {
    width: 100%;
  }
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
</style>
