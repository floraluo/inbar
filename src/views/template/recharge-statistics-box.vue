<template>
  <!--充值统计-->
  <div>
  <div class="amount-total">
    <span class=" total ">总计:<span class="value">￥5165</span></span>
    <span class="time pull-right">时间:<span></span></span>
  </div>
  <div class="recharge-list ">
    <ul class="clearfix">
      <li>现金：<span>2900</span></li>
      <li>银联卡：<span>2900</span></li>
      <li>支付宝:<span>2900</span></li>
      <li>微信：<span>2900</span></li>
      <li>临时卡转交下班：<span>2900</span></li>
    </ul>
  </div>
  </div>
</template>

<script>
    export default {
        name: "recharge-amount"
    }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";

  .amount-total{
    display: block;
    padding: 10px 20px ;
    align-items: center;
  span.total{
    font-weight: bold;
    color: #37474f;
  }
  span.value{
    font-size: 18px;
    color: #fd0326;
  }
  }
  .recharge-list{
    display: flex;
    padding: 15px 20px;
    margin-bottom:10px ;
  ul{
    width: 100%;
  li{
    display: flex;
    margin-right: 10px ;
    margin-bottom: 15px;
    width: calc((100% - 40px)/5);
    float: left;

  &:nth-child(5){
     margin-right: 0;
   }
  >span{
    padding-left: 10px;
  }
  }
  }
  }

</style>

