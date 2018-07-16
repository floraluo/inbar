<template>
  <div class="page">
    <div class="page-content">
      <div class="bar-left-container">
        <card-info></card-info>
        <activate-client-list></activate-client-list>
      </div>
      <div class="bar-center-container"></div>
      <div class="bar-right-container"></div>
    </div>
  </div>
</template>

<script>
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
