<template>
    <div class="panel-center ">
      <div class="col-xs-6 text-right">
        <img src="../assets/img/404.png">
      </div>
        <div class="col-xs-6">
          <h1>很抱歉！您访问的页面不存在...</h1>
          <button class="btn btn-primary">返回首页<a href="#"></a></button>
        </div>
    </div>
</template>

<script>
  export default {
    name: '404'
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
