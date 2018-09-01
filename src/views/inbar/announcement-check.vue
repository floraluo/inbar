<template>
    <div class="page-main ">
      <div class=" btn-return ">
        <router-link :to="{name: 'inbar-announcement'}" class="btn-pure btn-default" replace> 返回  <i class="iconfont icon-fanhui"></i></router-link>
      </div>
        <div class="page-main-top announce-top">
          <h1>{{announces.name}}</h1>
          <div class="title-bottom ">
            <span class="">开始时间：<span>{{announces.beginTime}}</span></span>
            <span class="padding-left-20">结束时间：<span>{{announces.endTime}}</span></span>
            <div class="pull-right">
            <a class="" target="_blank"><i class="iconfont icon-bianji2" aria-hidden="true"></i> 编辑</a>
            <a  class="padding-left-20" @click="deleteAnnounce" target="_blank"><i class="iconfont icon-close" aria-hidden="true"></i> 删除</a>
            </div>
          </div>
        </div>
        <div class="page-main-content padding-20">
         <div>{{announces.content}}</div>
          <div class="padding-top-20"><strong>公告说明：</strong>{{announces.description}}</div>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import { publish, subscribe } from 'pubsub-js'
  import {GET,DELETE} from '../../core/http'

  let vm;
  function getAllAnnounce(){
    GET(`/api/announcement/${vm.$route.params.id}`)
      .done((data) => {
        vm.accounces = data;
      })
  }

     export default {
       name: "announcement-check",
       date() {
         return {
           announces: [],
         }
       },

     methods: {
       deleteAnnounce() {
         const url = `/api/announcement/?ids=${vm.$route.params.id}`;
         DELETE(url)
           .done(() => {
             getAllAnnounce();
             layer.msg("删除成功")
           })
       },
     },
       created() {
         vm = this;
         getAllAnnounce();
         },
       mounted() {
         publish('crumb.push', {
           crumb: {name: '查看公告'},
           toggleMenubar: false
         })
       }
     }
</script>

<style scoped lang="scss">
@import "../../sass/inbar-setting";
</style>
