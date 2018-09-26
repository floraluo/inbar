<template>
  <div class="page-main">

    <div class="btn-operate-group">
      <button class="btn btn-primary" @click="openCommonRemindsy('添加常用语音')"><i class="iconfont icon-add"></i>添加常用语音</button>
      <button class="btn btn-primary" @click="openCustomRemindsy('添加自定义语音')"><i class="iconfont icon-add"></i>添加自定义语音</button>
      <button class="btn btn-primary" @click="deleteRemindsies"><i class="iconfont icon-close"></i>删除</button>
    </div>
    <div class="table-box">
      <v-table is-horizontal-resize
               is-vertical-resize
               style="width:100%"
               row-hover-color="#eee"
               row-click-color="#edf7ff"
               title-bg-color="#f0f2f9"
               :title-row-height="52"
               :is-loading="tableLoading"
               :height="455"
               :min-height="455"
               :columns="remindsyColumns"
               :table-data="remindsies"
               :select-all="selectRemindsyInTable"
               :select-group-change="selectRemindsyInTable"
               :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
    </div>
    <div class="paging" v-if="remindsyPage.totalPage > 1">
      <v-pagination :total="remindsyPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>

    <!--常用语音-->
    <div class="layer-open" id="layerCommonRemindsy">
      <form name="commonRemindsy" class="form-horizontal">
        <div class="form-group">
          <label class="form-label">语音名称：</label>
          <div class="col-xs-7">
            <multi-select
              value="id"
              v-model="selectedTpl"
              label="name"
              placeholder="选择背景音乐"
              track-by="id"
              :maxHeight="250"
              :showLabels="false"
              :close-on-select="true"
              :searchable="false"
              :allow-empty="false"
              :options="tplList">
            </multi-select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">背景音乐：</label>
          <div class="col-xs-7">
            <multi-select
              value="id"
              v-model="selectedBGM"
              label="name"
              placeholder="选择背景音乐"
              track-by="id"
              :maxHeight="250"
              :showLabels="false"
              :close-on-select="true"
              :searchable="false"
              :allow-empty="false"
              :options="bgmList">
            </multi-select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">发音选择：</label>
          <div class="col-xs-7">
            <multi-select
              value="id"
              v-model="selectedTongue"
              label="name"
              placeholder="选择背景音乐"
              track-by="id"
              :maxHeight="250"
              :showLabels="false"
              :close-on-select="true"
              :searchable="false"
              :allow-empty="false"
              :options="tongueList">
            </multi-select>
          </div>
          <div class="col-xs-2"><a href="javascript:;">试听</a></div>
        </div>
      </form>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary">保存</button>
      </div>
    </div>

    <!--自定义语音-->
    <div class="layer-open" id="layerCustomRemindsy">
      <form name="customRemindsy" class="form-horizontal">
        <div class="form-group">
          <ul class="radio-list horizontal">
            <li class="radio-custom radio-primary">
              <input v-model="customVoiceType" value="compound" type="radio" name="voiceType" id="compound" >
              <label for="compound">输入文字合成语音</label>
            </li>
            <li class="radio-custom radio-primary">
              <input v-model="customVoiceType" value="upload" type="radio" name="voiceType" id="upload">
              <label for="upload">上传语音文件（仅限mp3，wav格式）</label>
            </li>
          </ul>
        </div>
        <div class="form-group">
          <label class="form-label">语音名称：</label>
          <div class="col-xs-7"><input v-model="customParams.name" type="text" class="form-control" placeholder="输入语音名称（1-10个字）"></div>
        </div>
        <div class="form-group">
          <label class="form-label">背景音乐：</label>
          <div class="col-xs-7">
            <multi-select
              value="id"
              v-model="selectedBGM"
              label="name"
              placeholder="选择背景音乐"
              track-by="id"
              :maxHeight="250"
              :showLabels="false"
              :close-on-select="true"
              :searchable="false"
              :allow-empty="false"
              :options="bgmList">
            </multi-select>
          </div>
        </div>
        <div class="form-group" v-if="customVoiceType === 'compound'">
          <label class="form-label">播放内容：</label>
          <div class="col-xs-7"><textarea v-model="customParams.text" class="form-control" rows="3" placeholder="输入内容"></textarea></div>
          <div class="col-xs-3"><a href="javascript:;">合成并试听</a></div>
        </div>
        <div class="form-group flex-box" v-else-if="customVoiceType === 'upload'">
          <label class="form-label">播放内容：</label>
          <div class="col-xs-8">
            <base-upload :btnText="!voiceFile ? '导入文件' : voiceFile.name" :disableIcon="!!voiceFile" acceptType=".mp3,.wav" :directory="'voice'" icon="icon-file" @on-upload-success="uploadSuccess"></base-upload>
            &nbsp;&nbsp;提示：大小不超过1M
          </div>
        </div>
      </form>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitCustomVoice">保存</button>
      </div>
    </div>

    <!--设置播放时间-->
    <div class="layer-open layer-set-play-time" id="layerPlayTime">
      <form name="playTime" class="form-inline">
        <div class="form-group"><label class="time-label">请选择时间</label>
          <div class="time-box">
            <date-picker v-model="playTime.since" type="time" :width="'150'" :editable="true" :format="'HH:mm'" placeholder="开始时间"></date-picker>
            --
            <date-picker v-model="playTime.until" type="time" :width="'150'" :editable="true" :format="'HH:mm'" placeholder="结束时间"></date-picker>
          </div>
        </div>
        <div class="form-group create-time-group">
          <label>每隔 <input type="text" class="form-control" v-model="interval" v-validate="'numeric'" name="interval" data-vv-as="间隔分钟数">分钟播报一次</label>
          <button class="btn btn-primary" type="button" @click="createSchedules">生成并添加</button>
          <div class="error" v-show="errors.has('interval')">*{{ errors.first('interval') }}</div>
        </div>
        <div class="schedules-box form-control">
          <span v-show="schedulesParams.length > 0" v-for="(item, index) in schedulesFormatted" :key="index" @click="deleteSchedules(index)">{{item}} <i class="iconfont icon-close"></i></span>
          <div v-show="schedulesParams.length === 0">选择开始、结束时间并设置时间间隔，点击【生成并添加】按钮</div>
        </div>
      </form>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitSchedules">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../core/store'
  import Vue from 'vue'
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import MultiSelect from 'vue-multiselect'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  let vm
  export default {
    name: 'voice-remindsy',
    components: {DatePicker, MultiSelect},
    data () {
      return {
        audioSrc: '',
        customVoiceType: 'compound',
        selectedBGM: null,
        selectedTpl: null,
        selectedTongue: null,
        bgmList: [],
        tplList: [],
        tongueList: [],
        voiceFile: null,
        commonParams: {},
        customParams: {
          bgmId: null,
          file: null,
          name: null
        },
        playTime: {
          since: null,
          until: null
        },
        interval: null,
        schedulesParams: [],
        layerId: null,
        rowData: null,
        tableLoading: false,
        selectedRemindsy: null,
        remindsies: [],
        remindsyListParams: {
          page: 0,
          size: 10
        },
        remindsyPage: {
          totalPage: 0,
          amount: 0
        },
        remindsyColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'name', title: '语音名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'tongueName', title: '发音', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'bgmName', title: '背景音乐', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: {callback: this.openSetPlayTime, listLength: () => { return this.remindsies.length }},
            title: '播放时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'PlayTime'},

          {field: {name: 'allowManual', valueKey: 'allowManual', openName: 'YES', closeName: 'NO', callback: this.toggleStatus},
            title: '是否允许手动播放', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: [
              {name: '试听', type: "try", callback: this.toggleAudio},
              {name: '修改', type: "modify", callback: this.openModifyRemindsyLayer},
              {name: '删除', type: "delete", callback: this.deleteOneRemindsy}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ]
      }
    },
    computed: {
      schedulesFormatted() {
        if (this.schedulesParams) {
          return this.schedulesParams.map(item => {
            let schedules = new Date();
            new Date().setHours.apply(schedules, item.split(":"))
            return moment(schedules).format('HH:mm');
          })
        } else {
          return [];
        }
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      selectRemindsyInTable(section) {
        this.selectedRemindsy = section;
      },
      openCommonRemindsy(title) {
        this.layerId = layer.open({
          type: 1,
          title,
          area: ['460px', '300px'],
          content: $('#layerCommonRemindsy')
        })
      },
      openCustomRemindsy(title) {
        // let title = layerTitle || '添加自定义语音';
        this.layerId = layer.open({
          type: 1,
          title,
          area: ['520px', '380px'],
          content: $('#layerCustomRemindsy')
        })
      },
      uploadSuccess(params) {
        this.voiceFile = params.files[0];
        this.customParams.file = params.path;
      },
      submitCustomVoice() {
        let url;
        this.customParams.bgmId = this.selectedBGM.id;
        if (this.customVoiceType === 'compound') {
          delete this.customParams.file;
          url = '/api/voice/_from_text'
        } else {
          delete this.customParams.text;
          url = '/api/voice/_from_resource'
        }
        POST(url, vm.customParams)
          .then(() => {
            layer.msg('添加成功');
            vm.cancelLayer()
            getAllRemindsy(); //submitCustomVoice
          })
      },
      deleteRemindsies() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteSchedules();
        }
      },
      openModifyRemindsyLayer(params) {
        this.openCustomRemindsy('修改自定义语音')
      },
      openSetPlayTime(params) {
        this.rowData = params.rowData;
        this.playTime.since = null;
        this.playTime.until = null;
        this.interval = null;
        if (params.rowData.schedules) {
          this.schedulesParams = params.rowData.schedules.map(item => {
            return item
          });
        } else {
          this.schedulesParams = [];
        }
        this.layerId = layer.open({
          type: 1,
          title: '设置播放时间',
          area: ['495px', '380px'],
          content: $('#layerPlayTime')
        })
      },
      createSchedules() {
        if (!this.playTime.since) {
          layer.msg('请选择开始时间')
          return;
        }
        if (!this.playTime.since) {
          layer.msg('请选择结束时间')
          return;
        }
        if (!this.interval) {
          layer.msg('请设置时间间隔')
          return;
        }
        this.schedulesParams = []
        let currentTime = new Date(this.playTime.since);
        while (currentTime <= this.playTime.until) {
          this.schedulesParams.push(moment(currentTime).format('HH:mm'));
          currentTime.setMinutes(currentTime.getMinutes() + Number(this.interval))
        }
      },
      deleteSchedules(index) {
        this.schedulesParams.splice(index, 1);
      },
      submitSchedules() {
        PUT(`/api/voice/${this.rowData.id}/playlist`, {schedules: this.schedulesParams})
          .then(() => {
            layer.msg('设置成功')
            vm.cancelLayer();
            vm.rowData.schedules = vm.schedulesParams;
          })
      },
      toggleStatus(params) {
        PATCH(`/api/voice/${params.rowData.id}/allow-manual`, !params.rowData.allowManual)
          .then(() => {
            vm.remindsies[params.index].allowManual = !vm.remindsies[params.index].allowManual;
          })
      },
      toggleAudio(params) {
        this.audioSrc = '/api' + params.rowData.resource
        document.getElementById('audio').setAttribute('src', this.audioSrc)
        document.getElementById('audio').play();
        console.log($("#audio").attr('src'))
      },
      deleteOneRemindsy(params) {
        this.delIds = [];
        this.delIds.push(params.rowData.id)
      },
      pageChange(pageIndex) {
        this.remindsyListParams.page = pageIndex - 1;
        getAllRemindsy(); //pageChange
      },
      pageSizeChange(newPageSize) {
        this.remindsyListParams.size = newPageSize;
        getAllRemindsy(); //pageSizeChange
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },
    updated() {
      $('[data-toggle="popover"]').popover();
    },
    created () {
      vm = this
      getAllRemindsy(); //created
      GET('/api/voice/bgm/')
        .then(data => {
          Object.keys(data).forEach(key => {
            vm.bgmList.push({id: key, name: data[key]})
          });
        })
      GET('/api/voice/tpl/')
        .then(data => {
          Object.keys(data).forEach(key => {
            vm.tplList.push({id: key, name: data[key]});
          })
        })
      GET('/api/voice/tongue/')
        .then(data => {
          Object.keys(data).forEach(key => {
            vm.tongueList.push({code: key, name: data[key]});
          })
        })
    }
  }
  function getAllRemindsy () {
    vm.tableLoading = true;
    GET('/api/voice/', vm.remindsyListParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.remindsyPage.totalPage = data.totalPages;
        vm.remindsyPage.amount = data.totalElements;
        vm.remindsies = data.content;
      })
  }
  function deleteSchedules() {

  }
  Vue.component('PlayTime', {
    template: `<span>
        <a href="javascript:;" @click.stop.prevent="openSetPlayTime(rowData,index)" v-if="!rowData.schedules">设置</a>
        <a href="javascript:;" @click.stop.prevent="openSetPlayTime(rowData,index)" v-else
        class="v-table-popover-content"
         :data-placement="placement" data-trigger="hover" data-toggle="popover" :data-content="timeList">{{timeList}}</a>
        </span>`,
    props: {
      rowData: {
        type: Object
      },
      field: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    computed: {
      placement() {
        if (this.index < (this.field.listLength() / 2)) {
          return 'bottom';
        } else {
          return 'top';
        }
      },
      timeList() {
        let list = this.rowData.schedules.map(item => {
          let time = new Date();
          new Date().setHours.apply(time, item.split(':'))
          return moment(time).format('HH:mm')
        })
        return list.toString();
      }
    },
    methods: {
      openSetPlayTime() {
        let params = {index: this.index, rowData: this.rowData, callback: this.field.callback};
        this.$emit('on-custom-comp', params);
      }
    }
  })
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .form-label{
    width: 5em;
    float: left;
  }
  .flex-box{
    display: flex;
    align-items: center;
  }
  .layer-set-play-time{
    label{
      margin-bottom: 0;
    }
    .time-label{
      line-height: 34px;
    }
    .form-group{
      margin-right: 0;
      margin-bottom: 20px;
      width: 100%;
    }
    .time-box{
      float: right;
    }
    .create-time-group{
      .form-control{
        width: 50px;
        margin-left: 10px;
        margin-right: 10px;
      }
      .btn{
        margin-left: 40px;
        float: right;
      }
    }
    .schedules-box{
      width: 100%;
      min-height: 114px;
      height: auto;
      padding: 5px;
      font-size: 0;
      > span{
        font-size: 14px;
        display: inline-block;
        padding: 0 5px;
        margin: 5px;
        border: 1px solid #d5e4f3;
        color: #d5e4f3;
        border-radius: 2px;
        background-color: #f5f5f5;
        cursor: pointer;
        i{
          margin-left: 3px;
          font-size: 12px;
        }
        &:hover{
          color: $theme-color;
          border-color: $theme-color;
        }
      }
      >div{
        padding: 15px;
        font-size: 12px;
        color: $text-light;
      }
    }
  }
  .radio-list{
    &.horizontal{
      display: flex;
      padding-left: 15px;
      li + li{
        margin-left: 20px;
      }
    }
  }
</style>
