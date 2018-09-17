<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="detail-panel definite">
      <div class="detail-panel-title">
        <span class="name">上机统计</span>
      </div>
      <div class="detail-panel-body">
        <div class="title">
          <strong class="total">开卡已上机</strong>
        </div>
        <div class="content row">
          <div class="col-xs-12 col-sm-6 col-5 item"><label>上网费：</label><span>{{online.onlineFee}}</span></div>
          <div class="col-xs-12 col-sm-6 col-5 item"><label>附加费：</label><span>{{online.holdingFee}}</span></div>
          <div class="col-xs-12 col-sm-6 col-5 item"><label>赠送：</label><span>{{online}}</span></div>
          <div class="col-xs-12 col-sm-6 col-5 item"><label>时长：</label><span>{{online.onlineDuration}}</span></div>
          <div class="col-xs-12 col-sm-6 col-5 item"><label>人次：</label><span>{{online.visitors}}</span></div>
        </div>
        <div class="title">
          <strong class="total">本班新开卡</strong>
        </div>
        <div class="content row">
          <div class="col-xs-12 item">本班新办会员卡数：<span>{{online.newMembers}}</span></div>
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
    name: 'shift-detail-online',
    data() {
      return {
        online: {}
      }
    },
    created() {
      vm = this;
      this.inbarId = store.get('token').user_basic.inbarId
      GET(`/api/inbar/${vm.inbarId}/rota/${vm.$route.query.rotaId}/online-fee`)
        .then(data => {
          vm.online = data;
        })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/shift-detail";
</style>
