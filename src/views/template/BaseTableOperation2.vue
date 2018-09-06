<template>
  <span class="table-operate">
    <!--1 修改；2 删除；3 变更；4 注销；5 补货；6 提货-->
      <!--<a href="javascript:;" @click.stop.prevent="modifyRow('modify')" v-if="control.search('1') >= 0">修改</a>-->
      <!--<a href="javascript:;" @click.stop.prevent="deleteRow('delete')" v-if="control.search('2') >= 0">删除</a>-->
      <!--<a href="javascript:;" @click.stop.prevent="modifyRow('modify')" v-if="control.search('3') >= 0">变更</a>-->
      <!--<a href="javascript:;" @click.stop.prevent="deleteRow('delete')" v-if="control.search('4') >= 0">注销</a>-->
      <!--<a href="javascript:;" @click.stop.prevent="publishOperate('buhuo')" v-if="control.search('5') >= 0">补货</a>-->
      <!--<a href="javascript:;" @click.stop.prevent="publishOperate('tihuo')" v-if="control.search('6') >= 0">提货</a>-->

      <a href="javascript:;" @click.stop.prevent="publishOperate(item)" v-for="(item, index) in operates" :key="index">{{item.name}}</a>

  </span>
</template>

<script>
  import {publish} from 'pubsub-js'

  export default {
    name: 'BaseTableOperation2',
    props: {
      rowData: {
        type: Object
      },
      field: {
        type: Array
      },
      index: {
        type: Number
      }
    },
    computed: {
      operates () {
        return this.field
      },
      control() {
        return this.field.split("|")[1];
      }
    },
    methods: {
      modifyRow(rowData, index) {
        let params = {type: 'edit', index: this.index, rowData: this.rowData};
        // this.$emit('modify-table-operate', params);
        publish(`modify.table.operate.${this.field.split("|")[0]}`, params)
      },
      deleteRow(rowData, index) {
        // 参数根据业务场景随意构造
        let params = {type: 'delete', index: this.index, rowData: this.rowData};
        // this.$emit('deleteTableOpertate', params);
        publish(`delete.table.operate.${this.field.split("|")[0]}`, params)
      },
      publishOperate(operate) {
        // publish(`${type}.table.operate.${this.field.split("|")[0]}`, {
        //   type: type,
        //   index: this.index,
        //   rowData: this.rowData
        // })
        let params = {type: operate.type, index: this.index, rowData: this.rowData, callback: operate.callback};
        this.$emit('on-custom-comp', params)
      }
    }
  }
</script>

<style lang="scss">
  .table-operate {
    a + a{
      margin-left: 5px;
    }
  }
</style>
