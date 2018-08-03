<template>
  <div class="page">
    <div class="page-content" >
      <div class="panel ">
        <div class="panel-heading">
          <p class="panel-title">销售统计</p>
          <button type="button" class="btn btn-outline btn-primary panel-actions ">销售明细</button>
        </div>

       <sale-amount></sale-amount>

      </div>

      <div class="panel ">
        <div class="panel-heading">
            <p class="panel-title">充值统计</p>
            <button type="button" class="btn btn-outline btn-primary panel-actions">充值明细</button>
        </div>

        <recharge-amount></recharge-amount>

        </div>

      <div class="panel">
        <div class="panel-heading">
          <p class="panel-title">上机统计</p>
          <button type="button" class="btn btn-outline btn-primary panel-actions">上机明细</button>
        </div>

        <online-amount></online-amount>

      </div>

      <div class="panel shif-primary-box">
        <button class="btn btn-primary btn-pri">立即交班</button>
      </div>
    </div>
    </div>
</template>

<script>
  import { components } from '../core'
  import SaleStatistics from './template/sale-statistics-box'
  import RechargeStatistics from './template/recharge-statistics-box'
  import OnlineStatistics from './template/online-stasistics-box'
    export default {
        name: "shift-statistics",
      components: components(SaleStatistics, RechargeStatistics, OnlineStatistics)
    }
</script>

<style scoped lang="scss">
  @import "../sass/shift-statistics";

</style>
