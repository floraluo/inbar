<template>
  <div class="page-main">
    <div class="setting-panel">
      <div class="form-group">
        开启按日期自动切换主题
        <ul class="radio-lists ">
          <li class="radio-custom radio-primary " >
            <input   value="true" type="radio" id="enabled"><label for="enabled">YES</label>
          </li>
          <li class="radio-custom radio-primary" >
            <input  value="false" type="radio"  id="disabled"><label for="disabled">NO</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel">
      <div class="themes-box">
        <ul >
          <li class="themes-type">
            <p>天使之翼</p>
            <div class="themes-img">
              <div class="img-box">
                <img class="img" @click="previewImg" src="../../assets/img/themes1.png" >
              </div>
              <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
            </div>
          </li>
          <li class="themes-type">
          <p>轻便风格</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes2.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li>
          <li class="themes-type">
          <p>圣诞嗨皮</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes3.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li>
          <li class="themes-type">
          <p>新春大吉</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes4.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li>
          <li class="themes-type">
          <p>游戏风格</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes5.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li>
          <li class="themes-type">
          <p>天使之翼</p>
          <div class="themes-img">
            <div class="img-box">
              <img class="img" @click="previewImg" src="../../assets/img/themes1.png" >
            </div>
            <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
          </div>
        </li>
          <li class="themes-type">
            <p>轻便风格</p>
            <div class="themes-img">
              <div class="img-box">
                <img class="img" @click="previewImg" src="../../assets/img/themes2.png" >
              </div>
              <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
            </div>
          </li>
          <li class="themes-type">
            <p>圣诞嗨皮</p>
            <div class="themes-img">
              <div class="img-box">
                <img class="img" @click="previewImg" src="../../assets/img/themes3.png" >
              </div>
              <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
            </div>
          </li>
          <li class="themes-type">
            <p>新春大吉</p>
            <div class="themes-img">
              <div class="img-box">
                <img class="img" @click="previewImg" src="../../assets/img/themes4.png" >
              </div>
              <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
            </div>
          </li>
          <li class="themes-type">
            <p>游戏风格</p>
            <div class="themes-img">
              <div class="img-box">
                <img class="img" @click="previewImg" src="../../assets/img/themes5.png" >
              </div>
              <button class="btn btn-primary" @click="setThemes">设置为默认主题</button>
            </div>
          </li>
        </ul>
      </div>
      <div id="previewImgLayer" class="layer-preview-img layer-open">
        <img class="preview-img" src="../../assets/img/themes1.png" >
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
  </div>
</template>

<script>
  import layer from '../../../static/vendor/layer/layer'
  import $ from 'jquery'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  let vm;
  export default {
    name: "desktop-themes",
    data() {
      return {
        layerId: null,
        buttonShow:null,
        themesLoading: false,
        themes: [],
        checked: false
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
  .layer-open{
    padding: 0;
  }
</style>
<style scoped lang='scss'>
  @import "../../sass/base-cashier";
  @import "../../sass/base-manage";
  $item: 5;
  $item-width: 258px;
  .page-main{
    padding-left: 25px;
    padding-right: 25px;
    .setting-title{
      font-size: 15px;
      color: $text-dark;
      font-weight: bold;
    }
    .setting-panel{
     // margin-top: 15px;
      margin-bottom: 30px;
      padding:  15px 0;
      background-color: #f5f5f5;
      color: $text;
      .form-group{
        padding-left: 20px;
        display: flex;
        align-items: center;
      }
      .radio-lists{
        display: flex;
        padding-left: 15px;
        li + li{
          margin-left: 20px;
        }
      }
      ul{
        margin-bottom: 0;
      }
    }
  }

  .vue-switch{
    margin: 15px;
  }
  .themes-box {
    overflow: hidden;
    ul {
      margin-left: calc((100% - #{$item * $item-width}) / #{-2 * $item});
      margin-right: calc((100% - #{$item * $item-width}) / #{-2 * $item});
      /*overflow-y: auto;*/
      /*&::-webkit-scrollbar {*/
        /*display: none*/
      /*}*/
      li.themes-type {
        float: left;
        height: 257px;
        width: $item-width;
        margin-left: calc((100% - #{$item * $item-width}) / #{2 * $item});
        margin-right: calc((100% - #{$item * $item-width}) / #{2 * $item});
        text-align: center;
        margin-top: 15px;
        > p {
          width: 100%;
          margin-bottom: 20px;
        }
        .themes-img {
          /*height: 161px;*/
          /*width: 255px;*/
          padding: 20px 20px;
          //border: 1px solid #e8ebfb;
          border-radius: 4px;
          box-shadow: 0 0 7px 3px #e8ebfb;
          .img-box{
            width: 220px;
            height: 120px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .btn {
            margin-top: 20px;
            width: 100%;
            display:none;
          }
          &:hover {
            height: 215px;
            box-shadow: 0 0 7px #1890ff;
            border-color: #86c5ff;
            .btn{
              display:block;
            }
          }
          &.active {
            box-shadow: 0 0 7px #50b4f4;
            border-color: #50b4f4;
            background-color: #ffffff;
          }
        }
        /*img.preview-img {*/
        /*width: 1040px;*/
        /*height: 590px;*/
        /*}*/
      }
      @media (max-width: 1600px) {
        margin-left: calc((100% - #{($item - 1) * $item-width}) / #{-2 * $item});
        margin-right: calc((100% - #{($item - 1) * $item-width}) / #{-2 * $item});
        li.themes-type{
          margin-left: calc((100% - #{($item - 1) * $item-width}) / #{2 * $item});
          margin-right: calc((100% - #{($item - 1) * $item-width}) / #{2 * $item});
        }
      }
      @media (max-width: 1360px) {
        margin-left: calc((100% - #{($item - 2) * $item-width}) / #{-2 * $item});
        margin-right: calc((100% - #{($item - 2) * $item-width}) / #{-2 * $item});
        li.themes-type{
          margin-left: calc((100% - #{($item - 2) * $item-width}) / #{2 * $item});
          margin-right: calc((100% - #{($item - 2) * $item-width}) / #{2 * $item});
        }
      }
    }
  }
</style>
