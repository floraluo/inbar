<template>
  <div class="page-main">
    <div class="form-inline">
      <div class="form-group">
        <label>请选择时间：</label>
        <date-picker v-model="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>
        --
        <date-picker v-model="filter.until" :not-before="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="searchByTime">查询</button>
      </div>
    </div>
    <div class="graph-box">
      <div id="expenseAmountChart" class="j-graph-content"></div>
    </div>
    <div class="graph-box">
      <div id="expenseTimesChart" class="j-graph-content"></div>
    </div>
    <v-table is-horizontal-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#ebebeb"
             :title-row-height="52"
             :columns="expenseColumns"
             :table-data="expense"
             :show-vertical-border="false" @on-custom-comp="gotoDetail"></v-table>
    <div class="paging" v-if="expensePage.totalPage > 1">
      <v-pagination :total="expensePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import moment from 'moment'
  import DatePicker from 'vue2-datepicker'
  import layer from '../../../static/vendor/layer/layer'
  import time from '../../assets/js/time.js'
  import {GET} from '../../core/http'
  import {LineColor, BarColor} from '../../assets/js/echartColorOption.js'
  let vm, amountChart, timesChart
  export default {
    name: 'graph-expense',
    components: { DatePicker },
    data () {
      return {
        filter: {
          since: '',
          until: ''
        },
        amountOption: {
          backgroundColor: '#fafafa',
          title: { text: '用户消费金额统计表', left: '4%', top: '5%' },
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { right: 40, top: 70, data: [] },
          xAxis: { data: [], axisLabel: {interval: 0, rotate: -30} },
          yAxis: { name: '人数' },
          grid: {top: 140, bottom: 80, right: 40},
          series: []
        },
        timesOption: {
          backgroundColor: '#fafafa',
          title: { text: '用户消费次数统计表', left: '4%', top: '5%' },
          tooltip: { trigger: 'axis' },
          legend: { right: 40, top: 70, data: [] },
          xAxis: { data: [], axisLabel: {interval: 0, rotate: -45} },
          yAxis: { name: '次数' },
          grid: {top: 140, bottom: 80, right: 40},
          series: []
        },
        expenseListParams: {
          page: 0,
          size: 10
        },
        expensePage: {
          totalPage: 0,
          amount: 0
        },
        expense: [],
        expenseColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'memberId', title: '卡号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'levelType', title: '会员类型', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'frequency', title: '消费次数', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'totalAmount', title: '累计消费', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData) { return rowData.totalAmount ? rowData.totalAmount : 0}},
          {field: [
              {name: '查看', type: "detail", callback: this.gotoDetail}
            ], title: '操作', width: 50, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ]
      }
    },
    methods: {
      searchByTime() {
        // getAmount(); //searchByTime
        // getTimes(); //searchByTime
        getExpenseList() //searchByTime
      },
      gotoDetail(params) {
        // let query = {}
        // Object.keys(params.rowData).forEach(item => {
        //   query[item] = encodeURI(params.rowData[item])
        // })
        this.$router.push({
          path: 'expense/detail',
          query: {
            rowData: params.rowData,
            beginTime: moment(vm.filter.since).format('YYYY-MM-DDT00:00:00'),
            endTime: moment(vm.filter.until).format('YYYY-MM-DDT00:00:00')
          }
        })
      },
      pageChange(pageIndex) {
        this.expenseListParams.page = pageIndex - 1;
        getExpenseList(); //pageChange
      },
      pageSizeChange(newPageSize) {
        this.expenseListParams.size = newPageSize;
        getExpenseList(); //pageSizeChange
      }
    },
    created () {
      vm = this
      const today = new Date();
      // this.filter.since = new Date().setDate(today.getDate() - 8)
      // this.filter.until = new Date().setDate(today.getDate() - 1)
      this.filter.since = '2018-08-28'
      this.filter.until = '2018-09-26'
      getAmount(); //created
      getTimes(); //created
      getExpenseList() //created
    },
    mounted () {
      amountChart = echarts.init(document.getElementById('expenseAmountChart'));
      timesChart = echarts.init(document.getElementById('expenseTimesChart'));
      let $pageMain = $('.page-main');
      $('.j-graph-content').css({
        width: `${$pageMain.width()}px`
      })
      window.onresize = function () {
        $('.j-graph-content').css({
          width: `${$pageMain.width()}px`
        })
        amountChart.resize();
        timesChart.resize();
      }
    }
  }
  function getAmount () {
    GET('/api/report/consume/Histogram', {
      beginTime: moment(vm.filter.since).format('YYYY-MM-DDT00:00:00'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDT00:00:00')
    })
      .then(data => {
        let max = 0;
        vm.amountOption.legend.data = []
        vm.amountOption.series = [];
        vm.amountOption.xAxis.data = [];
        Object.values(data).forEach((line, seriesIndex) => {
          line.forEach((item, index) => {
            if (seriesIndex === 0) {
              let str;
              if (index === 0) {
                str = '元 以下'
              } else {
                if (item.interval.search(/-/) === -1) {
                  str = '元 以上'
                } else {
                  str = '元'
                }
              }
              vm.amountOption.xAxis.data.push(item.interval + str)
            }
            if (!vm.amountOption.legend.data[seriesIndex]) vm.amountOption.legend.data[seriesIndex] = item.level
            if (!vm.amountOption.series[seriesIndex]) {
              vm.amountOption.series[seriesIndex] = {
                name: item.level,
                type: 'bar',
                itemStyle: { color: BarColor[seriesIndex] },
                data: []
              }
            }
            max = Math.max(item.amount, max);
            vm.amountOption.series[seriesIndex].data.push(item.amount)
          })
        })
        if (max < 10) vm.amountOption.yAxis.max = 10;
        amountChart.setOption(vm.amountOption)
      })
  }
  function getTimes () {
    GET('/api/report/consume/times', {
      beginTime: moment(vm.filter.since).format('YYYY-MM-DDT00:00:00'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDT00:00:00')
    })
      .then(data => {
        vm.timesOption.series = [];
        vm.timesOption.xAxis.data = [];
        vm.timesOption.legend.data = []
        Object.values(data).forEach((line, seriesIndex) => {
          line.forEach(item => {
            if (seriesIndex === 0) {
              vm.timesOption.xAxis.data.push(moment(item.datetime).format('MM-DD'))
            }
            if (!vm.timesOption.legend.data[seriesIndex]) vm.timesOption.legend.data.push(item.levelName)
            if (!vm.timesOption.series[seriesIndex]) {
              vm.timesOption.series[seriesIndex] = {
                name: item.levelName,
                type: 'line',
                itemStyle: { color: LineColor[seriesIndex] },
                data: []
              }
            }
            vm.timesOption.series[seriesIndex].data.push(item.frequency)
          })
        })
        timesChart.setOption(vm.timesOption)
      })
  }
  function getExpenseList () {
    GET('/api/report/consume/detail/', {
      page: vm.expenseListParams.page,
      size: vm.expenseListParams.size,
      beginTime: moment(vm.filter.since).format('YYYY-MM-DDT00:00:00'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDT00:00:00')
    })
      .then(data => {
        vm.expensePage.totalPage = data.totalPages;
        vm.expensePage.amount = data.totalElements;
        vm.expense = data.content;
      })
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .graph-box{
    position: relative;
    margin-top: 10px;
    margin-bottom: 45px;
    > div{
      height: 600px;
    }
  }
</style>
