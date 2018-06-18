<template lang="pug">
  .content
    .wrapper
      h1 {{ asset.symbol }} on {{ asset.platform }}
      p Address:
      p Website:
      h2 Summary


</template>

<script lang="coffee">
export default
  asyncData: ({app: {$axios}, params, error, store}) ->
    assets = await $axios.$get('/assets/', {params})
    console.log(params)
    if (assets.length > 0)
      asset = assets[0]
    else
      error({ statusCode: 404, message: 'Shitcoin not found' })
    return
      asset: asset
</script>
