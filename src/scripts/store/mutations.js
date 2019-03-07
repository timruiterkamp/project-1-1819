export default {
  setLoading(state, payload) {
    state.loading = payload;
    return state;
  },
  setData(state, payload) {
    state.searchData = payload;
    return state;
  }
};
