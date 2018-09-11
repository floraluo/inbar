<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="order-number-bar">
      <span class="number">补货单号：{{$route.query.number}}</span>
      <!--<form action="/api/order/exportStock" method="get">-->
        <!--<input type="hidden" :value="$route.query.number" name="orderNum">-->
        <button class="btn" type="button" @click="exportDetail"><i class="iconfont icon-daochu"></i>导出</button>
      <!--</form>-->
    </div>
    <div class="order-panel">
      <div class="order-panel-title">订单信息</div>
      <div class="order-panel-body">
        <div class="row">
          <div class="col-xs-4">操作人：<span>{{order.operatedBy}}</span></div>
          <div class="col-xs-4">补货数量：<span>{{order.goodsNum}}</span></div>
          <div class="col-xs-4">备注信息：<span>{{order.remark || '--'}}</span></div>
          <div class="col-xs-4">订单时间：<span>{{orderTime}}</span></div>
          <div class="col-xs-4">补货总额：<span>{{order.amount}}</span></div>
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
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'goodsName', title: '商品名称', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData, rowIndex) => {
              if (rowData.goodsImage) {
                return ` ${rowData.goodsName}`
              } else {
                return `<i class="iconfont icon-tupian" style="margin-right: 5px;"></i> ${rowData.goodsName}`
              }
            }
          },
          {field: 'goodsCostprice', title: '进价/元', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsNum', title: '数量', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'unit', title: '单位', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {title: '小计', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData) => { return rowData.goodsPrice * rowData.goodsNum }}
        ],
        order: {},
        orderList: []
      }
    },
    computed: {
      orderTime () {
        return moment(this.order.createTime).format('YYYY-MM-DD')
      }
    },
    methods: {
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
      },
      exportDetail() {
        window.open(`/api/order/exportStock?orderNum=${this.$route.query.number}`)
      }
    },
    created() {
      const params = this.$route.query
      GET('/api/order/getProducersStockOrderInfo', {orderNum: params.number})
        .then(data => {
          this.order = data;
          this.orderList = data.goodsList
          if (this.orderList.length > 0) {
            this.orderList.push({})
          }
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
