import Vue from 'vue'
import Router from 'vue-router'
// import home from '../home/home'
const home = () => import('../home/home')
const manage = () => import('../views/manage')
const user = () => import('../views/user')
const display = () => import('../views/display')
const recharge = () => import('../views/recharge')
const sale = () => import('../views/commodity-sales')
const sales = () => import('../views/alt-sales')

const index = () => import('../views/index')
const _404 = () => import('../views/404')
const _500 = () => import('../views/500')
const developing = () => import('../views/developing')
const maintenance = () => import('../views/maintenance')
const login = () => import('../views/login')
const onlineMember = () => import('../views/online-members')
const machine = () => import('../views/machine-list')
const rechargeRecord = () => import('../views/recharge-record')
//吧台数据查询
const OrderList = () => import('../views/bar/data/order-list')
const SaleRecordList = () => import('../views/bar/data/sale-record-list')
const RechargeRecordList = () => import('../views/bar/data/recharge-record-list')
const SettleAccountsList = () => import('../views/bar/data/settle-accounts-list')
const RepertoryLists = () => import('../views/bar/data/repertory-list')

//吧台店长工具
const BarTurnInFundList = () => import('../views/bar/tool/turn-in-fund-list')
const BarRefundList = () => import('../views/bar/tool/refund-list')
const BarMaintainFundList = () => import('../views/bar/tool/maintain-fund-list')

//吧台语音
const MessageBoard = () => import('../views/bar/voice/message-board')
const CallNetwork = () => import('../views/bar/voice/call-network')
const CallSelf = () => import('../views/bar/voice/call-self')
const ScheduledBroadcast = () => import('../views/bar/voice/scheduled-broadcast')
const BroadcastList = () => import('../views/bar/voice/broadcast-list')

//个人信息设置
const ManagerInfo = () => import('../views/account/manager-base-info')
const BaseInfo = () => import('../views/account/base-info')
const ModifyPwd = () => import('../views/account/modify-pwd')
const MessageCenter = () => import('../views/account/message-center')

//交班管理
const ShiftStatistics = () => import('../views/shift-statistics')
const SaleStatistics = () => import('../views/sale-statistics')
const RechargeStatistics = () => import('../views/recharge-statistics')
const OnlineStatistics = () => import('../views/online-statistics')
const StatementCheck = () => import('../views/statement-check')

const payments = () => import('../views/payment')
const paymentDetail = () => import('../views/payment-detail')
const paymentSuccess = () => import('../views/payment-success')

//网吧管理
const manageMemberData = () => import('../views/inbar/manage-member-data')
const modifyMemberInfo = () => import('../views/inbar/modify-member-info')
const manageMemberSet = () => import('../views/inbar/manage-member-set')
const staffAuthorityManage = () => import('../views/inbar/staff-authority-manage')
const MaintainMoneyManage = () => import('../views/inbar/maintain-money-manage')
const managePackage = () => import('../views/inbar/manage-package')
const inbarInfo = () => import('../views/inbar/inbar-base-info')
const setInfo = () => import('../views/inbar/set-base-info')
const setCashier = () => import('../views/inbar/set-cashier')
const setArea = () => import('../views/inbar/set-area')
const setComputer = () => import('../views/inbar/set-computer')
const memberLevel = () => import('../views/inbar/member-level')
const setCoins = () => import('../views/inbar/set-coins')
const inbarAnnouncement = () => import('../views/inbar/inbar-announcement')
const announcementCheck = () => import('../views/inbar/announcement-check')
const addAnnouncement = () => import('../views/inbar/add-announcement')
const VoiceBaseSet = () => import('../views/inbar/voice-base-set')
const VoiceRemindsy = () => import('../views/inbar/voice-remindsy')
const VoiceCallNetwork = () => import('../views/inbar/voice-call-network')
const VoiceManage = () => import('../views/inbar/voice-manage')

//商品管理
const goodsInfo = () => import('../views/goods/goods-info')
const addGoods = () => import('../views/goods/add-goods')
const modifyGoods = () => import('../views/goods/modify-goods')
const categroyManage = () => import('../views/goods/category-manage')
const repertoryList = () => import('../views/goods/repertory-list')
const repertoryUpdate = () => import('../views/goods/repertory-update')
const repertoryInbarUpdate = () => import('../views/goods/repertory-inbar-update')
const orderSale = () => import('../views/goods/order-sale-list')
const orderUpdate = () => import('../views/goods/order-update-list')
const orderPickUp = () => import('../views/goods/order-pickup-list')
const orderSaleDetail = () => import('../views/goods/order-sale-detail')
const orderUpdateDetail = () => import('../views/goods/order-update-detail')
const orderPickUpDetail = () => import('../views/goods/order-pickup-detail')
const goodsSetting = () => import('../views/goods/goods-setting')
const addPackage = () => import('../views/inbar/add-package')
const packageList = () => import('../views/goods/package-list')
const addPackages = () => import('../views/goods/add-packages')

