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
      <div class="clearfix">
        <div class="btn-group">
          <button class="btn btn-default" :class="{'btn-primary': item.type === currentTimeCategory.type}"  type="button" @click="getIncomeByTimeCat(item)" v-for="(item, index) in timeCategory" :key="index">{{item.name}}</button>
        </div>
      </div>
      <div class="inbar-income">
        <div id="inbarIncome"></div>
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
  let vm, barIncomeChart;
  export default {
    name: 'graph-income',
    components: { DatePicker },
    data () {
      return {
        currentTimeCategory: {type: 'week', name: '周'},
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
        inbarIncome: {
          title: {
            text: '网吧收入统计表'
          },
          tooltip: { trigger: 'axis' },
          legend: {
            data: ['网费充值', '商品销售']
          },
          xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六']
          },
          yAxis: {
            name: '金额/万元'
          },
          series: [{
            name: '网费充值',
            type: 'line',
            stack: '总量',
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
            {
              name: '商品销售',
              type: 'line',
              stack: '总量',
              smooth: true,
              data: [220, 182, 191, 234, 290, 330, 310]
            }]
        }
      }
    },
    methods: {
      getIncomeByTimeCat(category) {
        this.currentTimeCategory = category;
        if (category.type === 'quarter' || category.type === 'month' || category.type === 'week') {
          this.inbarIncome.xAxis.data = time[category.type]
        } else if (category.type === 'year') {

        } else if (category.type === 'day') {

        }
        barIncomeChart.setOption(this.inbarIncome);
      }
    },
    created () {
      vm = this
    },
    mounted () {
      barIncomeChart = echarts.init(document.getElementById('inbarIncome'));
      barIncomeChart.setOption(this.inbarIncome);
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .graph-box{
    position: relative;
    .btn-group{
      float: right;
      margin-bottom: 20px;
    }
  }
  .inbar-income{
    max-width: 1600px;
    overflow-x: auto;
    /*height: 500px;*/
    >div{
      width: 1240px;
      height: 500px;
    }
  }
</style>
