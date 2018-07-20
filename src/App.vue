<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import home from './home/home.vue'
  import login from './views/login.vue'
  export default {
    name: "App",
    components: {home, login}
  }
</script>
