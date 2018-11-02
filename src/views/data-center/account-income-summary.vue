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
  <div class="graph-box">
    <div id="incomeStatistics" class="graph-content j-graph-content"></div>
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

  <div class="table-box">
    <v-table is-horizontal-resize
             is-vertical-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#f0f2f9"
             :title-row-height="40"
             :is-loading="tableLoading"
             :height="500"
             :min-height="500"
             :row-height="35"
             :columns="inComeColumns"
             :table-data="inComes"
             :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
  </div>



</div>
</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'
  import moment from 'moment'
  import layer from '../../../static/vendor/layer/layer'
  import DatePicker from 'vue2-datepicker'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  import store from '@/core/store'

  let vm, incomeChart
  export default {
    name: 'income-summary',
    components: {DatePicker},
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        filter: {
          dateTime: '',
        },
        payments: [],
        inComes: [],
        fundListParams: { },
        incomeOption: {
          backgroundColor: '#fafafa',
          title: { text: '网吧月度收入汇总表',  x: 'center', top: 30 },
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category',data: [], splitLine: {show: true, lineStyle:{color: ['#d9d9d9'], width: 1, type:'dashed'}}},
          yAxis: { type: 'value',name: '金额/万元',splitLine: {show: true, lineStyle:{color: ['#d9d9d9'], width: 1, type:'dashed'}} },
          grid: { left: '8%', right: '8%', top: '30%' },
          series: [{name:'金额',type: 'line', itemStyle: { color: '#c658e8' }, areaStyle: {color:'#f5e9f8'}, data: []}]
        },
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
          {field: 'finnshedTime', title: '时间', width:90, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD') }},
          {field: 'goodsAmount', title: '商品收入', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'netCostAmount', title: '充值收入', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true},
          //{field: 'weichat', title: '微信', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'alipay', title: '支付宝', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'account', title: '卡扣', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'unionpay', title: '银联', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'cash', title: '现金', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'amount', title: '总收入', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData) => {
            return  rowData.goodsAmount+rowData.netCostAmount }},
          {field:   [{name: '详情', type: "modify", callback: this.goDetail}],
            title: '操作', width: 50, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
      }
    },
    methods: {
      filterFundByTime() {
        getAllPayment(); //created
        getALLinCome ();
        getIncomeLine();
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
          netCostAmount = this.payments.map(item => {
            return item.netCostAmount;
          }),
          amount =this.payments.map(item => {
            return  item.amount
          }),
          goodsAmount =this.payments.map(item => {
            return item.goodsAmount
          });
        let useAmount = ['合计:'];
        useAmount.push(
          netCostAmount.reduce((prev, curr) => {
            return parseInt(prev) + parseInt(curr);
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
    mounted() {
      // let nowDate = new Date();
      // let year = nowDate.getFullYear();
      // let month = nowDate.getMonth() + 1;
      // this.filter.dateTime=`${year}-${month}`;
      incomeChart = echarts.init(document.getElementById('incomeStatistics'));
      let $pageMain = $('.page-main');
      $('.j-graph-content').css({
        width: `${$pageMain.width()}px`
      });
           window.onresize = function () {
        $('.j-graph-content').css({
          width: `${$pageMain.width()}px`
        });
        incomeChart.resize();
      }
    },
    created() {
      vm = this;
      this.filter.dateTime =  '2018-11';
      getAllPayment(); //created
      this.setFooterData();
      getALLinCome ();
      getIncomeLine();
    }
  }
// function formatTime() {
//   vm.dateTime=moment(vm.dateTime ).format("YYYY-MM-DDTHH:mm:ss ");
//   //vm.dateTime=vm.dateTime.replace(new RegExp(/-/gm) ,"/"); 　　//将所有的'-'转为'/'即可
//   return vm.dateTime;
// }
  function getIncomeLine () {
    GET('/api/cashier/account-details/monthlyIncomeStatistics', {
      dateTime: moment(vm.filter.dateTime).format('YYYY-MM-DDT00:00:00'),
    })
      .then(data => {
        vm.incomeOption.series[0].data = [];
        vm.incomeOption.xAxis.data = [];
        data.forEach(item => {
          vm.incomeOption.xAxis.data.push(moment(item.finnshedTime).format('MM-DD'))
          vm.incomeOption.series[0].data.push(item.amount)
        })
        incomeChart.setOption(vm.incomeOption)
      })
  }
  function getAllPayment () {
    vm.tableLoading = true;
    //let query=formatTime();
    GET('/api/cashier/account-details/monthlyIncomeStatisticsOfPayment',{
      dateTime: moment(vm.filter.dateTime).format('YYYY-MM-DDT00:00:00'),
    })
      .then(data => {
        vm.tableLoading = false;
        vm.payments = data
      })
  }
  function getALLinCome () {
    vm.tableLoading = true;
    //let query=formatTime();
    GET('/api/cashier/account-details/monthlyIncomeStatisticsInfo',{
      dateTime: moment(vm.dateTime).format('YYYY-MM-DDT00:00:00'),
    })
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
  /*.v-table-body-cell {*/
    /*font-size: 12px;*/
  /*}*/
  </style>
<style scoped lang="scss">
  @import "../../sass/base-manage";
  .graph-box > div {
    height: 500px;
  }
</style>
