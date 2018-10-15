<template>
  <div class="page-content">
    <div class="bar-left-container1 col-xs-3 ">
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
            <date-picker v-model="filter.since" :width="'100%'" :editable="true" :format="'YYYY-MM-DD HH:mm：ss'"  type="datetime" placeholder="开始时间"></date-picker>
          </div>
        </div>
        <div class="col-xs-12 padding-bottom-20">
          <label class="control-label col-xs-4"  >结束时间：</label>
          <div class="col-xs-7">
            <date-picker v-model="filter.until" :not-before="filter.since" :width="'100%'" :editable="true" :format="'YYYY-MM-DD HH:mm：ss'" type="datetime"  placeholder="结束时间"></date-picker>
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
          <li>总额：<span>{{!member.cash && member.cash !==0 ? '--' :member.cash+member.restrictedCash}}</span></li>
          <li>充值总额：<span>{{!member.totalRecharges && member.totalRecharges !==0 ? '--' : member.totalRecharges}}</span></li>
          <li>积分：<span>{{!member.coins && member.coins !==0 ? '--' : member.coins}}</span></li>
          <li>会员类型：<span>{{member.scopeLabel || '--'}}</span></li>
          <li>剩余现金：<span>{{!member.cash && member.cash !==0 ? '--' : member.cash}}</span></li>
          <li>剩余赠送：<span>{{!member.restrictedCash && member.restrictedCash !==0 ? '--' : member.restrictedCash}}</span></li>
        </ul>
      </div>
    </div>
    <div class="page-main col-xs-9">
      <div class="page-main-top">
        <div  class="form-inline ">
          <span class="form-group   "><p class="title">会员充值记录</p></span>
          <!--<li class="form-group  pull-right padding-right-20">-->
          <!--<button  class="btn btn-primary  btn-round margin-right-10"  @click="chargeBack">-->
          <!--<i class="iconfont icon-tuidanguanli" aria-hidden="true"></i>-->
          <!--退单-->
          <!--</button>-->
          <!--<button  class="btn btn-primary  btn-round" @click="recoverBox">-->
          <!--<i class=" iconfont icon-huifu" aria-hidden="true"></i>-->
          <!--恢复-->
          <!--</button>-->
          <!--</li>-->
        </div>
      </div>

      <v-table is-horizontal-resize
               is-vertical-resize
               style="width:100%"
               row-hover-color="#eee"
               row-click-color="#edf7ff"
               title-bg-color="#f0f2f9"
               :title-row-height="40"
               :row-height="35"
               :is-loading="tableLoading"
               :height="600"
               :min-height="450"
               :columns="rechargeRecordColumns"
               :table-data="rechargeRecords"
               :show-vertical-border="false"
               :row-click="selectMember"
               @on-custom-comp="someOperate"
      ></v-table>
      <div class="footer-total-row">
        <div>总额：<span>{{footer.total}}</span></div>
        <div>累计使用：<span>{{footer.use}}</span></div>
        <div>账户余额：<span>{{footer.cash}}</span></div>
      </div>
    </div>


    <!--退单-->
    <div class="layer-open layer-chargeback" id="layerChargeback">
      <div class="form-inline">
        <div class="row">
          <div class="col-xs-6"><div class="form-group"><label>充值单号：</label><input type="text" class="form-control" disabled :value="rowData.orderSn || '--'"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>会员卡号：</label><input type="text" class="form-control" disabled :value="rowData.idCard"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>客户姓名：</label><input type="text" class="form-control" disabled :value="rowData.buyerName"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>会员类型：</label><input type="text" class="form-control" disabled :value="rowData.scope"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>联系方式：</label><input type="text" class="form-control" disabled :value="rowData.mobile"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>充值金额：</label><input type="text" class="form-control" disabled :value="rowData.payAmout || '--'"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>赠送金额：</label><input type="text" class="form-control" disabled :value="rowData.overed || '--'"></div></div>
          <div class="col-xs-6"><div class="form-group"><label>赠送商品：</label><input type="text" class="form-control" disabled :value="rowData.goodsVoList|| '--'"></div></div>
          <div class="col-xs-12"><label>退单说明：</label><textarea type="text" class="form-control" rows="3" v-model="refundRemark"></textarea></div>
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
  import $ from 'jquery'
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
        member: [],
        selIds: [],
        orderId: '',
        filter: {
          since: '',
          until: ''
        },
        tableLoading: false,
        selectedRechargeRecord: null,
        rechargeListParams: {
          memberId: '',
        },
        rechargeRecords: [],
        rechargeRecordColumns: [
          {field: 'num', title: '序号', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          //{width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'orderSn', title: '订单号', width: 130, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData,rowIndex) => {
              let placement ,html = '';
              if (rowIndex < (vm.rechargeRecords.length / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              html += `<span style="color:#4dbdfc" class="v-table-popover-content" data-content="${rowData.orderSn}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${rowData.orderSn}</span>`;
              return html;
            }
          },
          {field: 'payAmout', title: '充值', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'overed', title: '赠送', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          // {field: 'cash', title: '账户余额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'addTime', title: '充值时间', width: 90, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD HH:mm') }},
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
          {field: [
              {name: '退单',callback: this.chargebackTheRechargeRecord}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
        footer: { total: 0, use: 0, cash: 0 },
        rowData: {},
        refundRemark: ''
      }
    },
    computed: {
      orderStateName() {
        let orderState = this.rowData.orderState;
        switch (orderState) {
          case 1: return '未付款';
          case 2: return '已付款';
          case 3: return '已退单';
          case 4: return '订单完成';
          case 5: return '未审核';
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
      searchActiveMember(){
        if (this.searchCardNum) {
          vm.rechargeListParams.memberId = this.searchCardNum;
        } else {
          delete  vm.rechargeListParams.memberId
        }
        if (this.filter.since) {
          vm.rechargeListParams.startTime = moment(this.filter.since).format("YYYY-MM-DDTHH:mm:ss")
        } else {
          delete vm.rechargeListParams.startTime
        }
        if (this.filter.until) {
          vm.rechargeListParams.endTime = moment(this.filter.until).format("YYYY-MM-DDTHH:mm:ss")
        } else {
          delete vm.rechargeListParams.endTime
        }
        getAllRechargeRecord() ;
      },
      resetCardNum() {
        this.searchCardNum = '';
        this.member = {};
        this.filter.since = '';
        this.filter.until = '';

      },
      clearMemberInfo() {
        this.member ={};
      },
      selectMember(rowIndex, rowData, column){
        vm.rechargeListParams.memberId = rowData.idCard;
        vm.memberId =  rowData.idCard;
        let params=this.memberId;
        GET(`/api/member/active/`,{
          memberId: rowData.idCard
        })
          .done(data => {
            vm.member = data.content[0];
          })

      },
      chargeBack() {},
      chargebackTheRechargeRecord(params) {
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
            getAllRechargeRecord() //submitChargeback
          })
      },
      recoverBox(){
        layer.confirm('是否要恢复数据？', {icon: 7, title: '恢复'}, (index) => {
          layer.close(index);
          recoverDate()
        })
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created () {
      vm=this;
      getAllRechargeRecord();
    }
  }
  function getAllRechargeRecord () {
    vm.tableLoading = true;
    GET('/api/order/getRechargeLog', vm.rechargeListParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.rechargeRecords = data;
        data.forEach(item => {
          vm.footer.total += +item.payAmout + item.overed;
          vm.footer.cash += +item.cash +item.restrictedCash
        });
        vm.footer.use = vm.footer.total - vm.footer.cash;
      })
  }
  function recoverDate() {

  }

</script>

<style scoped lang='scss'>
  @import "../../../sass/base-cashier";
.footer-total-row{
  height: 44px;
  display: flex;
  border-left: 1px solid $border-color;
  >div{
    flex: 1;
    border: 1px solid $border-color;
    border-left: 0;
    border-top: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      color: #ff1b21;
      font-weight: bold;
    }
  }
}
</style>
