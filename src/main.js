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

//引入无限滚列表组件--目的避免大量数据同时渲染造成的性能地低问题
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VueVirtualScroller from "vue-virtual-scroller";
import {
  RecycleScroller
} from "vue-virtual-scroller";
Vue.use(VueVirtualScroller);
Vue.use(RecycleScroller);





//建立$bus传递数据
Vue.prototype.$bus = new Vue();


new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");