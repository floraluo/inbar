<template>
  <div class="page-main ">
    <div class=" btn-return ">
      <router-link :to="{name: 'inbar-announcement'}" class="btn-pure btn-default" replace> 返回  <i class="iconfont icon-fanhui"></i></router-link>
    </div>
    <div class="page-main-content  col-lg-8 col-xs-12 col-md-10 ">
      <form >
        <div class="form-group col-xs-12"><label class="col-xs-2 padding-0" >活动标题</label>
          <div class="col-xs-10 padding-0">
            <input v-model="announceParam.name"
                   data-vv-as="标题"
                   v-validate="'required'"
                   name="name"
                   type="text" class="form-control "><small class="error"  v-show="errors.has('name')">*{{ errors.first('name') }}</small>
          </div>
        </div>
        <div class="form-group col-xs-12"><label class="col-xs-2 padding-0">活动内容</label>
          <div class="col-xs-10">
            <textarea v-model="announceParam.content"
                      data-vv-as="内容"
                      v-validate="'required'"
                      name="content"
                      rows="15"
                      type="text" class="form-control"></textarea>
            <small class="error"  v-show="errors.has('content')">*{{ errors.first('content') }}</small>
          </div>
        </div>
        <div class="form-group col-xs-12"><label class="col-xs-2 padding-0" >活动说明</label>
          <div class="col-xs-10">
            <textarea v-model="announceParam.description"
                      data-vv-as="活动说明"
                      v-validate="'required'"
                      name="description"
                      rows="3"
                      type="text" class="form-control"></textarea>
            <small class="error"  v-show="errors.has('description')">*{{ errors.first('description') }}</small>
          </div>
        </div>
        <div class="form-group form-date-group col-xs-12"><label class="col-xs-2"  >生效时间 <small class="error" v-show="announceParam.beginTime!== null && announceParam.beginTime === ''">*日期为必选项</small></label>
          <div class="col-xs-10">
            <date-picker v-model="announceParam.beginTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD'"  placeholder="开始时间"></date-picker>~
            <date-picker v-model="announceParam.endTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
          </div>
        </div>
        <div class="form-group col-xs-12 padding-bottom-30 "><label class="col-xs-2" >是否启用：</label>
          <ul class="radio-list col-xs-8">
            <li class="radio-custom radio-primary radio-inline">
              <input v-model="announceParam.enabled" value="true" type="radio" name="enabled" id="enabled1"><label for="enabled1">启用</label>
            </li>
            <li class="radio-custom radio-primary radio-inline">
              <input v-model="announceParam.enabled" value="false" type="radio" name="enabled" id="enabled2"><label for="enabled2">禁用</label>
            </li>
          </ul>
        </div>
      </form>
      <div class="form-group col-xs-12 text-center ">
        <button class="btn btn-primary " @click="submitAddannounce">保存</button>
        <button class="btn btn-default margin-left-20" >取消</button>

      </div>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
  import DatePicker from 'vue2-datepicker'
  import layer from '../../../static/vendor/layer/layer'
  import {publish} from 'pubsub-js'
  import {GET, POST} from '../../core/http'

  let vm;

  function getALLAnnounce() {
    GET('api/announcement/')
      .done((data) => {
        vm.announces =data;
      })

  }
  function formatTime () {
    if (vm.announceParam.beginTime === null || vm.announceParam.beginTime === '') {
      layer.msg('请先选择开始时间');
    } else if (vm.announceParam.endTime === null || vm.announceParam.endTime === '') {
      layer.msg('请先选择结束时间');
    }
  }

  export default {
    name: "add-announcement",
    components: {DatePicker},
    data() {
      return {
        layerId: null,
        datapickerWidth: '48%',
        announces: {},
        announceParam: {
          name: '',
          description: '',
          beginTime: null,
          endTime: null,
          content: '',
          time: null,
          enabled: true,
        }
      }
    },
    methods: {
      submitAddannounce() {
        if(!formatTime()){
          POST('/api/announcement/', vm.announceParam)
            .done(() => {
              layer.msg('新增成功');
              this.$router.replace({name: 'inbar-announcement'})
            })
        }
      }
    },
    created() {
      vm = this;
      getALLAnnounce();
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '新增活动'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";
  .form-group .error{
    padding-left: 5px;
    color: #f00;
  }
  .col-xs-2,.col-xs-10{
    padding: 0;
  }
  .form-date-group{
    .mx-datepicker-popup{
      bottom: initial !important;
      width: 100%;
      .mx-calendar,
      .mx-calendar-content{
        width: 100%;
      }
    }
    .mx-calendar-content{
      height: 124px;
      border-top: 1px solid #d6d6d6;
    }
    .mx-panel-month .cell{
      width: calc((100% - 24px) / 6);
      margin: 8px 0;
    }
  }
</style>
