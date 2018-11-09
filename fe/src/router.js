import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath
axios.defaults.baseURL = apiRootPath
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const token = response.data.token
  console.log(token)
  if (token) localStorage.setItem('token', token)
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
  // return next()
  axios.post('page', { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      // console.error(e.message)
      next(`/block/${e.message}`)
    })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'lv3',
      component: () => import('./views/lv3'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv2',
      name: 'lv2',
      component: () => import('./views/lv2'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv1',
      name: 'lv1',
      component: () => import('./views/lv1'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv0',
      name: 'lv0',
      component: () => import('./views/lv0'),
      beforeEnter: pageCheck
    },
    {
      path: '/user',
      name: '사용자',
      component: () => import('./views/user'),
      beforeEnter: pageCheck
    },
    {
      path: '/users',
      name: 'manUsers',
      component: () => import('./views/users'),
      beforeEnter: pageCheck
    },
    {
      path: '/page',
      name: '페이지',
      component: () => import('./views/page'),
      beforeEnter: pageCheck
    },
    {
      path: '/site',
      name: '사이트',
      component: () => import('./views/site'),
      beforeEnter: pageCheck
    },
    {
      path: '/block/:msg',
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
      path: '/register',
      name: '회원가입',
      component: () => import('./views/register')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404')
    }
  ]
})
