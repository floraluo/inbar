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
      <div class="clearfix">
        <div class="btn-group">
          <button class="btn btn-default" disabled :class="{'btn-primary': item.type === currentTimeCategory.type}"  type="button" @click="getIncomeByTimeCat(item)" v-for="(item, index) in timeCategory" :key="index">{{item.name}}</button>
        </div>
      </div>
      <div class="inbar-income">
        <div id="inbarIncome" class="graph-content"></div>
      </div>
    </div>
    <div class="graph-box">
      <div class="clearfix">
        <div class="btn-group">
          <button class="btn btn-default" disabled :class="{'btn-primary': item.type === currentTimeCategory.type}"  type="button" @click="getIncomeByTimeCat(item)" v-for="(item, index) in timeCategory" :key="index">{{item.name}}</button>
        </div>
      </div>
      <div class="inbar-income">
        <div id="payment" class="graph-content"></div>
      </div>
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
  import {LineColor, PaymentColor} from '../../assets/js/echartColorOption.js'
  let vm, barIncomeChart, paymentChart;
  export default {
    name: 'graph-income',
    components: { DatePicker },
    data () {
      return {
        currentTimeCategory: {type: 'day', name: '日'},
        timeCategory: [
          {type: 'year', name: '年'},
          {type: 'quarter', name: '季'},
          {type: 'month', name: '月'},
          {type: 'week', name: '周'},
          {type: 'day', name: '日'}
        ],
        filter: {
          since: '',
          until: ''
        },
        baseOption: {
          backgroundColor: '#fafafa',
          title: { text: '支付方式统计表', left: '4%', top: '5%' },
          tooltip: { trigger: 'axis' },
          legend: { right: 40, top: 90, data: [] },
          xAxis: { data: [] },
          yAxis: { name: '金额/元' },
          grid: { left: '8%', right: '8%', top: '30%' },
          series: []
        }
      }
    },
    methods: {
      getIncomeByTimeCat(category) {
        this.currentTimeCategory = category;
        if (category.type === 'quarter' || category.type === 'month' || category.type === 'week') {
          // this.inbarIncome.xAxis.data = time[category.type]
        } else if (category.type === 'year') {

        } else if (category.type === 'day') {

        }
        barIncomeChart.setOption(this.inbarIncome);
      },
      searchByTime() {
        const oneDay = 24 * 60 * 60 * 1000
        if (((new Date(this.filter.until) - new Date(this.filter.since)) / oneDay) > 31) {
          layer.msg('最多选择31天')
        } else {
          getInbarIncome(); //searchByTime
          getPayment(); //searchByTime
        }
      }
    },
    created () {
      vm = this
      // this.filter.since = '2018-09-01'
      // this.filter.until = '2018-09-07'
      const today = new Date('2018-09-06');
      this.filter.since = new Date('2018-09-06').setDate(today.getDate() - 8)
      this.filter.until = new Date('2018-09-06').setDate(today.getDate() - 1)
      getInbarIncome(); //created
      getPayment(); //created
    },
    mounted () {
      barIncomeChart = echarts.init(document.getElementById('inbarIncome'));
      paymentChart = echarts.init(document.getElementById('payment'));
      let $pageMain = $('.page-main');
      $('.graph-content').css({
        width: `${$pageMain.width()}px`
      })
      window.onresize = function () {
          $('.graph-content').css({
            width: `${$pageMain.width()}px`
          })
        barIncomeChart.resize();
        paymentChart.resize();
      }
    }
  }
  function setGraphData (data) {
    let goodsArr = [], netArr = [], xAxis = [];
    data.forEach(item => {
      goodsArr.push(item.goodsAmount)
      netArr.push(item.netCostAmount)
      xAxis.push(moment(item.businessDay).format('YYYY-MM-DD'))
    })
    vm.inbarIncome.xAxis.data = xAxis;
    vm.inbarIncome.series[0].data = netArr
    vm.inbarIncome.series[1].data = goodsArr
  }
  function getInbarIncome () {
    GET('/api/cashier/business/selectInbarIncome', {
      startTime: moment(vm.filter.since).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDTHH:mm:ss')
    }).then(data => {
      let option = JSON.parse(JSON.stringify(vm.baseOption));
      option.title.text = '网吧收入统计表'
      Object.values(data).forEach((line, seriesIndex) => {
        line.forEach(item => {
          if (seriesIndex === 0) {
            option.xAxis.data.push(moment(item.businessDay).format('MM-DD'))
          }
          if (!option.legend.data[seriesIndex]) {
            if (item.name === '商品') {
              option.legend.data[seriesIndex] = '商品销售'
              option.series[seriesIndex] = { name: '商品销售', type: 'line', smooth: true, itemStyle: { color: LineColor[seriesIndex] }, data: [] }
            } else if (item.name === '充值') {
              option.legend.data[seriesIndex] = '网费充值'
              option.series[seriesIndex] = { name: '网费充值', type: 'line', smooth: true, itemStyle: { color: LineColor[seriesIndex] }, data: [] }
            }
          }
          option.series[seriesIndex].data.push(item.amount)
        })
      })
      barIncomeChart.setOption(option)
    })
  }
  function getPayment () {
    GET('/api/cashier/business/selectInbarIncomeByPayment', {
      startTime: moment(vm.filter.since).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDTHH:mm:ss')
    }).then(data => {
      let option = JSON.parse(JSON.stringify(vm.baseOption));
      option.title.text = '支付方式统计表'
      Object.values(data).forEach((line, seriesIndex) => {
        line.forEach(item => {
          if (seriesIndex === 0) {
            option.xAxis.data.push(moment(item.businessDay).format('MM-DD'))
          }
          if (!option.legend.data[seriesIndex]) {
            option.legend.data[seriesIndex] = item.paymentName
            option.series[seriesIndex] = { name: item.paymentName, type: 'line', smooth: true, itemStyle: { color: PaymentColor[item.paymentCode] }, data: [] }
          }
          option.series[seriesIndex].data.push(item.amount)
        })
      })
      paymentChart.setOption(option)
    })
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .graph-box{
    position: relative;
    margin-top: 10px;
    margin-bottom: 45px;
    .btn-group{
      position: absolute;
      top: 30px;
      right: 40px;
      z-index: 1;
      .btn-default{
        background-color: #fff;
      }
      .btn-primary{
        background-color: $theme-color;
      }
    }
  }
  .inbar-income{
    /*max-width: 1600px;*/
    /*overflow-x: auto;*/
    /*height: 500px;*/
    >div{
      /*width: 1240px;*/
      height: 500px;
    }
  }
</style>
