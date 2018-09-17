<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="order-number-bar">
      <span class="number">订单号：{{$route.query.number}}</span>
      <!--<form action="/api/order/export" method="get">-->
        <!--<input type="hidden" :value="$route.query.number" name="orderNum">-->
        <button class="btn" type="button" @click="exportDetail"><i class="iconfont icon-daochu"></i>导出</button>
      <!--</form>-->
    </div>
    <div class="order-panel">
      <div class="order-panel-title">订单信息</div>
      <div class="order-panel-body">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-lg-3">订单状态：<span :class="orderStatus.className">{{orderStatus.text}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">成交时间：<span>{{finishTime}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">订单金额：<span>{{order.orderAmount}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">支付方式：<span>{{order.paymentName}}</span></div>
        </div>
      </div>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">客户信息</div>
      <div class="order-panel-body">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-lg-3">会员卡号：<span>{{order.idCard || '--'}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">　机器号：<span>{{order.computerNumber || '--'}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">会员姓名：<span>{{order.buyerName || '--'}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">会员等级：<span>{{order.level || '--'}}</span></div>
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
                 :columns="columns"
                 :table-data="orderList"
                 :cell-merge="cellMerge"></v-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {publish} from 'pubsub-js'
  import moment from 'moment'
  import {GET} from '../../core/http'

  export default {
    name: 'order-detail',
    data() {
      return {
        tableLoading: false,
        columns: [
          {field: 'goodsName', title: '商品', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData, rowIndex) => {
              let imgHtml;
              if (rowData.goodsImage) {
                imgHtml = rowData.goodsImage;
              } else {
                imgHtml = `<i class="iconfont icon-tupian" style="margin-right: 5px;"></i>`
              }
              return `${imgHtml} ${rowData.goodsName}`
            }
          },
          {field: 'goodsSerial', title: '编号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsPrice', title: '单价', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsNum', title: '数量', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {title: '小计', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData) => { return rowData.goodsPrice * rowData.goodsNum }}
        ],
        order: {},
        orderList: []
      }
    },
    computed: {
      orderStatus () {
        let className, text;
        switch (this.order.orderState) {
          case 1:
          case 2: {
            className = 'status-green';
            text = '可退单';
            break;
          }
          case 3: {
            className = 'status-yellow';
            text = '已退单';
            break;
          }
          case 4: {
            className = 'status-red';
            text = '不可退单';
            break;
          }
        }
        return {className, text}
      },
      finishTime () {
        return this.order.finnshedTime ? moment(this.order.finnshedTime).format('YYYY-MM-DD') : '--'
      }
    },
    methods: {
      exportDetail() {
        window.open(`/api/order/export?orderNum=${this.$route.query.number}`)
      },
      cellMerge (rowIndex, rowData, field) {
        if (rowIndex === this.orderList.length - 1) {
          if (field === 'serialNum') {
            return {
              colSpan: 2,
              rowSpan: 1,
              content: '<b style="font-weight: bold">合计</b>'
            }
          } else if (field === 'goodsCostprice') {
            return {
              colSpan: 2,
              rowSpan: 1,
              content: `<b style="font-weight: bold">总数量：<span style="color:red;">${this.order.goodsNum}</span></b>`
            }
          } else if (field === 'unit') {
            return {
              colSpan: 2,
              rowSpan: 1,
              content: `<b style="font-weight: bold">总金额：<span style="color:red;">${this.order.amount}</span></b>`
            }
          }
        }
      }
    },
    created() {
      const params = this.$route.query
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
