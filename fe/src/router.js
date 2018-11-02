import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Home from './views/Home.vue'

Vue.use(Router)

Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath

const pageCheck = (to, from, next) => {
  return next()
  axios.post(`${apiRootPath}page`, { name: to.path }, { headers: { Authorization: localStorage.getItem('token') } })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      console.error(e.message)
      next('block')
    })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'lv0',
      component: () => import('./views/lv0'),
      // beforeEnter: authCheck
      beforeEnter: pageCheck
    },
    {
      path: '/lv1',
      name: 'lv1',
      component: () => import('./views/lv1'),
      // beforeEnter: authCheck
      beforeEnter: pageCheck
    },
    {
      path: '/lv2',
      name: 'lv2',
      component: () => import('./views/lv2'),
      // beforeEnter: authCheck
      beforeEnter: pageCheck
    },
    {
      path: '/lv3',
      name: 'lv3',
      component: () => import('./views/lv3'),
      // beforeEnter: authCheck
      beforeEnter: pageCheck
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: pageCheck
    },
    {
      path: '/user',
      name: '사용자',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/user')
    },
    {
      path: '/page',
      name: '페이지',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/user')
    },
    {
      path: '/group-bg',
      name: 'group-bg',
      component: () => import('./views/group-bg'),
      beforeEnter: pageCheck
    },
    {
      path: '/header',
      name: '헤더',
      component: () => import('./views/header'),
      // beforeEnter: authCheck
      beforeEnter: pageCheck
    },
    {
      path: '/block',
      name: '차단',
      component: () => import('./views/block')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test')
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/sign')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404')
    }
  ]
})
