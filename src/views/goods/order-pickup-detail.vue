<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="order-number-bar">
      <span class="number">{{orderTypeName}}单号：BHD860986987</span>
      <span class="button"><i class="iconfont icon-daochu"></i>导出</span>
    </div>
    <div class="order-panel">
      <div class="order-panel-title">订单信息</div>
      <div class="order-panel-body">
        <div class="row">
          <div class="col-xs-4">操作人：<span>asdkf</span></div>
          <div class="col-xs-4">补货数量：<span>asdkf</span></div>
          <div class="col-xs-4">备注信息：<span>asdkf</span></div>
          <div class="col-xs-4">订单时间：<span>asdkf</span></div>
          <div class="col-xs-4">补货总额：<span>asdkf</span></div>
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
        columns: [],
        orderList: []
      }
    },
    computed: {
      orderTypeName() {
        return factory(this.orderType, 'setTypeName');
      }
    },
    created() {
      const params = this.$route.params
      // this.orderType = params.type;
      this.orderType = 'sale';
      this.columns = factory(this.orderType, 'setColumn')
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '订单详情'},
        toggleMenubar: false
      })
    }
  }
  const saleColumns = [];
  const updateColumns = [];
  const pickupColumns = [];
  function factory (type, operate, callback) {
    switch (type) {
      case 'sale': {
        if (operate === 'setTypeName') {
          return '销售'
        } else if (operate === 'setColumn') {
          return saleColumns;
        }
        break;
      }
      case 'update': {
        if (operate === 'setTypeName') {
          return '补货'
        } else if (operate === 'setColumn') {
          return updateColumns;
        }
        break;
      }
      case 'pickup': {
        if (operate === 'setTypeName') {
          return '提货'
        } else if (operate === 'setColumn') {
          return pickupColumns;
        }
        break;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/order-detail";
</style>
