<template>
  <div class="page-content" >
    <!--<div class="page-main">-->
      <!--充值统计-->
      <div class="panel ">
        <div class="panel-head">
          <span class="title">充值总计预览</span>
        </div>
        <div class="panel-body">
          <div class="title">
            <strong class="total">总计:<span class="highlight">￥{{recharge.total}}</span></strong>
            <span class="time pull-right">时间:2018-08-01-12:00<span></span></span>
          </div>
          <ul class="clearfix overview">
            <li class="col-xs-12 col-sm-6 col-5 item">现金：<span>{{recharge.cash}}</span></li>
            <li class="col-xs-12 col-sm-6 col-5 item">银联卡：<span>{{recharge.unionpay}}</span></li>
            <li class="col-xs-12 col-sm-6 col-5 item">支付宝:<span>{{recharge.alipay}}</span></li>
            <li class="col-xs-12 col-sm-6 col-5 item">微信：<span>{{recharge.wechat}}</span></li>
            <li class="col-xs-12 col-sm-6 col-5 item">临时卡转交下班：<span>{{recharge.temporalBalance}}</span></li>
          </ul>
        </div>
      </div>
      <div class="panel recharge-detail">
        <div class="panel-head">
          <span class="title">充值优惠券明细预览</span>
        </div>
        <div class="panel-body clearfix row">
          <div class="col-md-3">
            <table class="table table-first " data-scroll-y="500px">
              <thead>
              <tr>
                <th colspan="3">赠送汇总</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>应收合计（元）</td>
                <td  class="value">{{setmeal.originalAmount}}</td>
              </tr>
              <tr>
                <td>实收合计（元）</td>
                <td  class="value">{{setmeal.actualAmount}}</td>
              </tr>
              <tr>
                <td>维护金合计（元）</td>
                <td  class="value">{{setmeal.fundAmount}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-9 ">
            <v-table is-horizontal-resize
                     is-vertical-resize
                     style="width:100%"
                     row-hover-color="#eee"
                     row-click-color="#edf7ff"
                     title-bg-color="#ebebeb"
                     :title-row-height="36"
                     :height="655"
                     :min-height="455"
                     :error-content="'暂无数据'"
                     :columns="columns"
                     :table-data="rechargeList"
                     :show-vertical-border="false"></v-table>
          </div>
        </div>
      </div>
    <!--</div>-->
  </div>
</template>

<script>
  import {GET} from '../core/http'

  let vm;
  export default {
    name: "recharge-statistics",
    data () {
      return {
        recharge: {},
        setmeal: {},
        rechargeList: [],
        columns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'sold', title: '充值套餐', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'paymentName', title: '付款方式', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'sold', title: '应收', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'sold', title: '实收', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'sold', title: '维护金', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true}
        ]
      }
    },
    created() {
      vm = this;
      getData();
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'rechargeStatistics') {
          getData(); //'$route'
        }
      }
    }
  }
  function getData () {
    GET('/api/cashier/shift/recharge')
      .then(data => {
        vm.recharge = data;
      })
    GET('/api/cashier/shift/recharge/by-rule')
      .then(data => {
        vm.setmeal = data;
        vm.rechargeList = data.rules;
      })
  }
</script>

<style scoped lang="scss">
  /*@import "../sass/recharge-statistics";*/
  @import "../sass/base-cashier";
  @import "../sass/shift-statistics";

</style>
