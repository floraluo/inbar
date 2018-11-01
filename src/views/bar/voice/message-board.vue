<template>
  <develop :hasBottom="hasBottom"></develop>
</template>

<script>
  import { components } from '../../../core'
  import developing from '../../template/developing'
  import {publish, subscribe} from "pubsub-js";
  let vm
  export default {
    name: 'message-board',
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

<style scoped>

</style>
