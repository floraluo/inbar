<template>
  <div class="page-main">
    <div class="form-inline">
      <div class="form-group">
        <label>客户姓名：</label>
        <input type="text" class="form-control" placeholder="请输入" v-model="name">
      </div>
      <div class="form-group">
        <label>客户卡号：</label>
        <input type="text" class="form-control" placeholder="请输入" v-model="memberId">
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="filterFundByTime">查询</button>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-round" @click="clickRecoverMember"><i class="iconfont icon-add"></i> 恢复</button>
        <button class="btn btn-primary btn-round" @click="clickDeleteMember"><i class="iconfont icon-close"></i> 注销</button>
      </div>
    </div>

    <v-table is-horizontal-resize
             is-vertical-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#f0f2f9"
             :title-row-height="52"
             :is-loading="tableLoading"
             :height="500"
             :min-height="500"
             :columns="dummyMemberColumns"
             :table-data="dummyMembers"
             :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
    <div class="paging" v-if="dummyMemberPage.totalPage > 1">
      <v-pagination :total="dummyMemberPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
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
    name: 'precipitation-member-data',
    components: {DatePicker},
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        name:'',
        memberId:'',
        delIds:[] ,
        dummyMembers: [],
        dummyMemberParams: {
          page: 0,
          size: 10,
          sort: 'dummyAt,desc'
        },
        dummyMemberPage: {
          totalPage: 0,
          amount: 0
        },
        dummyMemberColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'memberId', title: '身份证', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'contact', title: '联系方式', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'levelName', title: '会员等级', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'frequency', title: '上网次数', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'totalRecharges', title: '累计网费充值', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'totalGoodsSpent', title: '累计商品消费', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'cash', title: '网费余额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'dummyAt', title: '沉淀时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD hh:mm') }},
          {field: 'inbarName', title: '会员归属', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: 'city', title: '城市', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true,},
          {field: [
              {name: '恢复', callback: this.recoverTheMember},
              {name: '注销', callback: this.deleteOneMember}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
      }
    },
    methods: {
      filterFundByTime() {
        if (this.name) {
          vm.dummyMemberParams.name = this.name;
        } else {
          delete  vm.dummyMemberParams.name
        }
        if (this.memberId) {
          vm.dummyMemberParams.memberId = this.memberId;
        } else {
          delete   vm.dummyMemberParams.memberId
        }
        getAllDummyMember(); //filterFundByTime
      },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      selectCoin(selection) {
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },
      clickRecoverMember(){
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          recoverDummyMembers();
        }
      },
      clickDeleteMember() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteDummyMembers();
        }
      },
      deleteOneMember(param) {
        this.delIds = [];
        this.delIds.push(param.rowData.id)
        deleteDummyMembers ();
      },
      recoverTheMember(param){
        this.delIds = [];
        this.delIds.push(param.rowData.id)
        recoverDummyMembers();
      },
      pageChange(pageIndex) {
        vm.dummyMemberParams.page = pageIndex - 1;
        getAllDummyMember(); //pageChange
      },
      pageSizeChange(newPageSize) {
        vm.dummyMemberParams.size = newPageSize;
        getAllDummyMember(); //pageSizeChange
      },
    },
    created() {
      vm = this;
      getAllDummyMember(); //created
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    }
  }

  function getAllDummyMember () {
    vm.tableLoading = true;
    GET('/api/member/dummy/',vm.dummyMemberParams)
      .then(data => {
        vm.tableLoading = false;
        vm.dummyMembers = data.content;
      })
  }
  function deleteDummyMembers () {
    DELETE('/api/member/dummy/', {ids: vm.delIds})
      .done(() => {
        layer.msg("删除成功");
        getAllDummyMember();
        vm.delIds = []
      })
  }
  function recoverDummyMembers() {
    POST('/api/member/dummy/_recovery', {ids: vm.delIds})
      .done(() => {
        layer.msg("恢复成功");
        getAllDummyMember();
        vm.delIds = []
      })
  }
</script>
<style lang="scss">
  .v-table-title-class{
    .v-table-title-cell{
      /*height: 52px !important;*/
      background-color: #f0f2f9;
      border-bottom: 2px solid #d6d6d6 !important;
    }
  }
  .v-table-views{
    /*height: 570px;*/
    border: none;
    /*width: calc(100% - 20px) !important;*/
  }
  .v-table-body-cell{
    border-style: dashed;
  }
</style>
<style scoped lang='scss'>
  @import "../../sass/base-manage";

</style>
