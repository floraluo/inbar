<template>
  <div class="">
    <div class="page-main ">
      <div class=" btn-return ">
        <router-link :to="{name: 'inbar-announcement'}" class="btn-pure btn-default" replace> 返回  <i class="iconfont icon-fanhui"></i></router-link>
      </div>
        <div class="page-main-top announce-top">
          <h1>新店开业大酬宾</h1>
          <div class="title-bottom ">
            <span class="">开始时间：<span>2018-08-01</span></span>
            <span class="padding-left-20">结束时间：<span>2018-08-01</span></span>
            <div class="pull-right">
            <a class="" target="_blank"><i class="iconfont icon-bianji2" aria-hidden="true"></i> 编辑</a>
            <a  class="padding-left-20" @click="" target="_blank"><i class="iconfont icon-close" aria-hidden="true"></i> 删除</a>
            </div>
          </div>
        </div>
        <div class="page-main-content padding-20">
         <p>公司挖热轧钢板任务萨准备好突然跟我说你帮我设置</p>
          <p class="padding-top-20"><strong>公告说明：</strong>shuom</p>
        </div>
      </div>
  </div>
</template>

<script>
     export default {
       name: "announcement-check"
     }
</script>

<style scoped lang="scss">
@import "../../sass/inbar-setting";
</style>
