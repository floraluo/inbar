<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="detail-panel">
      <div class="detail-panel-title">
        <span class="name">充值统计</span>
        <router-link :to="{name: 'shift-recharge-detail'}" class="btn btn-primary">充值明细</router-link>
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
  </div>
</template>

<script>
  export default {
    name: 'shift-detail-recharge'
  }
</script>

<style scoped lang="scss">
  @import "../../sass/shift-detail";
</style>
