<template>
  <div class="page-main">
    <div class="btn-return">
      <a href="javascript:;" @click="$router.back()">返回 <i class="iconfont icon-fanhui"></i></a>
    </div>
    <div class="panel-title">
      会员信息
    </div>
    <div class="form-horizontal">
      <div class="form-group">
        <div class="col-md-3"><label>会员姓名：</label><span>{{rowData.name}}</span></div>
        <div class="col-md-3"><label>会员卡号：</label><span>{{rowData.memberId | formatIDCard}}</span></div>
        <div class="col-md-3"><label>会员类型：</label><span>{{rowData.levelName}}</span></div>
        <div class="col-md-3"><label>联系方式：</label><span>{{rowData.mobile}}</span></div>
        <div class="col-md-3"><label>消费次数：</label><span>{{rowData.frequency}}</span></div>
        <div class="col-md-3"><label>累计消费：</label><span>{{rowData.totalAmount || 0}}</span></div>
      </div>
    </div>
    <div class="panel-title">
      充值明细
    </div>
    <v-table is-horizontal-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#ebebeb"
             :title-row-height="52"
             :columns="expenseColumns"
             :table-data="expense"
             :show-vertical-border="false"></v-table>
    <div class="paging" v-if="expensePage.totalPage > 1">
      <v-pagination :total="expensePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>
</template>

<script>
  import {publish} from 'pubsub-js'
  import moment from 'moment'
  import {GET} from '../../core/http'
  let vm
  export default {
    name: 'graph-expense',
    data () {
      return {
        rowData: {},
        expenseListParams: {
          page: 0,
          size: 10
        },
        expensePage: {
          totalPage: 0,
          amount: 0
        },
        expense: [],
        expenseColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'computerNumber', title: '机器号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'name', title: '商品/套餐名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'orderAmount', title: '金额', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'paymentName', title: '支付方式', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'remark', title: '备注', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData, rowIndex, pagingIndex, field) { return rowData[field] ? moment(rowData[field]) : '--' }},
          {field: 'operatedBy', title: '收银员', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'paymentTime', title: '结账时间', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData, rowIndex, pagingIndex, field) { return rowData[field] ? moment(rowData[field]).format('YYYY-MM-DD HH:mm') : '--' }}
        ]
      }
    },
    methods: {
      pageChange(pageIndex) {
        this.expenseListParams.page = pageIndex - 1;
        getExpenseList(); //pageChange
      },
      pageSizeChange(newPageSize) {
        this.expenseListParams.size = newPageSize;
        getExpenseList(); //pageSizeChange
      }
    },
    created () {
      vm = this
      this.rowData = this.$route.query.rowData
      getExpenseList() //created
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '查看个人'},
        toggleMenubar: false
      })
    }
  }
  function getExpenseList () {
    GET(`/api/report/consume/${vm.rowData.id}/detail`, {
      page: vm.expenseListParams.page,
      size: vm.expenseListParams.size,
      // beginTime: moment(vm.$route.query.beginTime).format('YYYY-MM-DDT00:00:00'),
      // endTime: moment(vm.$route.query.endTime).format('YYYY-MM-DDT00:00:00')
      beginTime: vm.$route.query.beginTime,
      endTime: vm.$route.query.endTime
    })
      .then(data => {
        vm.expensePage.totalPage = data.totalPages;
        vm.expensePage.amount = data.totalElements;
        vm.expense = data.content;
      })
  }
</script>

<style scoped lang='scss'>
  @import "../../sass/base-manage";
  .panel-title{
    position: relative;
    border-bottom: 1px solid $border-color;
    font-size: 15px;
    font-weight: bold;
    padding: 5px 0;
    margin-bottom: 20px;
    &:before{
      content: '';
      position: absolute;
      bottom: -1px;
      width: 4em;
      height: 3px;
      background-color: $theme-color;
    }
  }
  .form-group > div {
    margin-bottom: 15px;
  }
</style>
