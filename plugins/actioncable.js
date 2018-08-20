import ActionCable from 'actioncable'

export default async ({store, app: { $axios }}) => {
  const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
  const sub = cable.subscriptions.create('BalancesChannel', {
    received(data) {
      store.dispatch('receiveBalance', data)
    }
  })
}