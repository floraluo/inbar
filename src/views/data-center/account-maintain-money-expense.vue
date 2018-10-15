<template>
  <div class="page-main">
    <div class="form-inline">
      <div class="form-group">
        <label>请选择时间：</label>
        <date-picker v-model="startTime" :width="'150'" :editable="true" :format="'YYYY-MM'" ></date-picker>
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
               :columns="expenseColumns"
               :table-data="expenses"
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
    name: 'maintain-money-expense',
    components: {DatePicker},
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        startTime:'',
        expenses: [],
        expenseColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'createTime', title: '时间', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD hh:mm') }},
          {field: 'buyerName', title: '使用', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'operatedBy', title: '收银员', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'useType', title: '事件', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              if (rowData.useType === 0) {
                return '商品销售'
              } else if (rowData.useType === 1) {
                return '网费充值'
              }
            }
          },
          {field: 'useMoney', title: '使用金额', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'useName', title: '会员', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          // {field:   { name:'orderSn', type: "modify", callback: this.goDetail},
          //   title: '关联订单', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,},
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
        getAllExpense(); //filterFundByTime
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
      this.startTime=`${year}-${month}`;
    },
    created() {
      vm = this;
      getAllExpense(); //created
    }
  }

  function getAllExpense () {
    vm.tableLoading = true;
    GET('/api/cashier/account-details/selectByTime')
      .then(data => {
        vm.tableLoading = false;
        vm.expenses = data;
      })
  }

</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";
</style>
