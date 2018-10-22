<template>
  <div class="page-content">
    <div class="page-main clearfix">
      <div class="col-xs-12">
        <div class="row">
          <div class="col-md-8 col-lg-9">
            <div class="row">
              <ul class="h-tabs">
                <li role="presentation" class="active">
                  <a href="#overview" aria-controls="home" role="tab" data-toggle="tab">
                    <span class="icon-box icon-overview"><i class="iconfont icon-gailan"></i></span>
                    概览</a></li>
                <li role="presentation" class="">
                  <a href="#networkFee" aria-controls="home" role="tab" data-toggle="tab" @click="clickTabNF">
                    <span class="icon-box icon-network-fee"><i class="iconfont icon-wangfei"></i></span>
                    网费</a></li>
                <li role="presentation" class="">
                  <a href="#goods" aria-controls="home" role="tab" data-toggle="tab" @click="clickTabGoods">
                    <span class="icon-box icon-goods"><i class="iconfont icon-shangpin1"></i></span>
                    商品</a></li>
                <li role="presentation" class="">
                  <a href="#member" aria-controls="home" role="tab" data-toggle="tab" @click="clickTabMember">
                    <span class="icon-box icon-member"><i class="iconfont icon-huiyuan1"></i></span>
                    会员</a></li>
              </ul>
            </div>
          </div>
          <div class="col-xs-12 col-md-4 col-lg-3">
            <div class="row">
            <div class="h-account-set">
              <img src="../../src/assets/img/boy@100x100.png" alt="">
              <router-link :to="{ name: 'managerBaseInfo'}" class="btn btn-primary btn-outline">账户设置</router-link>
              <router-link :to="{ name: 'login'}" class="btn btn-primary btn-outline">退出登录</router-link>
              <!--<button class="btn btn-primary btn-outline" type="button">账户设置</button>-->
              <!--<button class="btn btn-primary btn-outline" type="button">退出登录</button>-->
            </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-8 col-lg-9 tab-content">
            <div role="tabpanel" class="tab-pane row active" id="overview">
              <div class="panel ov-data clearfix">
                <div class="col-xs-12 col-md-6">
                  <div class="ov-income-box row">
                    <div class="ov-data-header">
                      <div class="text"><i class="iconfont icon-shouru2"></i><span>昨日收入</span></div>
                      <strong>6354.00元</strong>
                    </div>
                    <div class="ov-data-body clearfix">
                      <div class="col-xs-12 col-sm-6">
                        <ul class="row">
                          <li>支付宝收入：</li>
                          <li>微信收入：</li>
                          <li>银联收入：</li>
                          <li>现金收入：</li>
                        </ul>
                      </div>
                      <div class="col-xs-12 col-sm-6">
                        <ul class="row">
                          <li>充值收入：</li>
                          <li>商品收入：</li>
                          <li>上机消费收入：</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3">
                  <div class="ov-online-box row">
                    <div class="ov-data-header">
                      <div class="text"><i class="iconfont icon-shouru2"></i><span>昨日上机人次</span></div>
                      <strong>635人次</strong>
                    </div>
                    <div class="ov-data-body clearfix">
                      <div class="col-xs-12">
                        <ul class="row">
                          <li>新增会员：</li>
                          <li>上机会员：</li>
                          <li>上机临时卡：</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3">
                  <div class="ov-online-time-box row">
                    <div class="ov-data-header">
                      <div class="text"><i class="iconfont icon-shouru2"></i><span>昨日上机时长</span></div>
                      <strong>63小时12分钟13秒</strong>
                    </div>
                    <div class="ov-data-body clearfix">
                      <div class="col-xs-12">
                        <ul class="row">
                          <li>翻机：</li>
                          <li>上座率：</li>
                          <li>单机平均消费：</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-md-6">
                  <div class="panel">
                    <div class="panel-title"><i class="iconfont icon-shouru"></i><span>月收入汇总</span></div>
                    <div class="panel-body clearfix">
                      <div class="graph-box jh-pie-box">
                        <div id="incomeSummary" class="h-pie-content jh-pie-conent"></div>
                      </div>
                      <div class="data-box"></div>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-md-6">
                  <div class="panel">
                    <div class="panel-title"><i class="iconfont icon-huiyuan1"></i><span>月会员情况</span></div>
                    <div class="panel-body">
                      <div class="graph-box jh-pie-box">
                        <div id="memberSummary" class="h-pie-content jh-pie-conent"></div>
                      </div>
                      <div class="data-box"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel ov-operate">
                <div class="panel-title"><i class="iconfont icon-yunying"></i><span>月运营汇总</span></div>
                <div class="panel-body">
                  <div class="col-xs-12 col-sm-6 col-lg-3">
                    <ul>
                      <li><span>新增会员：</span><span class="highlight">28人</span></li>
                      <li><span>上机会员：</span><span class="highlight">28人</span></li>
                      <li><span>上机临时卡：</span><span class="highlight">28人</span></li>
                    </ul>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-lg-3">
                    <ul>
                      <li><span>翻机：</span><span class="highlight">28次</span></li>
                      <li><span>上座率：</span><span class="highlight">28%</span></li>
                      <li><span>上机时长：</span><span class="highlight">12小时2分33秒</span></li>
                    </ul>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-lg-3">
                    <ul>
                      <li><span>上机人次：</span><span class="highlight">28人次</span></li>
                      <li><span>单机平均人次：</span><span class="highlight">28人次/台</span></li>
                    </ul>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-lg-3">
                    <ul>
                      <li><span>上机平均消费：</span><span class="highlight">28元/人</span></li>
                      <li><span>单机平均消费：</span><span class="highlight">28元/台</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane row" id="networkFee">
              <div class="panel nf-total">
                <div class="panel-title"><i class="iconfont icon-yunying"></i><span>本月网费统计</span></div>
                <div class="panel-body">
                  <div class="nf-total-content clearfix">
                    <div class="col-xs-6 col-md-3">
                      <div class="name">本月充值</div>
                      <div class="data">{{networkFee.recharge}}</div>
                      <div class="rate"><i class="arrow arrow-up"></i>同比上月 <span class="up">{{networkFee.rechargePer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">本月赠送</div>
                      <div class="data">{{networkFee.gift}}</div>
                      <div class="rate"><i class="arrow arrow-up"></i>同比上月 <span class="up">{{networkFee.giftPer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">上机消费</div>
                      <div class="data">{{networkFee.onlineAmount}}</div>
                      <div class="rate"><i class="arrow arrow-down"></i>同比上月 <span class="down">{{networkFee.onlineAmountPer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">赠送消费</div>
                      <div class="data">{{networkFee.giftAmount}}</div>
                      <div class="rate"><i class="arrow arrow-up"></i>同比上月 <span class="up">{{networkFee.giftAmountPer}}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel">
                <div class="panel-title"><i class="iconfont icon-zaixianhuiyuan1"></i><span>本月上机汇总</span></div>
                <div class="panel-body">
                  <div id="nfOnline" class="h-line-content"></div>
                </div>
              </div>
              <div class="panel">
                <div class="panel-title"><i class="iconfont icon-zhifuguanli"></i><span>本月充值汇总</span></div>
                <div class="panel-body">
                  <div id="nfRecharge" class="h-line-content"></div>
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane row" id="goods">
              <div class="panel goods-total">
                <div class="panel-title"><i class="iconfont icon-yunying"></i><span>本月商品统计</span></div>
                <div class="panel-body">
                  <div class="goods-total-content clearfix">
                    <div class="col-xs-6 col-md-3">
                      <div class="name">销售金额</div>
                      <div class="data">{{goods.amount}}</div>
                      <div class="rate">
                        <i class="arrow"  :class="{'arrow-up': parseInt(goods.amountPer) > 0, 'arrow-down':  parseInt(goods.amountPer) < 0}"></i>同比上月
                        <span :class="{'up': parseInt(goods.amountPer) > 0, 'down':  parseInt(goods.amountPer) < 0}">{{goods.amountPer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">销售件数</div>
                      <div class="data">{{goods.saleQuantity}}</div>
                      <div class="rate">
                        <i class="arrow"  :class="{'arrow-up': parseInt(goods.saleQuantityPer) > 0, 'arrow-down':  parseInt(goods.saleQuantityPer) < 0}"></i>同比上月
                        <span :class="{'up': parseInt(goods.saleQuantityPer) > 0, 'down':  parseInt(goods.saleQuantityPer) < 0}">{{goods.saleQuantityPer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">盈利金额</div>
                      <div class="data">{{goods.profitAmount}}</div>
                      <div class="rate">
                        <i class="arrow"  :class="{'arrow-up': parseInt(goods.profitAmountPer) > 0, 'arrow-down':  parseInt(goods.profitAmountPer) < 0}"></i>同比上月
                        <span :class="{'up': parseInt(goods.profitAmountPer) > 0, 'down':  parseInt(goods.profitAmountPer) < 0}">{{goods.profitAmountPer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">赠送件数</div>
                      <div class="data">{{goods.giftQuantity}}</div>
                      <div class="rate">
                        <i class="arrow"  :class="{'arrow-up': parseInt(goods.giftQuantityPer) > 0, 'arrow-down':  parseInt(goods.giftQuantityPer) < 0}"></i>同比上月
                        <span :class="{'up': parseInt(goods.giftQuantityPer) > 0, 'down':  parseInt(goods.giftQuantityPer) < 0}">{{goods.giftQuantityPer}}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel">
                <div class="panel-title"><i class="iconfont icon-zaixianhuiyuan1"></i><span>本月订单来源</span></div>
                <div class="panel-body">
                  <div id="goodsOrder" class="h-line-content"></div>
                </div>
              </div>
              <div class="panel">
                <div class="panel-title"><i class="iconfont icon-zhifuguanli"></i><span>本月用户消费金额</span></div>
                <div class="panel-body">
                  <div id="goodsExpense" class="h-line-content"></div>
                </div>
              </div>
              <div class="panel">
                <div class="panel-title"><i class="iconfont icon-zhifuguanli"></i><span>本月销售商品件数</span></div>
                <div class="panel-body">
                  <div id="goodsSaleNum" class="h-line-content"></div>
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane row " id="member">
              <div class="panel m-total">
                <div class="panel-title"><i class="iconfont icon-yunying"></i><span>本月会员统计</span></div>
                <div class="panel-body">
                  <div class="m-total-content clearfix">
                    <div class="col-xs-6 col-md-3">
                      <div class="name">总会员数</div>
                      <div class="data">{{member.allMember}}</div>
                      <div class="rate">
                        <i class="arrow" :class="{'arrow-up': parseInt(member.allMemberPer) > 0, 'arrow-down': parseInt(member.allMemberPer) < 0}"></i>同比上月
                        <span :class="{'up': parseInt(member.allMemberPer) > 0, 'down':  parseInt(member.allMemberPer) < 0}">{{member.allMemberPer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">新增会员</div>
                      <div class="data">{{member.newMember}}</div>
                      <div class="rate">
                        <i class="arrow" :class="{'arrow-up': parseInt(member.newMemberPer) > 0, 'arrow-down':  parseInt(member.newMemberPer) < 0}"></i>同比上月
                        <span :class="{'up': parseInt(member.newMemberPer) > 0, 'down':  parseInt(member.newMemberPer) < 0}">{{member.newMemberPer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">沉淀会员</div>
                      <div class="data">{{member.dummyMember}}</div>
                      <div class="rate">
                        <i class="arrow" :class="{'arrow-up': parseInt(member.dummyMemberPer) > 0, 'arrow-down':  parseInt(member.dummyMemberPer) < 0}"></i>同比上月
                        <span :class="{'up': parseInt(member.dummyMemberPer) > 0, 'down':  parseInt(member.dummyMemberPer) < 0}">{{member.dummyMemberPer}}</span></div>
                    </div>
                    <div class="col-xs-6 col-md-3">
                      <div class="name">会员激活数</div>
                      <div class="data"></div>
                      <div class="rate"><i class="arrow arrow-up"></i>同比上月 <span class="up"></span></div>
                    </div>
                  </div>
                  <div class="m-level-content">
                    <span v-for="(item, index) in member.memberByLevel" v-if="member.memberByLevel" :key="index">{{item.levelName}}：{{item.amount}}</span>
                  </div>
                </div>
              </div>
              <div class="panel">
                <div class="panel-title"><i class="iconfont icon-zaixianhuiyuan1"></i><span>本月会员变化</span></div>
                <div class="panel-body">
                  <div id="memberChange" class="h-line-content"></div>
                </div>
              </div>
              <div class="panel">
                <div class="panel-title"><i class="iconfont icon-zhifuguanli"></i><span>会员年龄性别统计</span></div>
                <div class="panel-body m-age-gender-body">
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 col-lg-3 jh-pie-box">
                      <div id="memberAge" class="h-pie-content jh-pie-content"></div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-lg-3">
                      <ul>
                        <li @mouseover="pieAgeSelect(0)" @mouseout="pieAgeUnSelect(0)">
                          <div class="color-block"><i :style="`background-color: ${pieColor[0]}`"></i></div>
                          <div class="name">18-24岁</div>
                          <div class="figure">{{memberAG.eighteenToTwentyFour}}人({{memberAG.eighteenToTwentyFourPer}})</div>
                        </li>
                        <li @mouseover="pieAgeSelect(1)" @mouseout="pieAgeUnSelect(1)">
                          <div class="color-block"><i :style="`background-color: ${pieColor[1]}`"></i></div>
                          <div class="name">25-30岁</div>
                          <div class="figure">{{memberAG.twentyFiveToThirty}}人({{memberAG.twentyFiveToThirtyPer}})</div>
                        </li>
                        <li @mouseover="pieAgeSelect(2)" @mouseout="pieAgeUnSelect(2)">
                          <div class="color-block"><i :style="`background-color: ${pieColor[2]}`"></i></div>
                          <div class="name">31-40岁</div>
                          <div class="figure">{{memberAG.thirtyOneToForty}}人({{memberAG.thirtyOneToForty}})</div>
                        </li>
                        <li @mouseover="pieAgeSelect(3)" @mouseout="pieAgeUnSelect(3)">
                          <div class="color-block"><i :style="`background-color: ${pieColor[3]}`"></i></div>
                          <div class="name">40岁以上</div>
                          <div class="figure">{{memberAG.aboveForty}}人({{memberAG.aboveFortyPer}})</div>
                        </li>
                      </ul>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-lg-3 jh-pie-box">
                      <div id="memberGender" class="h-pie-content jh-pie-content"></div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-lg-3">
                      <ul>
                        <li @mouseover="pieGenderSelect(0)" @mouseout="pieGenderUnSelect(0)">
                          <div class="color-block"><i style="background-color: #32c4d8"></i></div>
                          <div class="name">男</div>
                          <div class="figure">{{memberAG.men}}人({{memberAG.menPer}})</div>
                        </li>
                        <li @mouseover="pieGenderSelect(1)" @mouseout="pieGenderUnSelect(1)">
                          <div class="color-block"><i style="background-color: #f395fe"></i></div>
                          <div class="name">女</div>
                          <div class="figure">{{memberAG.women}}人({{memberAG.womenPer}})</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-4 col-lg-3">
            <aside>
              <div class="panel">
                <a class="panel-title" href="javascript:;">
                  <div><i class="iconfont icon-special-offer"></i><span>月商品销售排行榜TOP5</span></div>
                  <div class="more">&gt;&gt;</div>
                </a>
                <div class="panel-body">
                  <table class="table">
                    <tr v-for="(item, index) in goodsTop" :key="index">
                      <td v-if="index < 3"><span :class="`top${index+1}`"></span></td>
                      <td v-if="index >= 3">{{index+1}}</td>
                      <td>{{item.id}}</td><td>{{item.name}}</td><td>{{item.quantity}}件</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="panel">
                <!--<div class="panel-title"><i class="iconfont icon-shouru1"></i><span>月充值会员排行榜TOP5</span></div>-->
                <a class="panel-title" href="javascript:;">
                  <div><i class="iconfont icon-shouru1"></i><span>月充值会员排行榜TOP5</span></div>
                  <div class="more">&gt;&gt;</div>
                </a>
                <div class="panel-body">
                  <table class="table">
                    <tr v-for="(item, index) in rechargeTop" :key="index">
                      <td v-if="index < 3"><span :class="`top${index+1}`"></span></td>
                      <td v-if="index >= 3">{{index+1}}</td>
                      <td>{{item.name}}</td><td>{{item.level}}</td><td>{{item.amount}}元</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="panel">
                <!--<div class="panel-title"><i class="iconfont icon-computer"></i><span>月上机消费排行榜TOP5</span></div>-->
                <a class="panel-title" href="javascript:;">
                  <div><i class="iconfont icon-computer"></i><span>月上机消费排行榜TOP5</span></div>
                  <div class="more">&gt;&gt;</div>
                </a>
                <div class="panel-body">
                  <table class="table">
                    <tr v-for="(item, index) in expenseTop" :key="index">
                      <td v-if="index < 3"><span :class="`top${index+1}`"></span></td>
                      <td v-if="index >= 3">{{index+1}}</td>
                      <td>{{item.name}}</td><td>{{item.level}}</td><td>{{item.amount}}元</td>
                    </tr>
                  </table>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import moment from 'moment'
  import {GET} from '../core/http'
  import {PieColor} from '../assets/js/echartColorOption.js'
  let vm, incomePieChart, memberGaugeChart, memberAgePieChart, memberGenderPieChart, memberLineChart,
    nfOnlineChart, nfRechargeChart, goodsOrderChart, goodsExpenseChart, goodsSaleNumChart
  export default {
    name: 'index',
    data () {
      return {
        pieColor: PieColor,
        goodsTop: [],
        rechargeTop: [],
        expenseTop: [],
        networkFee: {},
        goods: {},
        member: {},
        memberAG: {},
        pieBaseOption: {
          backgroundColor: '#fff',
          title: {
            x: 'center',
            y: 'center'
          },
          tooltip: { trigger: 'item' },
          series: [
            { type: 'pie', label: {show: false}, labelLine: {show: false}, data: [], radius: ['55%', '80%'] }
          ]
        },
        lineBaseOption: {
          tooltip: { trigger: 'axis' },
          xAxis: { name: '日期/日', data: [] },
          yAxis: { name: '会员人数/人' },
          // grid: {top: 100, bottom: 80},
          legend: { data: [] },
          series: []
        },
        lineDataBaseOption: {
          type: 'line',
          smooth: true,
          areaStyle: {opacity: 0.1}
        },
        gaugeMemberOption: {
          series: []
        }
      }
    },
    methods: {
      clickTabNF() {
        setTimeout(function () {
          nfOnlineChart.resize();
          nfRechargeChart.resize();
        })
      },
      clickTabGoods() {
        setTimeout(function () {
          goodsOrderChart.resize();
          goodsExpenseChart.resize();
          goodsSaleNumChart.resize();
        })
      },
      clickTabMember() {
        setTimeout(function () {
          memberLineChart.resize();
          memberAgePieChart.resize();
          memberGenderPieChart.resize();
        })
      },
      pieAgeSelect(index) {
        memberAgePieChart.dispatchAction({
          type: 'highlight',
          dataIndex: index
        })
      },
      pieAgeUnSelect(index) {
        memberAgePieChart.dispatchAction({
          type: 'downplay',
          dataIndex: index
        })
      },
      pieGenderSelect(index) {
        memberGenderPieChart.dispatchAction({
          type: 'highlight',
          dataIndex: index
        })
      },
      pieGenderUnSelect(index) {
        memberGenderPieChart.dispatchAction({
          type: 'downplay',
          dataIndex: index
        })
      }
    },
    mounted () {
      incomePieChart = echarts.init(document.getElementById('incomeSummary'));
      memberGaugeChart = echarts.init(document.getElementById('memberSummary'));
      nfOnlineChart = echarts.init(document.getElementById('nfOnline'));
      nfRechargeChart = echarts.init(document.getElementById('nfRecharge'));
      goodsOrderChart = echarts.init(document.getElementById('goodsOrder'));
      goodsExpenseChart = echarts.init(document.getElementById('goodsExpense'));
      goodsSaleNumChart = echarts.init(document.getElementById('goodsSaleNum'));
      memberLineChart = echarts.init(document.getElementById('memberChange'));
      memberAgePieChart = echarts.init(document.getElementById('memberAge'));
      memberGenderPieChart = echarts.init(document.getElementById('memberGender'));
      let graphBox = $('.jh-pie-box');
      $('.j-graph-content').css({
        width: `${graphBox.width()}px`
      })
      window.onresize = function () {
        $('.jh-pie-conent').css({
          width: `${graphBox.width()}px`
        })
        incomePieChart.resize();
        memberGaugeChart.resize();
        nfOnlineChart.resize();
        nfRechargeChart.resize();
        goodsOrderChart.resize();
        goodsExpenseChart.resize();
        goodsSaleNumChart.resize();
        memberLineChart.resize();
        memberAgePieChart.resize();
        memberGenderPieChart.resize();
      }
    },
    created () {
      vm = this
      getGaugeMember();
      getNF();
      getLineNFOnline();
      getLineNfRecharge();
      getGoods();
      getBarGoodsOrder();
      getLineGoodsExpense();
      getLineGoodsSalesNum();
      getLineMember();
      getPieMember();
      getTop();
    }
  }
  function getGoods () {
    GET('/api/index/consume/goods/').then(data => {
      vm.goods = data;
    })
  }
  function getBarGoodsOrder () {
    GET('/api/index/consume/goods/order').then(data => {
      let option = JSON.parse(JSON.stringify(vm.lineBaseOption));
      option.tooltip['axisPointer'] = { type: 'none' }
      option.yAxis.name = '订单/笔';
      option.xAxis.name = '';
      option.xAxis.data = ['收银台订单笔数', '客户机订单笔数']
      option.series[0] = {
        name: '收银台订单',
        type: 'bar',
        barWidth: '50%',
        itemStyle: { color: '#4ecb74' },
        data: [data.counter, data.computer]
      }
      // option.series[1] = {
      //   name: '客户机订单',
      //   type: 'bar',
      //   itemStyle: { color: '#f76863' },
      //   data: [data.computer]
      // }
      goodsOrderChart.setOption(option)
    })
  }
  function getLineGoodsExpense () {
    GET('/api/index/consume/goods/amount').then(data => {
      let option = JSON.parse(JSON.stringify(vm.lineBaseOption));
      option.yAxis.name = '消费金额/元';
      option.xAxis.data = data.map(item => { return moment(item.date).format('DD') })
      option.series[0] = Object.assign({}, vm.lineDataBaseOption, {
        name: '金额',
        itemStyle: { color: '#d186e8' },
        data: data.map(item => { return item.amount })
      })
      goodsExpenseChart.setOption(option)
    })
  }
  function getLineGoodsSalesNum () {
    GET('/api/index/consume/goods/count').then(data => {
      let option = JSON.parse(JSON.stringify(vm.lineBaseOption));
      option.yAxis.name = '商品件数/件';
      option.xAxis.data = data.map(item => { return moment(item.date).format('DD') })
      option.series[0] = Object.assign({}, vm.lineDataBaseOption, {
        name: '件数',
        itemStyle: { color: '#1890ff' },
        data: data.map(item => { return item.amount })
      })
      goodsSaleNumChart.setOption(option)
    })
  }
  function getLineNFOnline () {
    GET('/api/index/fee/count').then(data => {
      let option = JSON.parse(JSON.stringify(vm.lineBaseOption));
      option.yAxis.name = '上机人数/人';
      option.xAxis.data = data.map(item => { return moment(item.date).format('DD') })
      option.series[0] = Object.assign({}, vm.lineDataBaseOption, {
        name: '人数',
        itemStyle: { color: '#fea129' },
        data: data.map(item => { return item.amount })
      })
      nfOnlineChart.setOption(option)
    })
  }
  function getLineNfRecharge () {
    GET('/api/index/fee/recharge').then(data => {
      let option = JSON.parse(JSON.stringify(vm.lineBaseOption));
      option.yAxis.name = '充值金额/元';
      option.xAxis.data = data.map(item => { return moment(item.date).format('DD') })
      option.series[0] = Object.assign({}, vm.lineDataBaseOption, {
        name: '金额',
        itemStyle: { color: '#4ecb74' },
        data: data.map(item => { return item.amount })
      })
      nfRechargeChart.setOption(option)
    })
  }
  function getNF () {
    GET('/api/index/fee/').then(data => {
      vm.networkFee = data;
    })
  }
  function getLineMember () {
    GET('/api/index/member/change').then(data => {
      let option = JSON.parse(JSON.stringify(vm.lineBaseOption));
      option.legend.data = ['新增会员', '沉淀会员', '活跃会员']
      option.xAxis.data = data.newMb.map(item => { return moment(item.date).format('DD') })
      option.series[0] = Object.assign({}, vm.lineDataBaseOption, {
        name: '新增会员',
        itemStyle: { color: '#9ab222' },
        data: data.newMb.map(item => { return item.amount })
      })
      option.series[1] = Object.assign({}, vm.lineDataBaseOption, {
        name: '沉淀会员',
        itemStyle: { color: '#50555a' },
        data: data.dummyMb.map(item => { return item.amount })
      })
      option.series[2] = Object.assign({}, vm.lineDataBaseOption, {
        name: '活跃会员',
        itemStyle: { color: '#ea433f' },
        data: data.activeMb.map(item => { return item.amount })
      })
      memberLineChart.setOption(option)
    })
  }
  function getPieMember () {
    GET('/api/index/member/gender').then(data => {
      vm.memberAG = data;
      let ageOption = JSON.parse(JSON.stringify(vm.pieBaseOption)),
        genderOption = JSON.parse(JSON.stringify(vm.pieBaseOption));
      ageOption.title.text = '年龄结构'
      genderOption.title.text = '性别结构'
      ageOption.series[0].data = [
        { name: '18-24岁', value: data.eighteenToTwentyFour, itemStyle: { color: PieColor[0] } },
        { name: '25-30岁', value: data.twentyFiveToThirty, itemStyle: { color: PieColor[1] } },
        { name: '31-40岁', value: data.thirtyOneToForty, itemStyle: { color: PieColor[2] } },
        { name: '40岁以上', value: data.aboveForty, itemStyle: { color: PieColor[3] } }
      ]
      genderOption.series[0].data = [
        { name: '男', value: data.men, itemStyle: { color: '#32c4d8' } },
        { name: '女', value: data.women, itemStyle: { color: '#f395fe' } }
      ]
      memberAgePieChart.setOption(ageOption)
      memberGenderPieChart.setOption(genderOption)
    })
  }
  function getGaugeMember () {
    GET('/api/index/member/count').then(data => {
      vm.member = data;
      let count;
      let option = {
        type: 'gauge',
        min: 0,
        max: 10,
        startAngle: 160,
        endAngle: 20,
        splitNumber: 5,
        radius: '60%',
        splitLine: { length: 10 },
        axisTick: { show: false },
        axisLabel: {
          distance: 30,
          formatter: function (value) {
            if (value === 0) count = 0;
            count++;
            if (value === 0 || count === 6) {
              return value;
            }
          }
        },
        title: {
          offsetCenter: [0, '100%'],
          fontWeight: 'bold'
        },
        pointer: {
          width: 2
        }
      }
      vm.gaugeMemberOption.series = [
        Object.assign({}, option, {
          max: formartMax(data.newMember),
          center: ['15%', '50%'],
          axisLine: {
            lineStyle: {
              color: [[data.newMember / formartMax(data.newMember), '#057ae7'], [1, '#e3e3e3']]
            }
          },
          data: [{ name: '新增会员', value: data.newMember }]
        }),
        Object.assign({}, option, {
          max: formartMax(data.dummyMember),
          axisLine: {
            lineStyle: {
              color: [[data.dummyMember / formartMax(data.dummyMember), '#2b9c4e'], [1, '#e3e3e3']]
            }
          },
          data: [{ name: '会员沉淀数', value: data.dummyMember }]
        }),
        Object.assign({}, option, {
          max: formartMax(data.allMember),
          center: ['85%', '50%'],
          axisLine: {
            lineStyle: {
              color: [[data.allMember / formartMax(data.allMember), '#dca30d'], [1, '#e3e3e3']]
            }
          },
          data: [{ name: '会员激活数', value: data.allMember }]
        })
      ]
      memberGaugeChart.setOption(vm.gaugeMemberOption)

    })
  }
  function formartMax (value) {
    if (value < 10) return 10;
    let str = String(value), len = str.length;
    return +(getFirstNum(str.substr(0, 1)) + getZero(len))
  }
  function getFirstNum (first) {
    switch (+first < 5) {
      case true: return '5';
      case false: return '10';
    }
  }
  function getZero (len) {
    let zero = '';
    while (--len) {
      zero += '0';
    }
    return zero;
  }
  function getTop () {
    GET('/api/index/consume/goods/top').then(data => {
      vm.goodsTop = data;
    })
    GET('/api/index/fee/recharge/top').then(data => {
      vm.rechargeTop = data;
    })
    GET('/api/index/fee/consume/top').then(data => {
      vm.expenseTop = data;
    })
  }
</script>

<style scoped lang='scss'>
@import "../sass/index";
</style>
