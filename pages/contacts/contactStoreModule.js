export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchCountries(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get('/all')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
