export default function({store}) {
  global.pusher = new Pusher('a61f97b266a03781f5ff', {
    cluster: 'ap1',
    encrypted: true
  });

  function subscribeUserChannel() {
    if (!store.state.user) return
    global.userChannel = pusher.subscribe('user' + store.state.user.id)
    userChannel.bind('updated-balances', function(updatedBalances) {
      store.state.balances.available = Object.assign({}, store.state.balances.available, updatedBalances)
    })
  }

  if (process.env.VUE_ENV == 'client') {
    store.watch(state => state.user, subscribeUserChannel)
    subscribeUserChannel()
  }
}