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
import baseInfo from '@/views/account/base-info'
import _404 from '@/views/404'
import login from '@/views/login'
import online from '@/views/online-members'
import machine from '@/views/machine-list'
import rechargeRecord from '@/views/recharge-record'
import shiftStatistics from '@/views/shift-statistics'
import saleStatistics from '@/views/sale-statistics'
import rechargeStatistics from '@/views/recharge-statistics'
import onlineStatistics from '@/views/online-statistics'
import changePassword from '@/views/change-password'
import payments from '@/views/payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: home,
      children: [
        {
          path: '/system/info',
          name: 'dashboard',
          component: dashboard,
          meta: {
            menubar: true
          }
        },
        {
          path: '/demo',
          name: 'demo',
          component: demo,
          meta: {
            menubar: true
          }
        },
        {
          path: '/system/user',
          name: 'user',
          component: user,
          meta: {
            menubar: true
          }
        },
        {
          path: '/system/log',
          name: 'log',
          component: log,
          meta: {
            menubar: true
          }
        },
        {
          path: '/system/black-list',
          name: 'black-list',
          component: blackList,
          meta: {
            menubar: true
          }
        },
        {
          path: '/system/menu',
          name: 'menu',
          component: menu,
          meta: {
            menubar: true
          }
        },
        {
          // path: '/system/settings/display',
          path: '/system/settings/ui',
          name: 'display',
          meta: {
            menubar: true
          },
          component: display
        },
        {
          path: '/recharge',
          name: 'recharge',
          meta: {
            menubar: false
          },
          component: recharge
        },
        {
          // path: '/sale',
          path: '/goods',
          name: 'commodity-sales',
          meta: {
            menubar: false
          },
          component: sale
        },
        {
          path: '/sale2',
          name: 'alt-sales',
          component: sales
        },
        {
          path: '/member/base-info',
          name: 'base-info',
          meta: {
            menubar: true
          },
          component: baseInfo
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
          path: '/shift-statistics',
          name: 'shift-statistics',
          component: shiftStatistics
        },
        {
          path: '/sale-statistics',
          name: 'sale-statistics',
          component: saleStatistics
        },

        {
          path: '/recharge-statistics',
          name: 'recharge-statistics',
          component: rechargeStatistics
        },

        {
          path: '/online-statistics',
          name: 'online-statistics',
          component: onlineStatistics
        },

        {
          path: '/change',
          name: 'change-password',
          component: changePassword
        },

        {
          path: '/payment',
          name: 'payment',
          component: payments
        },

        {
          path: '/404',
          name: '404',
          meta: {
            menubar: false
          },
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
