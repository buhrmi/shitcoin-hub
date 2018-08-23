<template lang="pug">
.poo
  nuxt-link(:to="{name: 'poos-id', params: {id: poo.id}}")
    span.name {{ poo.name }}
    img.portrait(:src="poo.sd_image_url")
</template>

<script>
export default {
 props: ['poo'] 
}
</script>

