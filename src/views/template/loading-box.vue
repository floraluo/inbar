<template>
  <div class="loading-box" :class="{active: loading}">
    <i class="iconfont icon-loading"></i>
    <p v-if="loadingTxt">{{loadingTxt}}</p>
  </div>
</template>

<script>
  export default {
    name: "loading-box",
    props: {
      loading: Boolean,
      loadingTxt: String
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";

  .loading-box{
    position: absolute;
    left: 50%;
    margin-left: -28px;
    bottom: 240px;
    display: none;
  &.active{
     display: block;
   }
  .iconfont{
    display: inline-block;
    font-size: 50px;
    color: #b3b3b3;
  //transition: transform .4s initial;
    animation: rotate 1.5s linear infinite;
  }
  p{
    font-size: 14px;
    color: $text;
  }
  }
</style>
