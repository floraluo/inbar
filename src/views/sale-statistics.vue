<template>
  <div class="page-content " >
    <div class="panel ">
      <div class="panel-heading title-bot">
        <p class="panel-title">销售统计</p>
      </div>

      <sale-amount></sale-amount>

    </div>
    <div class="panel bar-bottom-container">
      <div class="panel-heading ">
        <p class="panel-title ">销售明细</p>
      </div>
      <div class="nav-tabs-list " data-approve="nav-tabs">
        <ul class="nav nav-tabs " role="tablist">
          <li class="active" role="presentation">
            <a data-toggle="tab" href="#accountSales" aria-controls="accountSales" role="tab" aria-expanded="false">
              门店销售商品清单
            </a>
          </li>
          <li role="presentation" class="">
            <a data-toggle="tab" href="#remainderlist" aria-controls="remainderlist" role="tab" aria-expanded="true">
              门店剩余商品清单
            </a>
          </li>
        </ul>
        <div class="tab-content ">
          <div class="tab-pane active" id="accountSales" role="tabpanel">
            <div class="col-md-3 padding-0">
              <table class=" table table-bordered table-center ">
                <thead>
                <tr>
                  <th colspan="3">销售汇总</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>套餐商品合计</td>
                  <td>32</td>
                  <td>2000</td>
                </tr>
                <tr>
                  <td>常规商品合计</td>
                  <td>32</td>
                  <td>2000</td>
                </tr>
                <tr style="font-weight: bold">
                  <td>总计</td>
                  <td class="value">32</td>
                  <td class="value">2000</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-9 ">
              <table class="table table-bordered table-center">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>商品分类</th>
                  <th>商品编号</th>
                  <th>商品名称</th>
                  <th>销售数量</th>
                  <th>销售金额</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>分类一</td>
                  <td>323232322232</td>
                  <td>名称1</td>
                  <td>11</td>
                  <td>100.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>分类一</td>
                  <td>323232322232</td>
                  <td>名称1</td>
                  <td>11</td>
                  <td>100.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>分类一</td>
                  <td>323232322232</td>
                  <td>名称1</td>
                  <td>11</td>
                  <td>100.00</td>
                </tr>
                </tbody>
              </table>
            </div>

          </div>
          <div class="tab-pane " id="remainderlist" role="tabpanel">
            <div class="col-md-3 padding-0">
              <table class="table  table-first">
                <thead>
                <tr>
                  <th colspan="3">赠送汇总</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>商品合计</td>
                  <td  class="value">2000</td>
                </tr>
                <tr>
                  <td>维护金合计</td>
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
                  <th>赠送方式</th>
                  <th>商品分类</th>
                  <th>商品编号</th>
                  <th>商品名称</th>
                  <th>赠送数量</th>
                  <th>使用维护金</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>充值赠送</td>
                  <td>分类一</td>
                  <td>323232322232</td>
                  <td>名称1</td>
                  <td>11</td>
                  <td>100.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>充值赠送</td>
                  <td>分类一</td>
                  <td>323232322232</td>
                  <td>名称1</td>
                  <td>11</td>
                  <td>100.00</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>充值赠送</td>
                  <td>分类一</td>
                  <td>323232322232</td>
                  <td>名称1</td>
                  <td>11</td>
                  <td>100.00</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { components } from '../core'

  import SaleStatistics from './template/sale-statistics-box'

  export default {
    name: "sale-statistics",
    components: components(SaleStatistics)
  }
</script>

<style scoped lang="scss">
  @import "../sass/sale-statistics";

</style>
