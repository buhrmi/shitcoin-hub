<template lang="pug">
  .content
    .wrapper
      h1 {{ asset.symbol }} on {{ asset.platform }}
      p {{ asset.address }}
      .summary(v-if="!editing")
        .html(v-html="asset.summary_html")
        button(@click="edit") Edit
      .summary(v-else="editing")
        form(@submit.prevent="submitAsset(asset)")
          textarea(v-model.lazy="asset.summary_html_en" ref="editor")
          button Save changes

</template>

<script lang="coffee">
export default
  data: ->
    editing: false
  asyncData: ({app: {$axios}, params, error, store}) ->
    assets = await $axios.$get('/assets/', {params})
    if (assets.length > 0)
      asset = assets[0]
    else
      error({ statusCode: 404, message: 'Shitcoin not found' })
    return
      asset: asset
  mounted: ->
    $R.ajax.settings =
      headers:
        Authorization: this.$store.state.authorization
  methods:
    edit: ->
      this.editing = true
      this.$nextTick ->
        $R this.$refs.editor,
          plugins: ['imagemanager'],
          imageResizable: true,
          imagePosition: true
          imageManagerJson:   this.$axios.defaults.baseURL + '/uploads?type=image'
          fileManagerJson:    this.$axios.defaults.baseURL + '/uploads?type=not_image'
          imageUpload:        this.$axios.defaults.baseURL + '/uploads'
          clipboardUploadUrl: this.$axios.defaults.baseURL + '/uploads'
          fileUpload:         this.$axios.defaults.baseURL + '/uploads'
          imageData:
            attachee_id: this.asset.id
            attachee_type: 'Asset'
          callbacks:
            # Need to manually trigger the "change" event on the DOM element to make Vue pick up the changes.
            changed: (html) =>
              if document.createEvent
                evt = document.createEvent("HTMLEvents")
                evt.initEvent("change", false, true)
                this.$refs.editor.dispatchEvent(evt)
              else
                this.$refs.editor.fireEvent("onchange")
    submitAsset: (asset) ->
      this.asset = await this.$axios.$put('/assets/' + asset.id, {asset})
      this.editing = false
</script>
