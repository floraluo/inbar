<template>
  <div class="">
    <!-- <div class="page-crumbs"><span class="highlight">网吧设置&nbsp;&frasl;</span>&nbsp;区域设置</div>-->
    <div class="page-main" >
      <div class="page-main-top padding-bottom-20">
          <button class="btn btn-primary btn-round" @click="clickAddPackaged"><i class="iconfont icon-add"></i>  新增</button>
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
               :columns="packagedColumns"
               :table-data="packageds"
               :select-all="selectPackaged"
               :select-group-change="selectPackaged"
               :show-vertical-border="false"  @on-custom-comp="enablePackaged"></v-table>
      <div class="paging" v-if="packagedPage.totalPage > 1">
        <v-pagination :total="packagedPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
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
  import store from '../../../src/core/store'

  let vm;
  function openPackagedLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      packaged: ['560px', '420px'],
      content: $('#addPackagedLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      end() {
        clearPackagedParams();
        // layer.msg("我是销毁回调")
      }
    })
  }
    function cancelLayer () {
    layer.close(vm.layerId);
    clearPackagedParams();
  }
  function clearPackagedParams () {
    vm.packagedParam = {
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
  function getAllPackaged () {
    vm.tableLoading = true;
    GET('/api/overcharge-rule/', vm.packagedParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.packagedParams.totalPage = data.totalPages;
        vm.packagedParams.amount = data.totalElements;
        vm.packageds = data.content;
      })
  }
  function postAddPackaged () {
    POST('/api/overcharge-rule/', vm.packagedParam)
      .done(() => {
        getAllPackaged();
        clearPackagedParams();
        layer.close(vm.layerId);
        layer.msg('新增成功！')
      })
  }
  function patchModifyPackaged () {
    PATCH('/api/inbar-packaged/update', vm.packagedParam)
      .done(() => {
        getAllPackaged();
        clearPackagedParams();
        layer.close(vm.layerId);
        layer.msg('修改成功！')
      })
  }

  export default {
    name: 'manage-packaged',
    data() {
      return {
        layerId: null,
        packagedLayerType: 0, //0 新增 1 修改
        tableLoading: false,
        file: null,
        delIds: [],
        levels: [],
        packageds: [],
        computers: [],
        packagedTotalPage: null,
        packagedParam: {
          id:0,
          name: '',
          memberLevelList:[],
          overchargeType:'',
          amount:0,
          overed:'',
          overedgoods:'',
          effectiveTime:'',
          enabled: true,
          beginTime:'',
          endTime:'',
          typeList: []
        },
        selectedMemberType: false,
        packagedParams: {
          page: 0,
          size: 10,
          type: 'storekeeper'
        },
        packagedPage: {
          totalPage: 0,
          amount: 0,
        },
        importErrorMsg: [],
        packagedColumns: [
          {field: 'id', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'name', title: '名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
           {field: 'memberLevelList', title: '会员限制', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => {
               let type = rowData.memberLevelList.map(item => { return item.levelName }), html, placement;
               if (rowIndex < (vm.packagedParams.size / 2)) {
                 placement = 'bottom';
               } else {
                 placement = 'top';
               }
               html = `<span class="v-table-popover-content" data-content="${type.join('、')}" data-placement="${placement}" data-trigger="hover" data-toggle="popover"  >${type.join('、')}</span>`;
               return html;
           }
          },
          {field: 'overchargeType', title: '类别', width: 100, titleAlign: 'center', columnAlign: 'center', isResize:true},

          {field: 'amount', title: '充值金额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'overedGoods', title: '赠送', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          // {field: 'effectiveTime', title: '时间限制', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'enabled', title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'PackagedInnerSwitch'},
          {field: 'beginTime ', title: '生效时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
           formatter(rowData) { return moment(rowData.beginTime).format('YYYY-MM-DD') }
          },
          {field: 'packaged|1', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation', isResize: true}

        ]
      }
    },
    methods: {
      clickAddPackaged() {
        vm.packagedLayerType = 0
        openPackagedLayer('新增区域');
      },
      modifyPackaged(msg, param) {
        const  packaged =  param.rowData;
        vm.packagedLayerType = 1;
        vm.packagedParam.id=packaged.id;
        vm.packagedParam.name = packaged.name;
        vm.packagedParam.description = packaged.description;
        vm.packagedParam.enabled = packaged.enabled;
        // vm.packagedParam.typeList = param;
        // packagedParam: {
        //   createTime: new Date(),
        //     name: '',
        //     description: '',
        //     enabled: true,
        //     typeList: []
        // },
        openPackagedLayer('修改区域');
      },

      submitAddPackaged() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (vm.packagedParam.typeList.length > 0) vm.selectedMemberType = true;
          if (error.any() || vm.selectedMemberType === false || vm.packagedParam.typeList.length === 0) {
            // vm.packagedParam.typeList = [];
            vm.selectedMemberType = true;
            layer.msg('你还有错误消息未处理！')
          } else {
            if (this.packagedLayerType === 0) {
              postAddPackaged()
            } else if (this.packagedLayerType === 1) {
              patchModifyPackaged(this.packagedParam.id);
            }
          }
        })
      },
      selectPackaged(selection) {
        // console.log("))))))))))))", selection)
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },
      enablePackaged(param) {
        let url = param.enabled === false ? `/api/inbar-packaged/status/enable/?ids=${param.id}` : `/api/inbar-packaged/status/forbid/?ids=${param.id}`;
        PATCH(url)
          .done(() => {
            // getAllPackaged();
            publish('switch.toggle,packaged', param.id)
          })
      },

      pageChange(pageIndex) {
        vm.packagedParams.page = pageIndex - 1;
        getAllPackaged();
      },
      pageSizeChange(newPageSize) {
        vm.packagedParams.size = newPageSize;
        getAllPackaged();
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
      getAllPackaged();
      subscribe('modify.table.operate.packaged', this.modifyPackaged)
      console.log(this.$route)
    }
  }
  Vue.component('PackagedInnerSwitch', {
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
      subscribe('switch.toggle.packaged', this.toggleSwitch)
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
