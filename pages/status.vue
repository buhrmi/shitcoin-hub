<template lang="pug">
  .page
    .wrapper
      h1 Shitcoin World Status
      p Deposits: {{ status.deposits ? 'Seems OK' : 'Not running' }}
      p Withdrawals: {{ status.withdrawals ? 'Seems OK' : 'Not running' }}
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
