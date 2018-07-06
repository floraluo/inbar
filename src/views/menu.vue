<template>
  <div>
  <h2>Menu CURD Here</h2>
    <input name="name"/>
  <button class="btn-primary" @click="show">输出VM</button>
  </div>
</template>
<script>
  let vm

  export default {
    name: 'menu_',
    created () {
      vm = this
      console.log('created menu_', vm)
    },
    methods: {
      show () {
        console.log('vm', vm)
      }
    }
  }
</script>
