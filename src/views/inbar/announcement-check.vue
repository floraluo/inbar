<template>
  <div class="page-main ">
    <div class=" btn-return ">
      <router-link :to="{name: 'inbar-announcement'}" class="btn-pure btn-default" replace> 返回  <i class="iconfont icon-fanhui"></i></router-link>
    </div>
    <div class="page-main-top announce-top">
      <h1>{{accounces.name}}</h1>
      <div class="title-bottom ">
        <span class="">开始时间：<strong >{{ begTime  }}</strong></span>
        <span class="padding-left-20">结束时间：<strong>{{ eTime }}</strong></span>
        <div class="pull-right">
          <a class="" target="_blank"><i class="iconfont icon-bianji2" aria-hidden="true"></i> 编辑</a>
          <a  class="padding-left-20" @click="deleteAnnounce" target="_blank"><i class="iconfont icon-close" aria-hidden="true"></i> 删除</a>
        </div>
      </div>
    </div>
    <div class="page-main-content padding-20">
      <div>{{accounces.content}}</div>
      <div class="padding-top-20"><strong>公告说明：</strong>{{accounces.description}}</div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
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
    data() {
      return {
        accounces:{},
    }
    },
    computed: {
      begTime () {
        return this.accounces.beginTime ? moment(this.accounces.beginTime).format('YYYY-MM-DD') : '--'
      },
    eTime(){
      return this.accounces.endTime ? moment(this.accounces.endTime).format('YYYY-MM-DD') : '--'
    },
    },
    methods: {

      moment(time) {
        var date = new Date(time);
        return moment(date, 'YYYY-MM-dd');
      },


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
      console.log(vm.announces)
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
