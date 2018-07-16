<template>
  <div class="page">
    <div class="page-content">
      <div class="bar-left-container">
        <card-info></card-info>
        <activate-client-list></activate-client-list>
      </div>
      <div class="bar-center-container">
         <div class="sale-Type-box panel">
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
            <li class="commodity-box active"><span>饮料</span></li>
            <li class="commodity-box"><span>零食</span></li>
            <li class="commodity-box"><span>点卡</span></li>
            <li class="commodity-box"><span>超市</span></li>
            <li class="commodity-box"><span>休闲小食</span></li>
            <li class="commodity-box"><span>果汁</span></li>
            <li class="commodity-box"><span>外设</span></li>
            <li class="commodity-box"><span>便当</span></li>
            <li class="commodity-box"><span>咖啡</span></li>
            <li class="commodity-box"><span>饮料</span></li>
            <li class="commodity-box"><span>饮料</span></li>
            <li class="commodity-box"><span>饮料</span></li>
          </ul>
         </div>
         <div class="sale-Stateselection-box panel">
           <p>*请选择状态</p>
          <ul class="clearfix">
            <li class="active-box active"><span>常温</span></li>
            <li class="active-box"><span>加热</span></li>
            <li class="active-box"><span>加冰</span></li>
          </ul>
         </div>
      </div>
      <div class="bar-right-container">

      </div>
    </div>
  </div>
</template>

<script>
  import '@/sass/sales.scss'
  import { components } from '../core'
  import CardInfo from './template/recharge-card-info'
  import ActivateClientList from './template/activate-client-list'
  export default {
    name: "commodity-sales",
    components: components(CardInfo, ActivateClientList)

  }
</script>

<style scoped>

</style>
