import { userService } from "../services";
import Vuex from "vuex";

export default new Vuex.Store({
  //namespaced: true,
  state: {
    all: {},
  },
  mutations: {
    getAllRequest(state) {
      state.all = { loading: true };
    },
    getAllSuccess(state, users) {
      state.all = { items: users };
    },
    getAllFailure(state, error) {
      state.all = { error };
    },
  },
});
