<template>
  <!--上机统计-->
    <div>
      <div class="amount-total">
        <span class=" total ">开机未上机</span>
        <span class="time pull-right">时间:<span></span></span>
        <p class="padding-top-25">附加费：<span class="padding-left-10">3000</span></p>
      </div>
      <p class="title">开机已上机</p>
      <div class="online-list  ">
        <ul class="clearfix">
          <li>上网费：<span>2900</span></li>
          <li>附加费：<span>2900</span></li>
          <li>赠送：<span>2900</span></li>
          <li>时长：<span>2900</span></li>
          <li>人次：<span>2900</span></li>
        </ul>
      </div>
      <div class="amount-total">
        <span class=" total ">本班新开卡</span>
        <p class="padding-top-25">本班新办会员卡数：<span class="padding-left-10">3000</span></p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "online-amount"
    }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  .amount-total {
    display: block;
    padding: 10px 20px;
    align-items: center;
    p{
      margin-bottom: 0;
    }
    span.total {
      font-weight: bold;
      color: #37474f;
    }
    span.value {
      font-size: 18px;
      color: #fd0326;
    }
  }

  .online-list{
    display: flex;
    padding:  10px 20px 0 20px;
    ul{
    width: 100%;
      li{
        display: flex;
        margin-right: 10px ;
        margin-bottom: 5px;
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
  p.title{
    font-weight: bold;
    padding: 5px 20px;
    color: #37474f;
  }
</style>
