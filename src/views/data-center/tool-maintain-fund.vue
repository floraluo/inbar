<template>
  <div class="page-main">
    <!--<div class="fund-top-btn-group form-inline">-->
      <!--<div class="form-group">-->
        <!--<label>店长手机：</label>-->
        <!--<input type="text" class="form-control">-->
      <!--</div>-->
      <!--<div class="form-group">-->
        <!--<button class="btn btn-primary" type="button">绑定</button>-->
        <!--<button class="btn btn-primary" type="button">清空</button>-->
      <!--</div>-->
      <!--<span>温馨提示：该手机将接受顾客维护金短信！</span>-->
    <!--</div>-->
    <div class="form-inline">
      <div class="form-group">
        <label>请选择时间：</label>
        <date-picker v-model="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>
        --
        <date-picker v-model="filter.until" :not-before="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
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
               :columns="fundColumns"
               :table-data="funds"
               :show-vertical-border="false"></v-table>
    </div>
    <div class="paging" v-if="fundPage.totalPage > 1">
      <v-pagination :total="fundPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import MultiSelect from 'vue-multiselect'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm
  export default {
    name: 'maintain-fund',
    components: {DatePicker, MultiSelect},
    data () {
      return {
        filter: {
          since: '',
          until: ''
        },
        tableLoading: false,
        funds: [],
        fundListParams: {
          page: 0,
          size: 10,
          sort: 'createTime,desc'
        },
        fundPage: {
          totalPage: 0,
          amount: 0
        },
        fundColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'memberId', title: '会员卡号/机号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'name', title: '客户姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'operatedBy', title: '收银员', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'createTime', title: '使用时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD HH:mm') }},
          {field: 'useMoney', title: '使用金额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'balance', title: '余额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true}
        ]
      }
    },
    methods: {
      filterFundByTime() {
        if (this.filter.since) {
          this.fundListParams.startTime = moment(this.filter.since).format('YYYY-MM-DDTHH:mm:ss');
        } else {
          delete this.fundListParams.startTime
        }
        if (this.filter.until) {
          this.fundListParams.endTime = moment(this.filter.until).format('YYYY-MM-DDTHH:mm:ss');
        } else {
          delete this.fundListParams.endTime
        }
        getAllFund(); //filterFundByTime
      },
      pageChange(pageIndex) {
        this.fundListParams.page = pageIndex - 1;
        getAllFund();
      },
      pageSizeChange(newPageSize) {
        this.fundListParams.size = newPageSize;
        getAllFund();
      }
    },
    created () {
      vm = this
      getAllFund();
    }
  }
  function getAllFund () {
    vm.tableLoading = true;
    GET('/api/maintance/log/queryByPage', vm.fundListParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.fundPage.totalPage = data.totalPages;
        vm.fundPage.amount = data.totalElements;
        vm.funds = data.content;
      })
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .fund-top-btn-group{
    display: flex;
    align-items: center;
    padding: 10px 30px;
    margin-bottom: 20px;
    background-color: #fcf3e5;
    span{
      margin-left: 20px;
      color: #999;
    }
    .form-group{
      margin-bottom: 0;
    }
  }
</style>
