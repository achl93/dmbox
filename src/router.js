import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Chats from './views/Chats.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/chats',
      name: 'chats',
      component: Chats
    }
  ]
})
