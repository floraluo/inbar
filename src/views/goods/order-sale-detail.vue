<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="order-number-bar">
      <span class="number">订单号：{{$route.params.number}}</span>
      <span class="button"><i class="iconfont icon-daochu"></i>导出</span>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">订单信息</div>
      <div class="order-panel-body">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-lg-3">订单状态：<span>{{order.orderState}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">成交时间：<span>{{order.finnshedTime}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">订单金额：<span>{{order.orderAmount}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">支付方式：<span>{{order.paymentName}}</span></div>
        </div>
      </div>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">客户信息</div>
      <div class="order-panel-body">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-lg-3">会员卡号：<span>{{order.memberId}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">　机器号：<span>asdkf</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">会员姓名：<span>asdkf</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">会员等级：<span>{{order.level}}</span></div>
        </div>
      </div>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">商品清单</div>
      <div class="order-panel-body">
        <v-table is-horizontal-resize
                 is-vertical-resize
                 style="width:100%"
                 row-hover-color="#fff"
                 row-click-color="#fff"
                 title-bg-color="#f5f5f5"
                 :title-row-height="40"
                 :is-loading="tableLoading"
                 :height="455"
                 :min-height="455"
                 :columns="columns"
                 :table-data="orderList"
                 :show-vertical-border="false"></v-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {publish} from 'pubsub-js'
  import {GET} from '../../core/http'

  export default {
    name: 'order-detail',
    data() {
      return {
        tableLoading: false,
        columns: [
          {field: 'goodsName', title: '商品', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'goodsSerial', title: '编号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsPrice', title: '单价', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsNum', title: '数量', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {title: '小计', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData) => { return rowData.goodsPrice * rowData.goodsNum }}
        ],
        order: {},
        orderList: []
      }
    },
    created() {
      const params = this.$route.params
      GET('/api/order/getOrderInfo', {orderNum: params.number})
        .then(data => {
          this.order = data;
          this.orderList = data.goodsListVos
        })
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '订单详情'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/order-detail";
</style>
