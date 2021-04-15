// Vuex Store utilizing Vuex-PersistedState

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// Notey can be access at Vue.prototype.$notey
// Requests can be accessed at Vue.prototype.$



export default new Vuex.Store({
  modules: {
  },
  state: {
    app_settings: {
      name: 'BennyMakes a Blog',
      theme: 'dark'
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    theme: state => {
      return state.app_settings.theme;
    }
  }

});
