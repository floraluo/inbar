<template>
  <div class="">
    <div class="page-main">
      <div class="page-main-top padding-bottom-20">
          <button class="btn btn-primary btn-round" @click="clickAddLevel"><i class="iconfont icon-add"></i> 新增</button>
          <button class="btn btn-primary btn-round" @click="clickImportData"><i class="iconfont icon-daoru"></i> 导入</button>
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
               :columns="levelColumns"
               :table-data="levels"
               :select-all="selectLevel"
               :select-group-change="selectLevel"
               :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
      <div class="paging" v-if="levelList.totalPage > 1">
        <v-pagination :total="levelList.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>

    <!--添加会员等级-->
    <div class="layer-add-level layer-open " id="addLevelLayer">
      <form>
        <div class="form-group"><label >等级名称： <small class="error" v-show="errors.has('levelName')">（*{{ errors.first('levelName') }}）</small></label>
          <input v-model="levelParam.levelName"
                 v-validate="'required'"
                 data-vv-as="等级名称"
                 name="levelName"
                 type="text"
                 class="form-control"
                 placeholder="请输入名称">
        </div>
          <div class="form-group"><label >升级条件：</label>
            <ul class="radio-list">
              <li class="radio-custom radio-primary">
                <input v-model="levelParam.type" value="0" type="radio" name="type" id="type1"><label for="type1">累积充值</label>
              </li>
              <li class="radio-custom radio-primary">
                <input v-model="levelParam.type" value="1" type="radio" name="type" id="type2"><label for="type2">一次消费</label>
              </li>
            </ul>
          </div>
        <div class="form-group"><small class="error" v-show="errors.has('sum')">（*{{ errors.first('sum') }}）</small>
          <div class="input-group">
          <input v-model="levelParam.amount"
                 v-validate="'required|sum'"
                 data-vv-as="金额"
                 name="sum"
                 type="text"
                 class="form-control"
                 placeholder="请输入金额">
            <span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group"><label >是否启用：</label>
          <ul class="radio-list">
            <li class="radio-custom radio-primary">
              <input v-model="levelParam.enabled" value="true" type="radio" name="enableds" id="enableds1"><label for="enableds1">启用</label>
            </li>
            <li class="radio-custom radio-primary">
              <input v-model="levelParam.enabled" value="false" type="radio" name="enableds" id="enableds2"><label for="enableds2">禁用</label>
            </li>
          </ul>
        </div>
      </form>
      <div class="form-group layer-btn-operate-group text-center">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitAddLevel">保存</button>
      </div>
    </div>

    <!--导入区域数据-->
    <div id="addImportDataLayer" class="layer-open layer-import-data">
      <ul>
        <li>
          第一步：
          <a href="/api/level/export" download="example.xlsx">导出数据模板</a>
        </li>
        <li>第二步：在模板中录入数据</li>
        <li>第三步：
          <label class="btn btn-primary btn-sm btn-upload" for="importLevelData">
            <i class="iconfont icon-file"></i>选择文件
            <input class="sr-only" @change='importFile($event)' accept=".xls,.xlsx,.xlsm,.xltx,.xltm,.xlsb,.xlam" type="file" id="importlevelData">
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
    import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm;
  function openLevelLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['450px', '400px'],
      content: $('#addLevelLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      end() {
        clearLevelParams();
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
        clearLevelParams();
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
    clearLevelParams();
  }
  function clearLevelParams () {

  }
  function getLevels () {
    GET('/api/overcharge-rule/getLevel')
      .done((data) => {
        vm.levels = data;
      })
  }
  function getAllLevel () {
    vm.tableLoading = true;
    GET('/api/level/', vm.levelList)
      .done((data) => {
        vm.tableLoading = false;
        vm.levelList.totalPage = data.totalPages;
        vm.levelList.amount = data.totalElements;
        vm.levels = data.content;
      })
  }
  function postAddLevel () {
    POST('/api/level/', vm.levelParam)
      .done(() => {
        getAllLevel();
        clearLevelParams();
        layer.close(vm.layerId);
        layer.msg('新增成功！')
      })
  }
  function patchModifyLevel () {
    PATCH('/api/level/update', vm.levelParam)
      .done(() => {
          getAllLevel();
          clearLevelParams();
          layer.close(vm.layerId);
          layer.msg('修改成功！')
        })
  }

  function deleteLevel () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/level/?ids=${query}`;
    DELETE(url, {ids: vm.delIds})
      .done(() => {
        layer.msg("删除成功");
        getAllLevel();
        vm.delIds = []
      })
  }
  export default {
    name: 'member-level',

    data() {
      return {
        layerId: null,
        levelLayerType: 0, //0 新增 1 修改
        tableLoading: false,
        file: null,
        delIds: [],
        levels: [],
        levelTotalPage: null,
        levelParam: {
          id:0,
          createTime: new Date(),
          levelName: '',
          condition: '',
          enabled: true,
          type:0,
        },
        selectedLevelType: false,
        levelList: {
          page: 0,
          size: 10,
          totalPage: 0,
        },
        importErrorMsg: [],
        levelColumns: [
          { title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center',isResize: true,formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'levelName', title: '会员等级', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'condition', title: '条件', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: {name: 'enabled', valueKey: 'enabled', callback: this.toggleLevelStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'createTime', title: '创建时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData) { return moment(rowData.createTime).format('YYYY-MM-DD') }
          },
          {field: [
              {name: '修改', type: "modify", callback: this.modifyLevel},
              {name: '删除', type: "delete", callback: this.deleteOneLevel}
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
      clickAddLevel() {
        vm.levelLayerType = 0
        openLevelLayer('新增会员等级');
      },
      clickDeleteLevels() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteLevel();
        }
      },
      clickImportData() {
        openImportDataLayer('导入区域数据');
      },

      deleteOneLevel(param) {
        this.delIds = [];
        this.delIds.push(param.rowData.id)
        deleteLevel();
      },

      modifyLevel(param) {
        const level =  param.rowData;
        vm.levelLayerType = 1;
        vm.levelParam.id = level.id;
        vm.levelParam.levelName = level.levelName;
        vm.levelParam.amount =  level.amount;
        vm.levelParam.enabled =  level.enabled;
        // vm.levelParam.typeList = param;
        // levelParam: {
        //   createTime: new Date(),
        //     levelName: '',
        //     condition: '',
        //     enabled: true,
        //     typeList: []
        // },
        openLevelLayer('修改会员等级');
      },

      submitAddLevel() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          console.log(this);
            if (vm.levelLayerType === 0) {
              postAddLevel()
            } else{
              patchModifyLevel(vm.levelParam.id);
            }

        })
      },
      selectLevel(selection) {
        // console.log("))))))))))))", selection)
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },
      toggleLevelStatus(params) {
        const rowData = params.rowData;
        let url = rowData[params.valueKey] === false ? `/api/level/status/enable/?ids=${rowData.id}` : `/api/level/status/forbid/?ids=${rowData.id}`;
        PATCH(url)
          .done(() => {
            vm.levels[params.index][params.valueKey] = !vm.levels[params.index][params.valueKey];
          })
      },
      submitImportData() {
        let formData = new FormData();
        formData.append('file', vm.file)
        POST("/api/level/import", MultiFormed(formData))
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
        vm.levelList.page = pageIndex - 1;
        getAllLevel();
      },
      pageSizeChange(newPageSize) {
        vm.levelList.size = newPageSize;
        getAllLevel();
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
      getAllLevel();
      // subscribe('modify.table.operate.level', this.modifyLevel)
      // subscribe('delete.table.operate.level', this.deleteOneLevel)
      console.log(this.$route)
    }
  }
</script>
<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>
