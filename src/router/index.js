import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'  
import Sidebar from '../views/components/Sidebar.vue'
import Topnav from '../views/components/Topnav.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Tutor from '../views/Tutor.vue'
import Student from '../views/Student.vue'
import Order from '../views/Order.vue'
import Package from '../views/Package.vue'
import Room from '../views/Room.vue'
import History from '../views/History.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Dashboard',
    components: {default:Dashboard,sidebar:Sidebar,navbar:Topnav},
    meta:{
      requiresAuth:true}
  },
  {
    path: '/login',
    name: 'Login',
    components: {full:Login}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tutor',
    name: 'Tutor',
    components: {default:Tutor,sidebar:Sidebar,navbar:Topnav},
    meta:{
      requiresAuth:true}
  },
  {
    path: '/student',
    name: 'Student',
    components: {default:Student,sidebar:Sidebar,navbar:Topnav},
    meta:{
      requiresAuth:true}
  },
  {
    path: '/order',
    name: 'Order',
    components: {default:Order,sidebar:Sidebar,navbar:Topnav},
    meta:{
      requiresAuth:true}
  },
  {
    path: '/package',
    name: 'Package',
    components: {default:Package,sidebar:Sidebar,navbar:Topnav},
    meta:{
      requiresAuth:true}
  },
  {
    path: '/room',
    name: 'Room',
    components: {default:Room,sidebar:Sidebar,navbar:Topnav},
    meta:{
      requiresAuth:true}
  },
  {
    path: '/history',
    name: 'History',
    components: {default:History,sidebar:Sidebar,navbar:Topnav},
    meta:{
      requiresAuth:true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
