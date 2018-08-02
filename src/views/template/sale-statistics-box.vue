<template>
  <!--销售统计-->
  <div class="sale-amount-box">
    <div class="amount-total">
      <span class=" total ">总计:<span class="value">￥5165</span></span>
      <span class="time pull-right">时间:2018-08-01-12:00<span></span></span>
    </div>
    <div class="amount-list">
      <ul class="clearfix ">
        <li>现金：<span >2900</span></li>
        <li>银联卡：<span >2900</span></li>
        <li>会员现金：<span >2900</span></li>
        <li>会员赠送金：<span >2900</span></li>
        <li>员工卡：<span >2900</span></li>
        <li>第三方：<span >2900</span></li>
        <li>线上扣款：<span >2900</span></li>
        <li>门店赠送金：<span >2900</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "sale-amount"
    }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  .amount-total {
    display: block;
    padding: 10px 20px;
    align-items: center;
    span.total {
      font-weight: bold;
      color: #37474f;
    }
    span.value {
      font-size: 18px;
      color: #fd0326;
    }
  }
  .amount-list{
    display: flex;
    padding: 15px 20px;
    margin-bottom:10px ;
    ul{
      width: 100%;
      li{
        display: flex;
        margin-right: 10px ;
        margin-bottom: 15px;
        width: calc((100% - 30px)/4);
        float: left;
        &:nth-child(4n){
          margin-right: 0;
        }
        >span{
          padding-left: 10px;
        }
      }
    }
  }

</style>
