<template>
  <div class="page">
    <div class="page-content  "  >
      <div class="row">
        <div class="col-lg-4 col-sm-6 col-xs-12 ">
          <div class="panel  widget">
            <div class="col-xs-6 text-center ">
              <div class="graph-pie"><div id="turnoverPie" class="j-pie-graph-content "></div></div>
            </div>
            <div class="col-xs-6 ">
              <p class="padding-bottom-10">机器总数</p>
              <span class="counter-number " style="color:#4659ed ">{{machineStatistic.allMachine}}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-xs-12">
          <div class="panel  widget">
            <div class="col-xs-6 text-center ">
              <img src="../assets/online1.gif" alt="">
            </div>
            <div class="col-xs-6 ">
              <p class="padding-bottom-10 ">使用机器</p>
              <span class="counter-number" style="color:#ff3268 ">{{machineStatistic.useMachine}}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-xs-12">
          <div class="widget  panel">
            <div class="col-xs-6 text-center">
              <img src="../assets/online3.gif">
            </div>
            <div class="col-xs-6 ">
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
  import '../../static/vendor/layer/layer'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../core/http'
  import {PieColor} from '../assets/js/echartColorOption'
  let vm, lineBarChart, pieChart, turnoverPieChart, salePieChart, orderPieChart;
  export default {
    name: "machine-list",
    data(){
      return{
        tableLoading: false,
        isPieInit: true,
        machines: [],
        machineStatistic: {},
        machineTotalPage: null,
        machineId: '',
        area: '',
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
        charts: '',
        opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        opinionData: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
        ]
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
    // mounted () {
    //   this.$nextTick(function () {
    //     this.drawPie('main')
    //   })
    // },
    created() {
      vm = this;
      getAllMachine();
      getMachineStatistic();
      getPie(); //created
    },
    mounted () {
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
        turnoverPieChart.resize();
        salePieChart.resize();
        orderPieChart.resize();
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
        let option = JSON.parse(JSON.stringify(vm.pieBaseOption)), color = ['#1890ff', '#f76863'];
        option.title.text = option.series[0].name = '营业额统计';
        option.series[0].data = data.map((item, index) => {
          return {
            value: +item.allPercent,
            itemStyle: { color: PieColor[index] }
          }
        });
        turnoverPieChart.setOption(option)
        turnoverPieChart.resize();
      })
     }
 </script>


<style scoped lang="scss">
  @import "../sass/online-members";
</style>
