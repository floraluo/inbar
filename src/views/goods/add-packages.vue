<template>
  <div class="page-main" >

    <div class="btn-return">
      <router-link :to="{name: 'package-list'}" class="btn-pure btn-default" replace>返回 <i class="iconfont icon-fanhui"></i></router-link>
    </div>
    <div class="page-main-content col-lg-7  col-xs-12" >
      <te-package></te-package>
    </div>
    </div>


</template>
<script>
  import DatePicker from 'vue2-datepicker'
  import { publish, subscribe } from 'pubsub-js'
  import tePackage from './template-package'

  export default {
    name: "add-package",
    components: {DatePicker,tePackage},
    mounted() {
      publish('crumb.push', {
        crumb: {name: '新增套餐'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";

</style>
