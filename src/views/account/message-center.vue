<template>
  <div class="page-main padding-top-40" >
    <v-table is-horizontal-resize
             is-vertical-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#f0f2f9"
             :title-row-height="52"
             :is-loading="tableLoading"
             :height="455"
             :min-height="455"
             :columns="Columns"
             :table-data="messages"
             :show-vertical-border="false"  ></v-table>
    <div class="paging" v-if="messagePage.totalPage > 1">
      <v-pagination :total="messagePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  let vm;
  export default {
    name: "message-center",
    data() {
      return {
        tableLoading: false,
        messages: [],
        messageTotalPage: null,
        messageListParam: {
          page: 0,
          size: 10,
        },
        messagePage: {
          totalPage: 0,
          amount: 0,
        },
        Columns: [
          {field: 'setmealName', title: '消息内容', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'receiverType', title: '消息类型', width: 100, titleAlign: 'center', columnAlign: 'center', isResize:true},
         // {field: 'sentAt', title: '消息时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData) { return moment(rowData.sentAt).format('YYYY-MM-DD') }},
        ]
      }
    },
    methods:{
      pageChange(pageIndex) {
        vm.messageListParam.page = pageIndex - 1;
        getAllMessage();
      },
      pageSizeChange(newPageSize) {
        vm.messageListParam.size = newPageSize;
        getAllMessage();
      },
    },
    created(){
      vm=this;
      getAllMessage();
    }
  }
    function getAllMessage(){
      vm.tableLoading = true;
    GET('api/message/',vm.messagePage)
      .done(data => {
        vm.tableLoading = false;
        vm.messagePage.totalPage = data.totalPages;
        vm.messagePage.amount = data.totalElements;
        vm.messages = data.content;
      })
  }
</script>

<style lang="scss">
  .v-table-body-cell {
    border-style: dashed;
  }
</style>
