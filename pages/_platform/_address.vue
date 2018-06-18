<template lang="pug">
  .content
    .wrapper
      h1 {{ asset.symbol }} on {{ asset.platform }}
      form(@submit.prevent="submitAsset(asset)")
        textarea(v-model.lazy="asset.summary_en" name="content" ref="editor")
        button Save changes

</template>

<script lang="coffee">
editor = null

export default
  data: ->
    text: 'Shitcoin summary'
  asyncData: ({app: {$axios}, params, error, store}) ->
    assets = await $axios.$get('/assets/', {params})
    console.log(params)
    if (assets.length > 0)
      asset = assets[0]
    else
      error({ statusCode: 404, message: 'Shitcoin not found' })
    return
      asset: asset
  head:
    script: [
      {src: 'https://cdn.ckeditor.com/ckeditor5/10.0.1/classic/ckeditor.js'}
    ]
  mounted: ->
    editor = ClassicEditor
      .create(this.$refs.editor)
      .then (editor) => 
        editor.model.document.on 'change', =>
          editor.updateElement()
          if document.createEvent
            evt = document.createEvent("HTMLEvents")
            evt.initEvent("change", false, true)
            editor.element.dispatchEvent(evt)
          else
            editor.element.fireEvent("onchange")
      .catch (err) -> console.error
  watch:
    'asset.summary_en': ->
      console.log("hello")
  methods:
    submitAsset: (asset) ->
      this.$nextTick =>
        await this.$axios.$put('/assets/' + asset.id, {asset})
</script>
