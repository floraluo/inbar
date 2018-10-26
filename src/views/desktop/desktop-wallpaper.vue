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
    <div class="panel">
      <div class="themes-box">
        <ul >
          <li class="themes-type">
            <p>游戏风格</p>
            <div class="themes-img">
              <div class="img-box">
                <img class="img" @click="previewImg" src="../../assets/img/themes1.png" >
              </div>
              <input type="checkbox" id="checkbox" v-model="checked">
              <label for="checkbox">{{ checked }}</label>
            </div>
          </li> <li class="themes-type">
          <p>游戏风格</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes1.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li> <li class="themes-type">
          <p>游戏风格</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes1.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li> <li class="themes-type">
          <p>游戏风格</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes1.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li> <li class="themes-type">
          <p>游戏风格</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes1.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li> <li class="themes-type">
          <p>游戏风格</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes1.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li>
        </ul>
      </div>
      <!--<base-loading :loading=themesLoading></base-loading>-->
      <!--<div class="no-data" v-show="themes.length === 0">暂无套餐</div>-->
      <!--<ul>-->
      <!--<li class="themes-type" v-for="item in paymentMethods" :key="item.paymentId"  @click="selectPayment(item)">-->
      <!--<p>{{item.themesName}}</p>-->
      <!--<img class="iconfont" :class="'icon-'+item.paymentCode">-->

      <!--</li>-->
      <!--</ul>-->
    </div>
    <div class="operate-group">
      <button class="btn btn-primary" @click="submit">保存</button>
      <button class="btn btn-default">取消</button>
    </div>
  </div>
</template>

<script>
  import layer from '../../../static/vendor/layer/layer'
  import $ from 'jquery'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  let vm;

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
    methods: {
      mouseenter(index) {
        this.buttonShow = index
      },
      mouseleave() {
        this.buttonShow = null
      },
      previewImg() {
        layer.open({
          type: 1,
          title: false, //不显示标题
          skin: 'layui-layer-nobg',
          area: ['auto'],
          content: $('#previewImgLayer'),
        })
      },
      setThemes(){}
    }
  }
</script>
<style scoped lang='scss'>
  @import "../../sass/base-manage";

</style>
