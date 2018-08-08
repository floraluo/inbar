<template>
  <my-switch open-name="启用" close-name="禁用" size="lg" v-model="rowData.status"></my-switch>
</template>

<script>
  import mySwitch from 'vue-switch/switch-2.vue';

  export default {
    name: 'BaseSwitch',
    props: {
      rowData: {
        type: Object
      },
      field: {
        type: String
      },
      index: {
        type: Number
      }
    },
    components: {
      'my-switch': mySwitch
    }
  }
</script>

<style lang="scss">
  .vue-switch{
    /*width: 54px;*/
    height: 22px !important;
    line-height: 22px  !important;
    margin-top: 9px;
    &.z-on span{
      /*left: 4px !important;*/
    }
    span.close{
      color: #fff !important;
      opacity: 1;
      line-height: inherit;
      /*left: 20px !important;*/
    }
  }

</style>
