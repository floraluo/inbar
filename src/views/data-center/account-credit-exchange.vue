<template>
  <develop :hasBottom="hasBottom"></develop>
</template>

<script>
  import $ from 'jquery'
  import { components } from '../../core'
  import developing from '../template/developing'
  import {publish, subscribe} from "pubsub-js";
  let vm
  export default {
    name: 'credit-exchange',
    components: components(developing),

    data () {
      return {
        hasBottom: true
      }
    },
    methods: {},
    created () {
      vm = this
    }
  }
</script>

<style scoped lang='scss'>

</style>
