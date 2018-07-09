<template lang="pug">
  .image-uploader(:style="`background-image:url(${this.value[this.field + '_url']})`")
    dropzone#image-uploader(ref="dropzone" :options="dropzone_options")
</template>

<script lang="coffee">
module.exports =
  props: ['param', 'value', 'field', 'path']
  mounted: ->
    this.$refs.dropzone.dropzone.on 'complete', (file) =>
      this.$refs.dropzone.dropzone.removeFile(file)
      newValue = await this.$axios.$get(this.path)
      this.value[this.field + '_url'] = newValue[this.field + '_url']
  data: ->
    dropzone_options:
      url: this.$axios.defaults.baseURL + this.path
      includeStyling: false
      method: 'patch'
      paramName: this.param
      dictDefaultMessage: if this.value[this.field + '_url'] then 'Change Image' else 'Set Image'
</script>

<style lang="scss" scoped>
.vue-dropzone {
  border: none;
  background: transparent;
  height: 100%;
  color: white;
  -webkit-transition: background-color 0.2s linear;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: rgba(255,255,255,0.2);
  }
}
</style>
