export default async ({store, app: { $axios }}) => {
  $axios.setToken(store.state.authorization)
}