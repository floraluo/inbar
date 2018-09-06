import Vue from 'vue'
import Router from 'vue-router'
import home from '../home/home'
import manage from '../views/manage'
import dashboard from '../home/dashboard'
import demo from '../views/demo'
import user from '../views/user'
import log from '../views/log'
import menu from '../views/menu'
import blackList from '../views/black-list'
import display from '../views/display'
import recharge from '../views/recharge'
import sale from '../views/commodity-sales'
import sales from '../views/alt-sales'
import baseInfo from '../views/account/base-info'
import modifyPwd from '../views/account/modify-pwd'
import _404 from '../views/404'
import login from '../views/login'
import online from '../views/online-members'
import machine from '../views/machine-list'
import rechargeRecord from '../views/recharge-record'

//交班管理
import shiftStatistics from '../views/shift-statistics'
import saleStatistics from '../views/sale-statistics'
import rechargeStatistics from '../views/recharge-statistics'
import onlineStatistics from '../views/online-statistics'
import statementCheck from '../views/statement-check'

import payments from '../views/payment'
import paymentDetail from '../views/payment-detail'
import paymentSuccess from '../views/payment-success'

//网吧管理
import manageMemberData from '../views/inbar/manage-member-data'
import modifyMemberInfo from '../views/inbar/modify-member-info'
import manageMemberSet from '../views/inbar/manage-member-set'
import staffAuthorityManage from '../views/staff-authority-manage'
import maintainMoneyManage from '../views/maintain-money-manage'
import managePackage from '../views/inbar/manage-package'
import inbarInfo from '../views/inbar/inbar-base-info'
import setInfo from '../views/inbar/set-base-info'
import setCashier from '../views/inbar/set-cashier'
import setArea from '../views/inbar/set-area'
import setComputer from '../views/inbar/set-computer'
import memberLevel from '../views/inbar/member-level'
import setCoins from '../views/inbar/set-coins'
import inbarAnnouncement from '../views/inbar/inbar-announcement'
import announcementCheck from '../views/inbar/announcement-check'
import addAnnouncement from '../views/inbar/add-announcement'

//商品管理
import goodsInfo from '../views/goods/goods-info'
import addGoods from '../views/goods/add-goods'
import modifyGoods from '../views/goods/modify-goods'
import categroyManage from '../views/goods/category-manage'
import repertoryList from '../views/goods/repertory-list'
import repertoryUpdate from '../views/goods/repertory-update'
import repertoryInbarUpdate from '../views/goods/repertory-inbar-update'
import orderSale from '../views/goods/order-sale-list'
import orderUpdate from '../views/goods/order-update-list'
import orderPickUp from '../views/goods/order-pickup-list'
import orderSaleDetail from '../views/goods/order-sale-detail'
import orderUpdateDetail from '../views/goods/order-update-detail'
import orderPickUpDetail from '../views/goods/order-pickup-detail'
import goodsSetting from '../views/goods/goods-setting'
import addPackage from '../views/inbar/add-package'
import packageList from '../views/goods/package-list'
import addPackages from '../views/goods/add-packages'

//经营管理
import graphIncome from '../views/data-center/graph-income'
import graphMember from '../views/data-center/graph-member'
import graphRecharge from '../views/data-center/graph-recharge'
import graphExpense from '../views/data-center/graph-expense'
import graphAttendence from '../views/data-center/graph-attendence'
import graphGoods from '../views/data-center/graph-goods'

import shiftList from '../views/data-center/shift-list'
import shiftDetail from '../views/data-center/shift-detail'
import shiftSaleDetail from '../views/data-center/shift-detail-sale'
import shiftRechargeDetail from '../views/data-center/shift-detail-recharge'
import shiftOnlineDetail from '../views/data-center/shift-detail-online'

