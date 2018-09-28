<template>
  <div class="page-main">
    <div class="setting-title">语音主题</div>
    <div class="setting-panel">
      <div class="form-group">
        <ul class="radio-list">
          <li class="radio-custom radio-primary" v-for="(value, key) in voiceTheme" :key="key">
            <input v-model="params.tongueCode" :value="key" type="radio" name="theme" :id="`enabled${key}`"><label :for="`enabled${key}`">{{value}}</label>
            <small><a href="javascript:;">试听</a></small>
          </li>
        </ul>
      </div>
    </div>
    <div class="setting-title">机器号播放类型</div>
    <div class="setting-panel">
      <div class="form-group">
        <span>播报机器号是否过滤字母</span>
        <base-switch open-name="YES" close-name="NO" v-model="params.includeNumbers"></base-switch>
      </div>
    </div>
    <div class="setting-title">数字播报类型</div>
    <div class="setting-panel">
      <div class="form-group">
        <ul class="radio-list">
          <li class="radio-custom radio-primary" >
            <input v-model="params.numberStyle" value="Natural" type="radio" name="numberStyle" id="enabledBiaozhun"><label for="enabledBiaozhun">标准</label>
            <small>如一百九十八</small>
          </li>
          <li class="radio-custom radio-primary" >
            <input v-model="params.numberStyle" value="Plain" type="radio" name="numberStyle" id="enabledFigure"><label for="enabledFigure">纯数字</label>
            <small>如一九八　　</small>
          </li>
        </ul>
      </div>
    </div>
    <div class="operate-group">
      <button class="btn btn-primary" @click="submit">保存</button>
    </div>
  </div>
</template>

<script>
  import {GET, PUT} from '../../core/http'
  import layer from '../../../static/vendor/layer/layer'
  let vm
  export default {
    name: 'voice-base-set',
    data () {
      return {
        voiceTheme: {},
        params: {
          includeNumbers: false,
          numberStyle: '',
          tongueCode: ''
        }
      }
    },
    methods: {
      submit() {
        PUT('/api/voice/settings/general', vm.params)
          .then(() => {
            layer.msg('保存成功');
          })
      }
    },
    created() {
      vm = this;
      GET('/api/voice/tongue/')
        .then(data => {
          this.voiceTheme = data;
        })
      GET('/api/voice/settings/general')
        .then(data => {
          vm.params.includeNumbers = data.includeNumbers;
          vm.params.numberStyle = data.numberStyle;
          vm.params.tongueCode = data.tongueCode;
        })
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-setting";
  .vue-switch{
    margin: 15px;
  }
  /*.radio-list{*/
    /*small{*/
      /*margin-left: 40px;*/
      /*float: right;*/
      /*margin-top: 4px;*/
    /*}*/
  /*}*/
</style>
