<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="detail-panel definite">
      <div class="detail-panel-title">
        <span class="name">充值统计</span>
      </div>
      <div class="detail-panel-body">
        <div class="title">
          <strong class="total">总计：<span>￥{{recharge.total}}</span></strong>
          <span class="time">时间：</span>
        </div>
        <div class="content row">
          <div class="col-xs-12 col-sm-6 col-5 item"><label>现金：</label><span>{{recharge.cash}}</span></div>
          <div class="col-xs-12 col-sm-6 col-5 item"><label>银联卡：</label><span>{{recharge.unionpay}}</span></div>
          <div class="col-xs-12 col-sm-6 col-5 item"><label>支付宝：</label><span>{{recharge.alipay}}</span></div>
          <div class="col-xs-12 col-sm-6 col-5 item"><label>微信：</label><span>{{recharge.wechat}}</span></div>
          <div class="col-xs-12 col-sm-6 col-5 item"><label class="em8">临时卡转交下班：</label><span>{{recharge.temporalBalance}}</span></div>
        </div>
      </div>
    </div>
    <div class="detail-panel definite">
      <div class="detail-panel-title">
        <span class="name">充值优惠券明细预览</span>
      </div>
      <div class="detail-panel-body clearfix row">
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
  </div>
</template>

<script>
  import {GET} from '../../core/http'
  import store from '@/core/store'
  let vm;
  export default {
    name: 'shift-detail-recharge',
    data () {
      return {
        inbarId: null,
        recharge: {},
        setmeal: {},
        rechargeList: [],
        columns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'name', title: '充值套餐', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'paymentName', title: '付款方式', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'originalAmount', title: '应收', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'actualAmount', title: '实收', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'fundAmount', title: '维护金', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true}
        ]
      }
    },
    created() {
      vm = this;
      this.inbarId = store.get('token').user_basic.inbarId
      getData();
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'shiftRechargeDetail') {
          getData(); //'$route'
        }
      }
    }
  }
  function getData () {
    GET(`/api/inbar/${vm.inbarId}/rota/${vm.$route.query.rotaId}/recharge`)
      .then(data => {
        vm.recharge = data;
      })
    GET(`/api/inbar/${vm.inbarId}/rota/${vm.$route.query.rotaId}/recharge/by-rule`)
      .then(data => {
        vm.setmeal = data;
        vm.rechargeList = data.rules;
      })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/shift-detail";
  .table-first{
    border: 1px solid #e4eaec;
    th{
      background-color: #ebebeb ;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
    }
    td {
      border-top: none;
      padding-left: 15px;
      padding-right: 15px;

    }
    .value{
      color: #fd0326;
      text-align:center;
      border-right: 1px solid #e4eaec;
    }
  }
</style>
