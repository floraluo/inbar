<template>
  <div class="page-main " >
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
          {field: 'topic',  width: 20, titleAlign: 'center', columnAlign: 'right', isResize: true,formatter: (rowData) => {
              let html = '';
              if (rowData.topic === 'System') {
                html += `<button style="width: 1.8em;height: 22px;line-height: 22px;border-radius: 2px;color:#4dbdfc;border-color:#4dbdfc;background-color: transparent;">
                        系</button>`
              } else if (rowData.topic ==='UnreadMessageCount') {
                html += `<button style="width: 1.8em;height: 22px;line-height: 22px;border-radius: 2px;color:#feb62f;border-color:#feb62f;background-color: transparent;">
                        售</button>`
              } else if (rowData.topic === 'VoiceBroadcast') {
                html +=  `<button style="width: 1.8em;height: 22px;line-height: 22px;border-radius: 2px;color:#46be8a;border-color:#46be8a;background-color: transparent;">
                        充</button>`
              }
              else if (rowData.topic === ' VoicePlaylist') {
                html +=`<button style="width: 1.8em;height: 22px;line-height: 22px;border-radius: 2px;color:#F96868;border-color:#F96868;background-color: transparent;">
                        呼</button>`
              }
            return html;

            }
          },
          {field: 'content', title: '消息内容', width: 200,titleAlign: 'left', columnAlign: 'left', isResize: true},
          {field: 'sentAt', title: '消息时间', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData) { return moment(rowData.sentAt).format('YYYY-MM-DD hh:mm') }},
          {field: 'topic', title: '消息类型', width: 50, titleAlign: 'center', columnAlign: 'center', isResize:true,formatter: (rowData) => {
              let name;
              if (rowData.topic === 'System') {
                name = '系统消息'
              } else if (rowData.topic ==='UnreadMessageCount') {
                name = '销售下单 '
              } else if (rowData.topic === 'VoiceBroadcast') {
                name = '充值下单'
              }
              else if (rowData.topic === ' VoicePlaylist') {
                name = '呼叫网管'
              }
              return name;
            }},
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
    padding-left: 40px;
  }
  .v-table-title-cell{
    padding-left: 20px;
  }
  .v-table-views{
   border: none;
  }
  .page-main{
    padding:40px 40px;
  }
</style>
