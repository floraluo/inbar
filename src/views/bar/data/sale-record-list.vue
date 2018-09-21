<template>
  <div class="page-content">
    <div class="page-main">
      <div class="page-main-top">
        <div class="form-inline">
          <!--<div class="form-group">-->
            <!--<label>请选择时间：</label>-->
            <!--<date-picker v-model="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>-->
            <!--&#45;&#45;-->
            <!--<date-picker v-model="filter.until" :not-before="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>-->
          <!--</div>-->
          <!--<div class="form-group">-->
            <!--<button class="btn btn-primary" type="button">查询</button>-->
          <!--</div>-->
        </div>
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
                 :columns="saleRecordColumns"
                 :table-data="saleRecords"
                 :select-all="selectSaleRecordInTable"
                 :select-group-change="selectSaleRecordInTable"
                 :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
      </div>
      <div class="paging" v-if="saleRecordPage.totalPage > 1">
        <v-pagination :total="saleRecordPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>

      <!--退单-->
      <div class="layer-open layer-chargeback" id="layerChargeback">
        <div class="form-inline">
          <div class="row">
            <div class="col-xs-6"><div class="form-group"><label>会员卡号：</label><input type="text" class="form-control" disabled :value="rowData.idCard || '--'"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>订单状态：</label><input type="text" class="form-control" disabled :value="orderStateName"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>金额：</label><input type="text" class="form-control" disabled :value="rowData.payAmout || '--'"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>收银员：</label><input type="text" class="form-control" disabled :value="rowData.operatedBy || '--'"></div></div>
            <div class="col-xs-6"><div class="form-group"><label>结账时间：</label><input type="text" class="form-control" disabled :value="rowData.addTime|formatTime('YYYY-MM-DD HH:mm')"></div></div>
            <div class="col-xs-12 form-group"><label>备注说明：</label><input type="text" class="form-control" disabled :value="rowData.remark || '--'"></div>
            <div class="col-xs-12"><label>退款说明：</label><textarea type="text" class="form-control" rows="3" v-model="refundRemark"></textarea></div>
          </div>
        </div>
        <div class="form-group layer-btn-operate-group">
          <button class="btn btn-default" @click="cancelLayer">取消</button>
          <button class="btn btn-primary" @click="submitChargeback">确认</button>
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
    name: 'sale-record-list',
    components: {DatePicker},
    data () {
      return {
        layerId: null,
        filter: {
          since: '',
          until: ''
        },
        tableLoading: false,
        selectedSaleRecord: null,
        saleRecords: [],
        saleRecordListParams: {
          page: 0,
          size: 10
        },
        saleRecordPage: {
          totalPage: 0,
          amount: 0
        },
        saleRecordColumns: [
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
          {field: 'payAmout', title: '金额', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          // {field: 'goodsVoList', title: '购买商品', width: 150, titleAlign: 'center', columnAlign: 'left', isResize: true,
          //   formatter: (rowData, rowIndex) => {
          //     let goodsList = '', html;
          //     if (Array.isArray(rowData.goodsVoList)) {
          //       rowData.goodsVoList.forEach(item => {
          //         goodsList = `${goodsList}、${item.num}*${item.goodsName}`
          //       })
          //       goodsList = goodsList.replace(/^、/, '');
          //       if (goodsList.length > 10) {
          //         let placement;
          //         if (rowIndex < (vm.saleRecords.length / 2)) {
          //           placement = 'bottom';
          //         } else {
          //           placement = 'top';
          //         }
          //         return `<span class="v-table-popover-content" data-content="${goodsList}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${goodsList}</span>`;
          //       }
          //     }
          //     return goodsList;
          //   }
          // },
          // {field: 'paymentName', title: '支付方式', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'addTime', title: '结账时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return rowData[field] ? moment(rowData[field]).format('YYYY-MM-DD HH:mm') : '--' }},
          {field: 'operatedBy', title: '收银员', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'remark', title: '备注说明', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData, rowIndex) => {
              let remark = rowData.remark;
              if (remark) {
                if (remark.length > 10) {
                  let placement;
                  if (rowIndex < (vm.saleRecords.length / 2)) {
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
                case 3: return `<span class="table-tag orange">已经退单</span>`
                case 1:
                case 2:
                case 4: return `<span class="table-tag green">可以退单</span>`
                case 5: return `<span class="table-tag orange">未审核</span>`
                case 6: return `<span class="table-tag red">不可退单</span>`
              }
            }
          },
          {field: [
              {name: '退单', callback: this.chargebackTheSaleRecord}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
        rowData: {},
        refundRemark: ''
      }
    },
    computed: {
      orderStateName() {
        let orderState = this.rowData.orderState;
        switch (orderState) {
          case 1: return '未付款'
          case 2: return '已付款'
          case 3: return '已退单'
          case 4: return '订单完成'
          case 5: return '未审核'
          case 6: return '退单审核未通过'
        }
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      selectSaleRecordInTable(section) {
        this.selectedSaleRecord = section;
      },
      chargebackTheSaleRecord(params) {
        this.rowData = params.rowData;
        this.layerId = layer.open({
          type: 1,
          title: '退单',
          area: ['560px', '420px'],
          content: $('#layerChargeback')
        })
      },
      submitChargeback() {
        POST(`/api/order/applyRefund?orderSn=${this.rowData.orderSn}&refundRemark=${this.refundRemark}`)
          .then(() => {
            vm.cancelLayer();
            layer.msg('退单申请已提交');
            getAllSaleRecord() //submitChargeback
          })
      },
      pageChange(pageIndex) {
        this.saleRecordListParams.page = pageIndex - 1;
        getAllSaleRecord();
      },
      pageSizeChange(newPageSize) {
        this.saleRecordListParams.size = newPageSize;
        getAllSaleRecord();
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
      getAllSaleRecord();
    }
  }
  function getAllSaleRecord () {
    vm.tableLoading = true;
    GET('/api/order/selectByDatePage', vm.saleRecordListParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.saleRecordPage.totalPage = data.totalPages;
        vm.saleRecordPage.amount = data.totalElements;
        vm.saleRecords = data.content;
      })
  }
</script>

<style scoped lang='scss'>
  @import "../../../sass/base-cashier";
  .layer-chargeback{
    label{
      width: 5em;
      text-align: right;
    }
    .form-control{
      width: calc(100% - 5em);
    }
  }
</style>
