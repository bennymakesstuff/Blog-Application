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
    TOGGLE_THEME (state) {
      if(state.app_settings.theme==='dark'){
        state.app_settings.theme = 'light';
      }
      else{
        state.app_settings.theme = 'dark';
      }
    }
  },
  actions: {
    toggle_theme (context) {
      context.commit('TOGGLE_THEME');
    }
  },
  getters: {
    theme: state => {
      return state.app_settings.theme;
    }
  }

});
