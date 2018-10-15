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

import index from '../views/index'
import _404 from '../views/404'
import error from '../views/error'
import developing from '../views/developing'
import maintenance from '../views/maintenance'
import login from '../views/login'
import onlineMember from '../views/online-members'
import machine from '../views/machine-list'
import rechargeRecord from '../views/recharge-record'
//吧台数据查询
import OrderList from '../views/bar/data/order-list'
import SaleRecordList from '../views/bar/data/sale-record-list'
import RechargeRecordList from '../views/bar/data/recharge-record-list'
import SettleAccountsList from '../views/bar/data/settle-accounts-list'
//吧台店长工具
import BarTurnInFundList from '../views/bar/tool/turn-in-fund-list'
import BarRefundList from '../views/bar/tool/refund-list'
import BarMaintainFundList from '../views/bar/tool/maintain-fund-list'
//吧台语音
import MessageBoard from '../views/bar/voice/message-board'
import CallNetwork from '../views/bar/voice/call-network'
import CallSelf from '../views/bar/voice/call-self'
import ScheduledBroadcast from '../views/bar/voice/scheduled-broadcast'
import BroadcastList from '../views/bar/voice/broadcast-list'

//个人信息设置
import managerInfo from '../views/account/manager-base-info'
import baseInfo from '../views/account/base-info'
import modifyPwd from '../views/account/modify-pwd'
import messageCenter from '../views/account/message-center'

//交班管理
import ShiftStatistics from '../views/shift-statistics'
import SaleStatistics from '../views/sale-statistics'
import RechargeStatistics from '../views/recharge-statistics'
import OnlineStatistics from '../views/online-statistics'
import StatementCheck from '../views/statement-check'

import payments from '../views/payment'
import paymentDetail from '../views/payment-detail'
import paymentSuccess from '../views/payment-success'

