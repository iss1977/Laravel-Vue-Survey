import { createRouter, createWebHistory } from "vue-router";
import Dashboard from './../views/Dashboard.vue'
import Login from './../views/Login.vue'
import Register from './../views/Register.vue'

const routes = [
  {
    path:'/',
    name: 'Dashboard',
    component: Dashboard
  },
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
];

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes: routes
})

export default router
