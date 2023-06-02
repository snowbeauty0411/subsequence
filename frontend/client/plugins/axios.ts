export default function ({$axios}) {
  $axios.onRequest(config => {
    $axios.defaults.headers.common['Content-Type'] ='application/json'
    $axios.defaults.headers.common.Authorization =
      "Bearer " + Cookies.get("token_user");
    return config
  })
}
