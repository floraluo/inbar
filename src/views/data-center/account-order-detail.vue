<template>
  <div class="page-main" >
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>    </div>
    <div class="order-number-bar">
      <span class="number">订单号：{{$route.query.number}}</span>
      <button class="btn btn-flat btn-default" type="button" @click="exportDetail"><i class="iconfont icon-daochu"></i>导出</button>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">订单信息</div>
      <div class="order-panel-body">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-lg-3">订单状态：<span :class="orderStatus.className">{{orderStatus.text}}</span></div>
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
            <div class="col-xs-12 col-sm-6 col-lg-3">会员卡号：<span>{{order.idCard || '--'}}</span></div>
            <div class="col-xs-12 col-sm-6 col-lg-3">　机器号：<span>{{order.computerNumber || '--'}}</span></div>
            <div class="col-xs-12 col-sm-6 col-lg-3">会员姓名：<span>{{order.buyerName || '--'}}</span></div>
          <div class="col-xs-12 col-sm-6 col-lg-3">会员等级：<span>{{order.levelName || '--'}}</span></div>
          </div>
        </div>
      </div>
    <div class="order-panel" v-if="recharge">
      <div class="order-panel-title">商品与服务</div>
      <div class="order-panel-body">
        <table class="table table-recharge " data-scroll-y="500px">
            <thead>
            <tr>
              <th colspan="3">商品与服务清单</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>参加活动</td>
            <td  class="value">{{order.ruleName	}}</td>
            </tr>
            <tr>
              <td>充值金额</td>
            <td  class="value">{{order.amount}}</td>
            </tr>
            <tr>
              <td>赠送网费</td>
            <td  class="value">{{order.overed}}</td>
            </tr>
            <tr>
            <td>赠送商品</td>
            <td  class="value">{{order.goodsList}}</td>
            </tr>
            <tr>
            <td>订单金额</td>
            <td  class="value">{{order.orderAmount}}</td>
            </tr>
            </tbody>
          </table>
      </div>

    </div>
    <div class="order-panel" v-else>
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
  import $ from 'jquery'
  import moment from 'moment'
  import {publish} from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  import store from '@/core/store'
  let vm
  export default {
        name: "account-order-detail",
    data () {
      return {
        tableLoading: false,
        recharge: false,
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
        // window.open(`/api/cashier/account-details/selectBarWaterBills?orderNum=${this.$route.query.number}`)
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
      vm=this;
      this.order = this.$route.query.rowData;
      const params = this.order.orderSn
      GET('/api/order/getOrderInfo', {orderNum: params.number})
        .then(data => {
          this.orderList = data.goodsListVos
        })
      //this.orderList = this.$route.query;
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '订单详情'},
        toggleMenubar: false
      })
    }
    }

</script>

<style scoped lang='scss'>
  @import "../../sass/order-detail";
  .btn-flat{
    color: #0191fa;
  }
  span.name{
    font-size: 14px;
    font-weight: bolder;
    padding-bottom: 12px;

  }

  .item{

    padding-bottom: 10px;
  }
  .table-recharge{
    border: 1px solid #e4eaec;
    text-align: center;
    th{
      background-color: #ebebeb ;
      border: 1px solid #e4eaec;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
    }
    td {
      border: 1px solid #e4eaec;
      width: 50%;

    }
  }
  .value{
    color: #fd0326;
    text-align:center;
    border-right: 1px solid #e4eaec;
  }
</style>
