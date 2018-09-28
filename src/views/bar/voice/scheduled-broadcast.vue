<template>
  <div class="page-content">
    <div class="page-main">
      <ul class="schedule">
        <li v-if="broadcasts.length > 0" v-for="(item, index) in broadcasts" :key="item.id">
          <span class="index">{{index + 1}}</span>
          <i class="icon" :class="{'played': item.playStatus === 'Played', 'playing': item.playStatus === 'Playing'}"></i>
          <span class="time">{{item.scheduledAt.substr(0, 5)}}</span>
          <div class="name">{{item.name}}</div>
          <base-switch :value="item.enabled" :rowData="item" :index="index" from="list" @input="toggleStatus"></base-switch>
          <div class="btn-box"><a href="javascript:;" @click="addTheQueue(item, index)" v-if="item.allowManual">立即播放</a></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {POST, PATCH} from '../../../core/http'
  import layer from '../../../../static/vendor/layer/layer'
  let vm
  export default {
    name: 'scheduled-broadcast',
    computed: mapState({
      broadcasts: state => state.broadcasts
    }),
    methods: {
      addTheQueue(broadcast, index) {
        if (broadcast.enabled) {
          this.$store.commit('addTheQueue', {broadcast, index})
        } else {
          layer.msg('已禁用，不能添加到广播列表');
        }
      },
      toggleStatus(params) {
        let rowData = params.rowData;
        PATCH(`/api/voice/playlist/${rowData.id}/enabled`, !rowData.enabled)
          .then(() => {
            vm.$store.commit('togglePlayStatus', {
              type: 'broadcast',
              index: params.index
            })
          })
      }
    },
    created () {
      vm = this
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../../sass/base-cashier";
  .schedule{
    padding-top: 20px;
    padding-bottom: 40px;
    margin-bottom: 0;
    li{
      padding-top: 20px;
      padding-bottom: 20px;
      /*padding-left: 40px;*/
      display: flex;
      align-items: center;
      justify-content: space-around;
      .index{
        display: inline-block;
        width: 2em;
      }
      .icon{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        /*margin-left: 40px;*/
        /*margin-right: 40px;*/
        width: 20px;
        height: 20px;
        border: 2px solid $border-color;
        border-radius: 50%;
        &:before{
          content: '';
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: $border-color;
        }
        &:after{
          content: '';
          display: inline-block;
          position: absolute;
          top: 18px;
          width: 2px;
          height: 42px;
          background-color: $border-color;
        }
        &.played:before{
          background-color: #3eb150;
        }
        &.playing:before{
          background-color: #ee484c;
        }
      }
      &:last-child > .icon:after{
        display: none;
      }
      .name{
        /*margin-left: 60px;*/
        width: 250px;
      }
      .vue-switch{
        margin-top: 0;
      }
      .btn-box{
        width: 5em;
      }
      a{
        /*margin-left: 60px;*/
      }
    }
  }
</style>
