<template>
<div class="page-main">
  <div class="btn-return">
    <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
  </div>
  <div class="detail-panel">
    <div class="detail-panel-title">
      <span class="name">销售统计</span>
      <router-link :to="{path: 'sale-detail', query: {rotaId: $route.query.rotaId, goodsSales: detail.goodsSales}}" class="btn btn-primary">销售明细</router-link>
    </div>
    <div class="detail-panel-body">
      <div class="title">
        <strong class="total">总计：<span>￥{{detail.goodsSales.total}}</span></strong>
        <span class="time">时间：</span>
      </div>
      <div class="content row">
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>现金：</label><span>{{detail.goodsSales.cash}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>银联卡：</label><span>{{detail.goodsSales.unionpay}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>会员现金：</label><span>{{detail.goodsSales.account}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>会员赠送金：</label><span>{{detail.goodsSales.restrictedAccount}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>员工卡：</label><span>{{detail.goodsSales.stuffCard}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>线上扣款：</label><span>{{detail.goodsSales.online}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>第三方：</label><span>{{detail.goodsSales.thirdparty}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>门店赠送：</label><span>{{detail.goodsSales}}</span></div>
      </div>
    </div>
  </div>
  <div class="detail-panel">
    <div class="detail-panel-title">
      <span class="name">充值统计</span>
      <router-link :to="{name: 'shift-recharge-detail', query:detail}" class="btn btn-primary">充值明细</router-link>
    </div>
    <div class="detail-panel-body">
      <div class="title">
        <strong class="total">总计：<span>￥{{detail.recharge.total}}</span></strong>
        <span class="time">时间：</span>
      </div>
      <div class="content row">
        <div class="col-xs-12 col-sm-6 col-5 item"><label>现金：</label><span>{{detail.recharge.cash}}</span></div>
        <div class="col-xs-12 col-sm-6 col-5 item"><label>银联卡：</label><span>{{detail.recharge.unionpay}}</span></div>
        <div class="col-xs-12 col-sm-6 col-5 item"><label>支付宝：</label><span>{{detail.recharge.alipay}}</span></div>
        <div class="col-xs-12 col-sm-6 col-5 item"><label>微信：</label><span>{{detail.recharge.wechat}}</span></div>
        <div class="col-xs-12 col-sm-6 col-5 item"><label class="em8">临时卡转交下班：</label><span>{{detail.recharge.temporalBalance}}</span></div>
      </div>
    </div>
  </div>
  <div class="detail-panel">
    <div class="detail-panel-title">
      <span class="name">上机统计</span>
      <router-link :to="{name: 'shift-sale-detail'}" class="btn btn-primary">上机明细</router-link>
    </div>
    <div class="detail-panel-body">
      <div class="title">
        <strong class="total">开卡已上机</strong>
      </div>
      <div class="content row">
        <div class="col-xs-12 col-sm-6 col-5 item"><label>上网费：</label><span>{{detail.online.onlineFee}}</span></div>
        <div class="col-xs-12 col-sm-6 col-5 item"><label>附加费：</label><span>{{detail.online.holdingFee}}</span></div>
        <div class="col-xs-12 col-sm-6 col-5 item"><label>赠送：</label><span>{{detail.online}}</span></div>
        <div class="col-xs-12 col-sm-6 col-5 item"><label>时长：</label><span>{{detail.online.onlineDuration}}</span></div>
        <div class="col-xs-12 col-sm-6 col-5 item"><label>人次：</label><span>{{detail.online.visitors}}</span></div>
      </div>
      <div class="title">
        <strong class="total">本班新开卡</strong>
      </div>
      <div class="content row">
        <div class="col-xs-12 item">本班新办会员卡数：<span>{{detail.online.newMembers}}</span></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import {GET} from '../../core/http'
  import {publish} from 'pubsub-js'
  import store from '@/core/store'

  let vm;
  export default {
    name: 'shift-detail',
    data () {
      return {
        inbarId: null,
        detail: {
          goodsSales: {},
          online: {},
          recharge: {}
        }
      }
    },
    created() {
      vm = this;
      this.inbarId = store.get('token').user_basic.inbarId
      GET(`/api/inbar/${vm.inbarId}/rota/${vm.$route.query.rotaId}`)
        .then(data => {
          vm.detail = data;
        })
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '交班明细'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang="scss">
@import "../../sass/shift-detail";
</style>
