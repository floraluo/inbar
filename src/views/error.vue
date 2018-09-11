<template>
  <div class="panel-center ">
    <div class="col-xs-6 text-right">
      <img src="../assets/img/500.png">
    </div>
    <div class="col-xs-6">
      <h1>出错啦！找不到您请求的页面...</h1>
      <button class="btn btn-primary">返回首页<a href="#"></a></button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "error"
    }
</script>

<style lang="scss" scoped>
  @import "../sass/variables";
  .panel-center{
    height: calc(100vh - #{$nav-height} - #{$tab-height} - #{$footer-height});
    display: flex;
    align-items: center;
  }

</style>
