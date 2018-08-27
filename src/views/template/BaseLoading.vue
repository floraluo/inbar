<template>
  <div class="loading-panel" :class="{active: loading}">
    <div class="loading">
      <i class="iconfont icon-loading"></i>
      <p v-if="loadingTxt">{{loadingTxt}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseLoading",
    props: {
      loading: Boolean,
      loadingTxt: String
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";

  .loading-panel{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
    display: none;
    &.active{
      display: block;
    }
    .loading{
      margin-top: 5%;
      /*<!--position: absolute;-->*/
      /*<!--left: 50%;-->*/
      /*<!--margin-left: -28px;-->*/
      /*<!--bottom: 240px;-->*/
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
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
