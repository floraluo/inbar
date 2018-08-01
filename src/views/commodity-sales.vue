<template>
  <div class="page">
    <div class="page-content"  :class="{ 'has-menubar': $route.meta.menubar}">
      <div class="bar-left-container">
        <!--<card-info @searchCustom="searchActiveMember"></card-info>-->
        <!--<activate-client-list :hasBottom="hasBottom" :activeCusList="activeCusList"></activate-client-list>-->
        <member-info :hasBottom="hasBottom"></member-info>
      </div>
      <div class="bar-center-container">
        <div class="sale-type-box panel">
          <ul class="clearfix" >
            <li class="Type-box"
                :class="{'active':markClassifyIndex === index}"
                v-for="(item, index) in stockType"
                :key="item.gcId"
                @click="queryStockByType(item, index)"><span>{{item.gcName}}</span></li>
          </ul>
        </div>
        <div class=" sale-commodity-box panel">
          <loading-box :loading="stockLoading"></loading-box>
          <div class="no-data"  v-if="!stockLoading && stock.length === 0">暂无相关商品！</div>
          <ul class="clearfix" v-else>
            <li class="commodity-box"
                :class="{active: markStockIndex === index}"
                v-for="(item, index) in stock"
                :key="item.goodsId"
                @click.stop="selectStock(item, index)">
              <p class="name">{{item.goodsName}}<br><span class="value">￥{{item.goodsPrice}}</span></p>

            </li>
          </ul>
        </div>
        <div class="sale-state-box panel" :class="{active: selectedStock}">
          <!--<p></p>-->
          <div class="no-data" v-show="!selectedStock.goodsSpec">请先选商品</div>
          <strong  v-show="selectedStock.goodsSpec"><span class="sign">*</span>请选择状态:</strong>
          <div class="no-data" v-show="selectedStock.goodsSpec && selectedStock.stockStatus.length === 0">此商品无状态可选</div>
          <ul class="clearfix" v-show="selectedStock.stockStatus.length > 0">
            <li class="state-box" v-for="(status, index) in selectedStock.stockStatus" :key="index" @click="selectStatus(status, index)"><span>{{status}}</span></li>
          </ul>
        </div>
      </div>
      <div class="bar-right-container">
        <div class="shopping-list panel">
          <div class="no-data" v-if="cart.length === 0">请从左侧选择商品或从底部选择套餐！</div>
          <ul v-else>
            <li v-for="(item, index) in cart" :key="item.index" @click="markCartStock(index, $event)" :class="{'active':markOrderIndex === index}">
              <div class="list-shop">{{item.goodsName || item.setmealName}}</div>
              <div class="list-number">{{item.num || 1}}{{item.status ? '*' + item.status : ''}}</div>
              <div class="list-value">{{item.goodsPrice ? item.goodsPrice : item.setmealCurrent | formatMoney}}</div>
              <button type="button" class="btn" @click.stop="delCartStock(index)"><i class="iconfont icon-jiansvg"></i></button>
            </li>
          </ul>
          <div class="paging-group">
            <div class="button-group" v-show="cartAll.length > 5">
              <button class="btn btn-page" @click="cartPrevious" :disabled="cartPageNum === 1">上一页</button>
              <span>{{cartPageNum}}</span>
              <button class="btn btn-page" @click="cartNext" :disabled="cartPageNum === cartPageTotal">下一页</button>
            </div>
            <div class="operation"  v-show="cart.length > 0">
              <button class="btn btn-num" @click="minusMarkStockNum">-</button>
              <span>{{markOrderIndex == null ? '--' : cart[markOrderIndex].num}}</span>
              <button class="btn btn-num" @click="plusMarkStockNum">+</button>
            </div>
          </div>
        </div>

        <div class="recharge-method-box panel ">
          <ul >
            <li class="method-type " v-for="item in paymentMethods" :key="item.paymentId">
              <i class="iconfont zhifubao" :class="'icon-'+item.paymentCode"></i>
              <p>{{item.paymentName}}</p>
            </li>
            <!--现金 xianjin；支付宝 zhifubao；微信：weixin；pos机：shouyinji；维护金：weihujin-->
          </ul>
        </div>
        <div class="accounts panel">
          <div class="info">
            <span>数量：<strong>{{cartStock.count}}</strong></span>
            <span>合计：<strong>￥{{cartStock.total | formatMoney}}</strong></span>
            <div class="btn-row clearfix ">
            <button class="btn  btn-clear " @click="clearCart">清空</button>
            <button class="btn  btn-primary" @click="payment">结算</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bar-bottom-container">
        <div class="bottom-package-box panel">
          <div class="package"><span>优惠<br>套餐</span></div>
          <button type="button" data-role="none" class="btn-left"  role="button" ><i class="iconfont icon-left"></i></button>
         <!--<div class=" btn button-left"> <i class="iconfont icon-left"></i></div>-->
          <div class="owl-carousel-box">
            <div class="no-data"  v-if="stockSetmeal.length === 0">暂无套餐！</div>
            <div class="owl-carousel clearfix" v-else>
              <div class="item" v-for="item in stockSetmeal" :key="item.setmealId" @click="addToCart(item)">
                <p class="name">{{item.setmealName}}</p><div class="value">￥{{item.setmealCurrent | formatMoney}}</div>
              </div>
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
          <button type="button" data-role="none" class="btn-right"  role="button" ><i class="iconfont icon-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from '../globals/$'

  import { publish } from 'pubsub-js'

  // import layer from 'vue-layer';
  import { POST, GET } from '@/core/http';
  import { components } from '../core'

  // import menu from '@/globals/menu'
  // import CardInfo from './template/recharge-card-info'
  // import ActivateClientList from './template/activate-client-list'
  import MemberInfo from './template/member-info'
  import LoadingBox from './template/loading-box'

  //商品分类查询
  function queryStockClass() {
    const vm = this;
    GET('/api/stock/class/query').done(function (data) {
      if (data.success) {
        vm.stockType = data.goodsClass
      }
    });
  }
  //查询所有商品
  function queryAllStock(id) {
    const vm = this, url = id ? `/api/stock/queryAll?gcId=${id}` : '/api/stock/queryAll';
    vm.stockLoading = true;
    GET(url).done(function (data) {
      vm.stock = data.content || [];
      vm.stockLoading = false;
    });
  }
  //商品套餐
  function querySetmeal() {
    const vm = this;
    GET('/api/stock/setmeal/queryAll').done(function (data) {
      vm.stockSetmeal = data.content || [];
      vm.$nextTick(function () {
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
      })
    })
  }
  //支付方式查询
  function queryAllPayment() {
    const vm = this;
    POST('/api/goodsPayment/queryAll', {isHook: 1}).done(function (data) {
      if (data.success) {
        vm.paymentMethods = data.payment || [];
      }
    })
  }

  function resetCart(vm) {
    const start = (vm.cartPageNum - 1) * vm.cartPageSize,
      end = (vm.cartPageNum - 1) * vm.cartPageSize + vm.cartPageSize;
    vm.cart = vm.cartAll.slice(start, end);
  }

  export default {
    name: "commodity-sales",
    components: components(MemberInfo, LoadingBox),
    data() {
      return {
        stockLoading: false,
        stockType: [],
        stock: [],
        selectedStock: {
          stockStatus: []
        },
        stockSetmeal: [],
        cart: [],
        cartAll: [],
        cartPageNum: 1,
        cartPageSize: 5,
        cartPageTotal: 0,
        paymentMethods: [],
        markClassifyIndex: null,
        markStockIndex: null,
        markOrderIndex: null,
        markPaymentIndex: null,
        params: {
          goodsJson: '',
          orderAmount: 0,
          orderFrom: 0,
          paymentCode: 'zzfb'
        },
        hasBottom: true
      }
    },
    methods: {
      queryStockByType(item, index) {
        const vm = this, markIndex = vm.markClassifyIndex;
        this.stock = [];
        if (markIndex == null || markIndex !== index) {
          //查询分类下的商品
          vm.markClassifyIndex = index;
          queryAllStock.call(this, item.gcId);
          // POST('/api/stock/findByGcId', {
          //   gcId: item.gcId
          // }).done(function (data) {
          //   if (!data.success) {
          //     vm.$layer.alert(data.msg)
          //   } else {
          //     vm.stock = data.goods || [];
          //   }
          // })
        } else if (markIndex === index) {
          vm.markClassifyIndex = null;
        //查询所有商品
          queryAllStock.call(this);
        }
      },
      selectStock(item, index) {
        this.markStockIndex = index;
        if (item.goodsSpec.search(',') >= 0) {
          Object.assign(this.selectedStock, {stockStatus: item.goodsSpec.split(',')}, item);
          // this.stockStatus = item.goodsSpec.split(',');
        } else {
          this.addToCart(item);
        }
      },
      selectStatus(status, index) {
        this.addToCart(this.selectedStock, status);
        this.selectedStock = {
          stockStatus: []
        };
      },
      addToCart(item, status) {
        this.markStockIndex = null;
        this.cartAll.push(Object.assign({
          num: 1,
          status: status || ''
        }, item));
        this.cartPageTotal = Math.ceil(this.cartAll.length / this.cartPageSize);
        this.cartPageNum = this.cartPageTotal;
        this.cart = this.cartAll.slice((this.cartPageNum - 1) * this.cartPageSize);
      },
      delCartStock(index) {
        this.cartAll.splice((this.cartPageNum - 1) * this.cartPageSize + index, 1);
        this.cartPageTotal = Math.ceil(this.cartAll.length / this.cartPageSize);
        if (this.cartPageTotal < this.cartPageNum) this.cartPageNum = this.cartPageTotal;
        resetCart(this);
        if (index === this.markOrderIndex) {
          this.markOrderIndex = null;
        }
      },
      markCartStock(index) {
        this.$data.markOrderIndex = index;
      },
      minusMarkStockNum() {
        if (this.alertSelectStock()) return;
        if (parseInt(this.cart[this.markOrderIndex].num) === 1) {
          this.delCartStock(this.markOrderIndex);
          this.markOrderIndex = null;
        } else {
          this.cart[this.markOrderIndex].num -= 1;
        }
      },
      plusMarkStockNum() {
        if (this.alertSelectStock()) return;
        const $data = this.$data;
        ++this.$data.cart[$data.markOrderIndex].num;
      },
      alertSelectStock() {
        if (this.markOrderIndex == null) {
          this.$layer.alert('请先选择一个商品')
          return true;
        }
      },
      clearCart() {
        this.cartAll = []
        this.cart = [];
        this.markOrderIndex = null;
      },
      payment() {
        if (this.cart.length === 0) {
          this.$layer.alert('您还未选择任何商品！');
          return;
        }
        if (this.params.paymentCode == null) {
          this.$layer.alert('请选择付款方式！');
          return;
        }
        const vm = this;
        this.params.goodsJson = '';
        this.params.orderAmount = this.cartStock.total;
        // {id:69,count:2,isSetmeal:1}.
        this.cart.forEach(function (item) {
          let s = {
            id: item.setmealId || item.goodsId,
            count: item.num,
            isSetmeal: item.setmealId ? 0 : 1
          };
          vm.params.goodsJson += '.' + JSON.stringify(s)
        });
        console.log(vm.params.goodsJson);
        this.params.goodsJson = this.params.goodsJson.replace(/^\./, '').replace(/"/g, '');
        POST('/api/order/getOrderPayCode', vm.params).done(function (data) {
          if (data.success) {
            vm.$layer.alert('提交成功！');
            vm.clearCart();
          } else {
            vm.$layer.alert(data.msg);
          }
        })
      },
      cartPrevious() {
        --this.cartPageNum;
        resetCart(this);
        // const start = (this.cartPageNum - 1) * this.cartPageSize,
        //   end = (this.cartPageNum - 1) * this.cartPageSize + this.cartPageSize;
        // this.cart = this.cartAll.slice(start, end);
      },
      cartNext() {
        ++this.cartPageNum;
        // const start = (this.cartPageNum - 1) * this.cartPageSize,
        //   end = (this.cartPageNum - 1) * this.cartPageSize + this.cartPageSize;
        // this.cart = this.cartAll.slice(start, end);
        resetCart(this);
      }
    },
    computed: {
      cartStock() {
        let count = 0, total = 0;
        if (this.$data.cart.length > 0) {
          this.$data.cart.forEach(function (item) {
            count += item.num;
            total += item.goodsPrice || item.setmealCurrent;
          })
        }
        return {
          count: count,
          total: total
        };
      }
    },
    created() {
      // menu.removeMenu();
      //商品分类查询
      queryStockClass.call(this);
      //查询所有商品
      queryAllStock.call(this);
      //商品套餐
      querySetmeal.call(this);
      // 支付方式查询
      queryAllPayment.call(this);
    },
    mounted() {
    },
    updated() {
      publish('menubar.hide.do', this)
    }
  }
</script>

<style >
</style>
<style scoped lang="scss">
  @import "../sass/sales";
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
