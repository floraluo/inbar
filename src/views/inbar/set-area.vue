<template>
  <div class="">
    <div class="page-main" >
      <div class="page-main-top">
        <ul class="nav nav-tabs" role="tablist">
          <li class="active" role="presentation"><router-link :to="{name: 'set-area'}">区域设置</router-link></li>
          <li role="presentation"><router-link :to="{name: 'set-computer'}">电脑设置</router-link></li>
        </ul>
        <div class="btn-operate-group">
          <button class="btn btn-primary" @click="clickAddArea"><i class="iconfont icon-add"></i>添加</button>
          <button class="btn btn-primary" @click="clickDeleteAreas"><i class="iconfont icon-close"></i>删除</button>
          <button class="btn btn-primary" @click="clickImportData"><i class="iconfont icon-close"></i>导入</button>
        </div>
      </div>

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
               :columns="areaColumns"
               :table-data="areas"
               :select-all="selectArea"
               :select-group-change="selectArea"
               :show-vertical-border="false"  @on-custom-comp="enableArea"></v-table>
      <div class="paging" v-if="areaList.totalPage > 1">
        <v-pagination :total="areaList.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>

    <!--添加区域-->
    <div class="layer-add-area layer-open" id="addAreaLayer">
      <form>
        <div class="form-group"><label for="">区域名称： <small class="error" v-show="errors.has('name')">（*{{ errors.first('name') }}）</small></label>
          <input v-model="areaParam.name"
                 v-validate="'required'"
                 data-vv-as="区域名称"
                 name="name"
                 type="text"
                 class="form-control"
                 placeholder="请输入名称">
        </div>
        <div class="form-group"><label for="">说明： <small class="error" v-show="errors.has('description')">（*{{ errors.first('description') }}）</small></label>
          <input v-model="areaParam.description"
                 name="description"
                 type="text"
                 class="form-control"
                 placeholder="请输入说明">
        </div>
        <div class="form-group"><label for="">允许会员上网：<small class="error" v-show="selectedMemberType !== false && areaParam.typeList.length === 0">（*至少选择一个类型）</small></label>
          <ul class="checkbox-list">
            <li class="checkbox-custom checkbox-primary" v-for="item in levels" :key="item.id">
              <input v-model="areaParam.typeList" :value="item.id" type="checkbox" :id="'typeList'+item.id"><label :for="'typeList'+item.id">{{item.levelName}}</label>
            </li>
          </ul>
        </div>
        <div class="form-group"><label for="">是否启用：</label>


          <ul class="radio-list">
            <li class="radio-custom radio-primary">
              <input v-model="areaParam.enabled" value="true" type="radio" name="enabled" id="enabled1"><label for="enabled1">启用</label>
            </li>
            <li class="radio-custom radio-primary">
              <input v-model="areaParam.enabled" value="false" type="radio" name="enabled" id="enabled2"><label for="enabled2">禁用</label>
            </li>
          </ul>
        </div>
      </form>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitAddArea">保存</button>
      </div>
    </div>

    <!--导入区域数据-->
    <div id="addImportDataLayer" class="layer-open layer-import-data">
      <ul>
        <li>
          第一步：
          <a href="/api/inbar-area/export" download="example.xlsx">导出数据模板</a>
        </li>
        <li>第二步：在模板中录入数据</li>
        <li>第三步：
          <label class="btn btn-primary btn-sm btn-upload" for="importAreaData">
            <i class="iconfont icon-file"></i>选择文件
            <input class="sr-only" @change='importFile($event)' accept=".xls,.xlsx,.xlsm,.xltx,.xltm,.xlsb,.xlam" type="file" id="importAreaData">
          </label>
          <span v-if="file">{{file.name}}</span>
        </li>
      </ul>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitImportData">导入</button>
      </div>
    </div>

    <!--数据导入失败提示-->
    <div id="importErrorTipLayer" class="layer-open layer-import-error">
      <ul>
        <li v-for="(item, index) in importErrorMsg" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import mySwitch from 'vue-switch/switch-2.vue';
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm;
  function openAreaLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['560px', '420px'],
      content: $('#addAreaLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      end() {
        clearAreaParams();
        // layer.msg("我是销毁回调")
      }
    })
  }
  function openImportDataLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['600px', '380px'],
      content: $('#addImportDataLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      end() {
        clearAreaParams();
        // layer.msg("我是销毁回调")
      }
    })
  }
  function openImportErrorTipLayer () {
    vm.layerId = layer.open({
      type: 1,
      title: '数据导入失败信息',
      area: ['600px', '380px'],
      content: $('#importErrorTipLayer'),
      success() {
      },
      end() {
        vm.file = null;
      }
    })
  }
  function cancelLayer () {
    layer.close(vm.layerId);
    clearAreaParams();
  }
  function clearAreaParams () {
    vm.areaParam = {
      id:0,
      name: '',
      description: '',
      enabled: true,
      typeList: []
    }
  }
  function getLevels () {
    GET('/api/overcharge-rule/getLevel')
      .done((data) => {
        vm.levels = data;
      })
  }
  function getAllArea () {
    vm.tableLoading = true;
    GET('/api/inbar-area/', vm.areaList)
      .done((data) => {
        vm.tableLoading = false;
        vm.areaList.totalPage = data.totalPages;
        vm.areaList.amount = data.totalElements;
        vm.areas = data.content;
      })
  }
  function getAllComputer () {
    GET('/api/computer/')
      .done((data) => {
        vm.computers = data;
      })
  }

  function postAddArea () {
    POST('/api/inbar-area/', vm.areaParam)
      .done(() => {
        getAllArea();
        clearAreaParams();
        layer.close(vm.layerId);
        layer.msg('新增区域成功！')
      })
  }
  function patchModifyArea () {
    PATCH('/api/inbar-area/update', vm.areaParam)
      .done(() => {
          getAllArea();
          clearAreaParams();
          layer.close(vm.layerId);
          layer.msg('修改成功！')
      })
  }

  function deleteArea () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/inbar-area/?ids=${query}`;
    DELETE(url, {ids: vm.delIds})
      .done(() => {
        layer.msg("删除成功");
        getAllArea();
        vm.delIds = []
      })
  }
  export default {
    name: 'set-area',
    data() {
      return {
        layerId: null,
        areaLayerType: 0, //0 新增 1 修改
        tableLoading: false,
        file: null,
        delIds: [],
        levels: [],
        areas: [],
        computers: [],
        areaTotalPage: null,
        areaParam: {
          id:0,
          createTime: new Date(),
          name: '',
          description: '',
          enabled: true,
          typeList: []
        },
        selectedMemberType: false,
        areaList: {
          page: 0,
          size: 10,
          totalPage: 0,
          amount: 0
       },
        importErrorMsg: [],
        areaColumns: [
          {field: 'id', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'name', title: '区域名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'memberNameList', title: '允许上网', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => {
              let type = rowData.memberNameList.map(item => { return item.levelName }), html, placement;
              if (rowIndex < (vm.areaList.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              html = `<span class="v-table-popover-content" data-content="${type.join('、')}" data-placement="${placement}" data-trigger="hover" data-toggle="popover"  >${type.join('、')}</span>`;
              return html;
            }
          },
          {field: 'description', title: '说明', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => {
            let placement;
              if (rowIndex < (vm.areaList.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              return `<span class="v-table-popover-content" data-content="${rowData.description}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${rowData.description}</span>`;
            }
          },
          {field: 'enabled', title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'AreaInnerSwitch'},
          {field: 'createTime', title: '创建时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData) { return moment(rowData.createTime).format('YYYY-MM-DD') }
          },
          {field: 'area|1,2', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation', isResize: true}

        ]
      }
    },
    methods: {
      clickAddArea() {
        vm.areaLayerType = 0
        openAreaLayer('新增区域');
      },
      clickDeleteAreas() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteArea();
        }
      },
      clickImportData() {
        openImportDataLayer('导入区域数据');
      },

      deleteOneArea(msg, param) {
        this.delIds = [];
        this.delIds.push(param.rowData.id)
        deleteArea();
      },

      modifyArea(msg, param) {
        const area=  param.rowData;
        vm.areaLayerType = 1;
        vm.areaParam.id=area.id;
        vm.areaParam.name = area.name;
        vm.areaParam.description = area.description;
        vm.areaParam.enabled = area.enabled;
        // vm.areaParam.typeList = param;
        // areaParam: {
        //   createTime: new Date(),
        //     name: '',
        //     description: '',
        //     enabled: true,
        //     typeList: []
        // },
        openAreaLayer('修改区域');
      },

      submitAddArea() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (vm.areaParam.typeList.length > 0) vm.selectedMemberType = true;
          if (error.any() || vm.selectedMemberType === false || vm.areaParam.typeList.length === 0) {
            // vm.areaParam.typeList = [];
            vm.selectedMemberType = true;
            layer.msg('你还有错误消息未处理！')
          } else {
            if (this.areaLayerType === 0) {
              postAddArea()
            } else if (this.areaLayerType === 1) {
              patchModifyArea(this.areaParam.id);
            }
          }
        })
      },
      selectArea(selection) {
        // console.log("))))))))))))", selection)
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },
      enableArea(param) {
        let url = param.enabled === false ? `/api/inbar-area/status/enable/?ids=${param.id}` : `/api/inbar-area/status/forbid/?ids=${param.id}`;
        PATCH(url)
          .done(() => {
            // getAllArea();
            publish('switch.toggle,area', param.id)
          })
      },
      submitImportData() {
        let formData = new FormData();
        formData.append('file', vm.file)
        POST("/api/inbar-area/import", MultiFormed(formData))
          .then((data) => {
            layer.close(vm.layerId);
            if (data.fail === 0) {
              layer.msg(`共${data.sum}条数据全部导入成功`);
            } else {
              vm.importErrorMsg = data.messages.map(item => {
                return item.message;
              })
              openImportErrorTipLayer();
              if (data.success > 0) {
                layer.msg(`共${data.sum}条数据,导入成功${data.success}条,失败${data.fail}条`)
              }
            }
          })
      },
      importFile(event) {
        vm.file = event.target.files[0];
      },
      pageChange(pageIndex) {
        vm.areaList.page = pageIndex - 1;
        getAllArea();
      },
      pageSizeChange(newPageSize) {
        vm.areaList.size = newPageSize;
        getAllArea();
      },
      cancelLayer() {
        cancelLayer();
      }
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created() {
      vm = this;
      getLevels();
      getAllArea();
      getAllComputer();
      subscribe('modify.table.operate.area', this.modifyArea)
      subscribe('delete.table.operate.area', this.deleteOneArea)
      console.log(this.$route)
    }
  }
  Vue.component('AreaInnerSwitch', {
    template: `<base-switch open-name="启用" close-name="禁用" size="lg" :rowData="rowData" v-model="rowData.enabled"  @click-switch="clickSwitch"></base-switch>`,
    props: {
      rowData: {
        type: Object
      },
      field: {
        type: String
      },
      index: {
        type: Number
      }
    },
    components: {
      'my-switch': mySwitch
    },
    methods: {
      clickSwitch(param) {
        this.$emit('on-custom-comp', param);
      },
      toggleSwitch(msg, id) {
        if (this.rowData.id === id) {
          this.rowData.enabled = !this.rowData.enabled;
        }
      }
    },
    created() {
      console.log(this.rowData.enabled)
      //debugger
      subscribe('switch.toggle.area', this.toggleSwitch)
    }
  })
</script>
<style lang="scss">
  .vue-switch{
    /*width: 54px;*/
    height: 22px !important;
    line-height: 22px  !important;
    margin-top: 9px;
    &.z-on span{
      /*left: 4px !important;*/
    }
    span.close{
      color: #fff !important;
      opacity: 1;
      line-height: inherit;
      /*left: 20px !important;*/
    }
  }
</style>
<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>
