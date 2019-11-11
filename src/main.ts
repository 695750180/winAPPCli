import "./assets/style/index.scss";
import Vue from "vue";
import router from "./router/index";
import App from "./App.vue";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/zh-CN";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { locale });
new Vue({
  router,
  render: h => h(App)
}).$mount("#app"); //运行时模式
