import { userService } from "../services";
import { router } from "../router";
import Vuex from "vuex";

const localUser = localStorage.getItem("user") || false;
//const initialState = { status: {}, user: null };
const initialState = localUser
  ? {
      status: { loggedIn: true, loggingIn: false },
      user: JSON.parse(localUser),
    }
  : { status: { loggedIn: false, loggingIn: false }, user: null };

export default new Vuex.Store({
  //namespaced: true,
  state: initialState,
  actions: {
    login(
      { dispatch, commit },
      { username, password }: Record<string, string>
    ) {
      commit("loginRequest", { username });

      userService.login(username, password).then(
        (user) => {
          commit("loginSuccess", user);
          router.push("/");
        },
        (error) => {
          commit("loginFailure", error);
        }
      );
    },
    logout({ commit }) {
      userService.logout();
      commit("logout");
    },
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true, loggedIn: false };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true, loggingIn: false };
      state.user = user;
    },
    loginFailure(state) {
      state.status = { loggedIn: false, loggingIn: false };
      state.user = null;
    },
    logout(state) {
      state.status = { loggedIn: false, loggingIn: false };
      state.user = null;
    },
  },
});
