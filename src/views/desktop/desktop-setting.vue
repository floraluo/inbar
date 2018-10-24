<template>
  <div class="page-main">
    <div class="setting-title">默认桌面设置</div>
    <div class="setting-panel">
      <div class="form-group">
         默认桌面选择
        <ul class="radio-lists ">
          <li class="radio-custom radio-primary " >
            <input v-model="params.autoRecovery" :value="true" type="radio" id="enabled"><label for="enabled">游戏定制桌面</label>
          </li>
          <li class="radio-custom radio-primary" >
            <input v-model="params.autoRecovery" :value="false" type="radio"  id="disabled"><label for="disabled">Windows桌面</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="setting-title">欢迎词设置</div>
    <div class="setting-panel">
      <div class="form-group " v-show="params.autoClear">
        <span class="clean-type">欢迎词</span>
        <input type="text" class="form-control"
               v-model="clearAfterDate[0]"
               @input="setParams('clearAfterDate')">
        <small class="padding-left-20 points">限34个字符</small>
      </div>
    </div>
    <div class="operate-group">
      <button class="btn btn-primary" @click="submit">保存</button>
      <button class="btn btn-default">取消</button>
    </div>
  </div>
</template>

<script>
  import {GET, POST} from '../../core/http'
  import layer from '../../../static/vendor/layer/layer'
  let vm
    export default {
        name: "desktop-seeting",
  data () {
    return {
      params: {
        autoClear: false,
        autoRecovery: false,
        threshold:'',
        clearAfterDate: '',
        clearAfterDummy: ''
      }
    }
  },
  methods: {
    setParams(key, value, type) {
      // if (key === 'clearAfterDate') {
      //   this.params.clearAfterDate = `--${this.clearAfterDate.join('-')}`
      // } else {
      //   if (value){
      //     this.params[key] = `P${value}${type}`
      //   } else {
      //     this.params[key] = '';
      //   }
      // }
      console.log(this.threshold)
      console.log(this.clearAfterDate)
      console.log(this.clearAfterDummy)
      // console.log(JSON.stringify(this.params), '------')
    },
    submit() {
      if(this.params.autoClear){
        if (!this.threshold[0]) {
          layer.msg('请设置会员不上线时间');
          return;
        }
        if (!this.clearAfterDate[0] && !this.clearAfterDate[1] && !this.clearAfterDummy[0] ) {
          layer.msg('请设置清空月份或日期');
          return;
        }
        if (!this.clearAfterDummy[0]) {
          if (!this.clearAfterDate[0]) {
            layer.msg('请设置清空月份');
            return;
          }
          if (!this.clearAfterDate[1]) {
            layer.msg('请设置清空日期');
            return;
          }
        }
      }
      POST('/api/member/dummy/settings',{
        autoClear: this.params.autoClear,
        autoRecovery: this.params.autoRecovery,
        clearAfterDate: this.clearAfterDate[0]?`--${this.clearAfterDate.join('-')}`:null ,
        clearAfterDummy: this.clearAfterDummy[0] ? `P${this.clearAfterDummy[0]}M` : null,
        threshold: this.threshold[0] ? `P${this.threshold[0]}M` : null
      })
        .then(() => {
          layer.msg('设置成功');
        })
    }
  },
  created () {
    vm = this;
    GET('/api/member/dummy/settings')
      .then(data => {
        this.params = data;
      })
  }
    }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-setting";
  .page-main{
    padding-left: 25px;
    padding-right: 25px;
    .setting-title{
      font-size: 15px;
      color: $text-dark;
      font-weight: bold;
    }
    .setting-panel{
      margin-top: 15px;
      margin-bottom: 30px;
      padding:  15px 0;
      background-color: #f5f5f5;
      color: $text;
      .form-group{
        padding-top: 0;
        margin-bottom: 0;
        padding-left: 20px;
        display: flex;
        align-items: center;
        .form-control{
          margin-left: 5px;
          margin-right: 5px;
          width: 100px;
        }
        .clean-type{
          padding-left: 15px;
          padding-right: 25px;
        }
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

</style>
