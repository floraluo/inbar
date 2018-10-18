<template>
  <div class="page-main">
    <div class="setting-title">沉淀设置</div>
    <div class="setting-panel">
      <div class="form-group">
        会员 <input type="text" class="form-control" v-model="threshold[0]" @input="setParams('threshold', $event.target.value, 'M')">个月不上线，视为沉淀会员
      </div>
      <div class="form-group">
        沉淀会员再次上机时开启自动恢复
        <ul class="radio-lists ">
          <li class="radio-custom radio-primary " >
            <input v-model="params.autoRecovery" value="true" type="radio" id="enabled"><label for="enabled">YES</label>
          </li>
          <li class="radio-custom radio-primary" >
            <input v-model="params.autoRecovery" value="false" type="radio"  id="disabled"><label for="disabled">NO</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="setting-title">沉淀会员清空</div>
    <div class="setting-panel">
      <div class="form-group">
        <ul class="radio-list">
          <li class="radio-custom radio-primary padding-bottom-10" >
            <input v-model="params.autoClear" value="false" type="radio" name="numberStyle" id="enabledBiaozhun"><label for="enabledBiaozhun">不清空</label>
          </li>
          <li class="radio-custom radio-primary" >
            <input v-model="params.autoClear" value="true" type="radio" name="numberStyle" id="enabledFigure"><label for="enabledFigure">清空</label>
          </li>
        </ul>
      </div>
      <div class="form-group " v-show="params.autoClear === 'true' || params.autoClear === true">
        <span class="clean-type">根据时间</span> 每年
        <input type="text" class="form-control"
               v-model="clearAfterDate[0]"
               @input="setParams('clearAfterDate')">月
        <input type="text" class="form-control"
               v-model="clearAfterDate[1]" @input="setParams('clearAfterDate')">日后，自动清空
      </div>
      <div class="form-group" v-show="params.autoClear === 'true' || params.autoClear === true">
        <span class="clean-type">根据会员</span>  会员沉淀<input type="text" class="form-control"
                                                         v-model="clearAfterDummy[0]"
                                                         @input="setParams('clearAfterDummy', $event.target.value, 'M')">个月后，自动清空
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
    name: 'precipitation-member-set',
    computed: {
      threshold () {
        if (this.params.threshold) {
          let index = this.params.threshold.search(/M/);
          return [this.params.threshold.substr(index - 1, 1)]
        } else {
          return [''];
        }
      },
      clearAfterDate() {

        if (this.params.clearAfterDate) {
          let date = this.params.clearAfterDate.replace(/^\-+/g, '').split('-');
          return date
        } else {
          return ['',''];
        }
      },
      clearAfterDummy() {
        if (this.params.clearAfterDummy) {
          return this.params.clearAfterDummy.match(/\d+/);
          // return this.params.clearAfterDummy.substr(index - 1, 1)
        } else {
          return [''];
        }
      }
    },
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
        if(this.params.autoClear=== 'true'){
          if (!this.clearAfterDate[0]||!this.clearAfterDate[1] && !this.clearAfterDummy[0]) {
            layer.msg('请设置清空月份或日期');
            return;
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
