import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from './../components/DefaultLayout.vue'
import Login from './../views/Login.vue'
import Dashboard from './../views/Dashboard.vue'
import Register from './../views/Register.vue'
import Surveys from './../views/Surveys.vue'


const routes = [
  {
    path:'/',
    redirect: '/dashboard',
    component: DefaultLayout,
    children : [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard},
      { path: '/surveys', name: 'Surveys', component: Surveys},
    ]
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
