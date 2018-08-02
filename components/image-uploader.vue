<template lang="pug">
  .image-uploader(:style="style")
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
  computed:
    style: ->
      bgurl = this.value[this.field + '_url']
      if bgurl
        "background-image:url(#{bgurl})"
      else
        ''
  data: ->
    dropzone_options:
      url: this.$axios.defaults.baseURL + this.path
      includeStyling: false
      method: 'patch'
      paramName: this.param
      dictDefaultMessage: if this.value[this.field + '_url'] then 'Change Image' else 'Set Image'
</script>

<style lang="scss">
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
.image-uploader {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  background: #888;
  color: white;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
