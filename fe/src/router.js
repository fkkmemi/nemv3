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
  // console.log(token)
  if (token) localStorage.setItem('token', token)
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
  // return next()
  axios.post('page', { name: to.path })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      // console.error(e.message)
      next(`/block/${e.message.replace(/\//gi, ' ')}`)
    })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'boardAnyone',
      component: () => import('./views/board/anyone'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv3',
      name: 'testLv3',
      component: () => import('./views/test/lv3'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv2',
      name: 'testLv2',
      component: () => import('./views/test/lv2'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv1',
      name: 'testLv1',
      component: () => import('./views/test/lv1'),
      beforeEnter: pageCheck
    },
    {
      path: '/test/lv0',
      name: 'testLv0',
      component: () => import('./views/test/lv0'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/users',
      name: 'manageUsers',
      component: () => import('./views/manage/user'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/pages',
      name: 'managePages',
      component: () => import('./views/manage/pages'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/sites',
      name: 'manageSites',
      component: () => import('./views/manage/sites'),
      beforeEnter: pageCheck
    },
    {
      path: '/manage/boards',
      name: 'manageBoards',
      component: () => import('./views/manage/boards'),
      beforeEnter: pageCheck
    },
    {
      path: '/block/:msg',
      name: '차단',
      component: () => import('./views/block')
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: () => import('./views/test')
    // },
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
