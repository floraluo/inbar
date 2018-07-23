<template>
  <div class="page">
    <div class="page-content">
      <div class="bar-left-container">
        <card-info></card-info>
        <activate-client-list :hasBottom="hasBottom"></activate-client-list>
      </div>
      <div class="bar-center-container">
        <div class="sale-type-box panel">
          <ul class="clearfix">
            <li class="Type-box active"><span>饮料</span></li>
            <li class="Type-box"><span>零食</span></li>
            <li class="Type-box"><span>点卡</span></li>
            <li class="Type-box"><span>超市</span></li>
            <li class="Type-box"><span>休闲小食</span></li>
            <li class="Type-box"><span>果汁</span></li>
            <li class="Type-box"><span>外设</span></li>
            <li class="Type-box"><span>便当</span></li>
            <li class="Type-box"><span>咖啡</span></li>
            <li class="Type-box"><span>饮料</span></li>
            <li class="Type-box"><span>饮料</span></li>
            <li class="Type-box"><span>饮料</span></li>
          </ul>
        </div>
        <div class=" sale-commodity-box panel">
          <ul class="clearfix">
            <li class="commodity-box active"><p class="name">商品商品商品</p><span class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
            <li class="commodity-box"><p class="name">商品商品商品</p><span  class="value">￥</span></li>
          </ul>
        </div>
        <div class="sale-state-box panel">
          <p><span class="sign">*</span>请选择状态:</p>
          <ul class="clearfix">
            <li class="State-box active"><span>常温</span></li>
            <li class="State-box"><span>加热</span></li>
            <li class="State-box"><span>加冰</span></li>
          </ul>
        </div>
      </div>
      <div class="bar-right-container">
        <div class="shopping-list panel">
          <ul>
            <li>
              <div class="list-shop">商品1</div>
              <div class="list-number">1*少冰</div>
              <div class="list-value"> 4.00</div>
              <button type="button" class="btn"><i class="iconfont icon-jiansvg"></i></button>
            </li>
            <li>
              <div class="list-shop">商品1</div>
              <div class="list-number">1*少冰</div>
              <div class="list-value"> 4.00</div>
              <button type="button" class="btn"><i class="iconfont icon-jiansvg"></i></button>
            </li>
            <li>
              <div class="list-shop">商品1</div>
              <div class="list-number">1*少冰</div>
              <div class="list-value"> 4.00</div>
              <button type="button" class="btn"><i class="iconfont icon-jiansvg"></i></button>
            </li>
          </ul>
          <div class="paging-group">
            <div class="button-group">
              <button class="btn btn-page ">上一页</button>
              <button class="btn btn-page ">下一页</button>
            </div>
            <div class="operation">
              <button class="btn btn-num">-</button>
              <!--<input type="button" value="-" onclick="jian()">-->
              <input class="zhi" type="text" value="0">
              <button class="btn btn-num">+</button>
              <!--<input type="button" value="+" onclick="jia()">-->
            </div>
          </div>
        </div>

        <div class="recharge-method-box panel">
          <ul @click="selectPayment($event)">
            <li class="method-type" data-payment="现金"><i class="iconfont icon-xianjin"></i>
              <p>现金</p>
            </li>
            <li class="method-type" data-payment="支付宝"><i class="iconfont icon-zhifubao"></i>
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
        <div class="accounts panel">
          <ul class="clearfix">
            <li>数量：<span>6</span></li>
            <li>合计：<span class="value">￥300.00</span></li>
            <li><button class="btn btn-empty">清空</button></li>
            <li><button class="btn btn-account">结算</button></li>
          </ul>
        </div>
      </div>
      <div class="bar-bottom-container">
        <div class="bottom-package-box panel">
          <div class="package">优惠套餐</div>
          <div class=" btn button-left"> <button>《gdfn</button></div>
          <div class="owl-carousel owl-theme ">
            <ul class="clearfix">
              <li class="package-box"><p class="name">商品商品商品</p><span class="value">￥</span></li>
              <li class="package-box"><p class="name">商品商品商品</p><span class="value">￥</span></li>
              <li class="package-box"><p class="name">商品商品商品</p><span class="value">￥</span></li>
              <li class="package-box"><p class="name">商品商品商品</p><span class="value">￥</span></li>
              <li class="package-box"><p class="name">商品商品商品</p><span class="value">￥</span></li>
              <li class="package-box"><p class="name">商品商品商品</p><span class="value">￥</span></li>
              <li class="package-box"><p class="name">商品商品商品</p><span class="value">￥</span></li>
              <li class="package-box"><p class="name">商品商品商品</p><span class="value">￥</span></li>
            </ul>
          </div>
          <div class="btn button-right"><button>》sav</button></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { components } from '../core'
  import menu from '@/globals/menu'
  import CardInfo from './template/recharge-card-info'
  import ActivateClientList from './template/activate-client-list'
  export default {
    name: "commodity-sales",
    components: components(CardInfo, ActivateClientList),
    data() {
      return {
        hasBottom: true
      }
    },
    created() {
      menu.removeMenu()
    }

  }
</script>

<style scoped lang="scss">
  @import '@/sass/sales.scss';
</style>
