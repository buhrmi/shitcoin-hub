<script lang="coffee">
module.exports =
  asyncData: ({redirect, store}) ->
    redirect('/profiles/'+ (store.state.user.username || store.state.user.id))
</script>
