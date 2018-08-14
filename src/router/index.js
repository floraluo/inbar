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
import modifyPwd from '@/views/account/modify-pwd'
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

import payments from '@/views/payment'
import paymentDetail from '@/views/payment-detail'
import paymentSuccess from '@/views/payment-success'
import  baseInfor from '@/views/cyber-base-info'
import  cashierSetting from '@/views/cashier-setting'
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
        // {
        //   path: '/member/base-info',
        //   name: 'base-info',
        //   meta: {
        //     menubar: true
        //   },
        //   component: baseInfo
        // },

        {
          path: 'online',
          name: 'online-members',
          meta: {
            menubar: true
          },
          component: online
        },
        {
          path: 'machine',
          name: 'machine-list',
          meta: {
            menubar: true
          },
          component: machine
        },
        {
          path: 'recharge_record',
          name: 'recharge-record',
          meta: {
            menubar: true
          },
          component: rechargeRecord
        },
        {
          path: 'shift-statistics',
          name: 'shift-statistics',
          meta: {
            menubar: true
          },
          component: shiftStatistics
        },
        {
          path: 'sale-statistics',
          name: 'sale-statistics',
          meta: {
            menubar: true
          },
          component: saleStatistics
        },
        {
          path: 'recharge-statistics',
          name: 'recharge-statistics',
          meta: {
            menubar: true
          },
          component: rechargeStatistics
        },
        {
          path: 'online-statistics',
          name: 'online-statistics',
          meta: {
            menubar: true
          },
          component: onlineStatistics
        },
        {
          path: 'payment',
          name: 'payment',
          meta: {
            menubar: true
          },
          component: payments
        },
        {
          path: 'payment-detail',
          name: 'payment-detail',
          meta: {
            menubar: true
          },
          component: paymentDetail
        },
        {
          path: 'payment-success',
          name: 'payment-success',
          meta: {
            menubar: true
          },
          component: paymentSuccess
        },
        {
          path: 'cyberb-info',
          name: 'base-info',
          meta: {
            menubar: true
          },
          component: baseInfor
        },
        {
          path: 'cashier-setting',
          name: 'cashier-setting',
          meta: {
            menubar: true
          },
          component: cashierSetting
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
        },
        {
          path: 'modify-pwd',
          name: 'modify-pwd',
          meta: {
            menubar: true
          },
          component: modifyPwd
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
