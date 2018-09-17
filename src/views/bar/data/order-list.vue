<template>
  <div class="page-content">
    <div class="page-main">
      <div class="page-main-top">
        <div class="form-inline">
          <div class="form-group">
            <label>请选择时间：</label>
            <date-picker v-model="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>
            --
            <date-picker v-model="filter.until" :not-before="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" type="button">查询</button>
          </div>
        </div>
        <!--<div class="btn-operate-group">-->
          <!--<button class="btn btn-primary" @click=""><i class="iconfont icon-add"></i>查看</button>-->
          <!--<button class="btn btn-primary" @click=""><i class="iconfont icon-close"></i>完成</button>-->
        <!--</div>-->
      </div>


      <div class="table-box">
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
                 :table-data="orders"
                 :select-all="selectOrderInTable"
                 :select-group-change="selectOrderInTable"
                 :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
      </div>
      <div class="paging" v-if="orderPage.totalPage > 1">
        <v-pagination :total="orderPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>

      <!--查看订单-->
      <div class="layer-open layer-check-order" id="layerCheckOrder">
        <div class="form-inline">
          <div class="row">
            <div class="col-xs-6"><div class="form-group"><label>会员卡号：</label><input type="text" class="form-control" disabled :value="rowData.idCard || '--'"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>客户姓名：</label><input type="text" class="form-control" disabled :value="rowData.buyerName || '--'"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>机器号：</label><input type="text" class="form-control" disabled :value="rowData.computerNumber || '--'"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>支付时间：</label><input type="text" class="form-control" disabled :value="rowData.paymentTime|formatTime('YYYY-MM-DD HH:mm')"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>支付方式：</label><input type="text" class="form-control" disabled :value="rowData.paymentName"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>订单金额：</label><input type="text" class="form-control" disabled :value="rowData.orderAmount"></div></div>
            <div class="col-xs-12"><label>购买商品：</label><textarea type="text" class="form-control" rows="3" disabled :value="theOrderGoodsList"></textarea></div>
          </div>
        </div>
        <div class="form-group layer-btn-operate-group">
          <button class="btn btn-primary" @click="cancelLayer">关闭</button>
          <!--<button class="btn btn-primary" @click="submit">保存</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import layer from '../../../../static/vendor/layer/layer'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import {GET, POST} from '../../../core/http'

  let vm
  export default {
    name: 'order-list',
    components: {DatePicker},
    data () {
      return {
        layerId: null,
        filter: {
          since: '',
          until: ''
        },
        tableLoading: false,
        selectedOrder: null,
        orders: [],
        orderListParams: {
          page: 0,
          size: 10
        },
        orderPage: {
          totalPage: 0,
          amount: 0
        },
        orderColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          // {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'idCard', title: '卡号', width: 110, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) {
              if (rowData[field]) {
                return `${rowData[field].substr(0, 6)}****${rowData[field].substr(-4)}`;
              } else {
                return '--'
              }
            }},
          {field: 'buyerName', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return rowData[field] || '--' }},
          {field: 'computerNumber', title: '机器号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsVoList', title: '购买商品', width: 150, titleAlign: 'center', columnAlign: 'left', isResize: true,
            formatter: (rowData, rowIndex) => {
              let goodsList = '', html;
              if (Array.isArray(rowData.goodsVoList)) {
                rowData.goodsVoList.forEach(item => {
                  goodsList = `${goodsList}、${item.num}*${item.goodsName}`
                })
                goodsList = goodsList.replace(/^、/, '');
                if (goodsList.length > 10) {
                  let placement;
                  if (rowIndex < (vm.orders.length / 2)) {
                    placement = 'bottom';
                  } else {
                    placement = 'top';
                  }
                  return `<span class="v-table-popover-content" data-content="${goodsList}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${goodsList}</span>`;
                }
              }
              return goodsList;
            }
          },
          {field: 'orderAmount', title: '金额', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'paymentName', title: '支付方式', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'paymentTime', title: '支付时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return rowData[field] ? moment(rowData[field]).format('YYYY-MM-DD HH:mm') : '--' }},
          {field: 'remark', title: '备注说明', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData, rowIndex) => {
              let remark = rowData.remark;
              if (remark) {
                if (remark.length > 10) {
                  let placement;
                  if (rowIndex < (vm.orders.length / 2)) {
                    placement = 'bottom';
                  } else {
                    placement = 'top';
                  }
                  return `<span class="v-table-popover-content" data-content="${remark}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${remark}</span>`;
                } else {
                  return remark;
                }
              } else {
                return '--';
              }
            }
          },
          {field: 'orderState', title: '状态', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              switch (rowData.orderState) {
                case 1:
                case 2: {
                  return `<span class="table-tag orange">可以退单</span>`
                }
              }
            }
          },
          {field: [
              {name: '查看', callback: this.openCheckOrderLayer},
              {name: '完成', callback: this.finishTheOrder}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
        rowData: {}
      }
    },
    computed: {
      theOrderGoodsList() {
        let goodsList = this.rowData.goodsVoList, goods = '';
        if (goodsList && Array.isArray(goodsList)) {
          goodsList.forEach(item => {
            goods = `${goods}、${item.num}*${item.goodsName}`
          })
          goods = goods.replace(/^、/, '')
          return goods;
        } else {
          return '--'
        }
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      selectOrderInTable(section) {
        this.selectedOrder = section;
      },
      openCheckOrderLayer(params) {
        this.rowData = params.rowData;
        this.layerId = layer.open({
          type: 1,
          title: '查看订单',
          area: ['560px', '420px'],
          content: $('#layerCheckOrder')
        })
      },
      finishTheOrder(params) {
        // this.delIds = [];
        // this.delIds.push(params.rowData.id)
        layer.confirm('是否要完成订单', {
          icon: 8,
          btn: ['是', '否']
        }, function (index) {
          POST('/api/order/finishOrder', {orderSn: params.rowData.orderSn})
            .then(() => {
              vm.orders.splice(params.index, 1);
              layer.msg('订单操作已完成')
            });
          layer.close(index);
        }, function (index) {
          layer.close(index);
        })
      },
      pageChange(pageIndex) {
        this.orderListParams.page = pageIndex - 1;
        getAllOrder();
      },
      pageSizeChange(newPageSize) {
        this.orderListParams.size = newPageSize;
        getAllOrder();
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created () {
      vm = this
      getAllOrder();
    }
  }
  function getAllOrder () {
    vm.tableLoading = true;
    GET('/api/order/selectUnOrders', vm.orderListParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.orderPage.totalPage = data.totalPages;
        vm.orderPage.amount = data.totalElements;
        vm.orders = data.content;
      })
  }
</script>

<style scoped lang='scss'>
  @import "../../../sass/base-cashier";
.layer-check-order{
  label{
    width: 5em;
    text-align: right;
  }
  .form-control{
    width: calc(100% - 5em);
  }
}
</style>
