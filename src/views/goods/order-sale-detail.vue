<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="order-number-bar">
      <span class="number">订单号：BHD860986987</span>
      <span class="button"><i class="iconfont icon-daochu"></i>导出</span>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">订单信息</div>
      <div class="order-panel-body">
        <div class="row">
          <div class="col-xs-4">订单状态：<span>asdkf</span></div>
          <div class="col-xs-4">成交时间：<span>asdkf</span></div>
          <div class="col-xs-4">订单金额：<span>asdkf</span></div>
          <div class="col-xs-4">支付方式：<span>asdkf</span></div>
        </div>
      </div>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">客户信息</div>
      <div class="order-panel-body">
        <div class="row">
          <div class="col-xs-4">会员卡号：<span>asdkf</span></div>
          <div class="col-xs-4">　机器号：<span>asdkf</span></div>
          <div class="col-xs-4">会员姓名：<span>asdkf</span></div>
          <div class="col-xs-4">会员等级：<span>asdkf</span></div>
        </div>
      </div>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">商品清单</div>
      <div class="order-panel-body">
        <v-table is-horizontal-resize
                 is-vertical-resize
                 style="width:100%"
                 row-hover-color="#fff"
                 row-click-color="#fff"
                 title-bg-color="#f5f5f5"
                 :title-row-height="40"
                 :is-loading="tableLoading"
                 :height="455"
                 :min-height="455"
                 :columns="columns"
                 :table-data="orderList"
                 :show-vertical-border="false"></v-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {publish} from 'pubsub-js'

  export default {
    name: 'order-detail',
    data() {
      return {
        tableLoading: false,
        orderType: '',
        columns: [
          {field: '', title: '商品', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'goodsName', title: '编号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsName', title: '单价', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsName', title: '数量', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsName', title: '小计', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true}
        ],
        orderList: []
      }
    },
    created() {
      const params = this.$route.params
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '订单详情'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/order-detail";
</style>
