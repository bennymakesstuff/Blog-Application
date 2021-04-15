import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import API from './apirequests'

Vue.use(store);
Vue.use(API);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
