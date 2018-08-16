export default function({ app }, inject) {
  if (process.env.VUE_ENV == 'client') {
    // Client-side metamask
    window.addEventListener('load', setState)
    function setState() {
      if (typeof web3 !== 'undefined') {
        app.store.state.eth_address = web3.eth.accounts[0]
      }
      setTimeout(setState, 1000)
    }
  }
  else {
    // Server-side web3
    global.web3 = {} // instanciate serverside web3
  }
}