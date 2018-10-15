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
               :columns="barWaterColumns"
               :table-data="BarWaterBills"
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
    name: 'inbar-revenue',
    components: {DatePicker},
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        startTime:'',
        endTime:'',
        BarWaterBills: [],
        barWaterColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'finnshedTime', title: '时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD hh:mm') }},
          {field: 'buyerName', title: '会员', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'orderType', title: '事件', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              if (rowData.orderType === 0) {
                return '商品销售'
              } else if (rowData.orderType === 1) {
                return '网费充值'
              }
            }
          },
          {field: 'orderAmount', title: '金额', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'paymentName', title: '支付方式', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'operatedBy', title: '收银员', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {
            field: 'orderSn', title: '订单号', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              return `<a href="javascript:;" class="j-to-detail" data-no="${rowData.orderSn}">${rowData.orderSn}</a>`
            }
          },
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
        getAllbarWater(); //filterFundByTime
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
      // let nowDate = new Date();
      // let year = nowDate.getFullYear();
      // let month = nowDate.getMonth() + 1;
      // this.endTime=`${year}-${month}`;
    },
    created() {
      vm = this;
      getAllbarWater(); //created
    }
  }

  function getAllbarWater () {
    vm.tableLoading = true;
    GET('/api/cashier/account-details/selectBarWaterBills')
      .then(data => {
        vm.tableLoading = false;
        vm.BarWaterBills = data;
      })
  }

</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";
</style>
