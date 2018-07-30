import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home/home'
import dashboard from '@/home/dashboard'
import demo from '@/views/demo'
import user from '@/views/user'
import log from '@/views/log'
import menu from '@/views/menu'
import blackList from '@/views/black-list'
import display from '@/views/display'
import recharge from '@/views/recharge'
import sale from '@/views/commodity-sales'
import sales from '@/views/alt-sales'
import _404 from '@/views/404'
import login from '@/views/login'
import online from '@/views/online-members'
import machine from '@/views/machine-list'
import rechargeRecord from '@/views/recharge-record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: home,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: dashboard
        },
        {
          path: '/demo',
          name: 'demo',
          component: demo
        },
        {
          path: '/system/user',
          name: 'user',
          component: user
        },
        {
          path: '/system/log',
          name: 'log',
          component: log
        },
        {
          path: '/system/black-list',
          name: 'black-list',
          component: blackList
        },
        {
          path: '/system/menu',
          name: 'menu',
          component: menu
        },
        {
          path: '/system/settings/display',
          name: 'display',
          component: display
        },
        {
          path: '/recharge',
          name: 'recharge',
          component: recharge
        },
        {
          path: '/sale',
          name: 'commodity-sales',
          component: sale
        },
        {
          path: '/sale2',
          name: 'alt-sales',
          component: sales
        },
        {
          path: '/online',
          name: 'online-members',
          component: online
        },
        {
          path: '/machine',
          name: 'machine-list',
          component: machine
        },

        {
          path: '/recharge_record',
          name: 'recharge-record',
          component: rechargeRecord
        },
        {
          path: '/404',
          name: '404',
          component: _404
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
