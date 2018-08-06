<template>
    <div class="page">
      <div class="page-content" :class="{ 'has-menubar': $route.meta.menubar}">

        <div class="bar-left-container margin-right-20">

          <!--<card-info></card-info>-->
          <!--<activate-client-list></activate-client-list>-->
          <member-info :hasBottom="hasBottom" @onSelectActivityMemeber="selectActivityMember"></member-info>
        </div>
        <div class="bar-center-container">
          <div class="panel panel-recharge-operate">
            <div class="input-box">
              <input v-model="money" @input="inputMoney($event)" @keydown="keydownMoney($event)" type="text" class="form-control" placeholder="请输入充值金额" >
            </div>
            <div class="keyboard-box">
              <ol class="clearfix" @click="clickMoney($event)">
                <li class="key-box key-num"><button value="1">1</button></li>
                <li class="key-box key-num"><button value="2">2</button></li>
                <li class="key-box key-num"><button value="3">3</button></li>
                <li class="key-box key-num"><button value="4">4</button></li>
                <li class="key-box key-num"><button value="5">5</button></li>
                <li class="key-box key-num"><button value="6">6</button></li>
                <li class="key-box key-num"><button value="7">7</button></li>
                <li class="key-box key-num"><button value="8">8</button></li>
                <li class="key-box key-num"><button value="9">9</button></li>
                <li class="key-box key-num"><button value="0">0</button></li>
                <li class="key-box key-num"><button value="00">00</button></li>
                <li class="key-box key-num"><button value=".">.</button></li>
                <li class="key-box key-operate"><button @click.stop="delMoney"><i class="iconfont icon-arrow-left"></i></button></li>
                <li class="key-box key-operate "><button @click.stop="clearMoney">清空</button></li>
              </ol>
            </div>
            <div class="recharge-activity-box">
              <loading-box :loading=rechargeSetmealLoading></loading-box>
              <div class="no-data" v-show="rechargeSetmeal.length === 0">暂无套餐</div>
              <ul class="clearfix" :class="{scroll: rechargeSetmeal.length >= 16}">
                <li class="active-box"
                    :class="{active: index === markSetmealIndex}"
                    v-for="(item, index) in rechargeSetmeal"
                    :key="item.id"
                    @click="selectSetmeal(item, index)">
                  <span>{{item.detail}}<br><span class="goods">{{item.detailGoods}}</span></span>
                </li>
              </ul>
            </div>
            <div class="recharge-method-box">
              <ul>
                <li class="method-type" v-for="item in paymentMethods" :key="item.paymentId"  @click="selectPayment(item)">
                  <i class="iconfont xianjin" :class="'icon-'+item.paymentCode"></i>
                  <p>{{item.paymentName}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bar-right-container">
          <div class="panel panel-recharge-result">
            <div class="title">会员结账</div>
            <ul>
              <li><span class="name">充值</span><span class="value">￥{{money | formatMoney}}</span></li>
              <li v-if="rechargeSum">
                <span class="name" v-show="rechargeSum.overchargeType === 0 || rechargeSum.overchargeType === 2">赠送</span>
                <span class="value">￥{{rechargeSum.overed | formatMoney}}</span>
              </li>
              <li v-if="rechargeSum" v-show="rechargeSum.overchargeType === 1|| rechargeSum.overchargeType === 2">
                <span class="name">{{rechargeSum.overchargeType === 1 ? '赠送' : ''}}</span>
                <span class="value">{{rechargeSum.overedGoods}}</span>
              </li>
              <li v-if="rechargeSum"><span class="name">活动</span><span class="value">{{rechargeSum.name}}</span></li>
              <li><span class="name">支付方式</span><span class="value">{{payment || '--'}}</span></li>
            </ul>
            <loading-box :loading="paymentLoading" :loadingTxt="paymentLoadingTxt"></loading-box>
            <!--<div class="loading-box active">-->
              <!--<i class="iconfont icon-loading"></i>-->
              <!--<p>正在付款</p>-->
            <!--</div>-->
            <div class="result-box" >
              <div class="success" v-show="rechargeResult === 1">
                <i class="iconfont icon-chenggong"></i>
                <p>充值成功</p>
              </div>
              <div class="failure" v-show="rechargeResult === 2">
                <i class="iconfont icon-shibai"></i>
                <p>支付失败，请重新付款</p>
              </div>
            </div>
            <div class="money">实付：<span>￥{{money | formatMoney}}</span></div>
            <button class="btn btn-primary btn-lg btn-block" @click="submitRecharge">{{submitText}}</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
//  import $ from 'jquery'
  import { components } from '../core'
  import { POST, GET } from '@/core/http';
import '../../static/vendor/layer/theme/default/layer.css'
import layer from '../../static/vendor/layer/layer'
  // import CardInfo from './template/recharge-card-info'
  // import ActivateClientList from './template/activate-client-list'
  import MemberInfo from './template/member-info'
  import LoadingBox from './template/loading-box'
// import {publish} from "../core/topics";
  import {publish, subscribe} from "pubsub-js";

  function resetPageData() {
    // this.$data = {};
  }
  function delayGetSetmeal() {
    const vm = this;
    clearInterval(vm.timer);
    vm.timer = setTimeout(() => {
      getRechargeSetmeal.call(vm, vm.money);
    }, 1000)
  }
  //支付方式查询
  function queryAllPayment() {
    const vm = this;
    POST('/api/goodsPayment/queryAll', {isHook: 0}).done(function (data) {
      if (data.success) {
        vm.paymentMethods = data.payment || [];
      }
    })
  }
  //获取充值套餐列表
  function getRechargeSetmeal(amount) {
    if (/.*\.$/.test(amount)) {
      return
    }
    const vm = this;
    let url = '/api/overcharge-rule/?type=cashier&size=100&overed_goods=asc';
    url = amount ? `${url}&amount=${amount}` : url;

    vm.rechargeSetmealLoading = true;
    GET(url)
      .done(d => {
        vm.rechargeSetmeal = d.content;
        vm.rechargeSetmeal.map(item => {
          let detail = '', detailGoods = '';
          if (item.overchargeType === 0) {
            detail = `充${item.amount}送${item.overed}`;
          } else if (item.overchargeType === 1) {
            detail = `充${item.amount}送`;
            detailGoods = `${item.overedGoods}`;
          } else if (item.overchargeType === 2) {
            detail = `充${item.amount}送${item.overed}`;
            detailGoods = `${item.overedGoods}`;
          }
          item['detail'] = detail;
          item['detailGoods'] = detailGoods;
        });
        vm.rechargeSetmealLoading = false;
      })
  }

  export default {
    name: "recharge",
    components: components(MemberInfo, LoadingBox),
    data() {
      return {
        memberLoading: false,
        rechargeSetmealLoading: false,
        paymentLoading: false,
        paymentLoadingTxt: '正在付款',
        unwatch: null,
        timer: null,
        paymentMethods: [],
        markSetmealIndex: null,
        rechargeSum: null,
        rechargeSetmeal: [],
        money: '',
        rechargeResult: 0,
        submitText: '确认充值',
        params: {
          amount: null, //充值金额
          bmId: null, //网吧会员id
          goodsId: null, //商品id
          memberId: null, //身份证
          paymentId: null, //支付方式id
          ruleId: null //套餐id
        },
        payment: null,
        hasBottom: false
      }
    },
    created() {
      subscribe('member.info.select', this.resetSubmitBtn);
      queryAllPayment.call(this);
      getRechargeSetmeal.call(this);
    },
    methods: {
      resetSubmitBtn() {
        this.submitText = '确认充值';
        this.rechargeResult = 0;
      },
      selectActivityMember(member) {
        this.params.memberId = member.memberId;
        this.params.bmId = member.bmId;
      },
      selectSetmeal(item, index) {
        if (this.markSetmealIndex === null || this.markSetmealIndex !== index) {
          this.unwatch = this.unwatch || this.$watch(this.money, this.deleteRechargeSetmeal);
          this.markSetmealIndex = index;
          this.rechargeSum = item;
          this.money = String(item.amount);
          this.params.goodsId = item.goodsId;
          this.params.ruleId = item.id;
        } else {
          this.markSetmealIndex = null;
          this.rechargeSum = null;
        }
      },
      submitRecharge() {
        const vm = this;
        if (this.submitText === '关闭') {
          publish('member.info.clear')
          Object.keys(vm.params).map(key => {
            vm.$set(vm.params, key, null);
          })
          vm.money = '';
          vm.payment = null;
          vm.rechargeSum = null;
          vm.rechargeResult = 0;
          vm.submitText = '确认充值';
        } else {
          if (!this.params.memberId) {
            layer.alert('会员信息为空！');
            return;
          }
          if (+this.money === 0) {
            layer.alert('请输入充值金额或选择充值套餐！');
            return;
          }
          if (!this.params.paymentId) {
            layer.alert('请选择支付方式！');
            return;
          }
          this.params.amount = this.money;
          this.paymentLoading = true;
          POST('/api/cashier/recharge', vm.params)
            .done(d => {
              if (d.success) {
                resetPageData.call(vm);
                vm.paymentLoading = false;
                vm.rechargeResult = 1;
                vm.submitText = '关闭';
              } else {
                vm.rechargeResult = 2;
                vm.submitText = '重新支付';
                layer.alert(d.msg);
              }
            })
        }
      },
      keydownMoney(e) {
        //[8](删除), [48,57][96,105](0-9), [110](.)
        const calcKey = [8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110],
          keyCode = e.keyCode,
          value = e.target.value;
        if (calcKey.indexOf(keyCode) === -1 || (String(value).search(/\.\d{2}/) > 0 && keyCode !== 8)) {
          e.preventDefault();
        }
      },
      inputMoney(e) {
        if (this.rechargeSum) this.deleteRechargeSetmeal();
        const value = e.target.value, vm = this;
        if (value === '.') {
          this.money = '0.';
        } else if (value.search(/0\d/) === 0) {
          this.money = this.money.substring(1);
        }
        delayGetSetmeal.call(vm);
      },
      clickMoney(e) {
        if (this.rechargeSum) this.deleteRechargeSetmeal();
        const $target = e.target, vm = this,
          value = $target.value,
          money = '' + this.money;
        if ($target.nodeName === 'OL') {
          return;
        }
        if (value === '.') {
          if (money === '' || money === 0) {
            this.money = '0.';
            return;
          } else if (money.indexOf('.') > 0) {
            return;
          }
        }
        if (money.search(/\.\d{2}/) > 0) return;
        if ((value === '00' || value === '0') && (money === '' || money === '0')) {
          this.money = '0';
          return;
        }
        if (money === '0' && parseInt(value) > 0) {
          this.money = value;
          return;
        }

        this.money = money.concat($target.value);
        delayGetSetmeal.call(vm);
      },
      deleteRechargeSetmeal() {
        if (this.unwatch) this.unwatch();
        this.markSetmealIndex = null;
        this.rechargeSum = null;
      },
      selectPayment(item) {
        this.payment = item.paymentName;
        this.params.paymentId = item.paymentId;
      },
      clearMoney() {
        this.money = '';
        this.deleteRechargeSetmeal();
        getRechargeSetmeal.call(this);
      },
      delMoney() {
        this.money = this.money.substring(0, this.money.length - 1);
        delayGetSetmeal.call(this);
        // this.deleteRechargeSetmeal();
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../sass/recharge";

</style>
