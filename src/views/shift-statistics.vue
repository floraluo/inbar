<template>
  <div class="page-content" >
    <!--销售统计-->
    <div class="panel ">
      <div class="panel-heading">
        <p class="panel-title">销售统计</p>
        <button type="button" class="btn btn-outline btn-primary panel-actions ">销售明细</button>
      </div>

      <sale-amount></sale-amount>

    </div>
    <!--充值统计-->
    <div class="panel ">
      <div class="panel-heading">
        <p class="panel-title">充值统计</p>
        <button type="button" class="btn btn-outline btn-primary panel-actions">充值明细</button>
      </div>

      <recharge-amount></recharge-amount>

    </div>
    <!--上机统计-->
    <div class="panel  padding-bottom-20">
      <div class="panel-heading">
        <p class="panel-title">上机统计</p>
        <button type="button" class="btn btn-outline btn-primary panel-actions">上机明细</button>
      </div>

      <online-amount></online-amount>

    </div>

    <!--交班按钮-->
    <div class="panel shif-primary-box">
      <a class="btn btn-primary btn-pri"   herf="javascript:;" @click="sureBox">立即交班</a>
    </div>

    <!--交班确认模态框-->
    <div class="layer-sure " id="sureBox" >
        <h4 > 请确认本次值班的销售统计、充值统计和上机统计</h4>
        <div class="checkbox-custom checkbox-primary padding-top-20">
          <input type="checkbox" id="inputSuresales" checked="">
          <label for="inputSuresales">已确认销售统计</label>
        </div>
        <div class="checkbox-custom checkbox-primary padding-top-10">
          <input type="checkbox" id="inputSurerecharge">
          <label for="inputSurerecharge">已确认充值统计</label>
        </div>
        <div class="checkbox-custom checkbox-primary padding-top-10">
          <input type="checkbox" id="inputOnline">
          <label for="inputOnline">已确认上机统计</label>
        </div>
      <div class="btn-bottom ">
        <button type="button" class="btn btn-default margin-right-15" >取消</button>
        <button type="button" class="btn btn-primary">交班</button>
      </div>
    </div>
  </div>

</template>

<script>
  import { components } from '../core'
  import SaleStatistics from './template/sale-statistics-box'
  import RechargeStatistics from './template/recharge-statistics-box'
  import OnlineStatistics from './template/online-stasistics-box'
  import $ from 'jquery'
  import '../../static/vendor/layer/layer'
  let vm;
  export default {
    name: "shift-statistics",
    components: components(SaleStatistics, RechargeStatistics, OnlineStatistics),
    data() {
      return {
        layerId: null
      }
    },
    created() {
      vm = this;
    },
    methods: {
      sureBox() {
        this.layerId = layer.open({
          type: 1,
          title: '交班确认',
          area: ['635px', '365px'],
          content: $('#sureBox'),
        })
      },
      submitSure() {
        this.cancelLayer()
      },
      cancelLayer() {
        layer.close(this.layerId)
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/shift-statistics";

</style>
