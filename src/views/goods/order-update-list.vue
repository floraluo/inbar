<template>
  <div class="page-main">
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
             :columns="orderColumns"
             :table-data="orderList"
             :show-vertical-border="false"></v-table>
    <div class="paging" v-if="orderPage.totalPage > 1">
      <v-pagination :total="orderPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import moment from 'moment'
  import {GET} from '../../core/http'

  let vm;
  export default {
    name: 'order-update-list',
    data () {
      return {
        listType: 1,
        tableLoading: false,
        orderPage: {
          totalPage: 0,
          amount: 0
        },
        orderListParams: {
          page: 0,
          size: 10,
          type: 1
        },
        orderList: [],
        orderColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'orderNumber', title: '订单号', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              return `<a href="javascript:;" class="j-to-detail" data-no="${rowData.orderNumber}">${rowData.orderNumber}</a>`
            }
          },
          {field: 'createTime', title: '补货时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              return rowData.createTime ? moment(rowData.createTime).format('YYYY-MM-DD HH:mm') : '--'
            }
          },
          {field: 'goodsNum', title: '商品总数', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'amount', title: '补货总支出', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'operatedBy', title: '操作人', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'remark', title: '备注', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              return rowData.remark || '--'
            }
          }
        ]
      }
    },
    methods: {
      pageChange(pageIndex) {
        vm.orderListParams.page = pageIndex - 1;
        getAllOrder();
      },
      pageSizeChange(newPageSize) {
        vm.orderListParams.size = newPageSize;
        getAllOrder();
      }
    },
    created() {
      vm = this;
      getAllOrder();
    },
    updated() {
      $('.j-to-detail').on('click', function () {
        let orderNo = $(this).data('no');
        vm.$router.push({name: 'order-update-detail', params: {number: orderNo}})
      })
    }
  }

  function getAllOrder () {
    vm.tableLoading = true;
    GET('/api/order/getProducersStockOrder', vm.orderListParams)
      .then((data) => {
        vm.tableLoading = false;
        vm.orderPage.totalPage = data.totalPages;
        vm.orderPage.amount = data.totalElements;
        vm.orderList = data.content
      })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";
</style>
