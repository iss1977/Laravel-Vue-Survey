import {createStore} from 'vuex';

const store = createStore({ //options
  state: {
    user: {
      data: { name: 'Sebastian' },
      token: null
    }
  },

  getters: {},
  actions: {},
  mutations: {},
  modules: {}
})

export default store;
