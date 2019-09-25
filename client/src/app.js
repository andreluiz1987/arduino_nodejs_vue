import Vue from 'vue';
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource';
import Config from './config.json'

import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueChartkick, {adapter: Chart})
Vue.use(VueResource);

//VUE RESOURCES
Vue.http.options.root = `${Config.host}/api`;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
