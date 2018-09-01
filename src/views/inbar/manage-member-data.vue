<template>
  <div class="">
    <!--<div class="page-crumbs"><span class="highlight">会员管理&nbsp;&frasl;</span>&nbsp;会员数据</div>-->
    <div class="page-main">
      <div class="btn-operate-group">
        <button class="btn btn-primary" @click="clickDeleteMember"><i class="iconfont icon-close"></i>注销</button>
        <button class="btn btn-primary" @click="clickImportData"><i class="iconfont icon-close"></i>导入</button>
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
               :columns="memberColumns"
               :table-data="members"
               :select-all="selectMember"
               :select-group-change="selectMember"
               @on-custom-comp="someOperate"
               :show-vertical-border="false"></v-table>
      <div class="paging" v-if="memberPage.totalPage > 1">
        <v-pagination :total="memberPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>

    <!--导入机器数据-->
    <div id="addImportDataLayer" class="layer-open layer-import-data">
      <ul>
        <li>
          第一步：
          <a href="/api/member/export" download="template.xls">导出数据模板</a>
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
  import multiselect from 'vue-multiselect'
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm;

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
        clearMemberParams();
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
    clearMemberParams();
  }
  function clearMemberParams () {
    vm.memberParam = {
      machineId: '',
      comAreaId: null,
      comIp: '',
      status: true
    }
    vm.selectedArea = null;
  }
  function getAllMember () {
    vm.tableLoading = true;
    GET('/api/member/inbar', vm.memberList)
      .then((data) => {
        vm.tableLoading = false;
        vm.memberPage.totalPage = data.totalPages;
        vm.memberPage.amount = data.totalElements;
        vm.members = data.content;
      })
  }
  function deleteMember () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/member/writeoff/?ids=${query}`;
    DELETE(url)
      .done(() => {
        getAllMember();
        layer.msg("删除成功")
        vm.delIds = []
      })
  }
  export default {
    name: 'manage-member-data',
    data() {
      return {
        layerId: null,
        downloadExcelUrl: null,
        memberLayerType: 0, //0 新增 1 修改
        tableLoading: false,
        file: null,
        delIds: [],
        members: [],
        memberTotalPage: null,
        memberParam: {
          machineId: '',
          comAreaId: null,
          comIp: '',
          status: true
        },
        selectedArea: null,
        memberList: {
          page: 0,
          size: 10
        },
        memberPage: {
          totalPage: 0,
          amount: 0
        },
        importErrorMsg: [],
        memberColumns: [
          {field: 'id', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'memberId', title: '身份证号', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'mobile', title: '联系方式', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: '', title: '上网次数', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'level', title: '会员等级', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'totalCash', title: '累计网费充值', width: 95, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'totalGoodsCash', title: '累计商品消费', width: 95, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'cash', title: '网费余额', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'lastStore', title: '最近上网门店', width: 95, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'lastVisit', title: '最近上机时间', width: 95, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData) => { return rowData.lastVisit ? moment(rowData.lastVisit).format('YYYY-MM-DD') : '--' }},
          {field: 'inbar', title: '会员归属', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'area', title: '城市', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          // {field: 'member|3,4', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation', isResize: true}
          {field: [
              {name: '变更', type: "modify", callback: this.modifyMember},
              {name: '注销', type: "delete", callback: this.deleteOneMember}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ]
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
        console.log(params)
      },
      clickDeleteMember() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteMember();
        }
      },
      deleteOneMember(params) {
        this.delIds = [];
        this.delIds.push(params.rowData.id)
        deleteMember()
      },
      selectMember(selection) {
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },
      modifyMember(params) {
        this.$router.push({
          name: 'modify-member-info',
          params: {
            id: params.rowData.id
          }
        })
      },
      submitImportData() {
        let formData = new FormData();
        formData.append('file', vm.file)
        POST("/api/member/upload", MultiFormed(formData))
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
      clickImportData() {
        openImportDataLayer('导入会员数据');
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
      pageChange(pageIndex) {
        vm.memberList.page = pageIndex - 1;
        getAllMember();
      },
      pageSizeChange(newPageSize) {
        vm.memberList.size = newPageSize;
        getAllMember();
      },
      cancelLayer() {
        cancelLayer();
      }
    },
    created() {
      vm = this;
      getAllMember();
      subscribe('modify.table.operate.member', this.modifyMember)
      subscribe('delete.table.operate.member', this.deleteOneMember)
      // subscribe('click.switch.setComputer', this.rowData.id)
    }
  }
</script>


<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>
