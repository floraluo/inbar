<template>
  <div class="page-main" >
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="detail-panel">
      <div class="detail-panel-title">
        <span class="name">会员信息</span>
      </div>
      <div class="content row">
        <!--<div class="col-xs-12 col-sm-6 col-md-3 item"><label>会员姓名：</label><span>{{onlineMembers.name}}</span></div>-->
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>会员卡号：</label><span>{{onlineMembers.memberId}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>会员等级：</label><span>{{onlineMembers.levelName}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>联系方式：</label><span>{{onlineMembers.mobile}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>上网次数：</label><span>{{onlineMembers.num}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>上网时长：</label><span>{{onlineMembers.duration}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>网费总计：</label><span>{{onlineMembers.totalCash}}</span></div>
        <div class="col-xs-12 col-sm-6 col-md-3 item"><label>充值余额：</label><span>{{onlineMembers.cash}}</span></div>
      </div>
    </div>
    <div class="detail-panel">
      <div class="detail-panel-title">
        <span class="name">上机明细</span>
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
                 :columns="onlineDetailColumns"
                 :table-data="onlineDetails"
                 :show-vertical-border="false" ></v-table>
      </div>
      <div class="paging" v-if="onlinePage.totalPage > 1">
        <v-pagination :total="onlinePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>
  </div>
</template>


<script>
  import $ from 'jquery'
  import moment from 'moment'
  import {publish} from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  import store from '@/core/store'
  let vm
  export default {
    name: "account-member-online-detail",
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        startTime: '',
        endTime: '',
        memberId:'',
        onlineDetails: [],
        onlineMembers: {
          memberId:'',
        },
        onlineListParams: {
          page: 0,
          size: 10,
          sort: 'offlineAt,desc',
        },
        onlinePage: {
          totalPage: 0,
          amount: 0
        },
        onlineDetailColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => {return rowIndex + 1}},
          {field: 'fee', title: '结账款', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'duration', title: '上网时长', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData, rowIndex, pagingIndex, field) {
              return moment(rowData[field]).format('YYYY-MM-DD hh:mm')}},
          {field: 'onlineAt', title: '上机时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData, rowIndex, pagingIndex, field) {
              return moment(rowData[field]).format('YYYY-MM-DD hh:mm')}},
          {field: 'offlineAt', title: '下机时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData, rowIndex, pagingIndex, field) {
              return moment(rowData[field]).format('YYYY-MM-DD hh:mm')}},
          {field: 'offlineAt', title: '结账时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData, rowIndex, pagingIndex, field) {
              return moment(rowData[field]).format('YYYY-MM-DD hh:mm')}},
        ],
      }
    },
    methods:{
      pageChange(pageIndex) {
        vm.onlineListParams.page = pageIndex - 1;
        getAllShift(); //pageChange
      },
      pageSizeChange(newPageSize) {
        vm.onlineListParams.size = newPageSize;
        getAllShift(); //pageSizeChange
      },
    },
    created() {
      vm = this;
     // this.onlineMembers = this.$route.query.rowData;
     // getAllonlineMember ();
      getOnlineDetail(); //created
    },
    mounted() {
      this.$emit('crumb-push', {
        crumb: {name: '会员上机明细'},
        toggleMenubar: false
      })
    }
  }
  // function getAllonlineMember () {
  //   GET('/api/cashier/account-details/selectMemberOperateComputer',{orderNum: param.number})
  //     .then(data => {
  //       vm.onlineMembers = data.content;
  //     })
  // }
  function getOnlineDetail () {
    vm.tableLoading = true;
    GET('/api/cashier/account-details/selectMemberOperateComputerInfo', {
      //memberId: vm.onlineMembers.memberId,
      page: vm.onlineListParams.page,
      size: vm.onlineListParams.size,
      sort: vm.onlineListParams.sort
    })
      .then(data => {
        vm.tableLoading = false;
        vm.onlinePage.totalPage = data.totalPages;
        vm.onlinePage.amount = data.totalElements;
        vm.onlineDetails = data.content;
      })
  }
</script>
<style scoped lang='scss'>
@import "../../sass/base-manage";
span.name{
    font-size: 14px;
    font-weight: bolder;
    padding-bottom: 12px;
    border-bottom: 2px solid #0191fa;
  }
  .detail-panel-title{
    padding-bottom: 10px;
    border-bottom:1px solid #dddddd;
  }
  .item{
    padding-top: 20px;
    padding-bottom: 10px;
  }

</style>
