<template>
    <div class="page-main" >
      <div class="page-main-top padding-bottom-20">
        <button class="btn btn-primary btn-round" @click="clickAddPackaged"><i class="iconfont icon-add"></i>  新增</button>
        <button class="btn btn-primary btn-round"  @click="clickDeletePackaged"><i class="iconfont icon-close"></i>删除</button>

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
               :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
      <div class="paging" v-if="packagedPage.totalPage > 1">
        <v-pagination :total="packagedPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
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
  function clearPackagedParams () {
    vm.packagedParam = {
      setmealName: '',
      setmealId: '',
      setmealOrig:'',
      setmealCurrent:0,
      setmealType: true,
      startTime:'',
      endTime:'',
    }
  }
  function getAllPackaged () {
    vm.tableLoading = true;
    GET('/api/stock/setmeal/queryAll', vm.packagedListParam)
      .done((data) => {
        vm.tableLoading = false;
        vm.packagedPage.totalPage = data.totalPages;
        vm.packagedPage.amount = data.totalElements;
        vm.packageds = data.content;
      })
  }

  function deletePackaged () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/stock/setmeal/delete/?ids=${query}`;
    DELETE(url, {ids: vm.delIds})
      .done(() => {
        getAllCategory();
        layer.msg("删除成功")
        vm.delIds = []
      })
  }

  export default {
    name: 'package-list',
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
          setmealName: '',
          setmealId: '',
          setmealOrig:'',
          setmealCurrent:0,
          setmealType: true,
          startTime:'',
          endTime:'',
        },
        selectedMemberType: false,
        packagedListParam: {
          page: 0,
          size: 10,

        },
        packagedPage: {
          totalPage: 0,
          amount: 0,
        },
        importErrorMsg: [],
        packagedColumns: [
          {field: 'setmealId', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'setmealName', title: '套餐名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsId', title: '包含商品', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => {
              let placement;
              if (rowIndex < (vm.packagedListParam.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              return `<span class="v-table-popover-content" data-content="${rowData.goodsId}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${rowData.goodsId}</span>`;
            }
          },
          {field: 'setmealOrig', title: '原价', width: 100, titleAlign: 'center', columnAlign: 'center', isResize:true},
          {field: 'setmealCurrent', title: '现价', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: {name: 'setmealType', valueKey: 'setmealType', callback: this.togglePackageStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'time ', title: '有效期', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,formatter: (rowData, rowIndex) => {
              let time ,html, placement;
              if (rowData.startTime===null){
                return null
              } else {
                time  = `${moment(rowData.startTime).format('YYYY-MM-DD')} 至 ${moment(rowData.endTime).format('YYYY-MM-DD')}`;
              }
              if (rowIndex < (vm.packagedParams.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              html = `<span class="v-table-popover-content" data-content="${time}" data-placement="${placement}" data-trigger="hover" data-toggle="popover"  >${time}</span>`;
              return html ;
            }},
          {field: [
              {name: '修改', type: "modify", callback: this.modifyPackaged},
              {name: '删除', type: "delete", callback: this.deleteOnePackaged}
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
      modifyPackaged(params) {
        this.onePackaged = params.rowData;
        this.layerId = layer.open({
          type: 1,
          title: '修改商品信息',
          area: ['835px', '600px'],
          content: $('#modifyPackagedLayer'),
          success() {
            publish('layer.opened.packaged', Object.assign(params, {type: 'modify'}));
            vm.$validator.errors.clear();
          },
          end() {
            clearPackagedParams();
          }
        })
      },
      layerSavePackaged() {
        publish('layer.modify.save.packaged')
      },
      modifySuccess() {
        this.cancelLayer();
        getAllPackaged();
      },

      clickAddPackaged() {
        this.$router.push({
          name: 'add-packages',
        })
      },
      clickDeletePackaged() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deletePackaged();
        }
      },
      deleteOnePackaged(params) {
        vm.delIds[0] = params.rowData.setmealId;
        deletePackaged();
      },
      selectPackaged(selection) {
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.setmealId);
        })
      },
      togglePackageStatus(params) {
        const rowData = params.rowData;
        PATCH(`/api/stock/setmeal/upAndLow/${rowData.setmealId}`)
          .done(() => {
            vm.packageds[params.index][params.valueKey] = !vm.packageds[params.index][params.valueKey];
            // publish('switch.toggle', params.setmealId)
          })
      },

      pageChange(pageIndex) {
        vm.packagedListParam.page = pageIndex - 1;
        getAllPackaged();
      },
      pageSizeChange(newPageSize) {
        vm.packagedListParam.size = newPageSize;
        getAllPackaged();
      },
      cancelLayer() {
        layer.close(this.layerId);
      }
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created() {
      vm = this;
      getAllPackaged();
      subscribe('modify.success.goods', this.modifySuccess)
      // subscribe('modify.table.operate.packaged', this.modifyPackaged)
      // subscribe('delete.table.operate.packaged', this.deleteOnePackaged)
      console.log(this.$route)
    }
  }
  Vue.component('PackagedInnerSwitch', {
    template: `<base-switch open-name="启用" close-name="禁用" size="lg" :rowData="rowData" v-model="rowData.setmealType"  @click-switch="clickSwitch"></base-switch>`,
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
        if (this.rowData.setmealId === id) {
          this.rowData.setmealType = !this.rowData.setmealType;
        }
      }
    },
    created() {

      subscribe('switch.toggle', this.toggleSwitch)
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
  @import "../../sass/base-manage";
</style>
