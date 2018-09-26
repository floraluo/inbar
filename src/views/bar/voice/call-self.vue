<template>
  <div class="page-content">
    <div class="page-main">
      <div class="broadcast custom">
        <div class="input-box">
          <input v-model="customText" type="text" placeholder="自定义广播内容">
        </div>
        <div class="btn-box">
          <button class="btn" type="button" @click="addPlayQueue(customText, '自定义广播')">广播</button>
        </div>
      </div>
      <div class="broadcast">
        <div class="input-box">
          <input v-model="callNetworkNum" type="text" placeholder="多个机号可以使用空格隔开">
        </div>
        <div class="text-box"><div class="text">号机需要网管协助</div></div>
        <div class="btn-box"><button class="btn" type="button" @click="call(callNetworkNum, `${callNetworkNum}号机需要网管协助`, '呼叫网管')">呼叫</button></div>
      </div>
      <div class="broadcast">
        <div class="input-box">
          <input v-model="callCleanerNum" type="text" placeholder="多个机号可以使用空格隔开">
        </div>
        <div class="text-box"><div class="text">号机需要保洁人员</div></div>
        <div class="btn-box"><button class="btn" type="button" @click="call(callCleanerNum, `${callCleanerNum}号机需要保洁人员`, '呼叫保洁员')">呼叫</button></div>
      </div>
      <div class="broadcast">
        <div class="input-box">
          <input v-model="callServerNum" type="text" placeholder="多个机号可以使用空格隔开">
        </div>
        <div class="text-box"><div class="text">号机需要服务人员</div></div>
        <div class="btn-box"><button class="btn" type="button" @click="call(callServerNum, `${callServerNum}号机需要服务人员`, '呼叫服务员')">呼叫</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {POST} from '../../../core/http'

  let vm
  export default {
    name: 'call-self',
    data () {
      return {
        customText: '',
        callNetworkNum: '',
        callCleanerNum: '',
        callServerNum: ''
      }
    },
    methods: {
      call(num, text, name) {
        if (!num) {
          layer.msg('未填写机号');
        } else {
          this.addPlayQueue(text, name);
        }
      },
      addPlayQueue(text, name) {
        POST('/api/voice/broadcast', {
          jumpTheQueue: true,
          text
        }).then(data => {
          let broadcast = {
            name,
            type: "TTS",
            resource: data.uri,
            allowManual: true
          }
          vm.$store.commit('addTheQueue', {broadcast, jumpTheQueue: true})
          // this.$emit('on-play', {
          //   broadcast,
          //   jumpTheQueue: true
          // })
          layer.msg('已添加到广播列表')
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
  .page-main{
    padding-left: 0;
    padding-right: 0;
  }
  .broadcast.custom{
    padding-bottom: 25px;
    border-bottom: 20px solid $content-bgc;
    .input-box{
      flex: 3;
    }
  }
  .broadcast{
    padding: 25px 25px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input-box{
      flex: 2;
      height: 60px;
      input{
        width: 100%;
        height: 100%;
        border: 1px solid $border-color;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 18px;
        color: $text;
        &::-webkit-input-placeholder{
          color: $text-light;
          font-size: 14px;
        }
      }
    }
    .text-box, .btn-box {
      flex: 1;
      display: flex;
      align-items: center;
      height: 60px;
      padding-left: 15px;
    }
    .text-box .text{
      height: 100%;
      width: 100%;
      padding-left: 15px;
      line-height: 60px;
      background-color: #f5f5f5;
      color: $text;
      font-size: 18px;
    }
    .btn-box .btn{
      width: 100%;
      height: 100%;
      background-color: $theme-color;
      color: #fff;
      font-size: 18px;
      border-radius: 0;
      &:hover{
        background-color: darken($theme-color, 5%);
      }
    }
  }
</style>
