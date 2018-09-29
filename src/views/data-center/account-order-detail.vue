<template>
  <div class="page-main" >
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>    </div>
    <div class="page-main-top">
      <span >订单号：{{}}</span>
      <button class="btn btn-flat btn-default" @click="clickExportData"><i class="iconfont icon-daochu"></i>导出</button>
    </div>
    <div class="detail-panel">
      <div class="detail-panel-title">
        <span class="name">订单信息</span>
      </div>
      <div class="content row">
        <div class="col-xs-12 col-md-6 item"><label>订单状态：</label><span>{{BarWaterBills.orderState}}</span></div>
        <div class="col-xs-12 col-md-6 item"><label>成交时间：</label><span>{{BarWaterBills.finnshedTime}}</span></div>
        <div class="col-xs-12 col-md-6 item"><label>订单金额：</label><span>{{BarWaterBills.orderAmount}}</span></div>
        <div class="col-xs-12 col-md-6 item"><label>支付方式：</label><span>{{BarWaterBills.paymentName}}</span></div>
      </div>

    </div>
    <div class="detail-panel">
      <div class="detail-panel-title">
        <span class="name">客户信息</span>
      </div>
      <div class="content row">
        <div class="col-xs-12 col-md-6 item"><label>会员卡号：</label><span>{{BarWaterBills.idCard}}</span></div>
        <div class="col-xs-12 col-md-6 item"><label>机器号：</label><span>{{BarWaterBills.computerNumber}}</span></div>
        <div class="col-xs-12 col-md-6 item"><label>会员姓名：</label><span>{{BarWaterBills.buyerName}}</span></div>
        <div class="col-xs-12 col-md-6 item"><label>会员等级：</label><span>{{BarWaterBills.level}}</span></div>
      </div>

    </div>
    <div class="detail-panel">
      <div class="detail-panel-title">
        <span class="name">商品与服务</span>
      </div>
      <div class="content row">
          <table class="table table-first " data-scroll-y="500px">
            <thead>
            <tr>
              <th colspan="3">商品与服务清单</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>参加活动</td>
              <td  class="value">{{BarWaterBills.orderAmount}}</td>
            </tr>
            <tr>
              <td>充值金额</td>
              <td  class="value">{{BarWaterBills.orderAmount}}</td>
            </tr>
            <tr>
              <td>赠送网费</td>
              <td  class="value">{{BarWaterBills.orderAmount}}</td>
            </tr>
            <tr>
            <td>赠送商品</td>
            <td  class="value">{{BarWaterBills.orderAmount}}</td>
            </tr>
            <tr>
            <td>订单金额</td>
            <td  class="value">{{BarWaterBills.orderAmount}}</td>
            </tr>
            </tbody>
          </table>
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
        BarWaterBills: [],
      }
    },
    methods:{
      clickExportData(){},
    },
    created() {
      vm = this;
      getAllbarWater ();//created
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '订单详情'},
        toggleMenubar: false
      })
    }
    }
    function getAllbarWater () {
      vm.tableLoading = true;
      GET('/api/cashier/account-details/selectBarWaterBills')
        .then(data => {
          vm.tableLoading = false;
          vm.BarWaterBills = data;
        })
    }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .btn-flat{
    color: #0191fa;
  }
  span.name{
    font-size: 14px;
    font-weight: bolder;
    padding-bottom: 12px;

  }
  .detail-panel-title{
    padding-bottom: 10px;
  }
  .item{

    padding-bottom: 10px;
  }

</style>
