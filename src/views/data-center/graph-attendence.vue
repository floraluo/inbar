<template>
  <div class="page-main">
    <div class="form-inline">
      <div class="form-group">
        <label>请选择时间：</label>
        <date-picker v-model="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>
        --
        <date-picker v-model="filter.until" :not-before="filter.since" :not-after="new Date()" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="searchPersonTime">查询</button>
      </div>
    </div>
    <div class="graph-box">
      <div id="areaPersonTimeGraph" class="j-graph-content"></div>
    </div>
    <div class="form-inline">
      <div class="form-group">
        <label>请选择时间：</label>
        <date-picker v-model="filterRate" :not-after="new Date()" :width="'150'" :editable="true" :format="'YYYY-MM-DD'"></date-picker>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="searchRate">查询</button>
      </div>
    </div>
    <div class="graph-box">
      <div id="areaRateGraph" class="j-graph-content"></div>
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
  let vm, personTimeChart, rateChart;
  export default {
    name: 'graph-attendence',
    components: { DatePicker },
    data () {
      return {
        isPersonTimeInit: true,
        isRateInit: true,
        filter: {
          since: '',
          until: ''
        },
        filterRate: '',
        personTimeOption: {
          backgroundColor: '#fafafa',
          title: { text: '区域上座人次统计', left: '4%', top: '5%' },
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { right: 40, top: 70, data: [] },
          xAxis: { data: [], axisLabel: {interval: 0} },
          yAxis: { name: '人次' },
          grid: {top: 140, bottom: 80, right: 40},
          series: []
        },
        rateOption: {
          backgroundColor: '#fafafa',
          title: { text: '区域上座率统计', left: '4%', top: '5%' },
          tooltip: { trigger: 'axis', formatter: function (params) {
              let html = params.map(item => {
                return `<br>${item.marker} ${item.seriesName}: ${item.data}%`
              })
              return `${params[0].name}${html}`
            }},
          legend: { right: 40, top: 70, data: [] },
          xAxis: { data: [], axisLabel: {interval: 0, rotate: -45} },
          yAxis: {
            name: '百分比',
            max: 100,
            axisLabel: {
              formatter: '{value} %'
            }
          },
          grid: {top: 140, bottom: 80, right: 40},
          series: []
        }
      }
    },
    methods: {
      searchPersonTime() {
        const oneDay = 24 * 60 * 60 * 1000
        if (((new Date(this.filter.until) - new Date(this.filter.since)) / oneDay) > 31) {
          layer.msg('最多选择31天')
        } else {
          getPersonTime() //searchPersonTime
        }
      },
      searchRate() {
        getRate() //searchRate
      }
    },
    created () {
      vm = this
      const today = new Date();
      this.filter.since = new Date().setDate(today.getDate() - 8)
      this.filter.until = new Date().setDate(today.getDate() - 1)
      this.filterRate = '2018-09-21'
      getPersonTime(); //created
      getRate(); //created
    },
    mounted () {
      personTimeChart = echarts.init(document.getElementById('areaPersonTimeGraph'));
      rateChart = echarts.init(document.getElementById('areaRateGraph'));
      let $pageMain = $('.page-main');
      $('.j-graph-content').css({
        width: `${$pageMain.width()}px`
      })
      window.onresize = function () {
        $('.j-graph-content').css({
          width: `${$pageMain.width()}px`
        })
        personTimeChart.resize();
        rateChart.resize();
      }
    }
  }
  function getPersonTime () {
    GET('/api/report/occupancy', {
      beginTime: moment(vm.filter.since).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDTHH:mm:ss')
    })
      .then(data => {
        let max = 0;
        vm.personTimeOption.series = []
        vm.personTimeOption.xAxis.data = []
        vm.personTimeOption.legend.data = []
        Object.values(data).forEach((line, seriesIndex) => {
          vm.personTimeOption.series[seriesIndex] = { type: 'bar', itemStyle: { color: BarColor[seriesIndex] }, data: [] }
          line.forEach((item, index) => {
            if (seriesIndex === 0) {
              vm.personTimeOption.xAxis.data.push(item.areaName)
            }
            if (!vm.personTimeOption.series[seriesIndex].name) vm.personTimeOption.series[seriesIndex].name = item.level
            if (!vm.personTimeOption.legend.data[seriesIndex]) vm.personTimeOption.legend.data.push(item.level)
            max = Math.max(item.frequency, max);
            vm.personTimeOption.series[seriesIndex].data.push(item.frequency)
          })
        })
        if (max < 10) vm.personTimeOption.yAxis.max = 10;
        personTimeChart.setOption(vm.personTimeOption)
      })
  }
  function getRate () {
    GET('/api/report/occupancy/rate', {
      day: moment(vm.filterRate).format('YYYY-MM-DDTHH:mm:ss')
    })
      .then(data => {
        vm.rateOption.xAxis.data = [];
        vm.rateOption.series = [];
        vm.rateOption.legend.data = [];
        Object.values(data).forEach((line, seriesIndex) => {
          vm.rateOption.series[seriesIndex] = { type: 'line', itemStyle: { color: LineColor[seriesIndex] }, data: [] }
          line.forEach((item, index) => {
            if (seriesIndex === 0) {
              vm.rateOption.xAxis.data.push(item.hours + "时")
            }
            if (!vm.rateOption.series[seriesIndex].name) vm.rateOption.series[seriesIndex].name = item.name
            if (!vm.rateOption.legend.data[seriesIndex]) vm.rateOption.legend.data.push(item.name)
            vm.rateOption.series[seriesIndex].data.push(Number(item.percent.replace(/%/, '')))
          })
        })
        rateChart.setOption(vm.rateOption)
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