//网吧管理
import manageMemberData from '../views/inbar/manage-member-data'
import modifyMemberInfo from '../views/inbar/modify-member-info'
import manageMemberSet from '../views/inbar/manage-member-set'
import staffAuthorityManage from '../views/inbar/staff-authority-manage'
import MaintainMoneyManage from '../views/inbar/maintain-money-manage'
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
import VoiceBaseSet from '../views/inbar/voice-base-set'
import VoiceRemindsy from '../views/inbar/voice-remindsy'
import VoiceCallNetwork from '../views/inbar/voice-call-network'
import VoiceManage from '../views/inbar/voice-manage'

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
//--账目明细
import IncomeSummary from '../views/data-center/account-income-summary'
import InbarRevenue from '../views/data-center/account-inbar-revenue'
import MemberOnlineQuery from '../views/data-center/account-member-online-query'
import CreditExchange from '../views/data-center/account-credit-exchange'
import ActivityReward from '../views/data-center/account-activity-reward'
import MaintainMoneyExpense from '../views/data-center/account-maintain-money-expense'
//--经营分析
import GraphIncome from '../views/data-center/graph-income'
import GraphMember from '../views/data-center/graph-member'
import GraphRecharge from '../views/data-center/graph-recharge'
import GraphRechargeDetail from '../views/data-center/graph-recharge-detail'
import GraphExpense from '../views/data-center/graph-expense'
import GraphExpenseDetail from '../views/data-center/graph-expense-detail'
import GraphAttendence from '../views/data-center/graph-attendence'
import GraphGoods from '../views/data-center/graph-goods'
//--交班管理
import ShiftList from '../views/data-center/shift-list'
import ShiftDetail from '../views/data-center/shift-detail'
import ShiftSaleDetail from '../views/data-center/shift-detail-sale'
import ShiftRechargeDetail from '../views/data-center/shift-detail-recharge'
import ShiftOnlineDetail from '../views/data-center/shift-detail-online'
//--店长工具
import TurnInFundList from '../views/data-center/tool-turn-in-fund-list'
import TurnInFundPost from '../views/data-center/tool-turn-in-post'
import TurnInFundGet from '../views/data-center/tool-turn-in-get'
import Refund from '../views/data-center/tool-refund'
import MaintainFund from '../views/data-center/tool-maintain-fund'
//--沉淀资金清零
import PrecipitationMemberData from '../views/data-center/precipitation-member-data'
import PrecipitationMemberSet from '../views/data-center/precipitation-member-set'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      redirect: {name: 'index'},
      meta: {
        menubar: false
      },
      children: [
        {
          path: 'home',
          name: 'index',
          component: index,
          meta: {
            menubar: false
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
            menubar: true
          }
        },
        {
          path: 'error',
          name: 'error',
          component:error,
          meta: {
            menubar: true
          }
        },
        {
          path: 'developing',
          name: 'developing',
          component: developing,
          meta: {
            menubar: true
          }
        },
        {
          path: 'maintenance',
          name: 'maintenance',
          component: maintenance,
          meta: {
            menubar: true
          }
        }
      ]
    },
    {
      path: '/bar/member', //吧台端 - 会员管理
      component: home,
      redirect: {name: 'online-members'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'online',
          name: 'online-members',
          component: onlineMember
        },
        {
          path: 'machine',
          name: 'machine-list',
          component: machine
        }
      ]
    },
    {
      path: '/bar/data', //吧台端 - 数据查询
      component: home,
      redirect: {name: 'orderList'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'order',
          name: 'orderList',
          component: OrderList
        },
        {
          path: 'sale',
          name: 'saleRecordList',
          component: SaleRecordList
        },
        {
          path: 'recharge',
          name: 'rechargeRecordList',
          component: RechargeRecordList
        },
        {
          path: 'settle-accounts',
          name: 'settleAccountsList',
          component: SettleAccountsList
        }
      ]
    },
    {
      path: '/bar/shift', //吧台端 - 交班管理
      component: home,
      redirect: {name: 'shiftStatistics'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'overview',
          name: 'shiftStatistics',
          component: ShiftStatistics
        },
        {
          path: 'sale-detail',
          name: 'saleStatistics',
          component: SaleStatistics
        },
        {
          path: 'recharge-detail',
          name: 'rechargeStatistics',
          component: RechargeStatistics
        },
        {
          path: 'online-detail',
          name: 'onlineStatistics',
          component: OnlineStatistics
        },
        {
          path: 'statement',
          name: 'statementCheck',
          component: StatementCheck
        }
      ]
    },
    {
      path: '/bar/tool', //吧台端 - 店长工具
      component: home,
      redirect: {name: 'barTurnInFundList'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'turn-in',
          name: 'barTurnInFundList',
          component: BarTurnInFundList
        },
        {
          path: 'refund',
          name: 'barRefundList',
          component: BarRefundList
        },
        {
          path: 'maintain',
          name: 'barMaintainFundList',
          component: BarMaintainFundList
        }
      ]
    },
    {
      path: '/bar/voice', //吧台端 - 语音
      component: home,
      redirect: {name: 'messageBoard'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'message',
          name: 'messageBoard',
          component: MessageBoard
        },
        {
          path: 'call-network',
          name: 'callNetwork',
          component: CallNetwork
        },
        {
          path: 'call-self',
          name: 'callSelf',
          component: CallSelf
        },
        {
          path: 'broadcast-time',
          name: 'scheduledBroadcast',
          component: ScheduledBroadcast
        },
        {
          path: 'broadcast-list',
          name: 'broadcastList',
          component: BroadcastList
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
              component: MaintainMoneyManage
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
        },
        {
          path: 'voice', //语音系统
          component: manage,
          redirect: {name: 'voiceBaseSet'},
          children: [
            {
              path: 'setting',
              name: 'voiceBaseSet',
              component: VoiceBaseSet
            },
            {
              path: 'remindsy',
              name: 'voiceRemindsy',
              component: VoiceRemindsy
            },
            {
              path: 'call-network',
              name: 'voiceCallNetwork',
              component: VoiceCallNetwork
            },
            {
              path: 'manage',
              name: 'voiceManage',
              component: VoiceManage
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
              path: 'list/add', //新增套餐
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
      redirect: {name: 'shiftList'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'account', //账目明细
          component: manage,
          redirect: {name: 'incomeSummary'},
          children: [
            {
              path: 'income-summary',
              name: 'incomeSummary',
              component: IncomeSummary
            },
            {
              path: 'revenue',
              name: 'inbarRevenue',
              component: InbarRevenue
            },
            {
              path: 'online-query',
              name: 'memberOnlineQuery',
              component: MemberOnlineQuery
            },
            {
              path: 'credit-exchange',
              name: 'creditExchange',
              component: CreditExchange
            },
            {
              path: 'activity-reward',
              name: 'activityReward',
              component: ActivityReward
            },
            {
              path: 'maintain-money-expense',
              name: 'maintainMoneyExpense',
              component: MaintainMoneyExpense
            }
          ]
        },
        {
          path: 'graph', //经营分析
          component: manage,
          redirect: {name: 'graphIncome'},
          children: [
            {
              path: 'income',
              name: 'graphIncome',
              component: GraphIncome
            },
            {
              path: 'member',
              name: 'graphMember',
              component: GraphMember
            },
            {
              path: 'recharge',
              name: 'graphRecharge',
              component: GraphRecharge
            },
            {
              path: 'recharge/detail',
              name: 'graphRecharge',
              component: GraphRechargeDetail
            },
            {
              path: 'expense',
              name: 'graphExpense',
              component: GraphExpense
            },
            {
              path: 'expense/detail',
              name: 'graphExpense',
              component: GraphExpenseDetail
            },
            {
              path: 'attendence',
              name: 'graphAttendence',
              component: GraphAttendence
            },
            {
              path: 'goods',
              name: 'graphGoods',
              component: GraphGoods
            }
          ]
        },
        {
          path: 'shift', //交班管理
          component: manage,
          children: [
            {
              path: '',
              name: 'shiftList',
              component: ShiftList
            },
            {
              path: 'detail',
              name: 'shiftDetail',
              component: ShiftDetail
            },
            {
              path: 'sale-detail',
              name: 'shiftSaleDetail',
              component: ShiftSaleDetail
            },
            {
              path: 'recharge-detail',
              name: 'shiftRechargeDetail',
              component: ShiftRechargeDetail
            },
            {
              path: 'online-detail',
              name: 'shiftOnlineDetail',
              component: ShiftOnlineDetail
            }
          ]
        },
        {
          path: 'tool', //店长工具
          component: manage,
          redirect: {name: 'turnInFundList'},
          children: [
            {
              path: 'turn-in',
              name: 'turnInFundList',
              component: TurnInFundList
            },
            {
              path: 'turn-in/post',
              name: 'turnInFundPost',
              component: TurnInFundPost
            },
            {
              path: 'turn-in/get',
              name: 'turnInFundGet',
              component: TurnInFundGet
            },
            {
              path: 'refund',
              name: 'refund',
              component: Refund
            },
            {
              path: 'maintain',
              name: 'maintainFund',
              component: MaintainFund
            }
          ]
        },
        {
          path: 'precipitation', //沉淀资金清零
          component: manage,
          redirect: {name: 'precipitationMemberData'},
          children: [
            {
              path: 'member-data',
              name: 'precipitationMemberData',
              component: PrecipitationMemberData
            },
            {
              path: 'member-set',
              name: 'precipitationMemberSet',
              component: PrecipitationMemberSet
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
      path: '/account',
      component: home,
      children: [
        {
          path: 'manager-info',
          name: 'manager-base-info',
          meta: {
            menubar: true
          },
          component: managerInfo
        },
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
        {
          path: 'message',
          name: 'message-center',
          meta: {
            menubar: true
          },
          component: messageCenter
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
