<template>
  <div class="page-content">
    <div class="page-main clearfix">
      <div class="col-xs-12">
        <div class="row">
          <div class="col-sm-9">
            <div class="row">
              <ul class="h-tabs">
                <li role="presentation" class="active"><a href="#overview" aria-controls="home" role="tab" data-toggle="tab">概览</a></li>
                <li role="presentation" class=""><a href="#networkFee" aria-controls="home" role="tab" data-toggle="tab">网费</a></li>
                <li role="presentation" class=""><a href="#goods" aria-controls="home" role="tab" data-toggle="tab">商品</a></li>
                <li role="presentation" class=""><a href="#member" aria-controls="home" role="tab" data-toggle="tab">会员</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">账户设置</div>
        </div>
        <div class="row">
          <div class="col-sm-9 tab-content">
            <div role="tabpanel" class="tab-pane active" id="overview">1</div>
            <div role="tabpanel" class="tab-pane" id="networkFee">2</div>
            <div role="tabpanel" class="tab-pane" id="goods">3</div>
            <div role="tabpanel" class="tab-pane" id="member">4</div>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'index',
    data () {
      return {}
    },
    methods: {},
    created () {
      vm = this
    }
  }
</script>

<style scoped lang='scss'>
@import "../sass/index";
</style>
