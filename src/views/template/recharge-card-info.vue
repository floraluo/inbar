<template>
  <div class="panel panel-card-info">
    <div class="input-box">
      <label>卡号/机器号</label>
      <input type="text" class="form-control">
      <button class="btn btn-primary">重置</button>
      <button class="btn btn-primary">刷新</button>
    </div>
    <p>卡号：654543233454321345</p>
    <ul class="detail clearfix">
      <li>姓名：<span>sdfad</span></li>
      <li>手机号码：<span></span></li>
      <li>现金：<span></span></li>
      <li>积分：<span></span></li>
      <li>赠送：<span></span></li>
      <li>类型：<span></span></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "card-info"
    }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  .panel-card-info{
    padding: 25px 15px;
    height: 270px;
    .input-box{
      label{
        margin-right: 10px;
        font-weight: bold;
        font-size: 16px;
        color: $text-dark;
      }
      .form-control{
        margin-right: 15px;
        width: 176px;
        display: inline-block;
        vertical-align: top;
      }
      .btn+.btn{
        margin-left: 5px;
      }
    }
    >p{
      padding-left: 40px;
      margin-top: 25px;
      margin-bottom: 20px;
      //text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: $theme-color;
    }
    >.detail{
      line-height: 2.4;
      padding-left: 40px;
      li{
        float: left;
        width: 40%;
        font-size: 14px;
        color: $text-dark;
        //list-style: none;
        &:nth-child(even){
          width: 60%;
        }
        >span{
          color: $text-light;
        }
      }
    }
  }
</style>
