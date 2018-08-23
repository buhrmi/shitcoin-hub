<template lang="pug">
  .redactor_wrapper
    textarea(v-model="value" ref="textarea")
</template>

<script lang="coffee">
module.exports =
  props: ['value', 'options']
  # TODO: clean up on "beforeDestroy" event
  mounted: ->
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
</script>

<style lang="scss">
.redactor_tabs {
  margin-bottom: -1px;
  z-index: 1;
  position: relative;
  .tab {
    cursor: pointer;
    padding: 9px 38px;
    border-bottom: 1px solid transparent;
    display: inline-block;
    &:not(.active):hover {
      background-color: #449aef;
      color: white;
    }
    &.active {
      border: 1px solid #82b7ec;
      border-bottom: 1px solid white;
      font-weight: bold;
    }
  }
}
</style>
