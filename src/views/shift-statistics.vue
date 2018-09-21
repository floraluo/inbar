<template>
  <div class="page-content clearfix" >
    <!--销售统计-->
    <div class="panel">
      <div class="panel-head">
        <span class="title">销售统计</span>
        <router-link :to="{path: 'sale-detail'}" class="btn btn-outline btn-primary  ">销售明细</router-link>
      </div>
      <div class="panel-body">
        <div class="title">
          <strong class="total">总计:<span class="highlight">￥{{goodsSales.total}}</span></strong>
          <span class="time pull-right">时间:2018-08-01-12:00<span></span></span>
        </div>
        <ul class="clearfix overview">
          <li class="col-xs-12 col-sm-6 col-md-3 item">现金：<span >{{goodsSales.cash}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">银联卡：<span >{{goodsSales.unionpay}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">会员现金：<span >{{goodsSales.account}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">会员赠送金：<span >{{goodsSales.restrictedAccount}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">员工卡：<span >{{goodsSales.stuffCard}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">第三方：<span >{{goodsSales.thirdparty}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">线上扣款：<span >{{goodsSales.online}}</span></li>
          <li class="col-xs-12 col-sm-6 col-md-3 item">门店赠送金：<span >{{goodsSales}}</span></li>
        </ul>
      </div>
    </div>
    <!--充值统计-->
    <div class="panel ">
      <div class="panel-head">
        <span class="title">充值统计</span>
        <router-link :to="{path: 'recharge-detail'}" class="btn btn-outline btn-primary  ">充值明细</router-link>
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
    <!--上机统计-->
    <div class="panel">
      <div class="panel-head">
        <span class="title">上机统计</span>
        <router-link :to="{path: 'online-detail'}" class="btn btn-outline btn-primary">上机明细</router-link>
      </div>
      <div class="panel-body">
        <div class="title">
          <strong class="total">开机已上机</strong>
          <span class="time">{{online.timestamp}}</span>
        </div>
        <ul class="clearfix overview">
          <li class="col-xs-12 col-sm-6 col-5 item">上网费：<span>{{online.onlineFee}}</span></li>
          <li class="col-xs-12 col-sm-6 col-5 item">附加费：<span>{{online.holdingFee}}</span></li>
          <li class="col-xs-12 col-sm-6 col-5 item">赠送：<span>{{online}}</span></li>
          <li class="col-xs-12 col-sm-6 col-5 item">时长：<span>{{online.onlineDuration}}</span></li>
          <li class="col-xs-12 col-sm-6 col-5 item">人次：<span>{{online.visitors}}</span></li>
        </ul>
        <div class="title">
          <strong class="total">本班新开卡</strong>
        </div>
        <ul class="clearfix">
          <li class="col-xs-12">本班新办会员卡数：<span>{{online.newMembers}}</span></li>
        </ul>
      </div>
    </div>

    <!--交班按钮-->
    <div class="panel shif-primary-box">
      <a class="btn btn-primary btn-pri"   herf="javascript:;" @click="openShiftLayer">立即交班</a>
    </div>

    <!--交班确认模态框-->
    <div class="layer-sure " id="sureBox" >
        <h4 > 请确认本次值班的销售统计、充值统计和上机统计</h4>
        <div class="checkbox-custom checkbox-primary padding-top-20">
          <input type="checkbox" v-model="confirmSale" id="inputSuresales">
          <label for="inputSuresales">已确认销售统计</label>
        </div>
        <div class="checkbox-custom checkbox-primary padding-top-10">
          <input type="checkbox" v-model="confirmRecharge" id="inputSurerecharge">
          <label for="inputSurerecharge">已确认充值统计</label>
        </div>
        <div class="checkbox-custom checkbox-primary padding-top-10">
          <input type="checkbox" v-model="confirmOnline" id="inputOnline">
          <label for="inputOnline">已确认上机统计</label>
        </div>
      <div class="btn-bottom ">
        <button type="button" class="btn btn-default margin-right-15" @click="cancelLayer" >取消</button>
        <button type="button" class="btn btn-primary" @click="submitSure">交班</button>
      </div>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
  import layer from '../../static/vendor/layer/layer'
  import {GET, POST} from '../core/http'

  let vm;
  export default {
    name: "shift-statistics",
    data() {
      return {
        layerId: null,
        goodsSales: {},
        recharge: {},
        online: {},
        confirmSale: false,
        confirmRecharge: false,
        confirmOnline: false
      }
    },
    methods: {
      openShiftLayer() {
        this.layerId = layer.open({
          type: 1,
          title: '交班确认',
          area: ['635px', '365px'],
          content: $('#sureBox')
        })
      },
      submitSure() {
        if (this.confirmSale && this.confirmRecharge && this.confirmOnline) {
          POST('/api/cashier/shift')
            .then(() => {
              layer.msg('交班成功')
              vm.cancelLayer();
            })
        } else {
          layer.msg('有未确认数据，不能交班')
        }
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },

    created() {
      vm = this;
      getRotaStatistics();
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'shiftStatistics') {
          getRotaStatistics();
        }
      }
    }
  }
  function getRotaStatistics () {
    GET('/api/cashier/shift')
      .then(data => {
        vm.goodsSales = data.goodsSales;
        vm.recharge = data.recharge;
        vm.online = data.online;
      })
  }
</script>

<style scoped lang="scss">
  @import "../sass/shift-statistics";

</style>
