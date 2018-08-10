<template>
  <span>
        <a href="javascript:;" @click.stop.prevent="modifyRow(rowData,index)">修改</a>
        <a href="javascript:;" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
  </span>
</template>

<script>
  import {publish} from 'pubsub-js'

  export default {
    name: 'BaseTableOperation',
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
    methods: {
      modifyRow(rowData,index) {
        console.log("base table operation 修改员工",rowData,index)
        let params = {type: 'edit', index: this.index, rowData: this.rowData};
        // this.$emit('modify-table-operate', params);
        publish('modify.table.operate', params)
      },
      deleteRow(rowData, index) {
        // 参数根据业务场景随意构造
        let params = {type: 'delete', index: this.index};
        // this.$emit('deleteTableOpertate', params);
        publish('delete.table.operate', {rowData, index})
      }
    }
  }
</script>

<style scoped>

</style>
