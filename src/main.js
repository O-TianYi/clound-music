import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./plugins/element.js";

Vue.config.productionTip = false;

//引入自己的样式-----使用vue.config.js配置来取代这个引入---使用vue.config.js导入字体有问题
// import "./style/index.scss";


//导入axios
// import axios from 'axios'


new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");