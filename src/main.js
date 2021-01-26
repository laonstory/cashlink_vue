import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import { store } from "./store/store";
import IMP from "vue-iamport";

Vue.use(IMP, "imp05615202");

Vue.config.productionTip = false;
Vue.IMP().load();

new Vue({
  render: (h) => h(App),
  store: store,
  router,
}).$mount("#app");
