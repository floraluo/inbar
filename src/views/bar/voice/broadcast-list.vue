<template>
  <div class="page-content">

    <ul class="schedule">
      <li class="no-data" v-show="playQueued.length === 0">暂无播放</li>
      <template v-if="playQueued.length > 0" v-for="(item, index) in playQueued">
        <li class="playing-row" v-if="index === 0"  :key="index">
          <div class=" index"><i class="iconfont"></i></div>
          <span class="">{{voiceTypes[index]}}</span>
          <div class=" name">{{item.name}}</div>
          <div class="operate">
            正在播放...
          </div>
        </li>
        <li  v-if="index > 0" :key="index">
          <!--<span class="index">{{item.type === 'Template' ? '平台母版' : item.type === 'TTS' ? '合成语音' : '自制语音'}}</span>-->
          <!--{{voiceType(item.type)}}-->
          <div class=" index">{{index}}</div>
          <span class="">{{voiceTypes[index]}}</span>
          <div class=" name">{{item.name}}</div>
          <div class="operate">
            <a href="javascript:;" v-if="item.allowManual" @click="stickBroadcast(index)">立即播放</a>
            <a href="javascript:;" @click="cancelPlay(item, index)">取消广播</a>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  let vm
  export default {
    name: 'broadcast-list',
    // props: {
    //   playQueued: {
    //     type: Array,
    //     default: () => { return [] }
    //   }
    // },
    computed: {
      ...mapState({
        playQueued: state => state.playQueued
      }),
      voiceType() {
        if (this.playing) {
          switch (this.playing.type) {
            case 'Template': return '平台母版';
            case 'TTS': return '合成语音';
            case 'Audio': return '自制语音';
          }
        }
      },
      voiceTypes() {
        return this.playQueued.map(item => {
          switch (item.type) {
            case 'Template': return '平台母版';
            case 'TTS': return '合成语音';
            case 'Audio': return '自制语音';
          }
        })
      }
    },
    data() {
      return {
        // playing: {'scheduledAt': '15:47:20', 'id': 59, 'name': '语音文件测试', 'tongueCode': 'Default', 'tongueName': '默认', 'bgmName': 'Secret Garden', type: 'Audio', 'resource': '/voice/2018/09/19/6/M/t/r/t/Vd/song.mp3', 'text': null, 'predefined': false, 'schedules': null, 'allowManual': true, 'voiceId': 5}
      }
    },
    watch: {
      // queue: (newQueue, oldQueue) => {
      //   console.log(this.playQueued)
      // }
    },
    methods: {
      cancelPlay(broadcast, index) {
        this.$store.commit('cancelPlay', {broadcast, index})
      },
      stickBroadcast(index) {
        this.$store.commit('stickTheBroadcast', index)
      }
    },
    created () {
      vm = this
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../../sass/base-cashier";
  $red: #ee484c;
  .schedule{
    .playing-row{
      .iconfont, .operate{
        color: $red;
      }
    }
    li{
      display: flex;
      justify-content: space-around;
      padding: 15px 20px;
      background-color: #fff;
      margin-bottom: 20px;
      .index{
        width: 2em;
      }
      .name{
        width: 15em;
      }
      .operate{
        width: 10em;
        a + a{
          margin-left: 1em;
        }
      }
    }
  }
</style>
