import { userService } from "../services";
import { Module } from "vuex";

export const users: Module<any, any> = {
  namespaced: true,
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
};
