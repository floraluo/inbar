<template>
  <div class="page-main">
    <div class="setting-title">上传壁纸</div>
    <div class="setting-panel">
        <div class="img-box">
          <div class="btn-box">
            <span>上传自定义图片，支持jpe、png、bmp格式的图片，大小不超过2M<samll>（为了您的展示效果，推荐1920*1280以上的壁纸）</samll></span>
          </div>
          <div class="img-container">
            <div class="default-img" v-if="!goodsImg"><i class="iconfont icon-tupian1"></i></div>
            <img :src="goodsImg" v-else>
          </div>
        </div>
      <div class="bottom-btn-group text-center">
        <label class="btn btn-primary btn-upload" for="selectImg">
          <i class="iconfont icon-tupian"></i>选择图片
          <input class="sr-only" @change='importFile($event)' accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" type="file" id="selectImg">
        </label>
        <button class="btn btn-default" @click="submitGoods" type="button">确认上传</button>
      </div>
    </div>
    <div class="setting-title">壁纸库</div>
    <div class="setting-panel">
      <ul class="nav nav-tabs" role="tablist">
        <li :class="{active: goodsParams.gcId === ''}" role="presentation"><a href="javascript:;" @click="filterGoods()">全部</a></li>
        <li :class="{active: goodsParams.gcId === ''}" role="presentation"><a href="javascript:;" @click="filterGoods()">当前</a></li>
        <li :class="{active: goodsParams.gcId === item.gcId}" role="presentation" v-for="item in categories" :key="item.gcId"><a href="javascript:;" @click="filterGoods(item)">{{item.gcName}}</a></li>
        <li>已选张壁纸</li>
      </ul>
    </div>
    <div class="operate-group">
      <button class="btn btn-primary" @click="submit">保存</button>
      <button class="btn btn-default">取消</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "desktop-wallpaper",
      data() {
        return {
          layerId: null,
          buttonShow:null,
          themesLoading: false,
          themes: [],
        }
      },
      created() {},
      methods: {}
    }
</script>
<style scoped lang='scss'>
  @import "../../sass/base-cashier";
  @import "../../sass/base-manage";

</style>
