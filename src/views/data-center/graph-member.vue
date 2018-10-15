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
        <button class="btn btn-primary" type="button">查询</button>
      </div>
    </div>
    <div class="graph-box">
      <div id="onlineGraph" class="j-graph-content"></div>
    </div>
    <div class="graph-pie-box clearfix">
      <div class="graph-pie"><div id="pieGraph" class="j-pie-graph-content"></div></div>
      <div class="pie-table">
        <div class="pie-table-box">
          <div class="title">在线人次汇总</div>
          <ul>
            <li v-for="(item, index) in pieData" :key="index" v-if="index < 5" @mouseover="pieSelect(index)" @mouseout="pieUnSelect(index)">
              <div class="color-block"><i class="color-block" :style="`background-color: ${pieColor[index]}`"></i></div>
              <div class="name">{{item.name}}</div>
              <div class="figure">{{item.quantity}}人次</div>
            </li>
          </ul>
        </div>
        <div class="pie-table-box" v-if="pieData.length > 5">
          <div class="title">在线人次汇总</div>
          <ul >
            <li v-for="(item, index) in pieData" :key="index" v-if="index >= 5" @mouseover="pieSelect(index)" @mouseout="pieUnSelect(index)">
              <div class="color-block"><i class="color-block" :style="`background-color: ${pieColor[index]}`"></i></div>
              <div class="name">{{item.name}}</div>
              <div class="figure">{{item.quantity}}人次</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="graph-box">
      <div id="onlineTimeGraph" class="j-graph-content"></div>
    </div>
    <!--<div class="graph-box graph-pie-box">-->
      <!--<div class="graph-pie"><div id="turnoverPie" class="j-pie-graph-content "></div></div>-->
      <!--<div class="graph-pie"><div id="salePie" class="j-pie-graph-content "></div></div>-->
      <!--<div class="graph-pie"><div id="orderPie" class="j-pie-graph-content "></div></div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import echarts from 'echarts'
  import moment from 'moment'
  import DatePicker from 'vue2-datepicker'
  import layer from '../../../static/vendor/layer/layer'
  import time from '../../assets/js/time.js'
  import {GET} from '../../core/http'
  import {LineColor, BarColor, PieColor} from '../../assets/js/echartColorOption.js'
  let vm,
    onlineChart,
    pieChart,
    onlineTimeChart;
  export default {
    name: 'graph-member',
    components: { DatePicker },
    data () {
      return {
        pieColor: PieColor,
        filter: {
          since: '',
          until: ''
        },
        onlineOption: {
          backgroundColor: '#fafafa',
          title: { text: '会员在线统计表', left: '4%', top: '5%' },
          tooltip: { trigger: 'axis' },
          legend: { right: 40, top: 70, data: [] },
          xAxis: { data: [] },
          yAxis: { name: '人次' },
          // grid: {top: 100, bottom: 80},
          grid: { left: '8%', right: '8%', top: '30%' },
          series: []
        },
        pieData: [],
        pieOption: {
          backgroundColor: '#fafafa',
          // title: { text: '会员统计', x: 'center', y: 'center' },
          tooltip: { trigger: 'item', show: false },
          series: [{
            type: 'pie',
            data: [],
            radius: ['55%', '80%'],
            zlevel: 1,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              lineHeight: 30
            },
            emphasis: {
              label: {
                show: true,
                formatter: ['{a|{d}%}', '{b|{b}}'].join('\n'),
                rich: {
                  a: { fontSize: 26, color: '#333', fontWeight: 'bolder' },
                  b: { fontSize: 18, color: '#333', fontWeight: 'bold' }
                }
              }
            },
            labelLine: { show: false }
          }]
        },
        onlineTimeOption: {
          backgroundColor: '#fafafa',
          title: { text: '会员上线统计表', left: '4%', top: '5%' },
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { right: 40, top: 70, data: [] },
          xAxis: { data: [] },
          yAxis: { name: '人数' },
          grid: { left: '8%', right: '8%', top: '30%' },
          series: []
        }
      }
    },
    methods: {
      pieSelect(index) {
        pieChart.dispatchAction({
          type: 'highlight',
          dataIndex: index
        })
      },
      pieUnSelect(index) {
        pieChart.dispatchAction({
          type: 'downplay',
          dataIndex: index
        })
      }
    },
    created () {
      vm = this
      this.filter.since = '2018-08-01'
      this.filter.until = '2018-08-31'
      getOnline(); //created
      getPie(); //created
      getOnlineTime(); //created
    },
    mounted () {
      onlineChart = echarts.init(document.getElementById('onlineGraph'));
      pieChart = echarts.init(document.getElementById('pieGraph'));
      onlineTimeChart = echarts.init(document.getElementById('onlineTimeGraph'));
      let $pageMain = $('.page-main');
      $('.j-graph-content').css({
        width: `${$pageMain.width()}px`
      })
      // $('.j-pie-graph-content').css({
      //   width: `${$pageMain.width() / 3}px`
      // })
      window.onresize = function () {
        $('.j-graph-content').css({
          width: `${$pageMain.width()}px`
        })
        // $('.j-pie-graph-content').css({
        //   width: `${$pageMain.width() / 3}px`
        // })
        onlineChart.resize();
        pieChart.resize();
        onlineTimeChart.resize();
      }
    }
  }
  function getOnline () {
    GET('/api/report/barMember/lineChart', {
      beginTime: moment(vm.filter.since).format('YYYY-MM-DDT00:00:00'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDT00:00:00')
    })
      .then(data => {
        vm.onlineOption.legend.data = []
        vm.onlineOption.series = [];
        vm.onlineOption.xAxis.data = [];
        Object.values(data).forEach((line, seriesIndex) => {
          line.forEach(item => {
            if (seriesIndex === 0) {
              vm.onlineOption.xAxis.data.push(moment(item.datetime).format('MM-DD'))
            }
            if (!vm.onlineOption.legend.data[seriesIndex]) vm.onlineOption.legend.data[seriesIndex] = item.levelName
            if (!vm.onlineOption.series[seriesIndex]) {
              vm.onlineOption.series[seriesIndex] = {
                name: item.levelName,
                type: 'line',
                itemStyle: { color: LineColor[seriesIndex] },
                data: []
              }
            }
            vm.onlineOption.series[seriesIndex].data.push(item.frequency)
          })
          onlineChart.setOption(vm.onlineOption)
        })
      })
  }
  function getPie () {
    GET('/api/report/barMember/pie', {
      beginTime: moment(vm.filter.since).format('YYYY-MM-DDT00:00:00'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDT00:00:00')
    })
      .then(data => {
        vm.pieData = data;
        vm.pieOption.series[0].data = data.map((item, index) => {
          return {
            value: +item.quantity,
            name: item.name,
            itemStyle: { color: PieColor[index] }
          }
        })
        pieChart.setOption(vm.pieOption)
        // turnoverPieChart.resize();
      })
  }
  function getOnlineTime () {
    GET('/api/report/barMember/histogram', {
      beginTime: moment(vm.filter.since).format('YYYY-MM-DDT00:00:00'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDT00:00:00')
    })
      .then(data => {
        let max = 0;
        vm.onlineTimeOption.legend.data = []
        vm.onlineTimeOption.series = [];
        vm.onlineTimeOption.xAxis.data = [];
        Object.values(data).forEach((line, seriesIndex) => {
          line.forEach((item, index) => {
            if (seriesIndex === 0) {
              let str;
              if (index === 0) {
                str = 'h 以下'
              } else {
                if (item.interval.search(/-/) === -1) {
                  str = 'h 以上'
                } else {
                  str = 'h'
                }
              }
              vm.onlineTimeOption.xAxis.data.push(item.interval + str)
            }
            if (!vm.onlineTimeOption.legend.data[seriesIndex]) vm.onlineTimeOption.legend.data[seriesIndex] = item.level
            if (!vm.onlineTimeOption.series[seriesIndex]) {
              vm.onlineTimeOption.series[seriesIndex] = {
                name: item.level,
                type: 'bar',
                itemStyle: { color: BarColor[seriesIndex] },
                data: []
              }
            }
            max = Math.max(item.amount, max);
            vm.onlineTimeOption.series[seriesIndex].data.push(item.amount)
          })
        })
        if (max < 10) vm.onlineTimeOption.yAxis.max = 10;
        onlineTimeChart.setOption(vm.onlineTimeOption)
      })
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .graph-pie {
    width: 30%;
    float: left;
    > div {
      height: 400px;
      width: 100%;
    }
  }
  .pie-table {
    width: 70%;
    float: right;
    display: flex;
    height: 100%;
    align-items: center;
    >.pie-table-box{
      flex: 1;
      padding-right: 30px;
      height: 275px;
      .title{
        height: 44px;
        border: 1px solid $border-color;
        color: $text-dark;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        line-height: 42px;
        background-color: #ebebeb;
      }
      ul{
        border-right: 1px solid $border-color;
        border-left: 1px solid $border-color;
        li{
          border-bottom: 1px solid $border-color;
          height: 44px;
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover{
            background-color: #fef9f3;
          }
          .color-block{
            width: 20%;
            text-align: center;
            i{
              width: 16px;
              height: 16px;
              display: inline-block;
            }
          }
          .name{
            width: 50%;
          }
          .figure{
            width: 30%;
          }
        }
      }
    }
  }
  .graph-pie-box{
    position: relative;
    margin-top: -45px;
    margin-bottom: 45px;
    height: 400px;
    background-color: #fafafa;
  }
  .graph-box{
    position: relative;
    margin-top: 10px;
    margin-bottom: 45px;
    >div {
      height: 500px;
    }
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
</style>
