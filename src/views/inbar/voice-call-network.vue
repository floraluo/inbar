<template>
  <div class="page-main">
    <div class="setting-title">重复次数</div>
    <div class="setting-panel">
      <div class="form-group">
        每次呼叫重复播报 <input type="text" class="form-control" v-model="params.repeat">次
      </div>
    </div>
    <div class="setting-title">呼叫时段</div>
    <div class="setting-panel">
      <div class="form-group">
        <ul class="radio-list">
          <li class="radio-custom radio-primary" >
            <input v-model="params.hasRange" value="false" type="radio" name="numberStyle" id="enabledAllDay"><label for="enabledAllDay">全天</label>
          </li>
          <li class="radio-custom radio-primary" >
            <input v-model="params.hasRange" value="true" type="radio" name="numberStyle" id="enabledRange"><label for="enabledRange">指定时间段</label>
            <div class="select-range" v-show="params.hasRange == 'true' || params.hasRange === true">
              <span>选择时间</span>
              <date-picker v-model="time.since" :width="'150px'" type="time" format="HH:mm:ss" placeholder="开始时间"></date-picker>
              --
              <date-picker v-model="time.until" :width="'150px'" type="time" format="HH:mm:ss" placeholder="结束时间"></date-picker>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="form-group">
      <div class="checkbox-custom checkbox-primary">
        <input type="checkbox" v-model="params.textAllowed" id="textAllowed"><label for="textAllowed">开启文字消息，允许顾客在呼叫洁面向控制台发送文字消息</label>
      </div>
    </div>
    <div class="operate-group">
      <button class="btn btn-primary" @click="submit">保存</button>
    </div>
  </div>
</template>

<script>
  import {GET, PUT} from '../../core/http'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import layer from '../../../static/vendor/layer/layer'
  let vm
  export default {
    name: 'voice-call-network',
    components: {DatePicker},
    data () {
      return {
        voiceTheme: {},
        time: {
          since: null,
          until: null
        },
        params: {
          repeat: null,
          hasRange: null,
          textAllowed: null,
          since: null,
          until: null
        }
      }
    },
    methods: {
      submit() {
        if (this.params.hasRange === 'true' || this.params.hasRange === true) {
          if (this.time.since) {
            this.params.since = moment(this.time.since).format('HH:mm:ss')
          } else {
            layer.msg("你已选择指定时间段，开始时间不能为空")
            return;
          }
          if (this.time.until) {
            this.params.until = moment(this.time.until).format('HH:mm:ss')
          } else {
            layer.msg("你已选择指定时间段，结束时间不能为空")
            return;
          }
        } else if (this.params.hasRange === 'false') {
          this.params.since = null;
          this.params.until = null;
        }
        PUT('/api/voice/settings/call', vm.params)
          .then(() => {
            layer.msg('保存成功');
          })
      }
    },
    created() {
      vm = this;
      GET('/api/voice/settings/call')
        .then(data => {
          Object.keys(vm.params).forEach(key => {
            vm.params[key] = data[key]
            if (data.since) {
              vm.time.since = new Date();
              new Date().setHours.apply(vm.time.since, data.since.split(':'))
            }
            if (data.until) {
              vm.time.until = new Date();
              new Date().setHours.apply(vm.time.until, data.until.split(':'))
            }
          })
        })
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-setting";
  .select-range{
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
  }
</style>
