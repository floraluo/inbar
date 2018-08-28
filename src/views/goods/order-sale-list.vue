<template>
  <div class="page-main" >
    <div class="page-main-top">
      <ul class="nav nav-tabs" role="tablist">
        <li :class="{active: listType === 1}" role="presentation"><a href="javascript:;" @click="listType = 2">订单</a></li>
        <li :class="{active: listType === 2}" role="presentation"><a href="javascript:;" @click="listType = 1">退单</a></li>
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
    <div class="paging" v-if="areaList.totalPage > 1">
      <v-pagination :total="areaList.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order-sale-list',
    data () {
      return {
        listType: 1,
        tableLoading: false,
        orderList: [],
        orderColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'orderSn', title: '订单号', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsName', title: '商品/套餐名称', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'buyerName', title: '购买用户', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              return `${rowData.buyerName}/${rowData.buyerName}`
            }
          },
          {field: 'goodsName', title: '数量', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'orderAmount', title: '订单金额', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'paymentName', title: '支付方式', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'operatedBy', title: '收银员', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'remark', title: '备注', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'orderState', title: '状态', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'finnshedTime', title: '时间', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
            return moment(rowData.finnshedTime).format('YYYY-MM-DD HH-mm')
            }
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
