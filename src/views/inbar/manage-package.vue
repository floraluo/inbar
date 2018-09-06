<template>
  <div class="">
    <!-- <div class="page-crumbs"><span class="highlight">网吧设置&nbsp;&frasl;</span>&nbsp;区域设置</div>-->
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

   </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'


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
      id: 0,
      name: '',
      description: '',
      enabled: true,
      typeList: []
    }
  }

  function getAllPackaged () {
    vm.tableLoading = true;
    GET('/api/overcharge-rule/', vm.packagedParams)
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
    const url = `/api/overcharge-rule/?ids=${query}`;
    DELETE(url)
      .done(() => {
        getAllPackaged();
        layer.msg("删除成功")
        vm.delIds = []
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
          overedGoodsVO: [],
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
          amount: 0
        },
        importErrorMsg: [],
        packagedColumns: [
          { title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center',isResize: true,formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
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
          {field: 'overchargeType', title: '类别', width: 80, titleAlign: 'center', columnAlign: 'center', isResize:true, formatter: (rowData) => {
            let name;
            if (rowData.overchargeType === 0) {
              name = '送网费'
            } else if (rowData.overchargeType === 1) {
              name = '送商品'
            } else if (rowData.overchargeType === 2) {
              name = '网费+商品'
            }
            return name;
            }},
          {field: 'amount', title: '充值金额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'present', title: '赠送', width: 100, titleAlign: 'center', columnAlign: 'left', isResize: true,formatter: (rowData, rowIndex) => {
              let present = '--', html, placement, goods = rowData.overedGoodsVO.map(item => { return item.quantity +'*'+ item.name });
              if (rowData.overchargeType === 0) {
                present = `${rowData.overed}元`

              } else if (rowData.overchargeType === 1) {
                if (goods.length === 1) {
                  present = goods[0];
                } else if (goods.length > 1) {
                  present = goods.reduce((previousValue, currentValue, currentIndex) => {
                    return `${previousValue},${currentValue}`
                  })
                }

              } else if (rowData.overchargeType === 2) {
                let goodsStr = '';
                if (goods.length === 1)
                {
                  goodsStr = goods[0];
                }
                else if (goods.length > 1)
                {
                  goodsStr = goods.reduce((previousValue, currentValue, currentIndex) => {
                    return `${previousValue},${currentValue}`
                  })
                }
                if (goodsStr.length === 0)
                {
                  present = `${rowData.overed}元`
                }
                else if (goodsStr.length > 0)
                {
                  present = `${rowData.overed}元` +`${goodsStr}`
                }
              }
              if (rowIndex < (vm.packagedParams.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              html = `<span class="v-table-popover-content" data-content="${present}" data-placement="${placement}" data-trigger="hover" data-toggle="popover"  >${present}</span>`;
              return html;}
            },
          {field: 'effective', title: '时间限制', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,formatter: (rowData, rowIndex) => {
              let effective ,html, placement,name;
              if (rowData.effectiveTime===0){
                effective = '无限制'
              } else {
                  effective = `每月${rowData.limitDays}`;
                }

              if (rowIndex < (vm.packagedParams.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              html = `<span class="v-table-popover-content" data-content="${effective}" data-placement="${placement}" data-trigger="hover" data-toggle="popover"  >${effective}</span>`;
              return html ;
            }},
          {field: {name: 'enabled', valueKey: 'enabled', callback: this.togglePackageStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'time ', title: '生效时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,formatter: (rowData, rowIndex) => {
            let time ,html, placement;
              if (rowData.beginTime===null){
                return null
              } else {
              time  = `${moment(rowData.beginTime).format('YYYY-MM-DD')} 至 ${moment(rowData.endTime).format('YYYY-MM-DD')}`;
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
      clickAddPackaged() {
        this.$router.push({
          name: 'add-package'
        })
      },
      clickDeletePackaged() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deletePackaged();
        }
      },
      deleteOnePackaged( params) {
        this.delIds = [];
        this.delIds.push(params.rowData.id)
        deletePackaged();
      },

      selectPackaged(selection) {
        // console.log("))))))))))))", selection)
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },
      togglePackageStatus(params) {
        const rowData = params.rowData;
        let url = rowData[params.valueKey] === false ? `/api/overcharge-rule/enable/${rowData.id}` : `/api/overcharge-rule/forbid/${rowData.id}`;
        PATCH(url)
          .done(() => {
            vm.packageds[params.index][params.valueKey] = !vm.packageds[params.index][params.valueKey];
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
      getAllPackaged();
      // subscribe('delete.table.operate.packaged', this.deleteOnePackaged)
      console.log(this.$route)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>
