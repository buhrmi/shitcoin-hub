export default async ({store, app: { $axios }}) => {
  $axios.setToken(store.state.authorization)

  if (process.env.VUE_ENV == 'client') {
    // Set authorization header for requests made by redactor wysiwyg editor
    $R.ajax.settings = {
      headers: {
        Authorization: store.state.authorization
      }
    }
  }
}