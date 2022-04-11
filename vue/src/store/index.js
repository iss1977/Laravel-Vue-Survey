import {createStore} from 'vuex';
import axiosClient from '../axios';

const store = createStore({ //options
  state: {
    user: {
      data:{}, // will contain name, email ...etc
      token: sessionStorage.getItem('TOKEN'),
    }
  },

  getters: {},
  actions: {

    /** Registration for Register.vue component */
    register( { commit }, user ){
      return axiosClient.post('/register', user)
        .then( ({data})=>{
          commit('setUser', data);
          return data;
        } )
    },

    /** Login for Login.vue component */
    login( { commit }, user ){
      return axiosClient.post('/login', user)
        .then( ({data})=>{
          commit('setUser', data);
          return data;
        } )
    },

    /** Logout user */
    logout( { commit } ){
      return axiosClient
              .post('/logout')
              .then( (response)=> {
                  commit('logout')
                  return response
              })
              .catch((er)=> {
                console.log('Logout on backend failed. Already logged out?');
                commit('logout')
                return er
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
