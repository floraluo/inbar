<template>
  <div class="page-content">
    <div class="statement-content">
      <div class="form-inline">
        <!--<div class="form-group"><label>班次：</label>-->
          <!--<select name="" id="">-->
            <!--<option value="">早班</option>-->
            <!--<option value="">晚班</option>-->
          <!--</select>-->
        <!--</div>-->
        <div class="form-group"><label>请选择时间：</label>
          <date-picker v-model="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="开始时间" @change="xx"></date-picker>
          --
          <date-picker v-model="filter.until" :not-before="filter.since" :width="'150'" :editable="true" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
        </div>
        <div class="form-group"><label>完成状态：</label>
          <!--<multiselect-->
            <!--value="code"-->
            <!--v-model=""-->
            <!--label="name"-->
            <!--placeholder="请选择状态"-->
            <!--track-by="code"-->
            <!--@input="updateProvince"-->
            <!--:maxHeight="200"-->
            <!--:showLabels="false"-->
            <!--:close-on-select="true"-->
            <!--:searchable="false"-->
            <!--:allow-empty="false"-->
            <!--:tabindex="0"-->
            <!--:options="provinces">-->
          <!--</multiselect>-->
          <select name="" id="">

            <option value="">已盘点</option>
            <option value="">未盘点</option>

            <option value="">已审核</option>
            <option value="">未审核</option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" type="button" @click="filterStatement">查询</button>
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
                 :height="655"
                 :min-height="455"
                 :error-content="'暂无交班数据'"
                 :columns="columns"
                 :table-data="statements"
                 :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
      </div>
      <div class="paging" v-if="statementPage.totalPage > 1">
        <v-pagination :total="statementPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>
    <!--盘点-->
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
    <!--审核意见-->
    <div class="layer-open" id="checkLayer">
      <div class="form-inline">
        <label>审核意见：</label>
        <textarea :value="note" cols="50" rows="5" class="form-control" placeholder="请输入审核意见" disabled></textarea>
      </div>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-primary" @click="cancelLayer">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Vue from 'vue'
  import moment from 'moment'
  import DatePicker from 'vue2-datepicker'
  import layer from '../../static/vendor/layer/layer'
  import {GET} from '../core/http'

  let vm;
  export default {
    name: 'statement-check',
    components: { DatePicker },
    data () {
      return {
        layerId: null,
        layerTableLoading: false,
        tableLoading: false,
        note: '',
        selectedCategory: null,
        filter: {
          since: '',
          until: ''
        },
        statementListParams: {
          since: '',
          until: '',
          page: 0,
          size: 15,
          sort: 'since,desc'
        },
        statementPage: {
          totalPage: 0,
          amount: 0
        },
        statements: [],
        columns: [
          // {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'id', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          // {field: 'name', title: '班次名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'inbarName', title: '门店名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'name', title: '换人', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              if (rowData.checkerName) {
                return '已完成'
              } else {
                return '未完成'
              }
            }
          },
          {field: 'since', title: '开始时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex, pagingIndex, field) => { return rowData[field] ? moment(rowData[field]).format('YYYY-MM-DD HH:mm') : '--' }},
          {field: 'until', title: '结束时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex, pagingIndex, field) => { return rowData[field] ? moment(rowData[field]).format('YYYY-MM-DD HH:mm') : '--' }},
          {field: 'cashierName', title: '本班人', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'checkerName', title: '接班人', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              if (rowData.checkerName) {
                return rowData.checkerName
              } else {
                return '--'
              }
            }
          },
          {field: 'approved', title: '状态', width: 130, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              let html = '';
              if (rowData.stockChecked) {
                html += `<span style="margin-right: 5px;display: inline-block;width: 4em;height: 22px;line-height: 22px;text-align:center;border-radius: 4px;color:#fff;background-color:#46be8a;">
                        已盘点</span>`
              } else {
                html += `<span style="margin-right: 5px;display: inline-block;width: 4em;height: 22px;line-height: 22px;text-align:center;border-radius: 4px;color:#fff;background-color:#f96868;">
                      未盘点</span>`
              }
              if (rowData.approved) {
                html += `<span style="display: inline-block;width: 4em;height: 22px;line-height: 22px;text-align:center;border-radius: 4px;color:#fff;background-color:#46be8a;">
                          已审核</span>`
              } else {
                html += `<span style="display: inline-block;width: 4em;height: 22px;line-height: 22px;text-align:center;border-radius: 4px;color:#fff;background-color:#f96868;">
                          未审核</span>`
              }
              return html;
            }
          },
          {field: [
              {name: '审核结果', type: "result", callback: this.openResultLayer},
              {name: '盘点', type: "pandian", callback: this.openCheckLayer}
            ], title: '操作', width: 120, titleAlign: 'center', columnAlign: 'center', componentName: 'ShiftTableOperation', isResize: true}        ],
        tableGoods: {
          data: [],
          columns: [
            {title: '编号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
            {field: 'goodsName', title: '商品名称', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'sold', title: '销售数量（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'current', title: '库存数量（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'checked', title: '盘点结果（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true}
          ]
        },
        categories: [],
        rowData: {}
      }
    },
    methods: {
      xx() {
        console.log(this.filter.since)
      },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      filterStatement() {
        if (this.filter.since) {
          vm.statementListParams.since = moment(this.filter.since).format("YYYY-MM-DDTHH:mm:ss")
        } else {
          delete vm.statementListParams.since
        }
        if (this.filter.until) {
          vm.statementListParams.until = moment(this.filter.until).format("YYYY-MM-DDTHH:mm:ss")
        } else {
          delete vm.statementListParams.until
        }
        getStatement()
      },
      openResultLayer (params) {
        // layer.msg(params.rowData.approvedNote)
        this.note = params.rowData.approvedNote
        this.layerId = layer.open({
          type: 1,
          title: '查看审核结果',
          area: ['600px', '320px'],
          content: $('#checkLayer')
        })
      },
      openCheckLayer (params) {
        this.rowData = params.rowData;
        GET(`/api/cashier/shift/${params.rowData.id}/stock-check`).then(data => {
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
      pageChange(pageIndex) {
        vm.statementListParams.page = pageIndex - 1;
        getStatement();
      },
      pageSizeChange(newPageSize) {
        vm.statementListParams.size = newPageSize;
        getStatement();
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },
    created() {
      vm = this;
      getStatement();
      getCategories();
    }
  }
  function getCategories () {
    GET('/api/stock/class/queryByGc')
      .then(data => {
        vm.categories = data;
      })
  }
  function getStatement () {
    vm.tableLoading = true;
    // console.log(vm.statementListParams.since)
    // if (vm.statementListParams.since) {
    //   vm.statementListParams.since = moment(vm.statementListParams.since).format('YYYY-MM-DD')
    //
    // }
    GET('/api/cashier/shift/rota', vm.statementListParams)
      .then(data => {
        vm.tableLoading = false;
        vm.statementPage.totalPage = data.totalPages;
        vm.statementPage.amount = data.totalElements;
        vm.statements = data.content;
      })
  }
  Vue.component('ShiftTableOperation', {
    template: `<span class="table-operate">
                <!--<a href="javascript:;" @click.stop.prevent="publishOperate(rowData)">审核结果</a>-->
                <!--<a href="javascript:;" @click.stop.prevent="publishOperate(rowData)" style="margin-left: 5px;">盘点</a>-->
                <template v-for="(item, i) in operates">
                <!--<template v-if="index == 0"></template>-->
                <a href="javascript:;" @click.stop.prevent="publishOperate(item)" :key="index" v-if="item.type === 'result' && rowData.approved">{{item.name}}</a>
                <a href="javascript:;" @click.stop.prevent="publishOperate(item)" :key="index" v-else-if="index === 0 && item.type === 'pandian' && !rowData.stockChecked" style="margin-left: 5px;">{{item.name}}</a>
                <span v-else-if="!rowData.approved && i !== 0">--</span>
                </template>
                </span>`,
    props: {
      rowData: {
        type: Object
      },
      field: {
        type: Array
      },
      index: {
        type: Number
      }
    },
    computed: {
      operates () {
        return this.field
      }
    },
    methods: {
      publishOperate(operate) {
        let params = {type: operate.type, index: this.index, rowData: this.rowData, callback: operate.callback};
        this.$emit('on-custom-comp', params)
      }
    }
  })
</script>

<style scoped lang="scss">
  @import "../sass/variables";
  .page-content{
    padding: 20px;
    min-height: calc(100vh - 78px - 40px - 40px);
  }
.statement-content{
  padding: 15px;
  min-height: calc(100vh - 78px - 40px - 40px - 40px);
  background-color: #fff;
}

  .layer-open{
    display: none;
    padding-top: 20px;
    padding-left: 40px;
    padding-right: 40px;
    label{
      color: $text-dark;
      small{
        color: $text-light;
      }
    }
    .form-control{
      border-color: $border-color;
      &:focus{
        border-color: $theme-color;
      }
    }
    .error{
      padding-left: 5px;
      color: #f00;
    }
  }
  .layer-btn-operate-group{
    margin-top: 50px;
    text-align: right;
    .btn{
      margin-left: 15px;
    }
  }
</style>
