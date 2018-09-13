<template>
  <div class="page-main">
    <div class="form-inline">
      <div class="form-group">
        <label @click="xx">请选择时间：</label>
        <date-picker v-model="filter.startTime" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>
        --
        <date-picker v-model="filter.endTime" :not-before="filter.startTime" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
      </div>
      <div class="form-group">
        <label>状态：</label>
        <div class="form-select">
          <multiselect
            value="value"
            v-model="status"
            label="name"
            placeholder="请选择"
            track-by="value"
            @input="updateSelectedStatus"
            :maxHeight="200"
            :showLabels="false"
            :close-on-select="true"
            :searchable="false"
            :allow-empty="true"
            :options="statusList">
          </multiselect>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="filterList">查询</button>
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
               :columns="refundColumns"
               :table-data="refunds"
               :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
    </div>
    <div class="paging" v-if="refundPage.totalPage > 1">
      <v-pagination :total="refundPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>

    <!--销售退单-->
    <div class="layer-open" id="saleRefundLayer">
      <div class="form-inline">
        <div class="row">
          <div class="col-xs-6 form-group"><label>充值单号：</label><input :value="rowData.orderSn" type="text" class="form-control" disabled></div>
          <div class="col-xs-6 form-group"><label>会员卡号：</label><input :value="rowData.idCard || '--'" type="text" class="form-control" disabled style="color: #0191fa"></div>

          <div class="col-xs-6 form-group"><label>机器号：</label><input :value="rowData.computerNumber" type="text" class="form-control" disabled></div>
          <div class="col-xs-6 form-group"><label>金额：</label><input :value="rowData.payAmout" type="text" class="form-control" disabled></div>

          <div class="col-xs-6 form-group"><label>收银员：</label><input :value="rowData.operatedBy" type="text" class="form-control" disabled></div>
          <div class="col-xs-6 form-group"><label>结账时间：</label><input :value="rowData.finnshedTime | formatTime('YYYY-MM-DD')" type="text" class="form-control" disabled></div>

          <div class="col-xs-6 form-group"><label>备注说明：</label><textarea :value="rowData.remark" disabled cols="30" rows="5" class="form-control"></textarea></div>
          <div class="col-xs-6 form-group"><label>退款说明：</label><textarea :value="rowData.refundRemark"  disabled cols="30" rows="5" class="form-control"></textarea></div>
        </div>
      </div>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">关闭</button>
        <button class="btn btn-danger" @click="checkRefund(6)">不通过</button>
        <button class="btn btn-primary" @click="checkRefund(7)">通过</button>
      </div>
    </div>
    <!--充值退单-->
    <!--<div class="layer-box">-->
      <div class="layer-open" id="rechargeRefundLayer">
        <div class="form-horizontal">
          <div class="row">
            <div class="col-xs-6 form-group"><label>充值单号：</label><input :value="rowData.orderSn" type="text" class="form-control" disabled></div>
            <div class="col-xs-6 form-group"><label>会员卡号：</label><input :value="rowData.idCard" type="text" class="form-control" disabled style="color: #0191fa"></div>

            <div class="col-xs-6 form-group"><label>客户姓名：</label><input :value="rowData.name" type="text" class="form-control" disabled></div>
            <div class="col-xs-6 form-group"><label>会员类型：</label><input :value="rowData.scope" type="text" class="form-control" disabled></div>

            <div class="col-xs-6 form-group"><label>联系方式：</label><input :value="rowData.mobile" type="text" class="form-control" disabled></div>
            <div class="col-xs-6 form-group"><label>充值金额：</label><input :value="rowData.payAmout" type="text" class="form-control" disabled></div>

            <div class="col-xs-6 form-group"><label>赠送金额：</label><input :value="rowData.overed" type="text" class="form-control" disabled></div>
            <div class="col-xs-6 form-group"><label>赠送商品：</label><input :value="rowData.goodsVoList" type="text" class="form-control" disabled></div>
          </div>
        </div>
        <div class="form-group layer-btn-operate-group">
          <button class="btn btn-default" @click="cancelLayer">关闭</button>
          <button class="btn btn-danger" @click="checkRefund(6)">不通过</button>
          <button class="btn btn-primary" @click="checkRefund(7)">通过</button>
        </div>
      </div>
    <!--</div>-->
  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  // import 'layui-src/dist/layui.all'
  import Multiselect from 'vue-multiselect'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm
  export default {
    name: 'return',
    components: {DatePicker, Multiselect},
    data () {
      return {
        layerId: null,
        filter: {
          startTime: '',
          endTime: ''
        },
        status: null, //3已退单;5未审核;6未通过退款
        statusList: [{value: 5, name: '未审核'}, {value: 3, name: '已通过'}, {value: 6, name: '未通过'}],
        tableLoading: false,
        selectedRefund: null,
        refunds: [],
        refundListParams: {
          page: 0,
          size: 10
        },
        refundPage: {
          totalPage: 0,
          amount: 0
        },
        refundColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'refundName', title: '退款申请人', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'payAmout', title: '申请金额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'refundStart', title: '申请时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) {
              if (rowData[field]) {
                return moment(rowData[field]).format('YYYY-MM-DD HH:mm')
              } else {
                return '--'
              }
            }},
          {field: 'orderType', title: '相关事件', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              if (+rowData.orderType === 0) {
                return '销售退单'
              } else if (+rowData.orderType === 1) {
                return '充值退单'
              }
            }
          },
          {field: 'orderState', title: '相关事件', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              if (rowData.orderState === 3) {
                return '已退单'
              } else if (rowData.orderState === 5) {
                return '未审核'
              } else if (rowData.orderState === 6) {
                return '未通过'
              }
            }
          },
          {field: [
              {name: '审核', type: "modify", callback: this.openCheckRefundLayer}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
        rowData: {}
      }
    },
    methods: {
      xx() {
        layer.alert('888')
      },
      updateSelectedStatus(status) {
        // this.refundListParams.type = status.value;
      },
      filterList() {
        if (this.filter.startTime) {
          this.refundListParams.startTime = moment(this.filter.startTime).format('YYYY-MM-DDTHH-MM-ss')
        } else {
          delete this.refundListParams.startTime
        }
        if (this.filter.endTime) {
          this.refundListParams.endTime = moment(this.filter.endTime).format('YYYY-MM-DDTHH-MM-ss')
        } else {
          delete this.refundListParams.endTime
        }
        if (this.status) {
          this.refundListParams.type = this.status.value;
        }
        getAllRefund()
      },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      openCheckRefundLayer(params) {
        this.rowData = params.rowData;
        let title, $content;
        if (+this.rowData.orderType === 0) {
          title = '销售退单';
          $content = $('#saleRefundLayer')
        } else if (+this.rowData.orderType === 1) {
          title = '充值退单'
          $content = $('#rechargeRefundLayer')
        }
        this.layerId = layer.open({
          type: 1,
          title,
          area: ['710px', '420px'],
          content: $content
        })
      },
      checkRefund(type) {
        POST(`/api/order/auditingRefund?orderSn=${this.rowData.orderSn}&state=${type}`)
          .then(() => {
            layer.msg('审核成功');
          })
      },
      pageChange(pageIndex) {
        this.refundListParams.page = pageIndex - 1;
        getAllRefund();
      },
      pageSizeChange(newPageSize) {
        this.refundListParams.size = newPageSize;
        getAllRefund();
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },
    created () {
      vm = this
      getAllRefund();
    }
  }
  function getAllRefund () {
    vm.tableLoading = true;
    GET('/api/order/getRefund', vm.refundListParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.refundPage.totalPage = data.totalPages;
        vm.refundPage.amount = data.totalElements;
        vm.refunds = data.content;
      })
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .form-select{
    width: 100px;
    display: inline-block;
    vertical-align: middle;
  }
  .layer-open{
    .cl {
      clear: left;
    }
    .form-group{
      margin-left: 0;
      margin-right: 0;
    }
    label{
      float: left;
      width: 5em;
      text-align: right;
      padding-top: 5px;
      + .form-control {
        width: calc(100% - 5em);
      }
    }
  }
</style>
