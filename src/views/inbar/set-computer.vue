<template>
  <div class="">
    <!--<div class="page-crumbs"><span class="highlight">网吧设置&nbsp;&frasl;</span>&nbsp;电脑设置</div>-->
    <div class="page-main">
      <div class="page-main-top">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation"><router-link :to="{name: 'set-area'}">区域设置</router-link></li>
          <li class="active" role="presentation"><router-link :to="{name: 'set-computer'}">电脑设置</router-link></li>
        </ul>
        <div class="btn-operate-group">
          <button class="btn btn-primary" @click="clickAddComputer"><i class="iconfont icon-add"></i>添加</button>
          <button class="btn btn-primary" @click="clickDeleteComputer"><i class="iconfont icon-close"></i>删除</button>
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
               :columns="computerColumns"
               :table-data="computers"
               :select-all="selectComputer"
               :select-group-change="selectComputer"
               :show-vertical-border="false" @on-custom-comp="someOperate"></v-table>
      <div class="paging" v-if="computerPage.totalPage > 1">
        <v-pagination :total="computerPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>

    <!--新增机器-->
    <div id="addComputerLayer" class="layer-open layer-add-computer">
      <form>
        <div class="form-group"><label for="">机器号： <small class="error" v-show="errors.has('number')">（*{{ errors.first('number') }}）</small></label>
          <input v-model="computerParam.machineId"
                 v-validate="'required'"
                 data-vv-as="机器号"
                 name="number"
                 type="text"
                 class="form-control"
                 placeholder="请输入机器号">
        </div>
        <div class="form-group"><label for="">区域： <small class="error" v-show="selectedArea !==null && selectedArea.length === 0">（*区域不能为空）</small></label>
          <multiselect
            value="id"
            v-model="selectedArea"
            label="name"
            placeholder="请选择区域"
            track-by="id"
            @input="updateSelectedArea"
            :maxHeight="200"
            :showLabels="false"
            :close-on-select="true"
            :searchable="false"
            :allow-empty="false"
            :options="areas">
          </multiselect>
          <!--<input v-model="areaParam.name"-->
                 <!--v-validate="'required'"-->
                 <!--data-vv-as="区域"-->
                 <!--name="area"-->
                 <!--type="text"-->
                 <!--class="form-control"-->
                 <!--placeholder="请输入区域">-->
        </div>
        <div class="form-group"><label for="">IP地址： <small class="error" v-show="errors.has('ip')">（*{{ errors.first('ip') }}）</small></label>
          <input v-model="computerParam.comIp"
                 v-validate="'required|ip'"
                 data-vv-as="IP地址"
                 name="ip"
                 type="text"
                 class="form-control"
                 placeholder="请输入IP地址">
        </div>
        <div class="form-group"><label for="">是否启用：</label>
          <ul class="radio-list">
            <li class="radio-custom radio-primary">
              <input v-model="computerParam.status" value="true" type="radio" name="enabled" id="enabled1"><label for="enabled1">启用</label>
            </li>
            <li class="radio-custom radio-primary">
              <input v-model="computerParam.status" value="false" type="radio" name="enabled" id="enabled2"><label for="enabled2">禁用</label>
            </li>
          </ul>
        </div>
      </form>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitAddComputer">保存</button>
      </div>
    </div>

    <!--导入机器数据-->
    <div id="addImportDataLayer" class="layer-open layer-import-data">
      <ul>
        <li>
          第一步：
          <a href="/api/computer/export" download="example.xlsx">导出数据模板</a>
        </li>
        <li>第二步：在模板中录入数据</li>
        <li>第三步：
          <label class="btn btn-primary btn-sm btn-upload" for="importData">
            <i class="iconfont icon-file"></i>选择文件
            <input class="sr-only" @change='importFile($event)' accept=".xls,.xlsx,.xlsm,.xltx,.xltm,.xlsb,.xlam" type="file" id="importData">
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
  import multiselect from 'vue-multiselect'
  import mySwitch from 'vue-switch/switch-2.vue';
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'


  let vm;
  function openComputerLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['470px', '415px'],
      content: $('#addComputerLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      end() {
        clearComputerParams();
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
        clearComputerParams();
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
    clearComputerParams();
  }
  function clearComputerParams () {
    vm.computerParam = {
      machineId: '',
        comAreaId: null,
        comIp: '',
        status: true
    }
    vm.selectedArea = null;
  }
  function getAllArea () {
    GET('/api/inbar-area/', {
      page: 0,
      size: 100
    })
      .done((data) => {
        vm.areas = data.content;
      })
  }
  function getAllComputer () {
    vm.tableLoading = true;
    GET('/api/computer/', vm.computerList)
      .then((data) => {
        vm.tableLoading = false;
        vm.computerPage.totalPage = data.totalPages;
        vm.computerPage.amount = data.totalElements;
        vm.computers = data.content;
      })
  }
  function deleteComputer () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/computer/?ids=${query}`;
    DELETE(url)
      .done(() => {
        getAllComputer();
        layer.msg("删除成功")
        vm.delIds = []
      })
  }
  function postAddComputer () {
    POST('/api/computer/', vm.computerParam)
      .done(() => {
        getAllComputer();
        clearComputerParams();
        layer.close(vm.layerId);
        layer.msg('新增成功！')
      })
  }
  function patchModifyComputer () {
    PATCH('/api/computer/', vm.computerParam)
      .done(() => {
        getAllComputer();
        clearComputerParams();
        layer.close(vm.layerId);
        layer.msg('修改成功！')
      })
  }
  export default {
    name: 'set-computer',
    components: {multiselect},
    data() {
      return {
        layerId: null,
        downloadExcelUrl: null,
        computerLayerType: 0, //0 新增 1 修改
        tableLoading: false,
        file: null,
        delIds: [],
        areas: [],
        computers: [],
        computerTotalPage: null,
        computerParam: {
          machineId: '',
          comAreaId: null,
          comIp: '',
          status: true
        },
        selectedArea: null,
        computerList: {
          page: 0,
          size: 10
        },
        computerPage: {
          totalPage: 0,
          amount: 0
        },
        importErrorMsg: [],
        computerColumns: [
          {field: 'id', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'machineId', title: '机器号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'comIp', title: '机器IP', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'areaName', title: '区域', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: {name: 'status', valueKey: 'status', callback: this.toggleStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'createTime', title: '创建时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData) { return moment(rowData.createTime).format('YYYY-MM-DD') }},
          {field: [
              {name: '修改', type: "modify", callback: this.modifyComputer},
              {name: '删除', type: "delete", callback: this.deleteOneComputer}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}

        ]
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      clickAddComputer() {
        vm.computerLayerType = 0
        openComputerLayer('新增区域');
      },
      clickDeleteComputer() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteComputer();
        }
      },
      submitAddComputer() {
        console.log(vm.computerParam)
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any() || vm.selectedArea === null) {
            // vm.computerParam.typeList = [];
            vm.selectedArea = [];
            layer.msg('你还有错误消息未处理！')
          } else {
            if (this.computerLayerType === 0) {
              postAddComputer()
            } else if (this.computerLayerType === 1) {
              patchModifyComputer();
            }
          }
        })
      },
      submitImportData() {
        let formData = new FormData();
        formData.append('file', vm.file)
        POST("/api/computer/import", MultiFormed(formData))
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
      deleteComputers() {},
      deleteOneComputer(params) {
        console.log(params)
        this.delIds = [];
        this.delIds.push(params.rowData.id)
        deleteComputer();
      },

      clickImportData() {
        openImportDataLayer('导入机器数据');
      },
      toggleStatus(params) {
        const rowData = params.rowData;
        let url = rowData.status === false ? `/api/computer/enable/?ids=${rowData.id}` : `/api/computer/disable/?ids=${rowData.id}`;
        PATCH(url)
          .done(() => {
            vm.computers[params.index].status = !vm.computers[params.index].status;
            // getAllArea();
            // publish('switch.toggle.computer', param.id)
          })
      },
      updateSelectedArea(option) {
        vm.computerParam.comAreaId = option.id;
      },
      selectComputer(selection) {
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },
      importFile(event) {
        let fileReader = new FileReader(),
          files = event.target.files,
          file;

        if (!files.length) {
          return;
        }

        vm.file = files[0];
      },
      modifyComputer(params) {
        vm.computerLayerType = 1;
        const data = params.rowData;
        vm.computerParam.machineId = data.machineId;
        vm.computerParam.comAreaId = data.comAreaId;
        vm.computerParam.comIp = data.comIp;
        vm.computerParam.status = data.status;
        vm.computerParam.id = data.id;
        // vm.selectedArea
        vm.areas.some(item => {
          if (item.id === data.comAreaId) {
            vm.selectedArea = item;
            return true;
          }
        })
        openComputerLayer('修改机器信息')
      },
      pageChange(pageIndex) {
        vm.computerList.page = pageIndex - 1;
        getAllComputer();
      },
      pageSizeChange(newPageSize) {
        vm.computerList.size = newPageSize;
        getAllComputer();
      },
      cancelLayer() {
        cancelLayer();
      }
    },
    created() {
      vm = this;
      getAllComputer();
      getAllArea();
      subscribe('modify.table.operate.computer', this.modifyComputer)
      subscribe('delete.table.operate.computer', this.deleteOneComputer)
      // subscribe('click.switch.setComputer', this.rowData.id)
    }
  }
  Vue.component('ComputerInnerSwitch', {
    template: `<base-switch open-name="启用" close-name="禁用" size="lg" :rowData="rowData" v-model="rowData.status"  @click-switch="clickSwitch"></base-switch>`,
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
          this.rowData.status = !this.rowData.status;
        }
      }
    },
    created() {
      // console.log(this.rowData.enabled)
      console.log(this.rowData.status)
      // debugger
      subscribe('switch.toggle.computer', this.toggleSwitch)
    }
  })

</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>
