<template>
  <div class="page-content " >
    <div class="panel" >
      <div class="nav-tabs-list padding-top-10 " data-approve="nav-tabs">
        <ul class="nav nav-tabs margin-left-10 " role="tablist">
          <li class="" role="presentation">
            <a data-toggle="tab" href="#total" aria-controls="total;" role="tab" aria-expanded="false">
              全部
            </a>
          </li>
          <li role="presentation" class="active">
            <a data-toggle="tab" href="#unAnswered" aria-controls="unAnswered;" role="tab" aria-expanded="true">
              未回复
            </a>
          </li>
          <li role="presentation" class="active">
            <a data-toggle="tab" href="#answered" aria-controls="answered;" role="tab" aria-expanded="true">
              已回复
            </a>
          </li>
        </ul>
        <div class="tab-content ">
          <!--全部-->
          <div class="tab-pane  " id="total" role="tabpanel">

          </div>
          <!--已回复-->
          <div class="tab-pane  " id="unAnswered" role="tabpanel">

          </div>
          <!--未回复-->
          <div class="tab-pane  active" id="answered" role="tabpanel">
            <ul class="clearfix ">
              <li>现金：<span >2900</span></li>
              <li>线上充值：<span >2900</span></li>
              <li>销售优惠：<span >2900</span></li>
              <li>充值赠送金：<span >2900</span></li>
              <li>员工卡：<span >2900</span></li>
              <li>银联：<span >2900</span></li>
              <li>线上扣款：<span >2900</span></li>
              <li>销售赠送：<span >2900</span></li>
              <li>团购赠送金：<span >2900</span></li>
              <li>会员现金：<span >2900</span></li>
              <li>差异：<span >2900</span></li>
              <li>线上赠送：<span >2900</span></li>
              <li>会员赠送金：<span >2900</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "bbs"
    }
</script>

<style scoped>

</style>
