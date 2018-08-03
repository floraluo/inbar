<template>
  <div class="page">
    <div class="page-content " >
      <div class="panel ">
        <div class="panel-heading title-bot">
          <p class="panel-title">充值总计预览</p>
        </div>
        <recharge-amount></recharge-amount>
      </div>
      <div class="panel bar-bottom-container">
        <div class="panel-heading ">
          <p class="panel-title">充值优惠券明细预览</p>
        </div>
        <div class="tab-content padding-left-20">
            <div class="col-md-3 padding-0">
              <table class="table table-first ">
                <thead>
                <tr>
                  <th colspan="3">赠送汇总</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>应收合计（元）</td>
                  <td  class="value">2000</td>
                </tr>
                <tr>
                  <td>实收合计（元）</td>
                  <td  class="value">2000</td>
                </tr>
                <tr>
                  <td>维护金合计（元）</td>
                  <td  class="value">2000</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-9 ">
              <table class="table table-bordered table-center">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>充值套餐</th>
                  <th>付款方式</th>
                  <th>应收</th>
                  <th>实收</th>
                  <th>维护金</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>充100送50</td>
                  <td>支付宝</td>
                  <td>120.00</td>
                  <td>100.00</td>
                  <td>20.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>充100送50</td>
                  <td>支付宝</td>
                  <td>120.00</td>
                  <td>100.00</td>
                  <td>20.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>充100送50</td>
                  <td>支付宝</td>
                  <td>120.00</td>
                  <td>100.00</td>
                  <td>20.00</td>
                </tr>
                </tbody>
              </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import RechargeAmount from "./template/recharge-statistics-box";
    export default {
        name: "recharge-statistics",
      components: {RechargeAmount}
    }
</script>

<style scoped lang="scss">
  @import "../sass/recharge-statistics";

</style>
