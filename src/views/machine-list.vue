<template>
  <div class="page">
    <div class="page-content  "  >
      <div class="row">
        <div class="col-lg-4 col-sm-6 col-xs-12 ">
          <div class="panel  widgets">
            <div class="col-xs-6 text-center graph-pie">
              <div id="totalPie" class="j-pie-graph-content pie-graph-content "></div>
            </div>
            <div class="col-xs-6 padding-top-45">
              <p class="padding-bottom-10">机器总数</p>
              <span class="counter-number " style="color:#4659ed ">{{machineStatistic.allMachine}}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-xs-12">
          <div class="panel  widgets">
            <div class="graph-pie col-xs-6 text-center ">
              <div id="usedPie" class="j-pie-graph-content pie-graph-content"></div>
            </div>
            <div class="col-xs-6 padding-top-45">
              <p class="padding-bottom-10 ">使用机器</p>
              <span class="counter-number" style="color:#ff3268 ">{{machineStatistic.useMachine}}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-xs-12">
          <div class="widgets  panel">
            <div class="col-xs-6 text-center graph-pie">
              <div id="overedPie" class="j-pie-graph-content pie-graph-content"></div>
            </div>
            <div class="col-xs-6 padding-top-45">
              <p class="padding-bottom-10">空余机器</p>
              <span class="counter-number" style="color:#049c49 ">{{machineStatistic.overMachine}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="panel padding-20">
        <div class="row  form-top-box">
          <form class="form-inline padding-left-15 padding-right-15">
            <ul>
              <li class="form-group ">
                <label class="control-label" >机器号</label>
                <input type="text" class="form-control" placeholder="请输入" v-model="machineId">
              </li>
              <li class="form-group ">
                <label class="control-label" >区域</label>
                <input type="text" class="form-control" placeholder="请输入" v-model="area">
              </li>
              <li class="form-group ">
                <button type="submit" class="btn  btn-primary" @click="filterList">查询</button>
                <button type="submit" class="btn  btn-success margin-left-20">刷新</button>
              </li>
            </ul>
          </form>
        </div>
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
                 :columns="machineColumns"
                 :table-data="machines"
                 :show-vertical-border="false" ></v-table>
        <div class="paging" v-if="machinePage.totalPage > 1">
          <v-pagination :total="machinePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'
  import layer from '../../static/vendor/layer/layer'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../core/http'
  import {PieColor} from '../assets/js/echartColorOption.js'
  let vm, lineBarChart, pieChart, totalPieChart, usedPiePieChart, overedPieChart;
  export default {
    name: "machine-list",
    data(){
      return{
        pieColor: PieColor,
        isPieInit: true,
        tableLoading: false,
        machines: [],
        machineStatistic: {},
        machineTotalPage: null,
        machineId: '',
        area: '',
        pieData: [],
        pieBaseOption: {
          title: {
            x: 'center',
            y: 'center'
          },
          series: [
            { type: 'pie', data: [], radius: ['40%', '60%'], labelLine: {show: false}, label: {show: false}, clockwise: false, hoverAnimation: false, legendHoverLink: false }
          ]
        },
        machineListParam: {
          page: 0,
          size:10,
          sort:'activeAt,desc'
        },
        machinePage: {
          totalPage: 0,
          amount: 0,
        },
        machineColumns: [
          { title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true,formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'machineId', title: '机器号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'ip', title: '机器IP', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'area', title: '区域', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'currentUser', title: '当前用户', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'name', title: '用户姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'onLineTime', title: '上网时长', width: 100, titleAlign: 'center', columnAlign: 'center',  isResize: true},
          {field: 'orderState', title: '状态', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              let stateName, html;
              if (rowData.name===''||rowData.name==null) {
                stateName = '空闲';
                html = `<i class="spread-circle green"></i>${stateName}`;
              }
              else {
                stateName = '在线';
                html = `<i class="spread-circle red"></i>${stateName}`;
              }
              return html;
            }
          },

        ],
      }
    },
    methods: {
      filterList() {
        if (this.machineId) {
          vm.machineListParam.machineId = this.machineId;
        } else {
          delete  vm.machineListParam.machineId
        }
        if (this.area) {
          vm.machineListParam.area = this.area;
        } else {
          delete   vm.machineListParam.area
        }
        getAllMachine()
      },
      pageChange(pageIndex) {
        vm.machineListParam.page = pageIndex - 1;
        getAllMachine();
      },
      pageSizeChange(newPageSize) {
        vm.machineListParam.size = newPageSize;
        getAllMachine();
      },
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created() {
      vm = this;
      getAllMachine();
      getMachineStatistic();
      getPie(); //created
    },
    mounted () {
      totalPieChart = echarts.init(document.getElementById('totalPie'));
      usedPiePieChart = echarts.init(document.getElementById('usedPie'));
      overedPieChart = echarts.init(document.getElementById('overedPie'));
      let $pageMain = $('.page-main');
      $('.j-graph-content').css({
        width: `${$pageMain.width()}px`
      });
      if (document.body.clientWidth < 180) {
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
        });
        if (document.body.clientWidth <180) {
          $('.j-pie-graph-content').css({
            width: `${$pageMain.width()}px`
          })
        } else {
          $('.j-pie-graph-content').css({
            width: `${$pageMain.width() / 3.1}px`
          })
        }
        totalPieChart.resize();
        usedPiePieChart.resize();
        overedPieChart.resize();
      }
    }
  }
  function getAllMachine () {
    vm.tableLoading = true;
    GET('/api/machine/', vm.machineListParam)
      .done((data) => {
        vm.tableLoading = false;
        vm.machinePage.totalPage = data.totalPages;
        vm.machinePage.amount = data.totalElements;
        vm.machines = data.content;
      })
  }
  function getMachineStatistic() {
    GET('/api/machine/count')
      .done((data) => {
        vm.machineStatistic = data;
      })
  }
  function getPie () {
    GET('/api/machine/count')
      .then(data => {
        let totalOption, useOption, overOption;
        totalOption = JSON.parse(JSON.stringify(vm.pieBaseOption));
        useOption = JSON.parse(JSON.stringify(vm.pieBaseOption));
        overOption = JSON.parse(JSON.stringify(vm.pieBaseOption));
        totalOption.title.text = totalOption.series[0].name= data.allPercent;
        useOption.title.text = totalOption.series[0].name= data.usePercent;
        overOption.title.text = totalOption.series[0].name= data.overPercent;
        totalOption.series[0].data = [
          {value:data.allMachine, name: data.allMachine, itemStyle: {color: '#586af0'}, emphasis: {itemStyle: {color: '#586af0'}}},
        ];
        useOption.series[0].data = [
          {value:data.useMachine, name: data.usePercent, itemStyle: {color: '#ff3163'}, emphasis: {itemStyle: {color: '#ff3163'}}},
          {value:data.overMachine, name: data.overPercent, itemStyle: {color: '#f0f2f5'}, emphasis: {itemStyle: {color: '#f0f2f5'}}}
        ];
        overOption.series[0].data = [
          {value:data.overMachine, name: data.overPercent, itemStyle: {color: '#0fa754'}, emphasis: {itemStyle: {color: '#0fa754'}}},
          {value:data.useMachine, name: data.usePercent, itemStyle: {color: '#f0f2f5'}, emphasis: {itemStyle: {color: '#f0f2f5'}}}
        ] ;
        totalPieChart.setOption(totalOption)
        usedPiePieChart.setOption(useOption)
        overedPieChart.setOption(overOption)
      });
  }
</script>

<style scoped lang="scss">
  @import "../sass/online-members";
  .pie-graph-content{
    height: 180px;
  }
</style>
