<template>
    <div class="page">
      <div class="page-content">
        <div class="bar-left-container">
          <card-info></card-info>
          <activate-client-list></activate-client-list>
        </div>
        <div class="bar-center-container">
          <div class="panel panel-recharge-operate">
            <div class="input-box">
              <input v-model="money" @input="inputMoney($event)" @keydown="keydownMoney($event)" type="text" class="form-control" placeholder="请输入充值金额">
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
                <li class="key-box key-operate"><button @click.stop="money = money.substring(0, money.length - 1)"><i class="iconfont icon-arrow-left"></i></button></li>
                <li class="key-box key-operate key-clear"><button @click.stop="money = ''">清空</button></li>
              </ol>
            </div>
            <div class="recharge-activity-box">
              <ul class="clearfix">
                <li class="active-box active"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
                <li class="active-box"><span>充100送50</span></li>
              </ul>
            </div>
            <div class="recharge-method-box">
              <ul @click="selectPayment($event)">
                <li class="method-type" data-payment="现金"><i class="iconfont icon-xianjin"></i>
                  <p>现金</p>
                </li>
                <li class="method-type" data-payment="支付宝"><i class="iconfont icon-zhifubao "></i>
                  <p>支付宝</p>
                </li>
                <li class="method-type" data-payment="微信"><i class="iconfont icon-weixin"></i>
                  <p>微信</p>
                </li>
                <li class="method-type" data-payment="POS机"><i class="iconfont icon-shouyinji"></i>
                  <p>POS机</p>
                </li>
                <li class="method-type" data-payment="维护金"><i class="iconfont icon-weihujin"></i>
                  <p>维护金</p>
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
              <li><span class="name">赠送</span><span class="value">￥30.00</span></li>
              <li><span class="name">活动</span><span class="value">充100送30</span></li>
              <li><span class="name">支付方式</span><span class="value">{{payment}}</span></li>
            </ul>
            <div class="loading-box active">
              <i class="iconfont icon-loading"></i>
              <p>正在付款</p>
            </div>
            <div class="money">实付：<span>￥100.00</span></div>
            <button class="btn btn-primary btn-lg btn-block">确认充值</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import $ from 'jquery'
  import { components } from '../core'
  import CardInfo from './template/recharge-card-info'
  import ActivateClientList from './template/activate-client-list'
  export default {
    name: "recharge",
    components: components(CardInfo, ActivateClientList),
    data() {
      return {
        money: '',
        payment: '现金'
      }
    },
    methods: {
      keydownMoney(e) {
        //删除, 0-9, .
        const calcKey = [8, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110],
          keyCode = e.keyCode,
          value = e.target.value;
        if (calcKey.indexOf(keyCode) === -1 || (String(value).search(/\.\d{2}/) > 0 && keyCode !== 8)) {
          e.preventDefault();
        }
      },
      inputMoney(e) {
        const value = e.target.value;
        if (value === '.') {
          this.$data.money = '0.';
        } else if (value.search(/0\d/) === 0) {
          this.$data.money = this.$data.money.substring(1);
        }
      },
      clickMoney(e) {
        const $target = e.target, value = $target.value,
          money = this.$data.money;
        if (value === '.') {
          if (money === '' || money === 0) {
            this.$data.money = '0.';
            return;
          } else if (money.indexOf('.') > 0) {
            return;
          }
        }
        if (money.search(/\.\d{2}/) > 0) return;
        if ((value === '00' || value === '0') && (money === '' || money === '0')) {
          this.$data.money = '0';
          return;
        }
        if (money === '0' && parseInt(value) > 0) {
          this.$data.money = value;
          return;
        }

        this.$data.money = money.concat($target.value);
      },
      selectPayment(e) {
        console.log();
        this.$data.payment = $(e.target).closest('li').data('payment')
      }
    },
    filters: {
      formatMoney(value) {
        if (+value === 0) return '0.00';
        if (value.search(/\./) > 0) {
          const valArr = value.split('.');
          if (+valArr[1] === 0) return valArr[0] + '.' + '00';
          if (valArr[1] > 0 && valArr[1] < 10) return valArr[0] + '.' + valArr[1] + '0';
        }
        if (value.search(/\./) === -1) return value + '.00';
        return value;
      }
    }
  }
</script>

<style scoped lang="scss">
 @import "../sass/recharge";

</style>
