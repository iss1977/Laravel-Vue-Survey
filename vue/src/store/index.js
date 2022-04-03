import {createStore} from 'vuex';

const store = createStore({ //options
  state: {
    user: {
      data: { name: 'Sebastian' },
      token: 123
    }
  },

  getters: {},
  actions: {},
  mutations: {},
  modules: {}
})

export default store;
