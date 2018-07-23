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
              <span>0</span>
              <button class="btn btn-num">+</button>
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
          <div class="info">
            <span>数量：<strong>6</strong></span>
            <span>合计：<strong>￥200</strong></span>
          </div>
          <div class="btn-row">
            <button class="btn  btn-clear">清空</button>
            <button class="btn  btn-pay">结算</button>
          </div>
        </div>
      </div>
      <div class="bar-bottom-container">
        <div class="bottom-package-box panel">
          <div class="package"><span>优惠<br>套餐</span></div>
          <div class=" btn button-left"> <i class="iconfont icon-left"></i></div>
          <div class="owl-carousel-box">
            <div class="owl-carousel clearfix">
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥16.00</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
              <div class="item"><p class="name">商品商品商品</p><div class="value">￥</div> </div>
            </div>
            <!--<div class="owl-nav-controls j-owl-nav">-->
              <!--<i class="iconfont icon-left"></i>-->
              <!--<i class="iconfont icon-right"></i>-->
            <!--</div>-->
            <!--<div class="owl-nav">-->
              <!--<button type="button" role="presentation" class="owl-prev disabled"><span class="iconfont icon-left" aria-label="Previous"></span></button>-->
              <!--<button type="button" role="presentation" class="owl-next"><span class="iconfont icon-right" aria-label="Next">›</span></button>-->
            <!--</div>-->
          </div>
          <div class="btn button-right"><i class="iconfont icon-left"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from '../globals/$'
  import 'owl.carousel';

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
    },
    mounted() {
      $('.owl-carousel').owlCarousel({
        // loop:true,
        // navContainer: '.owl-nav',
        margin: 20,
        nav: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 8
          }
        }
      })
    }

  }
</script>

<style >
  @import 'owl.carousel/dist/assets/owl.carousel.css';
</style>
<style scoped lang="scss">
  @import '@/sass/sales.scss';
</style>
<style lang="scss">
  $color-list: (0: #f7696b, 1: #526069, 2: #f0a55b, 3: #878bdc, 4: #f7696b, 5: #9270db, 6: #5cc7d3, 7: #526069, 8: #1890ff, 9: #526069);

  .owl-carousel-box{
    .owl-carousel .owl-nav {
      button{
        position: absolute;
        top: 14px;
        height: 107px;
        width: 40px;
        font-size: 40px;
        &:hover{
          color: #fff;
          background-color: rgba(0,0,0,.5);
        }
        &.disabled{
          color: #b6b6b6;
          cursor: no-drop;
          &:hover{
            color: #b6b6b6;
            background-color: #fff;
          }
        }
        &.owl-prev{
          left: -30px;
        }
        &.owl-next{
          right: -30px;
        }
      }
    }
    .owl-item{
      @each $index, $color in $color-list{
        &:nth-child(#{$index}){
          >.item{
            border-top-color: $color !important;
          }
        }
      }
      @each $index, $color in $color-list{
        &:nth-child(1#{$index}){
          >li{
            border-top-color: $color !important;
          }
        }
      }
    }
  }
</style>

