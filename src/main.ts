import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { faSignInAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { library, dom } from "@fortawesome/fontawesome-svg-core";

library.add(faSignInAlt, faHeart);

dom.watch();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
