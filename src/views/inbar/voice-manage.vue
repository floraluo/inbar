<template>
  <div class="page-main">
    <div class="setting-title">上机呼叫设置</div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="setting-panel">
          <div class="form-group">
              <span>生日用户上机呼叫</span>
              <base-switch open-name="YES" close-name="NO" v-model="params.birthday.enabled" @input="clearTheValue(params.birthday.enabled, 'birthday.repeat')"></base-switch>
              <small><a href="javascript:;">试听</a></small>
          </div>
          <div class="form-group">
            每次呼叫重复播报
            <input type="text" class="form-control"
                   v-validate="{required: params.birthday.enabled}"
                   data-vv-as="呼叫已开启,播报次数"
                   name="birthdayRepeat"
                   v-model="params.birthday.repeat">次
            <small class="error"  v-show="errors.has('birthdayRepeat')" >*{{ errors.first('birthdayRepeat') }}</small>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="setting-panel">
          <div class="form-group">
            <span>高消费用户上机呼叫</span>
            <base-switch open-name="YES" close-name="NO" v-model="params.spentALot.enabled" @input="clearTheValue(params.spentALot.enabled, 'spentALot.top')"></base-switch>
            <small><a href="javascript:;">试听</a></small>
          </div>
          <div class="form-group">
            高消费用户：最近30日充值排
            <input type="text" class="form-control"
                   v-validate="{required: params.spentALot.enabled}"
                   data-vv-as="呼叫已开启,播报次数"
                   name="spentALotTop" v-model="params.spentALot.top">名
            <small class="error"  v-show="errors.has('spentALotTop')" >*{{ errors.first('spentALotTop') }}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="setting-title">充值呼叫设置</div>
    <div class="setting-panel">
      <div class="form-group">
        <span>是否开启充值呼叫</span>
        <base-switch open-name="YES" close-name="NO" v-model="params.recharge.enabled" @input="clearTheValue(params.recharge.enabled, 'recharge.repeat')"></base-switch>
        <small><a href="javascript:;">试听</a></small>
      </div>
      <div class="form-group">
        每次呼叫重复播报
        <input type="text" class="form-control"
               v-validate="{required: params.recharge.enabled}"
               data-vv-as="呼叫已开启,播报次数"
               name="rechargeRepeat" v-model="params.recharge.repeat">次
        <small class="error"  v-show="errors.has('rechargeRepeat')" >*{{ errors.first('rechargeRepeat') }}</small>
      </div>
    </div>
    <div class="setting-title">购物呼叫设置</div>
    <div class="setting-panel">
      <div class="form-group">
        <span>是否开启购物呼叫</span>
        <base-switch open-name="YES" close-name="NO" v-model="params.buying.enabled" @input="clearTheValue(params.buying.enabled, 'buying.repeat')"></base-switch>
        <small><a href="javascript:;">试听</a></small>
      </div>
      <div class="form-group">
        每次呼叫重复播报
        <input type="text" class="form-control"
               v-validate="{required: params.buying.enabled}"
               data-vv-as="呼叫已开启,播报次数"
               name="buyingRepeat" v-model="params.buying.repeat">次
        <small class="error"  v-show="errors.has('buyingRepeat')" >*{{ errors.first('buyingRepeat') }}</small>
      </div>
    </div>
    <div class="setting-title">下机呼叫设置</div>
    <div class="setting-panel">
      <div class="form-group">
        <span>是否开启下机呼叫</span>
        <base-switch open-name="YES" close-name="NO" v-model="params.offline.enabled" @input="clearTheValue(params.offline.enabled, 'offline.repeat')"></base-switch>
        <small><a href="javascript:;">试听</a></small>
      </div>
      <div class="form-group">
        每次呼叫重复播报
        <input type="text" class="form-control"
               v-validate="{required: params.offline.enabled}"
               data-vv-as="呼叫已开启,播报次数"
               name="offlineRepeat" v-model="params.offline.repeat">次
        <small class="error"  v-show="errors.has('offlineRepeat')" >*{{ errors.first('offlineRepeat') }}</small>
      </div>
      <div class="form-group">
        <span>呼叫时段设置</span>
        <ul class="radio-list horizontal">
          <li class="radio-custom radio-primary" >
            <input v-model="params.offline.hasRange" value="false" type="radio" name="numberStyle" id="enabledAllDay"><label for="enabledAllDay">全天</label>
          </li>
          <li class="radio-custom radio-primary" >
            <input v-model="params.offline.hasRange" value="true" type="radio" name="numberStyle" id="enabledRange"><label for="enabledRange">指定时间段</label>
            <div class="select-range" v-show="params.offline.hasRange == 'true' || params.offline.hasRange === true">
              <span>选择时间</span>
              <date-picker v-model="offlineTime.since" :width="'150px'" type="time" format="HH:mm:ss" placeholder="开始时间"></date-picker>
              --
              <date-picker v-model="offlineTime.until" :width="'150px'" type="time" format="HH:mm:ss" placeholder="结束时间"></date-picker>
            </div>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <div class="checkbox-custom checkbox-primary">
          <input type="checkbox" v-model="params.offline.mergeNeighbour" id="textAllowed"><label for="textAllowed">邻座机器同时下机，只播报一台机器号，避免长时间占用语音</label>
        </div>
      </div>
    </div>
    <div class="setting-title">余额不足提醒设置</div>
    <div class="setting-panel">
      <div class="form-group">
        <span>是否开启余额不足提醒</span>
        <base-switch open-name="YES" close-name="NO" v-model="params.insufficient.enabled" @input="clearTheValue(params.insufficient.enabled, ['insufficient.threshold','insufficient.repeat'])"></base-switch>
        <small><a href="javascript:;">试听</a></small>
      </div>
      <div class="form-group">
        当余额少于 <input type="text" class="form-control"
                     v-validate="{required: params.insufficient.enabled}"
                     data-vv-as="提醒已开启,余额阈值"
                     name="insufficientThreshold" v-model="params.insufficient.threshold">时提醒
        <small class="error"  v-show="errors.has('insufficientThreshold')" >*{{ errors.first('insufficientThreshold') }}</small>
      </div>
      <div class="form-group">
        每次呼叫重复播报 <input type="text" class="form-control"
                        v-validate="{required: params.insufficient.enabled}"
                        data-vv-as="提醒已开启,播报次数"
                        name="insufficientRepeat" v-model="params.insufficient.repeat">次
        <small class="error"  v-show="errors.has('insufficientRepeat')" >*{{ errors.first('insufficientRepeat') }}</small>
      </div>
    </div>
    <div class="operate-group">
      <button class="btn btn-primary" @click="submit">保存</button>
    </div>
  </div>
