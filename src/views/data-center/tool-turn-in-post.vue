<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="row">
          <div class="col-xs-12 col-md-4">
            <div class="panel figure-panel"><strong class="figure">￥{{fund.originalAmount}}</strong>
              <p class="explain">当期应缴现金</p>
              <div class="bar red">
                <i v-if="fund.originalAmount >= params.actualAmount" style="width: 100%"></i>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-4">
            <div class="panel figure-panel">
              <div class="flex-box" v-show="!edit">
                <strong class="figure">￥{{params.actualAmount}}</strong>
                <i class="iconfont icon-bianji2" @click="edit = true"></i>
              </div>
              <div class="form-group" v-show="edit">
                <input type="text" class="form-control" name="actualAmount"
                       v-model="params.actualAmount"
                       v-validate="'required|decimal:2'"
                       data-vv-as="金额"
                       @keyup.enter="editBlur"
                       @blur="editBlur" >
                <span class="error" v-show="errors.has('actualAmount')">{{ errors.first('actualAmount') }}</span>
              </div>
              <p class="explain">当期实缴现金</p>
              <div class="bar green">
                <i v-if="fund.originalAmount <= params.actualAmount" style="width: 100%"></i>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-4">
            <div class="panel figure-panel"><strong class="figure">￥{{fund.differenceAmount}}</strong>
              <p class="explain">当期差异</p>
              <div class="bar orange">
                <i v-if="fund.originalAmount !== +params.actualAmount" :style="`width: ${diffWidth}`"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="panel explain-panel">
          <div class="panel-title">差异说明</div>
          <div class="panel-content">
            <div class="form-group">
              <label>差异说明：</label>
              <span>无</span>
            </div>
            <div class="form-group">
              <label>备注说明：</label>
              <textarea class='form-control' cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-title">上缴汇总</div>
      <div class="panel-content">
        <div class="flex-box margin-bottom-20">
          <strong class="summary-figure"><small>总计：</small>￥3000</strong>
          <router-link :to="{name:'inbarRevenue'}" class="btn btn-primary btn-outline">查看详情</router-link>
        </div>
        <table class="table table-bordered table-center">
          <thead>
          <tr>
            <th>会员充值</th>
            <th>临时卡结算</th>
            <th>普通商品</th>
            <th>套餐商品</th>
            <th>虚拟商品</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{summary.memberRecharge}}</td>
            <td>{{summary.temporalConsumed}}</td>
            <td>{{summary.goods}}</td>
            <td>{{summary.goodsSuite}}</td>
            <td>{{summary.virtualGoods}}</td>
          </tr>
          </tbody>
        </table>
        <table class="table table-bordered table-center">
          <thead>
          <tr>
            <th>现金</th>
            <th>银联</th>
            <th>微信</th>
            <th>支付宝</th>
            <th>维护金</th>
            <th>其他</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{summary.cash}}</td>
            <td>{{summary.unionpay}}</td>
            <td>{{summary.wechat}}</td>
            <td>{{summary.alipay}}</td>
            <td>----</td>
            <td>----</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {publish} from 'pubsub-js'
  import {GET} from '../../core/http'

  let vm
  export default {
    name: 'tool-turn-in-fund',
    data () {
      return {
        edit: false,
        fund: {},
        summary: {},
        params: {
          actualAmount: 0
        }
      }
    },
    computed: {
      diffWidth() {
        if (this.fund.originalAmount - this.params.actualAmount > 0) {
          if (this.params.actualAmount === 0) return '100%'
          return (Math.abs(this.params.actualAmount / this.fund.originalAmount) * 100) + '%'
        } else {
          if (this.fund.originalAmount === 0) return '100%'
          return (Math.abs(this.fund.originalAmount / this.params.actualAmount) * 100) + '%'
        }
      }
    },
    methods: {
      editBlur(event) {
        this.$validator.validate('actualAmount').then(data => {
          if (data) {
            vm.edit = false;
          }
        })
      }
    },
    created () {
      vm = this;
      GET('/api/to-boss/cash/_compute')
        .then(data => {
          vm.fund = data;
          vm.params.actualAmount = data.actualAmount
          vm.summary = data.stats;
        })
    },
    mounted() {
      this.$emit('crumb-push', {
        crumb: {name: '立即上缴'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  $highlight: #fd0326;
  .panel{
    padding: 20px;
    border: 1px solid #f3f3f3;
    box-shadow: 0 0 5px #f3f3f3;
    border-radius: 4px;
  }
  .panel-title{
    padding: 0;
    font-weight: bold;
    color: $text;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .row .panel{
    height: 260px;
  }
  .flex-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .figure-panel{
    padding-top: 60px;
    .figure{
      font-size: 24px;
      font-weight: bold;
      color: $highlight;
    }
    .icon-bianji2{
      cursor: pointer;
      color: $theme-color;
    }
    .explain{
      margin-top: 35px;
      margin-bottom: 30px;
    }
    .bar{
      position: relative;
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background-color: #ebebeb;
      > i{
        content: '';
        position: absolute;
        display: block;
        width: 0;
        height: 4px;
        border-radius: 4px;
      }
      &.red > i{
        background-color: #f76863;
      }
      &.green > i{
        background-color: #4ecb74;
      }
      &.orange > i {
        background-color: #fad267;
      }
    }
  }
  .explain-panel{
    label{
      float: left;
    }
    .form-group{
      margin-bottom: 20px;
    }
    textarea{
      width: calc(100% - 5em);
      height: 80px;
    }
  }
  .summary-figure{
    font-size: 20px;
    color: $highlight;
    small{
      font-size: 14px;
    }
  }
  .table-center{
    th,td{
      text-align: center;
    }
  }
</style>
