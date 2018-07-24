<template>
  <div :class="['panel', 'panel-client-list', {'has-bottom': hasBottom}]">
    <div class="title">激活客户列表</div>
    <ul v-for="(item) in activeCusList" :key="item.id" v-if="activeCusList.length > 0">
      <li><span>{{item.name}}</span>item.memberId</li>
    </ul>
    <div class="no-data">暂无激活用户！</div>
  </div>
</template>

<script>
  export default {
    name: "activate-client-list",
    props: {
      hasBottom: Boolean,
      activeCusList: Array
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  @import "../../sass/mixin";
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
    .no-data{
      @include no-data;
    }
  }
</style>