import turnInMoney from '../views/data-center/turn-in-money'
import returnMoney from '../views/data-center/return-money'
import maintainMoney from '../views/data-center/maintain-money'

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
      path: '/bar/shift', //吧台端 - 交班管理
      component: home,
      redirect: {name: 'shift-statistics'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'overview',
          name: 'shift-statistics',
          component: shiftStatistics
        },
        {
          path: 'sale-detail',
          name: 'sale-statistics',
          component: saleStatistics
        },
        {
          path: 'recharge-detail',
          name: 'recharge-statistics',
          component: rechargeStatistics
        },
        {
          path: 'online-detail',
          name: 'online-statistics',
          component: onlineStatistics
        },
        {
          path: 'statement',
          name: 'statement-check',
          component: statementCheck
        }
      ]
    },
    {
      path: '/inbar', //网吧管理
      component: home,
      name: 'inbar',
      redirect: {name: 'manage-member-data'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'member-manage', //会员管理
          component: manage,
          name: 'member-manage',
          redirect: {name: 'manage-member-data'},
          // redirect: to => {
          //   return {
          //     name: 'manage-member-data'
          //   }
          // },
          children: [
            {
              path: 'data',
              name: 'manage-member-data',
              component: manageMemberData
            },
            {
              path: 'data/modify-member-info/:id',
              name: 'modify-member-info',
              component: modifyMemberInfo
            },
            {
              path: 'set',
              name: 'manage-member-set',
              component: manageMemberSet
            }
          ]
        },
        {
          path: 'setting', //网吧设置
          component: manage,
          name: 'inbar-setting',
          redirect: {name: 'inbar-base-info'},
          children: [
            {
              path: 'info',
              name: 'inbar-base-info',
              component: inbarInfo
            },
            {
              path: 'info/set',
              name: 'set-base-info',
              component: setInfo
            },
            {
              path: 'area',
              name: 'set-area',
              component: setArea
            },
            {
              path: 'area/computer',
              name: 'set-computer',
              component: setComputer
            },
            {
              path: 'cashier',
              name: 'set-cashier',
              component: setCashier
            },
            {
              path: 'coins',
              name: 'set-coins',
              component: setCoins
            },
            {
              path: 'level',
              name: 'member-level',
              component: memberLevel
            }
          ]
        },
        {
          path: 'staff-manage', //员工管理
          component: manage,
          redirect: {name: 'staff-autority-manage'},
          children: [
            {
              path: 'staff',
              name: 'staff-autority-manage',
              component: staffAuthorityManage
            },
            {
              path: 'maintain',
              name: 'maintain-money-manage',
              component: maintainMoneyManage
            }
          ]
        },
        {
          path: 'service', //网吧服务
          component: manage,
          redirect: {name: 'inbar-announcement'},
          children: [
            {
              path: 'announcement',
              name: 'inbar-announcement',
              component: inbarAnnouncement
            },
            {
              path: 'announcement/check/:id',
              name: 'announcement-check',
              component: announcementCheck
            },
            {
              path: 'add',
              name: 'add-announcement',
              component: addAnnouncement
            }
          ]
        },
        {
          path: 'packages', //充值套餐管理
          component: manage,
          redirect: {name: 'manage-package'},
          children: [
            {
              path: 'manage-package',
              name: 'manage-package',
              component: managePackage
            },
            {
              path: 'manage-package/add',
              name: 'add-package',
              component: addPackage
            }
          ]
        }
      ]
    },
    {
      path: '/manager/goods', //商品管理
      component: home,
      redirect: {name: 'goods-info-list'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'material', //商品资料
          component: manage,
          redirect: {name: 'goods-info-list'},
          children: [
            {
              path: 'info', //商品信息
              name: 'goods-info-list',
              component: goodsInfo
            },
            {
              path: 'info/add', //新增商品
              name: 'add-goods',
              component: addGoods
            },
            {
              path: 'info/modify', //修改商品
              name: 'modify-goods',
              component: modifyGoods
            },
            {
              path: 'category', //类目管理
              name: 'category-manage',
              component: categroyManage
            }
          ]
        },
        {
          path: 'package', //商品套餐管理
          component: manage,
          redirect: {name: 'package-list'},
          children: [
            {
              path: 'list', //套餐列表
              name: 'package-list',
              component: packageList
            },
            {
              path: 'add',
              name: 'add-packages',
              component: addPackages
            }
            ]
        },
        {
          path: 'repertory', //库存管理
          component: manage,
          redirect: {name: 'repertory-list'},
          children: [
            {
              path: 'list', //库存总览
              name: 'repertory-list',
              component: repertoryList
            },
            {
              path: 'update', //仓库补货
              name: 'repertory-update',
              component: repertoryUpdate
            },
            {
              path: 'inbar-update', //吧台提货
              name: 'repertory-inbar-update',
              component: repertoryInbarUpdate
            }
          ]
        },
        {
          path: 'order', //订单管理
          component: manage,
          name: 'order-manage',
          redirect: {name: 'sale-order'},
          children: [
            {
              path: 'sale', //销售订单
              name: 'sale-order',
              component: orderSale
            },
            {
              path: 'sale/detail',
              name: 'order-sale-detail',
              component: orderSaleDetail
            },
            {
              path: 'update', //补货订单
              component: orderUpdate
            },
            {
              path: 'update/detail', //订单详情
              name: 'order-update-detail',
              component: orderUpdateDetail
            },
            {
              path: 'pickup', //提货订单
              component: orderPickUp
            },
            {
              path: 'pickup/detail', //订单详情
              name: 'order-pickup-detail',
              component: orderPickUpDetail
            }
          ]
        },
        {
          path: 'setting', //商品设置
          component: manage,
          children: [
            {
              path: '',
              component: goodsSetting,
            }
          ]
        }
      ]
    },
    {
      path: '/data', //经营管理
      component: home,
      redirect: {name: 'shift-list'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'graph', //经营分析
          component: manage,
          redirect: {name: 'graph-income'},
          children: [
            {
              path: 'income',
              name: 'graph-income',
              component: graphIncome
            },
            {
              path: 'member',
              name: 'graph-member',
              component: graphMember
            },
            {
              path: 'recharge',
              name: 'graph-recharge',
              component: graphRecharge
            },
            {
              path: 'expense',
              name: 'graph-expense',
              component: graphExpense
            },
            {
              path: 'attendence',
              name: 'graph-attendence',
              component: graphAttendence
            },
            {
              path: 'goods',
              name: 'graph-goods',
              component: graphGoods
            }
          ]
        },
        {
          path: 'shift', //交班管理
          component: manage,
          children: [
            {
              path: '',
              name: 'shift-list',
              component: shiftList
            },
            {
              path: 'detail',
              name: 'shift-detail',
              component: shiftDetail
            },
            {
              path: 'sale-detail',
              name: 'shift-sale-detail',
              component: shiftSaleDetail
            },
            {
              path: 'recharge-detail',
              name: 'shift-recharge-detail',
              component: shiftRechargeDetail
            },
            {
              path: 'online-detail',
              name: 'shift-online-detail',
              component: shiftOnlineDetail
            }
          ]
        },
        {
          path: 'tool', //店长工具
          component: manage,
          redirect: {name: 'turn-in-money'},
          children: [
            {
              path: 'turn-in',
              name: 'turn-in-money',
              component: turnInMoney
            },
            {
              path: 'return',
              name: 'return-money',
              component: returnMoney
            },
            {
              path: 'maintain',
              name: 'maintain-money',
              component: maintainMoney
            }
          ]
        }
      ]
    },
    {
      path: '/system', //系统管理
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