//经营管理
//--账目明细
const IncomeSummary = () => import('../views/data-center/account-income-summary')
const InbarRevenue = () => import('../views/data-center/account-inbar-revenue')
const MemberOnlineQuery = () => import('../views/data-center/account-member-online-query')
const CreditExchange = () => import('../views/data-center/account-credit-exchange')
const ActivityReward = () => import('../views/data-center/account-activity-reward')
const MaintainMoneyExpense = () => import('../views/data-center/account-maintain-money-expense')
const AccountOrderDetail = () => import('../views/data-center/account-order-detail')
const MemberOnlineDetail = () => import('../views/data-center/account-member-online-detail')
//--经营分析
const GraphIncome = () => import('../views/data-center/graph-income')
const GraphMember = () => import('../views/data-center/graph-member')
const GraphRecharge = () => import('../views/data-center/graph-recharge')
const GraphRechargeDetail = () => import('../views/data-center/graph-recharge-detail')
const GraphExpense = () => import('../views/data-center/graph-expense')
const GraphExpenseDetail = () => import('../views/data-center/graph-expense-detail')
const GraphAttendence = () => import('../views/data-center/graph-attendence')
const GraphGoods = () => import('../views/data-center/graph-goods')
//--交班管理
const ShiftList = () => import('../views/data-center/shift-list')
const ShiftDetail = () => import('../views/data-center/shift-detail')
const ShiftSaleDetail = () => import('../views/data-center/shift-detail-sale')
const ShiftRechargeDetail = () => import('../views/data-center/shift-detail-recharge')
const ShiftOnlineDetail = () => import('../views/data-center/shift-detail-online')
//--店长工具
const TurnInFundList = () => import('../views/data-center/tool-turn-in-fund-list')
const TurnInFundPost = () => import('../views/data-center/tool-turn-in-post')
const TurnInFundGet = () => import('../views/data-center/tool-turn-in-get')
const Refund = () => import('../views/data-center/tool-refund')
const MaintainFund = () => import('../views/data-center/tool-maintain-fund')
//--沉淀资金清零
const PrecipitationMemberData = () => import('../views/data-center/precipitation-member-data')
const PrecipitationMemberSet = () => import('../views/data-center/precipitation-member-set')
//桌面管理
const desktopSetting = () => import('../views/desktop/desktop-setting')
const desktopThemes = () => import('../views/desktop/desktop-themes')
const desktopWallpaper = () => import('../views/desktop/desktop-wallpaper')

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
          path: '500',
          name: '500',
          component:_500,
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
        },
        {
          path: 'repertory-list',
          name: 'repertoryLists',
          component: RepertoryLists
        },
        {
          path: 'inbar-update', //吧台提货
          name: ' barUpdate',
          component: repertoryInbarUpdate
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
      path: '/bar/account', //吧台端 - 个人中心
      component: home,
      redirect: {name: 'baseInfo'},
      meta: {
        menubar: true
      },
      children: [
        {
          path: 'base-info',
          name: 'baseInfo',
          component: BaseInfo
        },
        {
          path: 'modify-pwd',
          name: 'barModifyPwd',
          component: ModifyPwd
        },
        {
          path: 'message',
          name: 'messageCenter',
          component: MessageCenter
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
              path: 'revenue/order-detail',
              name: 'accountOrderDetail',
              component: AccountOrderDetail
            },
            {
              path: 'online-query',
              name: 'memberOnlineQuery',
              component: MemberOnlineQuery
            },
            {
              path: 'online-query/detail',
              name: 'memberOnlineDetail',
              component: MemberOnlineDetail
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
      path: '/account', // 我的账户
      redirect: {name: 'managerBaseInfo'},
      component: home,
      children: [
        {
          path: 'manager-info',
          name: 'managerBaseInfo',
          meta: {
            menubar: true
          },
          component: ManagerInfo
        },
        {
          path: 'modify-pwd',
          name: 'modifyPwd',
          meta: {
            menubar: true
          },
          component: ModifyPwd
        }
      ]
    },
    {
      path: '/desktop', // 我的账户
      redirect: {name: 'desktop-setting'},
      component: home,
      children: [
        {
          path: 'set',
          name: 'desktop-setting',
          meta: {
            menubar: true
          },
          component: desktopSetting
        },
        {
          path: 'themes',
          name: 'desktop-themes',
          meta: {
            menubar: true
          },
          component: desktopThemes
        },
        {
          path: 'wallpaper',
          name: 'desktop-wallpaper',
          meta: {
            menubar: true
          },
          component: desktopWallpaper
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
          path: 'user',
          name: 'user',
          component: user,
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
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
