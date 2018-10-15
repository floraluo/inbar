<template>
  <div class="page-main">
    <div class="form-inline">
      <div class="form-group">
        <label>请选择时间：</label>
        <date-picker v-model="startTime" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>
        --
        <date-picker v-model="endTime" :not-before="startTime" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="filterFundByTime">查询</button>
      </div>
    </div>

    <div class="table-box">
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
               :columns="onlineMemberColumns"
               :table-data="onlineMembers"
               :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
    </div>
    <div class="paging" v-if="onlinePage.totalPage > 1">
      <v-pagination :total="onlinePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import DatePicker from 'vue2-datepicker'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  import store from '@/core/store'
  let vm
  export default {
    name: 'member-online-query',
    components: {DatePicker},
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        startTime:'',
        endTime:'',
        onlineMembers: [],
        onlineListParams: {
          page: 0,
          size: 10,
        },
        onlinePage: {
          totalPage: 0,
          amount: 0
        },
        onlineMemberColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'memberId', title: '卡号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'levelName', title: '会员类型', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'num', title: '上机次数', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'duration', title: '上机时长', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD hh:mm') }},
          {field: 'totalCash', title: '消费网费', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field:   [{ name:'查看', type: "modify", callback: this.goDetail}],
            title: '操作', width: 100, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
      }
    },
    methods: {
      filterFundByTime() {
        if (this.startTime) {
          this.startTime = moment(this.startTime).format('YYYY-MM-DDTHH:mm:ss');
        } else {
          delete this.startTime
        }
        if (this.endTime) {
          this.endTime = moment(this.endTime).format('YYYY-MM-DDTHH:mm:ss');
        } else {
          delete this.endTime
        }
        getAllonlineMember(); //filterFundByTime
      },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      goDetail(params) {
        this.$router.push({
          name: 'account-member-online-detail',
          query: {
            rowData: params.rowData
          }
        })
      },
      pageChange(pageIndex) {
        vm.onlineListParams.page = pageIndex - 1;
        getAllonlineMember(); //pageChange
      },
      pageSizeChange(newPageSize) {
        vm.onlineListParams.size = newPageSize;
        getAllonlineMember(); //pageSizeChange
      },
    },
    mounted(){
      // let nowDate = new Date();
      // let year = nowDate.getFullYear();
      // let month = nowDate.getMonth() + 1;
      // this.endTime=`${year}-${month}`;
    },
    created() {
      vm = this;
      getAllonlineMember(); //created
    }
  }

  function getAllonlineMember () {
    vm.tableLoading = true;
    GET('/api/cashier/account-details/selectMemberOperateComputer', vm.onlineListParams)
      .then(data => {
        vm.tableLoading = false;
        vm.onlinePage.totalPage = data.totalPages;
        vm.onlinePage.amount = data.totalElements;
        vm.onlineMembers = data.content;
      })
  }

</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";
</style>