</template>

<script>
  import {GET, PUT} from '../../core/http'
  import moment from 'moment'
  import DatePicker from 'vue2-datepicker'
  import layer from '../../../static/vendor/layer/layer'
  let vm
  export default {
    name: 'voice-mange',
    components: {DatePicker},
    data () {
      return {
        offlineTime: {
          since: null,
          until: null
        },
        params: {
          birthday: {
            enabled: false,
            repeat: null,
            hasRange: false
          },
          spentALot: {
            enabled: false,
            top: null
          },
          recharge: {
            enabled: false,
            repeat: null,
            hasRange: false
          },
          buying: {
            enabled: false,
            repeat: null,
            hasRange: false
          },
          offline: {
            enabled: false,
            repeat: null,
            mergeNeighbour: null,
            since: null,
            until: null,
            hasRange: false
          },
          insufficient: {
            enabled: false,
            repeat: null,
            threshold: null,
            hasRange: false
          }
        }
      }
    },
    methods: {
      clearTheValue(enable, key) {
        if (!enable) {
          if (typeof key === 'string') {
            this.params[key.split('.')[0]][key.split('.')[1]] = null;
          } else {
            key.forEach(k => {
              vm.params[k.split('.')[0]][k.split('.')[1]] = null;
            })
          }
        }
      },
      submit() {
        if (this.params.offline.hasRange === 'true' || this.params.offline.hasRange === true) {
          if (this.offlineTime.since) {
            this.params.offline.since = moment(this.offlineTime.since).format('HH:mm:ss')
          } else {
            layer.msg("你已选择指定时间段，开始时间不能为空")
            return;
          }
          if (this.offlineTime.until) {
            this.params.offline.until = moment(this.offlineTime.until).format('HH:mm:ss')
          } else {
            layer.msg("你已选择指定时间段，结束时间不能为空")
            return;
          }
        } else if (this.params.offline.hasRange === 'false') {
          this.offlineTime.since = null;
          this.offlineTime.until = null;
          this.params.offline.since = null;
          this.params.offline.until = null;
        }
        PUT('/api/voice/settings/call', vm.params)
          .then(() => {
            layer.msg('保存成功');
          })
      }
    },
    created() {
      vm = this;
      GET('/api/voice/settings/trigger')
        .then(data => {
          Object.keys(data).forEach(key => {
            if (data[key]) {
              vm.params[key] = data[key];
            }
          })
          // if (data.birthday) {
          //   vm.params.birthday = data.birthday
          // }
          // if (data.spentALot) {
          //   vm.params.spentALot = data.spentALot
          // }
          // if (data.recharge) {
          //   vm.params.recharge = data.recharge
          // }
          // if (data.buying) {
          //   vm.params.buying = data.buying
          // }
          // if (data.offline) {
          //   vm.params.offline = data.offline
          // }
          // if (data.insufficient) {
          //   vm.params.insufficient = data.insufficient
          // }
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
  .vue-switch{
    margin: 0 15px;
  }
  .radio-list.horizontal{
    margin-bottom: 0;
    li{
      display: flex;
      align-items: center;
      margin: 0;
      min-height: 34px;
    }
  }
  .setting-panel{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .form-group{
    margin-bottom: 0;
    flex-wrap: wrap;
  }
  .error{
    padding-top: 5px;
    width: 100%;
  }
  .operate-group{
    padding-bottom: 50px;
  }
</style>
