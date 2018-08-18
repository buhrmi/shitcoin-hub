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
    $axios.interceptors.response.use(null, function(error) {
      if (error) {
        store.$toast.error((error.response.data.message), {
          icon: 'exclamation-circle',
          action: {
            text: 'Dismiss',
            onClick : (e, toastObject) => {
              toastObject.goAway(0);
            }
        },
        })
      }
      return Promise.reject(error)
    });
  }
}