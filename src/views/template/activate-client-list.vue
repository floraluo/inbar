<template>
  <div :class="['panel', 'panel-client-list', {'has-bottom': hasBottom}]">
    <div class="title">激活客户列表</div>
    <ul>
      <li><span>李晓飞</span>587541********3587</li>
      <li><span>万基</span>587541********3587</li>
      <li><span>利润</span>587541********3587</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "activate-client-list",
    props: {
      hasBottom: Boolean
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  .panel-client-list{
    min-height: 540px;
    &.has-bottom{
      min-height: 412px;
    }
    >.title{
      padding-top: 30px;
      padding-bottom: 30px;
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      color: $text-dark;
    }
    li{
      line-height: 2.6;
      text-align: center;
      font-size: 16px;
      color: $text;
      >span{
        display: inline-block;
        text-align: left;
        width: 6em;
      }
    }
  }
</style>
