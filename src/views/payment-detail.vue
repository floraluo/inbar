<template>
  <div class="page-content" >

    <div class="row margin-0">
      <!--上缴统计-->
      <div class=" col-md-8 col-xs-12 padding-left-0 ">
        <div class="panel ">
          <div class="panel-heading">
            <p class="panel-title">上缴统计</p>
          </div>
          <div class=" panel-center clearfix ">
            <ul class="clearfix">
              <li>当期应缴现金：<span>2900</span></li>
              <li>差异：<span>2900</span></li>
              <li>当期实缴现金：<span>2900</span></li>
              <li>当期临时卡金额：<span>2900</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!--差异说明-->
      <div class="col-md-4 col-xs-12 ">
        <div class="panel">
          <div class="panel-heading ">
            <p class="panel-title">差异说明</p>
          </div>
          <div class="panel-center clearfix padding-top-10">
            <div class="form-group">
              <label class="col-xs-3 control-label padding-right-0">差异说明：</label>
              <div class="col-xs-8 padding-0">
                <p >差异说明差异说明差异说明差异说明差异说明差异说明差异说明差异说明差异说明差异说明</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-xs-3 control-label padding-right-0">备注说明：</label>
              <div class="col-xs-8 padding-0">
                <p class="">备注说明备注说明备注说明备注说明备注说明备注说明备注说明</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--上缴汇总-->
    <div class="panel ">
      <div class="panel-heading">
        <p class="panel-title">上缴汇总</p>
      </div>
      <div class="panel-content padding-10">
        <div class="amount-total">
          <span class=" total ">总计:<span class="value">￥5165</span></span>
          <span class="time pull-right">时间:<span></span></span>
        </div>
        <div  class="form-group ">
          <ul class="clearfix ">
            <li>整存补存：<span >2900</span></li>
            <li>补缴上月盈亏：<span >2900</span></li>
            <li>包机费：<span >2900</span></li>
            <li>暂支差异归还：<span >2900</span></li>
            <li>其他存款：<span >2900</span></li>
            <li>补交上月团购：<span >2900</span></li>
            <li>备用金归还：<span >2900</span></li>
            <li>宿舍押金归还：<span >2900</span></li>
          </ul>
        </div>
      </div>
    </div>

    <!--上缴类目-->
    <div class="panel ">
      <div class="panel-heading">
        <p class="panel-title">上缴类目</p>
        <button type="button" class="btn btn-outline btn-primary panel-actions">查看详细</button>
      </div>
      <div class="panel-content padding-10">
        <div class="amount-total">
          <span class=" total ">总计:<span class="value">￥5165</span></span>
          <span class="time pull-right">时间:<span></span></span>
        </div>
        <div class="nav-tabs-list padding-top-10 " data-approve="nav-tabs">
          <ul class="nav nav-tabs margin-left-10 " role="tablist">
            <li class="" role="presentation">
              <a data-toggle="tab" href="#type" aria-controls="type;" role="tab" aria-expanded="false">
                按类别
              </a>
            </li>
            <li role="presentation" class="active">
              <a data-toggle="tab" href="#paymentTerm" aria-controls="paymentTerm;" role="tab" aria-expanded="true">
                按支付方式
              </a>
            </li>
          </ul>
          <div class="tab-content ">
            <!--按类别-->
            <div class="tab-pane  " id="type" role="tabpanel">

            </div>
            <!--按支付方式-->
            <div class="tab-pane  active" id="paymentTerm" role="tabpanel">
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

  </div>

</template>
<script>
  export default {
    name: "payment-detail"
  }
</script>

<style scoped lang="scss">
  @import "../sass/payment-detail";
</style>
