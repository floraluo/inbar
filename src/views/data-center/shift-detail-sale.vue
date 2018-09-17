<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>

    <div class="detail-panel definite">
      <div class="detail-panel-title">
        <span class="name">销售统计</span>
      </div>
      <div class="detail-panel-body">
        <div class="title">
          <strong class="total">总计：<span>￥{{goodsSales.total}}</span></strong>
          <span class="time">时间：</span>
        </div>
        <div class="content row">
          <div class="col-xs-12 col-sm-6 col-md-3 item"><label>现金：</label><span>{{goodsSales.cash}}</span></div>
          <div class="col-xs-12 col-sm-6 col-md-3 item"><label>银联卡：</label><span>{{goodsSales.unionpay}}</span></div>
          <div class="col-xs-12 col-sm-6 col-md-3 item"><label>会员现金：</label><span>{{goodsSales.account}}</span></div>
          <div class="col-xs-12 col-sm-6 col-md-3 item"><label>会员赠送金：</label><span>{{goodsSales.restrictedAccount}}</span></div>
          <div class="col-xs-12 col-sm-6 col-md-3 item"><label>员工卡：</label><span>{{goodsSales.stuffCard}}</span></div>
          <div class="col-xs-12 col-sm-6 col-md-3 item"><label>线上扣款：</label><span>{{goodsSales.online}}</span></div>
          <div class="col-xs-12 col-sm-6 col-md-3 item"><label>第三方：</label><span>{{goodsSales.thirdparty}}</span></div>
          <div class="col-xs-12 col-sm-6 col-md-3 item"><label>门店赠送：</label><span>{{goodsSales}}</span></div>
        </div>
      </div>
    </div>
    <div class="detail-panel definite">
      <div class="detail-panel-title">
        <span class="name">销售明细</span>
      </div>
      <div class="detail-panel-body">
        <ul class="nav nav-tabs" role="tablist">
          <li :class="{active: detailListType === 1}" role="presentation" @click="switchType(1)"><a href="javascript:;">门店销售商品清单</a></li>
          <li :class="{active: detailListType === 2}" role="presentation" @click="switchType(2)"><a href="javascript:;">门店赠送商品清单</a></li>
        </ul>
        <div class="content row">
          <div class="table-box">
            <div class="left-table-box">
              <v-table ref="summaryTable" is-horizontal-resize
                       is-vertical-resize
                       style="width:100%"
                       row-hover-color="#eee"
                       row-click-color="#edf7ff"
                       title-bg-color="#f0f2f9"
                       :title-row-height="52"
                       :height="455"
                       :min-height="455"
                       :title-rows="summaryTable.titleRows"
                       :columns="summaryTable.columns"
                       :table-data="summaryTable.data"
                       :footer="summaryTable.footer"></v-table>
            </div>
            <div class="right-table-box">
              <v-table ref="listTable" is-horizontal-resize
                       is-vertical-resize
                       style="width:100%"
                       row-hover-color="#eee"
                       row-click-color="#edf7ff"
                       title-bg-color="#f0f2f9"
                       :title-row-height="52"
                       :is-loading="tableLoading"
                       :height="455"
                       :min-height="455"
                       :columns="listTable.columns"
                       :table-data="listTable.data"
                       :show-vertical-border="false"></v-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {GET} from '../../core/http'
  import store from '@/core/store'

  let vm;
  export default {
    name: 'shift-detail-sale',
    data () {
      return {
        inbarId: null,
        tableLoading: false,
        goodsSales: {},
        detailListType: 1,
        summaryTable: {
          data: [],
          titleRows: [
            [{fields: ['name', 'count', 'amount'], title: '销售汇总', titleAlign: 'center', colspan: 3}]
          ],
          columns: [
            {field: 'name', width: 125, columnAlign: 'center'},
            {field: 'count', width: 90, columnAlign: 'center'},
            {field: 'amount', width: 100, columnAlign: 'center'}
          ],
          footer: [
            ['总计']
          ]
        },
        listTable: {
          data: [],
          columns: [
            {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
            {field: 'className', title: '商品分类', width: 125, titleAlign: 'center', columnAlign: 'center'},
            {field: 'goodsNumber', title: '商品编号', width: 90, titleAlign: 'center', columnAlign: 'center'},
            {field: 'goodsName', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center'},
            {field: 'quantity', title: '销售数量', width: 100, titleAlign: 'center', columnAlign: 'center'},
            {field: 'amount', title: '销售金额', width: 100, titleAlign: 'center', columnAlign: 'center'}
          ]
        }
      }
    },
    methods: {
      switchType(type) {
        this.detailListType = type;
        getSaleDetailList();
      }
    },
    created() {
      vm = this;
      this.inbarId = store.get('token').user_basic.inbarId
      GET(`/api/inbar/${vm.inbarId}/rota/${vm.$route.query.rotaId}/goods-sales`)
        .then(data => {
          vm.goodsSales = data;
        })
      getSaleDetailList();
    }
  }
  function getSaleDetailList () {
    let type;
    if (vm.detailListType === 1) {
      type = 'as-free'
    } else if (vm.detailListType === 2) {
      type = 'by-class'
    }
    GET(`/api/inbar/${vm.inbarId}/rota/${vm.$route.query.rotaId}/goods-sales/${type}`).then(data => {
      vm.listTable.data = data.goods;
      [].push.call(vm.summaryTable.data, data.suite, data.normal);
      [].push.call(vm.summaryTable.footer[0], data.quantity, data.amount);
      if (data.goods.length === 0) {
        vm.$refs['listTable'].resize();
      }
    })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/shift-detail";
</style>
