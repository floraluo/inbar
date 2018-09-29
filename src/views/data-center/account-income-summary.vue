<template>
<div class="page-main">
  <div class="form-inline">
    <div class="form-group">
      <label>请选择时间：</label>
      <date-picker v-model="filter.dateTime" :width="'150'" :editable="true" :format="'YYYY-MM'" ></date-picker>
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
             :columns="inComeColumns"
             :table-data="inComes"
             :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
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
    name: 'income-summary',
    components: {DatePicker},
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        filter:{
          dateTime:'',
        },
        payments: [],
        inComes: [],
        fundListParams:{

        },
        paymentColumns: [
          {field: 'paymentName', title: '门店名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'netCostAmount', title: '网费', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsAmount', title: '商品', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
        ],
        inComeColumns: [
          {field: 'finnshedTime', title: '时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD') }},
          {field: 'goodsAmount', title: '商品收入', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'weichat', title: '微信', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'alipay', title: '支付宝', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'account', title: '卡扣', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'unionpay', title: '银联', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'cash', title: '现金', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          //{field: 'amount', title: '总收入', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field:   [{name: '详情', type: "modify", callback: this.goDetail}],
            title: '操作', width: 100, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
      }
    },
    methods: {
      filterFundByTime() {
        if (this.filter.dateTime) {
          vm.dateTime = moment(this.filter.dateTime).format('YYYY-MM-DDTHH:mm:ss');
        } else {
          delete this.filter.dateTime
        }
       // getAllPayment(); // filterFundByTime
        getALLinCome ();
      },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      goDetail(params) {
        this.$router.push({
          name: 'shiftDetail',
          query: {
            rotaId: params.rowData.id
            // inbarId: params.rowData.inbarId
          }
        })
      },
    },
    mounted(){
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      this.filter.dateTime=`${year}-${month}`;
    },
      created() {
      vm = this;
      //getAllPayment(); //created
      getALLinCome ();
    }
  }

  // function getAllPayment () {
  //   vm.tableLoading = true;
  //   vm.dateTime=moment(this.dateTime ).format("YYYY-MM ");
  //   let query=vm.dateTime
  //   GET(`/api/cashier/account-details/monthlyIncomeStatisticsOfPayment?dateTime=${query}`)
  //     .then(data => {
  //       vm.tableLoading = false;
  //       vm.payments = data;
  //     })
  // }
  function getALLinCome () {
    vm.tableLoading = true;
    vm.dateTime=moment(vm.dateTime ).format("YYYY-MM-DDTHH:mm:ss ");
    let query=vm.dateTime;
    GET(`/api/cashier/account-details/monthlyIncomeStatisticsInfo?dateTime=${query}`)
      .then(data => {
        vm.tableLoading = false;
        vm.inComes = data;
      })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";

</style>
