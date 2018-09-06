<template>
  <div class="page-main">
    <div class="form-inline">
      <div class="form-group"><label class="control-label">审核状态：</label>
        <div class="status-select-box">
          <multiselect
            value="id"
            v-model="checkStatus"
            label="name"
            placeholder="请选择"
            track-by="id"
            @input="updateCheckStatus"
            :maxHeight="200"
            :showLabels="false"
            :close-on-select="true"
            :searchable="false"
            :allow-empty="false"
            :options="checkStatusList">
        </multiselect>
        </div>

      </div>
      <div class="form-group"><label class="control-label">网吧名称：</label>
        <input type="text" class="form-control" placeholder="请输入关键字">
      </div>
      <div class="form-group"><button class="btn btn-primary">查询</button></div>
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
               :columns="shiftColumns"
               :table-data="shifts"
               :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
    </div>
    <div class="paging" v-if="shiftPage.totalPage > 1">
      <v-pagination :total="shiftPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>

    <!--查看商品-->
    <div class="layer-open layer-goods" id="goodsLayer">
      <div class="form-inline">
        <div class="form-group"><label for="">门店名称：</label><span>{{rowData.inbarName}}</span></div>
        <div class="form-group"><label for="">收银员：</label><span>{{rowData.cashierName}}</span></div>
        <div class="form-group"><label for="">截止时间：</label><span>{{rowData.until | formatTime( 'YYYY-MM-DD')}}</span></div>
      </div>
      <div class="category-wrap">
        <ul class="category j-category">
          <li class="title">商品分类</li>
          <li :class="{active: selectedCategory === null}" @click="filterGoodsByCat()">全部</li>
          <li :class="{active: selectedCategory && item.gcId === selectedCategory.gcId}"
              v-for="item in categories"
              :key="item.gcId"
              @click="filterGoodsByCat(item)">
            {{item.gcName}}
          </li>
        </ul>
      </div>

      <div class="right-content">
        <v-table ref="tableGoods" is-horizontal-resize
                 is-vertical-resize
                 style="width:100%"
                 row-hover-color="#f8f8f8"
                 row-click-color="#f7f0dc"
                 title-bg-color="#ebebeb"
                 :title-row-height="36"
                 :row-height="36"
                 :is-loading="layerTableLoading"
                 :height="325"
                 :min-height="325"
                 :columns="tableGoods.columns"
                 :table-data="tableGoods.data"></v-table>
      </div>
    </div>
    <!--查看现金-->
    <div class="layer-open" id="cashLayer">
      <div class="form-inline">
        <div class="form-group">
          <label>上班交接：</label>
          <div class="input-group">
            <input type="text" class="form-control" disabled :value="cash.previous">
            <span class="input-group-addon">元</span>
          </div>
        </div>

        <div class="form-group">
          <label>本班收银：</label>
          <div class="input-group">
            <input type="text" class="form-control" disabled :value="cash.income">
            <span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group">
          <label>剩余现金：</label>
          <div class="input-group">
            <input type="text" class="form-control" disabled :value="cash.current">
            <span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group">
          <label>实际剩余：</label>
          <div class="input-group">
            <input type="text" class="form-control" disabled :value="cash.checked">
            <span class="input-group-addon">元</span>
          </div>
        </div>
      </div>
      <!--<div class="form-group layer-btn-operate-group">-->
        <!--<button class="btn btn-default" @click="cancelLayer">取消</button>-->
        <!--<button class="btn btn-primary" @click="submitCheck">保存</button>-->
      <!--</div>-->
    </div>
    <!--审核意见-->
    <div class="layer-open" id="checkLayer">
      <div class="form-inline">
        <label>审核意见：</label>
        <textarea v-model="note" cols="50" rows="5" class="form-control" placeholder="请输入审核意见"></textarea>
      </div>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitCheck">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import multiselect from 'vue-multiselect'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  import store from '@/core/store'

  let vm;
  export default {
    name: 'shift-list',
    components: {multiselect},
    data () {
      return {
        tableLoading: false,
        layerTableLoading: false,
        selectedCategory: null,
        layerId: null,
        inbarId: null,
        rotaId: null,
        checkStatus: null,
        checkStatusList: [{id: 0, name: '已审', value: true}, {id: 1, name: '未审', value: false}],
        shiftListParams: {
          page: 0,
          size: 10
        },
        shiftPage: {
          totalPage: 0,
          amount: 0
        },
        rowData: {},
        cash: {},
        note: '',
        shifts: [],
        shiftColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'inbarName', title: '门店名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'counterName', title: '收银台', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'since', title: '开始时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD') }},
          {field: 'until', title: '结束时间', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD') }},
          {field: 'cashierName', title: '交班人', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'nextCashierName', title: '接班人', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'checkState', title: '盘点', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              if (rowData.checkState === 'NotChecked') {
                return '未盘点'
              } else if (rowData.checkState === 'Normal') {
                return '正常'
              } else if (rowData.checkState === 'Abnormal') {
                return '差异'
              }
            }
          },
          {field: 'approved', title: '审核', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
           formatter: (rowData) => {
            if (rowData.approved) {
              return '已审'
            } else {
              return '未审'
            }
           }
          },
          {field: [
              {name: '交班明细', type: "modify", callback: this.goDetail},
              {name: '查看商品', type: "delete", callback: this.openGoodsLayer},
              {name: '查看现金', type: "delete", callback: this.openCashLayer},
              {name: '审核', type: "delete", callback: this.openCheckLayer}
            ], title: '操作', width: 225, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
        categories: [],
        tableGoods: {
          data: [],
          columns: [
            {title: '编号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
            {field: 'goodsName', title: '商品名称', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'sold', title: '销售数量（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'current', title: '库存数量（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'checked', title: '盘点结果（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true}
          ]
        }
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      updateCheckStatus () {},
      goDetail(params) {
        this.$router.push({
          name: 'shift-detail',
          query: {
            rotaId: params.rowData.id
            // inbarId: params.rowData.inbarId
          }
        })
      },
      openGoodsLayer(params) {
        this.rowData = params.rowData;
        GET(`/api/inbar/${this.inbarId}/rota/${params.rowData.id}/stock-check`)
          .then(data => {
            if (data.classes) {
              vm.tableGoods.data = data.classes.checks;
              vm.categories = data.classes.klass;
            }
            this.layerId = layer.open({
              type: 1,
              title: '查看商品',
              area: ['850px', '570px'],
              content: $('#goodsLayer'),
              success: () => {
                vm.$refs['tableGoods'].resize();
                $('.j-category').slimScroll({
                  height: '325px'
                })
              }
            })
          })
      },
      openCashLayer(params) {
        GET(`/api/inbar/${this.inbarId}/rota/${params.rowData.id}/cash-check`)
          .then(data => {
            vm.cash = data;
            this.layerId = layer.open({
              type: 1,
              title: '查看现金',
              area: ['420px', '300px'],
              content: $('#cashLayer')
            })
          })
      },
      openCheckLayer(params) {
        let data = params.rowData;
        this.note = data.approvedNote;
        this.rotaId = data.id;
        this.layerId = layer.open({
          type: 1,
          title: '审核意见',
          area: ['600px', '320px'],
          content: $('#checkLayer')
        })
      },
      submitCheck() {
        POST(`/api/inbar/${this.inbarId}/rota/${this.rotaId}/_approve`, {note: this.note})
          .then(() => {
            vm.cancelLayer();
            getAllShift()
            layer.msg('提交成功');
          })
      },
      pageChange(pageIndex) {
        vm.shiftListParams.page = pageIndex - 1;
        getAllShift();
      },
      pageSizeChange(newPageSize) {
        vm.shiftListParams.size = newPageSize;
        getAllShift();
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },
    created() {
      vm = this;
      this.inbarId = store.get('token').user_basic.inbarId
      getAllShift();
      getCategories();
    }
  }

  function getAllShift () {
    vm.tableLoading = true;
    GET(`/api/inbar/${vm.inbarId}/rota/`)
      .then(data => {
        vm.tableLoading = false;
        vm.shiftPage.totalPage = data.totalPages;
        vm.shiftPage.amount = data.totalElements;
        vm.shifts = data.content;
      })
  }
  function getCategories () {
    GET('/api/stock/class/queryByGc')
      .then(data => {
        vm.categories = data;
      })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";
  .status-select-box{
    display: inline-block;
    width: 100px;
    vertical-align: middle;
  }
  .layer-goods{
    padding-left: 20px;
    padding-right: 20px;
    .category-wrap{
      float: left;
      height: 300px;
      width: 150px;
      //padding-right: 17px;
    }
    .category{
      border: 1px solid $border-color;
      width: 150px !important;
      overflow: initial !important;
      li{
        position: relative;
        height: 36px;
        border-bottom: 1px solid $border-color;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $text;
        cursor: pointer;
        &.title{
          background-color: #ebebeb;
        }
        &:hover{
          background-color: #f8f8f8;
        }
        &.active{
          background-color: #f7f0dc;
        }
      }
    }
    .right-content {
      margin-top: -20px;
      float: right;
      width: 630px;
      .paging{
        padding-top: 10px;
      }
    }
  }

</style>
