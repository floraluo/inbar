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
      <div id="lineBar" class="j-graph-content graph-line-bar"></div>
    </div>
    <div class="graph-box graph-pie-box">
      <div class="graph-pie"><div id="turnoverPie" class="j-pie-graph-content "></div></div>
      <div class="graph-pie"><div id="salePie" class="j-pie-graph-content "></div></div>
      <div class="graph-pie"><div id="orderPie" class="j-pie-graph-content "></div></div>
    </div>
      <v-table is-horizontal-resize
               style="width:100%"
               row-hover-color="#eee"
               row-click-color="#edf7ff"
               title-bg-color="#ebebeb"
               :title-row-height="52"
               :columns="goodsColumns"
               :table-data="goods"
               :show-vertical-border="false"></v-table>
    <div class="paging" v-if="goodsPage.totalPage > 1">
      <v-pagination :total="goodsPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
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
  import {PieColor} from '../../assets/js/echartColorOption.js'
  let vm, lineBarChart, pieChart, turnoverPieChart, salePieChart, orderPieChart;
  export default {
    name: 'graph-goods',
    components: { DatePicker },
    data () {
      return {
        isLineBarInit: true,
        isPieInit: true,
        filter: {
          // since: new Date().setDate(new Date().getDate() - 8),
          // until: new Date().setDate(new Date().getDate() - 1)
          since: '2018-08-09',
          until: '2018-09-08'
        },
        lineBar: {
          backgroundColor: '#fafafa',
          title: { text: '畅销商品TOP20销售分析', x: 'center', top: 30 },
          tooltip: { trigger: 'axis' },
          xAxis: { axisLabel: {interval: 0, rotate: 15}, data: [] },
          yAxis: [
            { type: 'value', name: '件数/件', nameTextStyle: {color: '#6dbdfa'}, min: 0, max: 300, interval: 60 },
            { type: 'value', name: '营业额/元', nameTextStyle: {color: '#f76863'}, min: 0, max: 15000, interval: 3000 }
          ],
          grid: {top: 100, bottom: 80},
          series: [
            { name: '件数', type: 'bar', itemStyle: { color: '#6dbdfa' }, data: [] },
            { name: '营业额', type: 'line', itemStyle: { color: '#f76863' }, data: [], yAxisIndex: 1 }
          ]
        },
        pieBaseOption: {
          backgroundColor: '#fafafa',
          title: {
            x: 'center',
            y: 'center'
          },
          tooltip: { trigger: 'item' },
          series: [
            { type: 'pie', data: [], radius: ['40%', '60%'] }
            // { type: 'pie', data: [], name: '营业额统计' },
            // { type: 'pie', data: [], name: '销售数量统计' },
            // { type: 'pie', data: [], name: '订单数统计' }
          ]
        },
        pieMedia: [
          {
            query: { maxWidth: 500 },
            option: {
              series: [
                { center: ['50%', '25%'] },
                { center: ['50%', '50%'] },
                { center: ['50%', '75%'] }
              ]
            }
          },
          {
            query: { maxWidth: 1399 },
            option: {
              series: [
                { radius: ['20%', '40%'], center: ['16.6%', '50%'] },
                { radius: ['20%', '40%'], center: ['50%', '50%'] },
                { radius: ['20%', '40%'], center: ['83.4%', '50%'] }
              ]
            }
          }
        ],
        goodsListParams: {
          page: 0,
          size: 10
        },
        goodsPage: {
          totalPage: 0,
          amount: 0
        },
        goods: [],
        goodsColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'goodsSerial', title: '商品编码', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsName', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'total', title: '订单数量', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'amount', title: '销售件数', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'amount', title: '销售金额', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'buyNum', title: '购买人数', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {title: '分布', width: 200, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData) => {
            return `单品(${rowData.single}), 套餐(${rowData.setmealNum}), 赠送(${rowData.giftNum})`
            }}
        ]
      }
    },
    methods: {
      searchByTime() {
        getLineBar(); //created
        getPie(); //created
        getGoods() //created
      },
      pageChange(pageIndex) {
        this.goodsListParams.page = pageIndex - 1;
        getGoods(); //pageChange
      },
      pageSizeChange(newPageSize) {
        this.goodsListParams.size = newPageSize;
        getGoods(); //pageSizeChange
      }
    },
    created () {
      vm = this
      getLineBar(); //created
      getPie(); //created
      getGoods() //created
    },
    mounted () {
      lineBarChart = echarts.init(document.getElementById('lineBar'));
      turnoverPieChart = echarts.init(document.getElementById('turnoverPie'));
      salePieChart = echarts.init(document.getElementById('salePie'));
      orderPieChart = echarts.init(document.getElementById('orderPie'));
      let $pageMain = $('.page-main');
      $('.j-graph-content').css({
        width: `${$pageMain.width()}px`
      })
      // $('.j-pie-graph-content').css({
      //   width: `${$pageMain.width() / 3}px`
      // })
      if (document.body.clientWidth < 992) {
        $('.j-pie-graph-content').css({
          width: `${$pageMain.width()}px`
        })
      } else {
        $('.j-pie-graph-content').css({
          width: `${$pageMain.width() / 3.1}px`
        })
      }
      window.onresize = function () {
        $('.j-graph-content').css({
          width: `${$pageMain.width()}px`
        })
        if (document.body.clientWidth < 992) {
          $('.j-pie-graph-content').css({
            width: `${$pageMain.width()}px`
          })
        } else {
          $('.j-pie-graph-content').css({
            width: `${$pageMain.width() / 3.1}px`
          })
        }

        lineBarChart.resize();
        // pieChart.resize();
        turnoverPieChart.resize();
        salePieChart.resize();
        orderPieChart.resize();
      }
    }
  }
  function getLineBar () {
    GET('/api/cashier/business/selectTopGoods', {
      startTime: moment(vm.filter.since).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDTHH:mm:ss')
    }).then(data => {
      let max1 = 0, max2 = 0;
      vm.lineBar.series[0].data = [];
      vm.lineBar.series[1].data = [];
      vm.lineBar.xAxis.data = []
      data.forEach((item, index) => {
        vm.lineBar.xAxis.data.push(item.goodsName);
        max1 = Math.max(item.total, max1);
        max2 = Math.max(item.amount, max2);
        vm.lineBar.series[0].data.push(+item.total);
        vm.lineBar.series[1].data.push(+item.amount);
      })
      let interval = 5
      vm.lineBar.yAxis[0].max = vm.$options.filters.formatYAxis(max1, interval);
      vm.lineBar.yAxis[1].max = vm.$options.filters.formatYAxis(max2, interval);
      vm.lineBar.yAxis[0].interval = vm.lineBar.yAxis[0].max / interval
      vm.lineBar.yAxis[1].interval = vm.lineBar.yAxis[1].max / interval
      lineBarChart.setOption(vm.lineBar)
    })
  }
  function getPie () {
    GET('/api/cashier/business/selectGoodsAndSetmealSales', {
      startTime: moment(vm.filter.since).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDTHH:mm:ss')
    })
      .then(data => {
      let option = JSON.parse(JSON.stringify(vm.pieBaseOption)), color = ['#1890ff', '#f76863'];
      option.title.text = option.series[0].name = '营业额统计';
      option.series[0].data = data.map((item, index) => {
        let name;
        switch (+item.goodsType) {
          case 1: name = '单独商品'; break;
          case 4: name = '商品套餐'; break;
        }
        return {
          value: +item.amount,
          name,
          itemStyle: { color: color[index] }
        }
      });
      turnoverPieChart.setOption(option)
      turnoverPieChart.resize();
    })
    GET('/api/cashier/business/selectGiftGoodsAndSetmeal', {
      startTime: moment(vm.filter.since).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDTHH:mm:ss')
    })
      .then(data => {
        let option = JSON.parse(JSON.stringify(vm.pieBaseOption));
        option.title.text = option.series[0].name = '销售数量统计';
        option.series[0].data = data.map((item, index) => {
          let name, color;
          switch (+item.goodsType) {
            case 1: name = '单独商品'; color = '#fbd674'; break;
            case 4: name = '商品套餐'; color = '#4ecb74'; break;
            case 5: name = '充值赠送'; color = '#f76863'; break;
          }
          return {
            value: +item.num,
            name,
            itemStyle: { color }
          }
        })
        salePieChart.setOption(option)
        salePieChart.resize();
      })
    GET('/api/cashier/business/selectTopSetmealNum', {
      startTime: moment(vm.filter.since).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDTHH:mm:ss')
    })
      .then(data => {
        let option = JSON.parse(JSON.stringify(vm.pieBaseOption));
        option.title.text = option.series[0].name = '订单数统计';
        option.series[0].data = data.map((item, index) => {
          return {
            value: +item.num,
            name: item.goodsName,
            itemStyle: { color: PieColor[index] }
          }
        })
        orderPieChart.setOption(option)
        orderPieChart.resize();
      })
  }
  function getGoods () {
    GET('/api/cashier/business/selectBgGoodsNum', {
      page: vm.goodsListParams.page,
      size: vm.goodsListParams.size,
      sort: 'amount,desc',
      startTime: moment(vm.filter.since).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(vm.filter.until).format('YYYY-MM-DDTHH:mm:ss')
    }).then(data => {
      vm.goodsPage.totalPage = data.totalPages;
      vm.goodsPage.amount = data.totalElements;
      vm.goods = data.content;
    })
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .page-main{
    padding-bottom: 20px;
  }
  .graph-box{
    position: relative;
    margin-top: 10px;
    margin-bottom: 45px;
    .graph-line-bar {
      height: 570px;
    }
    .graph-pie{
      flex: 1;
      background-color: #fafafa;
      >div{
        height: 450px;
      }
      @media (max-width: $screen-sm-max) {
        width: 100%;
      }
    }
  }
  .graph-pie-box{
    display: flex;
    flex-wrap: wrap;
  }
</style>
