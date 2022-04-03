import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from './../components/DefaultLayout.vue'
import AuthLayout from './../components/AuthLayout.vue'
import Login from './../views/Login.vue'
import Dashboard from './../views/Dashboard.vue'
import Register from './../views/Register.vue'
import Surveys from './../views/Surveys.vue'
import store from './../store'


const routes = [
  {
    path:'/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children : [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard},
      { path: '/surveys', name: 'Surveys', component: Surveys},
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: { isGuest: true },
    children : [
      {
        path:'/login',
        name: 'Login',
        component: Login
      },
      {
        path:'/register',
        name: 'Register',
        component: Register
      },
    ]
  }
];

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from) => {
  // page access requires a token, but user hasn't one:
  if(to.meta.requiresAuth && !store.state.user.token){
    return { name: 'Login'}
  }
  else
    // user is logged in ansd tries to access login or register(guest pages):
    if(store.state.user.token && (to.meta.isGuest)) {
      return { name: 'Dashboard'}
      // user has a token, and doesn't want to access a guest page
    } else {
    return true
    }
});

export default router
