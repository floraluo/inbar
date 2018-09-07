<template>
  <div class="page-content " >
    <div class="panel">
      <div class="panel-head">
        <span class="title">销售统计</span>
      </div>
      <div class="panel-body">
        <div class="title">
          <strong class="total">总计:<span class="highlight">￥{{goodsSales ? goodsSales.total : '--'}}</span></strong>
          <span class="time pull-right">时间:2018-08-01-12:00<span></span></span>
        </div>
        <ul class="clearfix row">
          <li class="col-xs-12 col-sm-6 col-md-3 item">现金：<span >{{goodsSales ? goodsSales.cash : '--'}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">银联卡：<span >{{goodsSales ? goodsSales.unionpay : '--'}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">会员现金：<span >{{goodsSales ? goodsSales.account : '--'}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">会员赠送金：<span >{{goodsSales ? goodsSales.restrictedAccount : '--'}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">员工卡：<span >{{goodsSales ? goodsSales.stuffCard : '--'}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">第三方：<span >{{goodsSales ? goodsSales.thirdparty : '--'}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">线上扣款：<span >{{goodsSales ? goodsSales.online : '--'}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">门店赠送金：<span >{{goodsSales ? goodsSales : '--'}}</span></li>
        </ul>
      </div>
    </div>
    <div class="panel bar-bottom-container">
      <div class="panel-head">
        <span class="title ">销售明细</span>
      </div>
      <div class="panel-body">
        <ul class="nav nav-tabs" role="tablist">
          <li :class="{active: detailListType === 1}" role="presentation" @click="switchType(1)"><a href="javascript:;">门店销售商品清单</a></li>
          <li :class="{active: detailListType === 2}" role="presentation" @click="switchType(2)"><a href="javascript:;">门店赠送商品清单</a></li>
        </ul>
        <div class="table-box">
          <div class="left-table-box">
            <v-table ref="summaryTable" is-horizontal-resize
                     is-vertical-resize
                     style="width:100%"
                     row-hover-color="#eee"
                     row-click-color="#edf7ff"
                     title-bg-color="#f0f2f9"
                     :title-row-height="52"
                     :height="455"
                     :min-height="455"
                     :title-rows="summaryTable.titleRows"
                     :columns="summaryTable.columns"
                     :table-data="summaryTable.data"
                     :footer="summaryTable.footer"></v-table>
          </div>
          <div class="right-table-box">
            <v-table ref="listTable" is-horizontal-resize
                     is-vertical-resize
                     style="width:100%"
                     row-hover-color="#eee"
                     row-click-color="#edf7ff"
                     title-bg-color="#f0f2f9"
                     :title-row-height="52"
                     :is-loading="tableLoading"
                     :height="455"
                     :min-height="455"
                     :columns="listTable.columns"
                     :table-data="listTable.data"></v-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {GET} from '../core/http'

  let vm;
  export default {
    name: "sale-statistics",
    data () {
      return {
        tableLoading: false,
        goodsSales: null,
        detailListType: 1,
        summaryTable: {
          data: [],
          titleRows: [
            [{fields: ['name', 'count', 'amount'], title: '销售汇总', titleAlign: 'center', colspan: 3}]
          ],
          columns: [
            {field: 'name', width: 125, columnAlign: 'center'},
            {field: 'count', width: 90, columnAlign: 'center'},
            {field: 'amount', width: 100, columnAlign: 'center'}
          ],
          footer: [
            ['总计']
          ]
        },
        listTable: {
          data: [],
          columns: [
            {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
            {field: 'className', title: '商品分类', width: 125, titleAlign: 'center', columnAlign: 'center'},
            {field: 'goodsNumber', title: '商品编号', width: 90, titleAlign: 'center', columnAlign: 'center'},
            {field: 'goodsName', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center'},
            {field: 'quantity', title: '销售数量', width: 100, titleAlign: 'center', columnAlign: 'center'},
            {field: 'amount', title: '销售金额', width: 100, titleAlign: 'center', columnAlign: 'center'}
          ]
        }
      }
    },
    methods: {
      switchType(type) {
        this.detailListType = type;
        getSaleDetailList();
      }
    },
    created() {
      vm = this;
      this.goodsSales = this.$route.query.goodsSales;
      getSaleDetailList();
      GET('/api/cashier/shift/goods-sales')
        .then(data => {
          vm.goodsSales = data;
        })
    }
  }
  function getSaleDetailList () {
    let type;
    if (vm.detailListType === 1) {
      type = 'by-class'
    } else if (vm.detailListType === 2) {
      type = 'as-free'
    }
    GET(`/api/cashier/shift/goods-sales/${type}`).then(data => {
      vm.listTable.data = data.goods;
      [].push.call(vm.summaryTable.data, data.suite, data.normal);
      [].push.call(vm.summaryTable.footer[0], data.quantity, data.amount);
      // vm.summaryTable.footer[0][1] = data.quantity;
      // vm.summaryTable.footer[0][1] = data.amount;
    })
  }
</script>

<style scoped lang="scss">
  @import "../sass/shift-statistics";

</style>
