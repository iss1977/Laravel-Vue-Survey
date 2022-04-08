import {createStore} from 'vuex';

const store = createStore({ //options
  state: {
    user: {
      data:{}, // will contain name, email ...etc
      token: sessionStorage.getItem('TOKEN'),
    }
  },

  getters: {},
  actions: {
    register( { commit }, user ){
      return fetch(`http://localhost:8000/api/register`,{
        headers : {
          "Content-Type": "application/json",
          Accept : "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json(res))
        .then((res) => {
          commit("setUser", res);
          return res; // responseFromStoreRegister will be sent to Register.vue
        })
    }
  },
  mutations: {
    logout: state => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => { // first argument is always state, second is "res" from backend via "actions: register()"
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
  },
  modules: {}
})

export default store;
