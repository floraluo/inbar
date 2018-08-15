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
import staffAuthorityManage from '@/views/staff-authority-manage'
import maintainMoneyManage from '@/views/maintain-money-manage'
import setArea from '@/views/inbar/set-area'
import setComputer from '@/views/inbar/set-computer'
import manageMemberData from '@/views/inbar/manage-member-data'
import manageMemberSet from '@/views/inbar/manage-member-set'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      meta: {
        menubar: false
      },
      children: [
        {
          path: 'demo',
          name: 'demo',
          component: demo,
          meta: {
            menubar: true
          }
        },
        {
          path: 'recharge',
          name: 'recharge',
          meta: {
            menubar: false
          },
          component: recharge
        },
        {
          // path: '/sale',
          path: 'goods',
          name: 'commodity-sales',
          meta: {
            menubar: false
          },
          component: sale
        },
        {
          path: 'sale2',
          name: 'alt-sales',
          component: sales
        },
        {
          path: 'online',
          name: 'online-members',
          component: online
        },
        {
          path: 'machine',
          name: 'machine-list',
          component: machine
        },
        {
          path: 'recharge_record',
          name: 'recharge-record',
          component: rechargeRecord
        },
        {
          path: 'shift-statistics',
          name: 'shift-statistics',
          component: shiftStatistics
        },
        {
          path: 'sale-statistics',
          name: 'sale-statistics',
          component: saleStatistics
        },
        {
          path: 'recharge-statistics',
          name: 'recharge-statistics',
          component: rechargeStatistics
        },
        {
          path: 'online-statistics',
          name: 'online-statistics',
          component: onlineStatistics
        },
        {
          path: '404',
          name: '404',
          component: _404,
          meta: {
            menubar: false
          }
        }
      ]
    },
    {
      path: '/inbar',
      component: home,
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'setting/area',
          name: 'set-area',
          component: setArea
        },
        {
          path: 'setting/computer',
          name: 'set-computer',
          component: setComputer
        },
        {
          path: 'manage/member-data',
          name: 'manage-member-data',
          component: manageMemberData
        },
        {
          path: 'manage/member-set',
          name: 'manage-member-set',
          component: manageMemberSet
        },
        {
          path: 'manage/staff',
          name: 'staff-autority-manage',
          component: staffAuthorityManage
        },
        {
          path: 'manage/maintain',
          name: 'maintain-money-manage',
          component: maintainMoneyManage
        }
      ]
    },
    {
      path: '/system',
      component: home,
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'info',
          name: 'dashboard',
          component: dashboard,
          meta: {
            menubar: true
          }
        },
        {
          path: 'user',
          name: 'user',
          component: user,
          meta: {
            menubar: true
          }
        },
        {
          path: 'log',
          name: 'log',
          component: log,
          meta: {
            menubar: true
          }
        },
        {
          path: 'black-list',
          name: 'black-list',
          component: blackList,
          meta: {
            menubar: true
          }
        },
        {
          path: 'menu',
          name: 'menu',
          component: menu,
          meta: {
            menubar: true
          }
        },
        {
          // path: '/system/settings/display',
          path: 'settings/ui',
          name: 'display',
          meta: {
            menubar: true
          },
          component: display
        }
      ]
    },
    {
      path: '/member',
      component: home,
      children: [
        {
          path: 'base-info',
          name: 'base-info',
          meta: {
            menubar: true
          },
          component: baseInfo
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
