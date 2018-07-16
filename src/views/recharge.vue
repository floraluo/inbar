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
              <input type="text" class="form-control" placeholder="请输入充值金额">
            </div>
            <div class="keyboard-box">
              <ol class="clearfix">
                <li class="key-box key-num"><button>1</button></li>
                <li class="key-box key-num"><button>2</button></li>
                <li class="key-box key-num"><button>3</button></li>
                <li class="key-box key-num"><button>4</button></li>
                <li class="key-box key-num"><button>5</button></li>
                <li class="key-box key-num"><button>6</button></li>
                <li class="key-box key-num"><button>7</button></li>
                <li class="key-box key-num"><button>8</button></li>
                <li class="key-box key-num"><button>9</button></li>
                <li class="key-box key-num"><button>0</button></li>
                <li class="key-box key-num"><button>00</button></li>
                <li class="key-box key-num"><button>.</button></li>
                <li class="key-box key-operate"><button><i class="iconfont icon-arrow-left"></i></button></li>
                <li class="key-box key-operate key-clear"><button>清空</button></li>
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
              <ul @click="">
                <li class="method-type"><i class="iconfont icon-xianjin"></i>
                  <p>现金</p>
                </li>
                <li class="method-type"><i class="iconfont icon-zhifubao"></i>
                  <p>支付宝</p>
                </li>
                <li class="method-type"><i class="iconfont icon-weixin"></i>
                  <p>微信</p>
                </li>
                <li class="method-type"><i class="iconfont icon-shouyinji"></i>
                  <p>POS机</p>
                </li>
                <li class="method-type"><i class="iconfont icon-weihujin"></i>
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
              <li><span class="name">充值</span><span class="value">￥100.00</span></li>
              <li><span class="name">赠送</span><span class="value">￥30.00</span></li>
              <li><span class="name">活动</span><span class="value">充100送30</span></li>
              <li><span class="name">支付方式</span><span class="value">支付宝</span></li>
            </ul>
            <div class="money">实付：<span>￥100.00</span></div>
            <button class="btn btn-primary btn-lg btn-block">确认充值</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import '@/sass/recharge.scss'
  import { components } from '../core'
  import CardInfo from './template/recharge-card-info'
  import ActivateClientList from './template/activate-client-list'
  export default {
    name: "recharge",
    components: components(CardInfo, ActivateClientList)
  }
</script>

<style scoped>

</style>
