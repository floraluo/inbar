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
        <div class="col-md-3"><label>充值次数：</label><span>{{rowData.num}}</span></div>
        <div class="col-md-3"><label>累计充值：</label><span>{{rowData.totalCash}}</span></div>
        <div class="col-md-3"><label>账户余额：</label><span>{{rowData.cash}}</span></div>
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
             :columns="rechargeColumns"
             :table-data="recharge"
             :show-vertical-border="false"></v-table>
    <div class="paging" v-if="rechargePage.totalPage > 1">
      <v-pagination :total="rechargePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {publish} from 'pubsub-js'
  import DatePicker from 'vue2-datepicker'
  import layer from '../../../static/vendor/layer/layer'
  import time from '../../assets/js/time.js'
  import {GET} from '../../core/http'
  let vm
  export default {
    name: 'graph-recharge',
    data () {
      return {
        rowData: {},
        rechargeListParams: {
          page: 0,
          size: 10
        },
        rechargePage: {
          totalPage: 0,
          amount: 0
        },
        recharge: [],
        rechargeColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'amount', title: '充值金额', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsList', title: '赠送内容', width: 200, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData, rowIndex) {
              let content = ''
              if (rowData.goodsList.length > 0) {
                rowData.goodsList.forEach(item => {
                  content += `+${item.num}*${item.goodsName}`
                })
                content = content.replace(/^\+/, '')
              } else {
                content = '--'
              }
              let placement;
              if (rowIndex < (vm.recharge.length / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              return `<span class="v-table-popover-content" data-content="${content}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${content}</span>`;
            }},
          {field: 'paymentName', title: '支付方式', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'remark', title: '备注', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData) { return rowData.remark ? rowData.remark : '--'}},
          {field: 'operatedBy', title: '收银员', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'dispositAt', title: '充值时间', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData, rowIndex, pagingIndex, field) { return rowData[field] ? moment(rowData[field]).format('YYYY-MM-DD HH:mm') : '--' }}
        ]
      }
    },
    methods: {
      pageChange(pageIndex) {
        this.rechargeListParams.page = pageIndex - 1;
        getRechargeList(); //pageChange
      },
      pageSizeChange(newPageSize) {
        this.rechargeListParams.size = newPageSize;
        getRechargeList(); //pageSizeChange
      }
    },
    created () {
      vm = this
      this.rowData = this.$route.query.rowData
      getRechargeList() //created
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
  function getRechargeList () {
    GET('/api/cashier/business/selectRechargeInfo', {
      page: vm.rechargeListParams.page,
      size: vm.rechargeListParams.size,
      memberId: vm.rowData.memberId
    })
      .then(data => {
        vm.rechargePage.totalPage = data.totalPages;
        vm.rechargePage.amount = data.totalElements;
        vm.recharge = data.content;
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
