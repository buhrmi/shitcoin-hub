export default async ({store, app: { $axios }}) => {
  $axios.setToken(store.state.authorization)

  if (process.env.VUE_ENV == 'client') {
    // Set global auth header for XMLHttp Requests
    var o = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(){
      var res = o.apply(this, arguments);
      var err = new Error();
      this.setRequestHeader('Authorization', store.state.authorization);
      return res;
    }

    // Set authorization header for requests made by redactor wysiwyg editor
    // $R.ajax.settings = {
    //   headers: {
    //     Authorization: store.state.authorization
    //   }
    // }
  }
}