<template>
  <div class="page-content">
    <div class="bar-left-container1 col-xs-4 ">
      <!--时间查询-->
      <div class=" panel inquiry-box ">
        <div class=" col-xs-12 padding-bottom-20" >
          <label class="control-label col-xs-4"  >会员卡号：</label>
          <div class="col-xs-7">
            <input type="text" class="form-control"  v-model="searchCardNum"  placeholder="请输入">
          </div>
        </div>
        <div class="col-xs-12 padding-bottom-20 ">
          <label class="control-label col-xs-4"   >开始时间：</label>
          <div class="col-xs-7">
            <date-picker v-model="filter.since" :width="'100%'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>
          </div>
        </div>
        <div class="col-xs-12 padding-bottom-20">
          <label class="control-label col-xs-4"  >结束时间：</label>
          <div class="col-xs-7">
            <date-picker v-model="filter.until" :not-before="filter.since" :width="'100%'" :editable="true" :format="'YYYY-MM-DD'"  placeholder="结束时间"></date-picker>
          </div>
        </div>
        <div class="text-center  ">
          <button type="submit" class="btn  btn-success btn-long margin-right-25 "  @click="resetCardNum">重置</button>
          <button type="submit" class="btn  btn-primary btn-long"  @click="searchActiveMember">查询</button>
        </div>
      </div>

      <!--会员信息-->
      <div class="panel panel-card-info ">
        <p class="title">会员信息</p>
        <p class="number">卡号：{{member.memberId || '--'}}</p>
        <ul class="detail clearfix">
          <li >姓名：<span>{{member.name || '--'}}</span></li>
          <li >手机号码：<span>{{member.mobile || '--'}}</span></li>
          <li>总额：<span>{{!member.cash && member.cash != 0 ? '--' : member.cash}}</span></li>
          <li>储值：<span>{{!member.coins && member.coins != 0 ? '--' : member.coins}}</span></li>
          <li>积分：<span>{{!member.coins && member.coins != 0 ? '--' : member.coins}}</span></li>
          <li>类型：<span>{{member.scopeLabel || '--'}}</span></li>
          <li>现金：<span>{{!member.cash && member.cash != 0 ? '--' : member.cash}}</span></li>
          <li>赠送：<span>{{!member.restrictedCash && member.restrictedCash !=0 ? '--' : member.restrictedCash}}</span></li>
        </ul>
      </div>
    </div>
    <div class="page-main col-xs-8">
      <div class="page-main-top">
        <ul class="form-inline ">
          <li class="form-group   "><p class="title">会员充值记录</p></li>
          <li class="form-group  pull-right padding-right-20">
            <button  class="btn btn-primary  btn-round margin-right-10"  @click="chargebackTheRechargeRecord">
              <i class="iconfont icon-tuidanguanli" aria-hidden="true"></i>
              退单
            </button>
            <button  class="btn btn-primary  btn-round" @click="recoverBox">
              <i class=" iconfont icon-huifu" aria-hidden="true"></i>
              恢复
            </button>
          </li>
        </ul>
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
                 :columns="rechargeRecordColumns"
                 :table-data="rechargeRecords"
                 :select-all="selectRechargeRecordInTable"
                 :select-group-change="selectRechargeRecordInTable"
                 :show-vertical-border="false" ></v-table>
      </div>
    </div>

    <!--退单-->
    <div class="layer-open layer-chargeback" id="layerChargeback">
      <div class="form-inline">
        <div class="row">
          <div class="col-xs-6"><div class="form-group"><label>订单号：</label><input type="text" class="form-control" disabled :value="rowData.orderSn || '--'"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>订单状态：</label><input type="text" class="form-control" disabled :value="orderStateName"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>金额：</label><input type="text" class="form-control" disabled :value="rowData.payAmout || '--'"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>收银员：</label><input type="text" class="form-control" disabled :value="rowData.operatedBy || '--'"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>充值时间：</label><input type="text" class="form-control" disabled :value="rowData.addTime|formatTime('YYYY-MM-DD HH:mm')"></div></div>
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
</template>

<script>
  import layer from '../../../../static/vendor/layer/layer'
  import DatePicker from 'vue2-datepicker'
  import {publish, subscribe} from 'pubsub-js'
  import moment from 'moment'
  import {GET, POST} from '../../../core/http'

  let vm
  export default {
    name: 'recharge-record-list',
    components: {DatePicker},
    data () {
      return {
        layerId: null,
        searchCardNum: '',
        member: {},
        filter: {
          since: '',
          until: ''
        },
        tableLoading: false,
        selectedRechargeRecord: null,
        rechargeRecords: [],
        rechargeRecordColumns: [
          {title: '序号', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'orderSn', title: '订单号', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'payAmout', title: '充值', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'overed', title: '赠送', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'addTime', title: '充值时间', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return rowData[field] ? moment(rowData[field]).format('YYYY-MM-DD HH:mm') : '--' }},
          {field: 'operatedBy', title: '收银员', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'remark', title: '备注说明', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData, rowIndex) => {
              let remark = rowData.remark;
              if (remark) {
                if (remark.length > 10) {
                  let placement;
                  if (rowIndex < (vm.rechargeRecords.length / 2)) {
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
          {field: 'orderState', title: '状态', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true,
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
      searchActiveMember(){
        if (this.filter.since) {
          vm.statementListParams.since = moment(this.filter.since).format("YYYY-MM-DDTHH:mm:ss")
        } else {
          delete vm.statementListParams.since
        }
        if (this.filter.until) {
          vm.statementListParams.until = moment(this.filter.until).format("YYYY-MM-DDTHH:mm:ss")
        } else {
          delete vm.statementListParams.until
        }
        getAllRechargeRecord() ;
      },
      resetCardNum() {
        this.searchCardNum = '';
        this.member = {};
      },
      selectRechargeRecordInTable(section) {
        this.selectedRechargeRecord = section;
      },
      chargebackTheRechargeRecord() {
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
            getAllRechargeRecord() //submitChargeback
          })
      },
      recoverBox(){
        layer.confirm('是否要恢复数据？', {icon: 7, title: '恢复'}, (index) => {
          layer.close(index);
          recoverDate()
        })
      },
      pageChange(pageIndex) {
        this.rechargeRecordListParams.page = pageIndex - 1;
        getAllRechargeRecord();
      },
      pageSizeChange(newPageSize) {
        this.rechargeRecordListParams.size = newPageSize;
        getAllRechargeRecord();
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
      getAllRechargeRecord();
    }
  }
  function getAllRechargeRecord () {
    vm.tableLoading = true;
    GET('/api/order/getRechargeLog', vm.rechargeRecordListParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.rechargeRecords = data;
      })
  }
  function recoverDate() {

  }
</script>
<style scoped lang='scss'>


</style>
<style scoped lang='scss'>
  @import "../../../sass/base-cashier";

</style>
