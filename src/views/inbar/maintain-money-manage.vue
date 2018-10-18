<template>
<div class="">
  <div class="page-main">
    <div class="btn-operate-group">
      <button class="btn btn-primary" @click="clickAddMaintance"><i class="iconfont icon-add"></i>新增</button>
      <!--<button class="btn btn-primary" @click="clickDeleteStaffs"><i class="iconfont icon-close"></i>删除</button>-->
    </div>
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
               :columns="maintanceColumns"
               :table-data="maintances"
               :show-vertical-border="false" @on-custom-comp="toggleStatus"></v-table>
      <div class="paging" v-if="maintancePage.totalPage > 1">
        <v-pagination :total="maintancePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>

    </div>

  <!--添加维护金-->
  <div class="layer-add-maintain layer-open" id="addMaintainLayer">
    <form>
      <div class="form-group"><label>维护金名称<small class="error"  v-show="errors.has('name')">*{{ errors.first('name') }}</small></label>
        <input v-model="maintanceParam.name"
               data-vv-as="名称"
               v-validate="'required'"
               name="name"
               type="text" class="form-control" placeholder="请输入名称">
      </div>
      <div class="form-group"><label >维护金金额<small class="error"  v-show="errors.has('sum')">*{{ errors.first('sum') }}</small></label>
        <div class="input-group">
          <input v-model="maintanceParam.amount"
                 data-vv-as="金额"
                 v-validate="'required|sum'"
                 name="sum"
                 type="text" class="form-control" placeholder="请输入金额">
          <span class="input-group-addon">元</span>
        </div>
      </div>
      <div class="form-group form-date-group"><label >使用时间限制 <small class="error" v-show="time!== null && time === ''">*日期为必选项</small></label>
        <date-picker v-model="time" :width="datapickerWidth" type="month" :format="'YYYY-MM'"></date-picker>
      </div>
    </form>
    <div class="form-group layer-btn-operate-group">
      <button class="btn btn-default " @click="cancelLayer">取消</button>
      <button class="btn btn-primary" @click="saveAddMaintance">保存</button>
    </div>
  </div>
</div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import DatePicker from 'vue2-datepicker'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  let vm;

  function openLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['600px', '450px'],
      content: $('#addMaintainLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      cancel() {
        // layer.msg("我是取消回调")
      },
      end() {
        clearMaintainParams();
        // layer.msg("我是销毁回调")
      }
    })
  }

  function cancelLayer () {
    layer.close(vm.layerId);
    clearMaintainParams();
  }

  function clearMaintainParams () {
    vm.maintanceParam = {
      name: '',
      limit: '',
      year: '',
      month: '',
      enabled: true,
    }

  }
  function getAllMaintance() {
    vm.tableLoading = true;
    GET('api/maintance/', vm.maintanceList)
      .done((data) => {
        vm.tableLoading = false;
        vm.maintancePage.totalPage = data.totalPages;
        vm.maintancePage.amount = data.totalElements;
        vm.maintances = data.content;
      })
  }
  function postAddMaintance() {
    vm.maintanceParam.year = new Date(vm.time).getFullYear();
    vm.maintanceParam.month = new Date(vm.time).getMonth() + 1;
    POST('api/maintance/', vm.maintanceParam)
      .done(() => {
        getAllMaintance();
        clearMaintainParams();
        layer.msg('新增成功！');
        layer.close(vm.layerId);
      })
  }

  export default {
    name: 'miantain-money-manage',
    components: { DatePicker },
    data() {
      return {
        layerId: null,
        tableLoading: false,
        datapickerWidth: '100%',
        maintances: [],
        time: null,
        maintanceParam: {
          name: '',
          limit: '',
          year: '',
          month: '',
        },
        maintanceList: {
          page: 0,
          size: 10
        },
        maintancePage: {
          totalPage: 0,
          amount: 0
        },
        maintanceColumns: [
          {field: 'id', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'name', title: '名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'limit', title: '维护金', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'consume', title: '已使用', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'frequency', title: '使用次数', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time', title: '时间限制', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,formatter: (rowData, rowIndex) => {
              let time ,html, placement;
              if (rowData.month===null){
                return null
              } else {
                time  = `${rowData.year} - ${rowData.month}`;
              }
              if (rowIndex < (vm.maintanceList.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              html = `<span class="v-table-popover-content" data-content="${time}" data-placement="${placement}" data-trigger="hover" data-toggle="popover"  >${time}</span>`;
              return html ;
            }},
          {field: {name: 'enabled', valueKey: 'enabled', callback: this.toggleStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'createTime', title: '创建时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter(rowData) { return moment(rowData.createTime).format('YYYY-MM-DD') }},
        ]
      }
    },
    methods: {
      clickAddMaintance() {
        openLayer('新增员工维护金')
      },
      cancelLayer() {
        cancelLayer();
      },
      toggleStatus(params) {
        const rowData = params.rowData;
        let url = rowData.enabled === false ? `/api/maintance/enable/?ids=${rowData.id}` : `/api/maintance/disable/?ids=${rowData.id}`;
        PATCH(url)
          .done(() => {
            // getAllLevel();
            vm.maintances[params.index].enabled = !vm.maintances[params.index].enabled;
            // publish('switch.toggle.maintance', param.id)
          })
      },
      pageChange(pageIndex) {
        vm.maintanceList.page = pageIndex - 1;
        getAllMaintance();
      },
      pageSizeChange(newPageSize) {
        vm.maintanceList.size = newPageSize;
        getAllMaintance();
      },
      updated() {
        $('.v-table-body-class [data-toggle="popover"]').popover();
      },
      saveAddMaintance() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any() || vm.time === null || vm.time === '') {
            layer.msg('你还有错误消息未处理！')
            if (vm.time === null) vm.time = '';
          } else {
            // -----doPost()
            postAddMaintance();

          }
        })
      }
    },
    created() {
      vm = this;
      getAllMaintance();
      console.log(this.$route)
    }
  }

</script>
<style lang="scss">
  .layui-layer-page .layui-layer-content{
    overflow: initial;
  }
  .form-date-group{
    .mx-datepicker-popup{
      bottom: initial !important;
      width: 100%;
      .mx-calendar,
      .mx-calendar-content{
        width: 100%;
      }
    }
    .mx-calendar-content{
      height: 124px;
      border-top: 1px solid #d6d6d6;
    }
    .mx-panel-month .cell{
      width: calc((100% - 24px) / 6);
      margin: 8px 0;
    }
  }
</style>
<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>
