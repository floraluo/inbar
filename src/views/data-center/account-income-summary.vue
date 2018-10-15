<template>
<div class="page-main">
  <div class="form-inline">
    <div class="form-group">
      <label>请选择时间：</label>
      <date-picker v-model="filter.dateTime" :width="'150'" :editable="true" :format="'YYYY-MM'" ></date-picker>
    </div>
    <div class="form-group">
      <button class="btn btn-primary" type="button" @click="filterFundByTime">查询</button>
    </div>
  </div>
  <div class="table-boxs">
    <v-table is-horizontal-resize
             is-vertical-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#f0f2f9"
             :title-row-height="40"
             :is-loading="tableLoading"
             :height="256"
             :min-height="256"
             :row-height="35"
             :columns="paymentColumns"
             :table-data="payments"
             :footer="footer"
             :footer-row-height="40"
             :footer-cell-class-name="setFooterCellClass"
            ></v-table>
  </div>

  <div class="table-boxs">
    <v-table is-horizontal-resize
             is-vertical-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#f0f2f9"
             :title-row-height="40"
             :is-loading="tableLoading"
             :height="400"
             :min-height="400"
             :row-height="35"
             :columns="inComeColumns"
             :table-data="inComes"
             :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
  </div>



</div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import DatePicker from 'vue2-datepicker'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  import store from '@/core/store'

  let vm
  export default {
    name: 'income-summary',
    components: {DatePicker},
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        filter:{
          dateTime:'',
        },
        payments: [],
        inComes: [],
        fundListParams:{},
        paymentColumns: [
          {field: 'paymentName', title: '支付方式', width: 100, titleAlign: 'center', columnAlign: 'center', isEdit:true,
            formatter: function (rowData,rowIndex,pagingIndex,field) {return `<span class='cell-edit-color'>${rowData[field]}</span>`;},isResize:true},
          {field: 'netCostAmount', title: '网费', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData, rowIndex) => {
              let netCostAmount = rowData.netCostAmount;
              if (netCostAmount) {
                if (netCostAmount.length > 0) {
                  let placement;
                  if (rowIndex < (vm.payments.length / 2)) {
                    placement = 'bottom';
                  } else {
                    placement = 'top';
                  }
                  return `<span class="v-table-popover-content" data-content="${netCostAmount}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${netCostAmount}</span>`;
                } else {
                  return netCostAmount;
                }
              } else {
                return '--';
              }
            }
          },
          {field: 'goodsAmount', title: '商品', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData, rowIndex) => {
              let goodsAmount = rowData.goodsAmount;
              if (goodsAmount) {
                if (goodsAmount.length > 0) {
                  let placement;
                  if (rowIndex < (vm.payments.length / 2)) {
                    placement = 'bottom';
                  } else {
                    placement = 'top';
                  }
                  return `<span class="v-table-popover-content" data-content="${goodsAmount}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${goodsAmount}</span>`;
                } else {
                  return goodsAmount;
                }
              } else {
                return '--';
              }
            }
          },
          {field: 'amount',title: '合计', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => { return rowData.netCostAmount + rowData.goodsAmount }}
        ],
        footer: [],
        inComeColumns: [
          {field: 'finnshedTime', title: '时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD') }},
          {field: 'goodsAmount', title: '商品收入', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'weichat', title: '微信', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'alipay', title: '支付宝', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'account', title: '卡扣', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'unionpay', title: '银联', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'cash', title: '现金', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          //{field: 'amount', title: '总收入', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field:   [{name: '详情', type: "modify", callback: this.goDetail}],
            title: '操作', width: 100, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
      }
    },
    methods: {
      filterFundByTime() {
        if (this.filter.dateTime) {
          vm.dateTime = moment(this.filter.dateTime).format('YYYY-MM-DDTHH:mm:ss');
        } else {
          delete this.filter.dateTime
        }
       // getAllPayment(); // filterFundByTime
        getALLinCome ();
      },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      goDetail(params) {
        this.$router.push({
          name: 'shiftDetail',
          query: {
            rotaId: params.rowData.id
            // inbarId: params.rowData.inbarId
          }
        })
      },
      setFooterData(){
        let result = [],
          netCostAmount = vm.payments.map(item => {
            return item.netCostAmount
          }),
          // vm.packagesParam.goodsIds =vm.goodsList.map(item => {
          // return `${item.goodsId}` });
          amount =vm.payments.map(item => {
            return  item.amount
          }),
          goodsAmount =vm.payments.map(item => {
            return item.goodsAmount
          });
        let useAmount = ['合计:'];
        useAmount.push(
          netCostAmount.reduce((prev, curr) => {
            return prev+curr;
          }, 0)
        );
        useAmount.push(
          goodsAmount.reduce((prev, curr) => {
            return parseInt(prev) + parseInt(curr);
          }, 0)
        );
        useAmount.push(
          '总计：'+ amount.reduce((prev, curr) => {
            return parseInt(prev) + parseInt(curr);
          }, 0)
        );
        result.push(useAmount);

        this.footer = result;
      },
      setFooterCellClass(rowIndex, colIndex, value){
        if (colIndex === 0) {
          return 'footer-cell-class-name-title'
        }
      }
    },
    mounted(){
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      this.filter.dateTime=`${year}-${month}`;
    },
      created() {
      vm = this;
      this. setFooterData();
      getAllPayment(); //created
      getALLinCome ();
    }
  }
function formatTime() {
  vm.dateTime=moment(vm.dateTime ).format("YYYY-MM-DDTHH:mm:ss ");
  //vm.dateTime=vm.dateTime.replace(new RegExp(/-/gm) ,"/"); 　　//将所有的'-'转为'/'即可
  return vm.dateTime;
}
  function getAllPayment () {
    vm.tableLoading = true;
    let query=formatTime();
    GET(`/api/cashier/account-details/monthlyIncomeStatisticsOfPayment?dateTime=${query}`)
      .then(data => {
        vm.tableLoading = false;
        vm.payments = data;
      })
  }
  function getALLinCome () {
    vm.tableLoading = true;
    let query=formatTime();
    GET(`/api/cashier/account-details/monthlyIncomeStatisticsInfo?dateTime=${query}`)
      .then(data => {
        vm.tableLoading = false;
        vm.inComes = data;
      })
  }
</script>
<style  lang='scss'>
  .cell-edit-color,.footer-cell-class-name-title, .v-table-title-class{
    font-weight: bold;
  }
  .table-boxs{
    padding-top: 20px;
  }
  </style>
<style scoped lang="scss">
  @import "../../sass/base-manage";

</style>
