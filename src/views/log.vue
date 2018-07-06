<template>
  <div>
    <h2>Log CURD Here</h2>
    <input name="name"/>
    <button class="btn-primary" @click="show">输出VM</button>
  </div>
</template>
<script>
  let vm
  export default {
    name: 'log',
    created () {
      vm = this
      console.log('created log', vm)
    },
    methods: {
      show () {
        console.log('vm', vm)
      }
    }
  }
</script>
