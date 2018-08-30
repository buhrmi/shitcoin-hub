<template lang="pug">
.hodler
  nuxt-link(:to="{name: 'hodlers-id', params: {id: hodler.id}}")
    span.name {{ hodler.name }}
    img.portrait(:src="hodler.md_image_url")
</template>

<script>
export default {
 props: ['hodler'] 
}
</script>

