<template>
<main class="site-page">
  <div class="page-container" id="admui-pageContent">
    <slot></slot>
  </div>
  <div class="page-loading vertical-align text-center">
    <div class="page-loader loader-default loader vertical-align-middle" data-type="default"></div>
  </div>
</main>
</template>

<script>
  export default {
    name: 'home-page',
    data() {
      return {}
    }
  }
</script>
