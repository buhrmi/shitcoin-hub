<template lang="pug">
  .page
    .wrapper
      h1 Shitcoin World Status
      p Deposits: {{ status.deposits ? 'OK' : 'Not running' }}
      p Withdrawals: Not implemented
      p Mailers: Not implemented
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [status] = await Promise.all [
      $axios.$get("/status"),
    ]
    return
      status: status
</script>
