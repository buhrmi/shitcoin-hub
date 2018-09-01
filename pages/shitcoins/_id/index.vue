<script lang="coffee">
module.exports =
  asyncData: ({params, redirect}) ->
    redirect("/shitcoins/#{params.id}/trade")
</script>

