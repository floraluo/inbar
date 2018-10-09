<template>
  <div class="page-main">
    <!--<div class="fund-top-btn-group" v-show="turnInTimeDiff > 0">-->
    <div class="fund-top-btn-group" >
      <router-link :to="{name:'turnInFundPost'}" class="btn btn-primary">立即上缴</router-link>
      <span v-show="funds.length > 0">距离上次上缴已过去{{turnInTimeDiff}}天</span>
    </div>
    <div class="form-inline">
      <div class="form-group">
        <label>请选择时间：</label>
        <date-picker v-model="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间"></date-picker>
        --
        <date-picker v-model="filter.until" :not-before="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button">查询</button>
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
               :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
    </div>
    <div class="paging" v-if="fundPage.totalPage > 1">
      <v-pagination :total="fundPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  // import layer from 'layui-src'
  import MultiSelect from 'vue-multiselect'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm
  export default {
    name: 'turn-in-fund-list',
    components: {DatePicker, MultiSelect},
    data () {
      return {
        layerId: null,
        filter: {
          since: '',
          until: ''
        },
        tableLoading: false,
        selectedFund: null,
        funds: [],
        fundListParams: {
          page: 0,
          size: 10,
          sort: 'until,desc'
        },
        fundPage: {
          totalPage: 0,
          amount: 0
        },
        fundColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'until', title: '日期', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD') }},
          {field: 'originalAmount', title: '本期现金收入', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'actualAmount', title: '实际上缴金额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'differenceAmount', title: '差异', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: [
              {name: '查看明细', type: "detail", callback: this.gotoDetail}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ]
      }
    },
    computed: {
      turnInTimeDiff() {
        if (this.funds.length === 0) return 1;
        const currentData = new Date();
        return currentData - this.funds[0].until;
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      gotoDetail(params) {
        const rowData = params.rowData;
        this.$router.push({
          name: 'turnInFundGet',
          query: {
            id: 0
          }
        })
      },
      pageChange(pageIndex) {
        this.fundListParams.page = pageIndex - 1;
        getAllFund();
      },
      pageSizeChange(newPageSize) {
        this.fundListParams.size = newPageSize;
        getAllFund();
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },
    created () {
      vm = this
      getAllFund();
    }
  }
  function getAllFund () {
    vm.tableLoading = true;
    GET('/api/to-boss/cash/', vm.fundListParams)
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
      color: #666;
    }
  }
</style>
