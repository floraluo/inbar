<template>
  <div class="panel-center ">
    <div class="col-xs-6 text-right">
      <img src="../assets/img/500.png">
    </div>
    <div class="col-xs-6">
      <h1>出错啦！找不到您请求的页面...</h1>
      <button class="btn btn-primary">返回首页<a href="#"></a></button>
    </div>
    <div id="main" ></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import $ from 'jquery'
  let vm
  export default {
    name: "error",
    data () {
      return {
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
      drawPie (id) {
        var charts = this.$echarts.init(document.getElementById(id))
        charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: this.opinion
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  testStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.opinionData
            }
          ]
        })
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.drawPie('main')
      })
    }
  }

</script>

<style lang="scss" scoped>
  @import "../sass/variables";
  .panel-center{
    height: calc(100vh - #{$nav-height} - #{$tab-height} - #{$footer-height});
    display: flex;
    align-items: center;
  }

</style>
