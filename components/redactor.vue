<template lang="pug">
  .redactor_wrapper
    textarea(v-model="value" ref="textarea")
</template>

<script lang="coffee">
module.exports =
  props: ['value', 'options']
  mounted: ->
    console.log("mounted")
    options =
      focus: true
      plugins: ['imagemanager']
      imageResizable: true
      imagePosition: true
      imageManagerJson:   this.$axios.defaults.baseURL + '/uploads?type=image'
      fileManagerJson:    this.$axios.defaults.baseURL + '/uploads?type=not_image'
      imageUpload:        this.$axios.defaults.baseURL + '/uploads'
      clipboardUploadUrl: this.$axios.defaults.baseURL + '/uploads'
      fileUpload:         this.$axios.defaults.baseURL + '/uploads'
      callbacks:
        changed: (html) =>
          this.$emit('input', html)
    Object.assign(options, this.options)
    $R this.$refs.textarea, options
  beforeDestroy: ->
    console.log("unmount")
</script>
