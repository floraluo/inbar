<template>
<div class="page-main">
  <div class="btn-operate-group" v-if="goods.length > 0">
    <button class="btn btn-primary" @click="batchUpdateGoods"><i class="iconfont icon-close"></i>仓库补货</button>
    <button class="btn btn-primary" @click="batchInbarUpdateGoods" v-if="annunciator.barEnabled"><i class="iconfont icon-close"></i>吧台提货</button>
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
           :error-content="'没有库存，请到仓库补货中添加商品库存'"
           :columns="goodsColumns"
           :table-data="goods"
           :select-all="selectGoods"
           :select-group-change="selectGoods"
           :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
  <div class="paging" v-if="goodsPage.totalPage > 1">
    <v-pagination :total="goodsPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
  </div>
</div>
</template>

<script>
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm;
  export default {
    name: 'repertory-list',
    data() {
      return {
        tableLoading: false,
        selectedUpdate: [],
        annunciator: {
          barValue: null,
          centerValue: null,
          enabled: null,
          barEnabled: null
        },
        goods: [],
        goodsParams: {
          page: 0,
          size: 10
        },
        goodsPage: {
          totalPage: 0,
          amount: 0
        },
        goodsColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'goodsName', title: '商品名称', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'gcName', title: '所属类别', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsNumber', title: '仓库库存', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              // return `${rowData['goodsNumber']}<i class="iconfont icon-annunciator dynamic"></i>`;
              if (rowData.annunciator.enabled && rowData.annunciator.centerValue >= rowData['goodsNumber']) {
                return `<span style="position: relative;">${rowData['goodsNumber']}<i class="iconfont icon-annunciator dynamic"></i></span>`;
              } else {
                return rowData['goodsNumber'];
              }
            }
          },

          {field: 'supplyDate', title: '上次补货时间', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData) => { return rowData.supplyDate ? moment(rowData.supplyDate).format('YYYY-MM-DD HH:mm') : '--' }},
          {field: [
              {name: '补货', type: "buhuo", callback: this.buGoods}
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
      batchUpdateGoods() {
        if (this.selectedUpdate.length === 0) {
          layer.msg('至少选择一个需要补货的商品')
        } else {
          gotoRepertoryUpdate();
        }
      },
      batchInbarUpdateGoods() {
        if (this.selectedUpdate.length === 0) {
          layer.msg('至少选择一个需要提货的商品')
        } else {
          gotoRepertoryInbarUpdate();
        }
      },
      selectGoods(selection) {
        this.selectedUpdate = selection;
      },
      buGoods(params) {
        this.selectedUpdate[0] = params.rowData;
        gotoRepertoryUpdate()
      },
      tiGoods(params) {
        this.selectedUpdate[0] = params.rowData;
        gotoRepertoryInbarUpdate()
      },
      pageChange(pageIndex) {
        vm.goodsParams.page = pageIndex - 1;
        getAllGoods();
      },
      pageSizeChange(newPageSize) {
        vm.goodsParams.size = newPageSize;
        getAllGoods();
      }
    },
    created() {
      vm = this;
      getAnnunciator().then(() => {
        getAllGoods();
      });
      // subscribe('buhuo.table.operate.repertory', this.buGoods)
      // subscribe('tihuo.table.operate.repertory', this.tiGoods)
      // subscribe('click.switch.setComputer', this.rowData.id)
    }
  }

  function getAllGoods () {
    // await getAnnunciator().catch((error) => { throw new Error(error) })
    vm.tableLoading = true;
     GET('/api/stock/goodsStock/queryProducersStock', vm.goodsParams)
      .then((data) => {
        vm.tableLoading = false;
        vm.goodsPage.totalPage = data.totalPages;
        vm.goodsPage.amount = data.totalElements;
        vm.goods = data.content.map(item => {
          return Object.assign({annunciator: vm.annunciator}, item);
        });
      })
  }
  async function getAnnunciator () {
    return GET('/api/stock/goodsStock')
      .then(data => {
        vm.annunciator.barValue = data.barWarningValue;
        vm.annunciator.centerValue = data.centerWarningValue;
        vm.annunciator.enabled = !!data.isEnableWarning;
        vm.annunciator.barEnabled = !!data.isEnabledBar;
        if (vm.annunciator.barEnabled) {
          vm.goodsColumns.splice(5, 0, {field: 'goodsNumberB', title: '吧台库存', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              const amount = rowData['goodsNumberB'] || 0;
              // return `${rowData['goodsNumber']}<i class="iconfont icon-annunciator dynamic"></i>`;
              if (rowData.annunciator.enabled && rowData.annunciator.barValue >= amount) {
                return `<span style="position: relative;">${amount}<i class="iconfont icon-annunciator dynamic"></i></span>`;
              } else {
                return amount;
              }
            }
          })
          vm.goodsColumns[vm.goodsColumns.length - 1].field = [
            {name: '补货', type: "buhuo", callback: vm.buGoods},
            {name: '提货', type: "tihuo", callback: vm.tiGoods}
          ];
        }
      })
  }
  function gotoRepertoryUpdate () {
    vm.$router.push({
      name: 'repertory-update',
      params: {
        goods: vm.selectedUpdate
      }
    })
  }
  function gotoRepertoryInbarUpdate () {
    vm.$router.push({
      name: 'repertory-inbar-update',
      params: {
        goods: vm.selectedUpdate
      }
    })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";
</style>
