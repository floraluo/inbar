<template>
  <div class="page-main ">
    <div class=" btn-return " >
      <router-link :to="{name: 'inbar-announcement'}" class="btn-pure btn-default" replace > 返回  <i class="iconfont icon-fanhui"></i></router-link>
    </div>
   <cAnnouncement></cAnnouncement>
  </div>

</template>

<script>
  import cAnnouncement from  './template-announce.vue'
  import DatePicker from 'vue2-datepicker'
  import {publish,subscribe} from 'pubsub-js'


  let vm;
  export default {
    name: "add-announcement",
    components: {DatePicker,cAnnouncement},
    props: {
      announce: Object,
      modify: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        layerId: null,
        datapickerWidth: '48%',
        announces: {},
        announceParam: {
          name: '',
          description: '',
          beginTime: null,
          endTime: null,
          content: '',
          time: null,
          enabled: true,
        }
      }
    },
    mounted() {
      this.$emit('crumb-push', {
        crumb: {name: '新增活动'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";

</style>
