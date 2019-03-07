export default {
  setLoading(context, payload) {
    context.commit("setLoading", payload);
  },
  setSearchData(context, payload) {
    context.commit("setData", payload);
  }
};
