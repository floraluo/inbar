<template>
  <div class="page-main" >
    <div class="page-main-top">
      <ul class="nav nav-tabs" role="tablist">
        <li :class="{active: listType === 1}" role="presentation"><a href="javascript:;" @click="filterOrder(1)">订单</a></li>
        <li :class="{active: listType === 2}" role="presentation"><a href="javascript:;" @click="filterOrder(2)">退单</a></li>
      </ul>
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
    name: 'order-sale-list',
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
          orderState: 1 //0.(已取消);1(默认):未付款;2:已付款(订单已完成);3已退单
        },
        orderList: [],
        orderColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'orderSn', title: '订单号', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              return `<a href="javascript:;" class="j-to-detail" data-no="${rowData.orderSn}">${rowData.orderSn}</a>`
            }
          },
          {field: 'name', title: '商品/套餐名称', width: 160, titleAlign: 'center', columnAlign: 'left', isResize: true,
            formatter: (rowData, rowIndex) => {
              let html, placement;
              if (!rowData.name) return '';
              if (rowIndex < (vm.orderListParams.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              html = `<span class="v-table-popover-content" data-content="${rowData.name.join(',')}" data-placement="${placement}" data-trigger="hover" data-toggle="popover"  >${rowData.name.join(',')}</span>`;
              return html;
            }
          },
          {field: 'nameANdIdCard', title: '购买用户', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              let idCard;
              if (rowData.idCard) {
                idCard = rowData.idCard.substring(0, 6) + '****' + rowData.idCard.substring(-1, 4);
                return `${rowData.buyerName} / ${idCard}`
              } else {
                return '--'
              }
            }
          },
          {field: 'num', title: '数量', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'orderAmount', title: '订单金额', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'paymentName', title: '支付方式', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'operatedBy', title: '收银员', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'remark', title: '备注', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
            return rowData.remark || '--'
            }
          },
          {field: 'orderState', title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              let stateName;
              switch (rowData.orderState) {
                case 1:
                case 2: {
                  stateName = '可退单';
                  break;
                }
                case 4: {
                  stateName = '不可退单';
                  break;
                }
                case 3: {
                  stateName = '已退单';
                  break
                }
              }
              return stateName;
            }
          },
          {field: 'finnshedTime', title: '时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              return rowData.finnshedTime ? moment(rowData.finnshedTime).format('YYYY-MM-DD HH-mm') : '--'
            }
          }
        ]
      }
    },
    methods: {
      filterOrder(type) {
        this.listType = type;
        this.orderListParams.orderState = type === 1 ? 1 : 3;
        getAllOrder();
      },
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
      this.orderList.push({
        "orderSn": 201835444132090100,
        "buyerName": null,
        "orderAmount": 0,
        "paymentName": "无",
        "operatedBy": "测试店长",
        "remark": null,
        "finnshedTime": null,
        "orderState": 1
      })
    },
    updated() {
      $('.j-to-detail').on('click', function () {
        let orderNo = $(this).data('no');
        vm.$router.push({name: 'order-sale-detail', query: {number: orderNo}})
      })
      $('.v-table-body-class [data-toggle="popover"]').popover();
    }
  }

  function getAllOrder () {
    vm.tableLoading = true;
    GET('/api/order/queryAll', vm.orderListParams)
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
