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
        <div class="form-group"><label class="control-label">完成状态：</label>
          <div class="status-select-box">
            <multi-select
              value="id"
              v-model="selectedStatus"
              label="name"
              placeholder="请选择"
              track-by="id"
              :maxHeight="250"
              :showLabels="false"
              :close-on-select="true"
              :searchable="false"
              :allow-empty="false"
              :options="statusList">
            </multi-select>
          </div>
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
    <!--现金盘点-->
    <div class="layer-open" id="cashLayer">
      <div class="form-inline">
        <div class="form-group">
          <label>上班交接：</label>
          <div class="input-group">
            <input type="text" class="form-control" disabled :value="checkCash.previous">
            <span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group">
          <label>本班收银：</label>
          <div class="input-group">
            <input type="text" class="form-control" disabled :value="checkCash.income">
            <span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group">
          <label>剩余现金：</label>
          <div class="input-group">
            <input type="text" class="form-control" disabled :value="checkCash.current">
            <span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group">
          <label>实际剩余：</label>
          <div class="input-group">
            <input type="text" class="form-control" v-model="checkCash.checked">
            <span class="input-group-addon">元</span>
          </div>
        </div>
      </div>
      <div class="form-group layer-btn-operate-group">
      <button class="btn btn-default" @click="cancelLayer">取消</button>
      <button class="btn btn-primary" @click="submitCheckCash">保存</button>
      </div>
    </div>
    <!--商品盘点-->
    <div class="layer-open layer-goods" id="goodsLayer">
      <div class="form-inline">
        <div class="form-group"><label for="">门店名称：</label><span>{{rowData.inbarName}}</span></div>
        <div class="form-group"><label for="">收银员：</label><span>{{rowData.cashierName}}</span></div>
        <div class="form-group"><label for="">截止时间：</label><span>{{rowData.until | formatTime( 'YYYY-MM-DD')}}</span></div>
      </div>
      <div class="category-wrap">
        <ul class="category j-category">
          <li class="title">商品分类</li>
          <li :class="{active: index === selectedCategoryIndex}"
              v-for="(item, index) in categories"
              :key="index"
              @click="filterGoodsByCat(index)">
            {{item.name}}
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
                 :cell-edit-done="cellEditDone"
                 :columns="tableGoods.columns"
                 :table-data="tableGoods.data"></v-table>
      </div>
      <div class="total-bar">
        <div class="name">合计</div>
        <div class="data">
          <div><label>销售数量</label><strong>{{checkGoods.sold}}</strong></div>
          <div><label>库存数量</label><strong>{{checkGoods.current}}</strong></div>
          <div><label>盘点结果</label><input type="text" class="form-control" v-model="checkTotal" disabled></div>
        </div>
      </div>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitCheckGoods">确认</button>
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
  import MultiSelect from 'vue-multiselect'
  import layer from '../../static/vendor/layer/layer'
  import {GET, POST} from '../core/http'

  let vm;
  export default {
    name: 'statement-check',
    components: { DatePicker, MultiSelect },
    data () {
      return {
        layerId: null,
        layerTableLoading: false,
        tableLoading: false,
        note: '',
        selectedCategoryIndex: 0,
        filter: {
          since: '',
          until: ''
        },
        selectedStatus: null,
        statusList: [
          {id: 0, name: '所有', value: null},
          {id: 1, name: '未盘点', value: 'NotChecked'},
          {id: 2, name: '已盘点', value: 'Checked'},
          {id: 3, name: '未审核', value: 'NotApproved'},
          {id: 4, name: '已审核', value: 'Approved'}
        ],
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
              if (rowData.stockChecked || rowData.cashChecked) {
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
              {name: '审核结果', type: "result", callback: this.openResultLayer, page: this.page},
              {name: '商品盘点', type: "pandian", callback: this.openCheckGoodsLayer, page: this.page},
              {name: '现金盘点', type: "pandian", callback: this.openCheckCashLayer, page: this.page}
            ], title: '操作', width: 120, titleAlign: 'center', columnAlign: 'center', componentName: 'ShiftTableOperation', isResize: true}        ],
        tableGoods: {
          data: [],
          columns: [
            {title: '编号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
            {field: 'goodsName', title: '商品名称', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'sold', title: '销售数量（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'current', title: '库存数量（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'checked', title: '盘点结果（件）', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true,
              formatter: (rowData, rowIndex, pagingIndex, field) => {
                return `<span style="display: none">${rowData[field]}</span><input class="cell-edit-input" type="text" style="text-align: center; width: 100%; height:80%" value="${rowData[field]}"/>`
              }
            }
          ]
        },
        categories: [{name: ''}],
        rowData: {},
        checkCash: {},
        checkGoods: {},
        checkGoodsList: []
      }
    },
    computed: {
      checkTotal() {
        let total = 0;
        this.checkGoodsList.forEach((item) => {
          if (item.checks.length > 0) {
            item.checks.forEach(goods => {
              if (goods.checked != null && goods.checked !== undefined) {
                total += goods.checked
              }
            })
          }
        })
        return total;
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'statementCheck') {
          getStatement(); //'$route'
        }
      }
    },
    methods: {
      page() {
        return this.statementListParams.page
      },
      xx() {
        console.log(this.filter.since)
      },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      filterStatement() {
        if (this.selectedStatus.value) {
          this.statementListParams.state = this.selectedStatus.value;
        } else {
          delete this.statementListParams.state;
        }
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
        getStatement() //filterStatement
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
      openCheckGoodsLayer (params) {
        this.rowData = params.rowData;
        if (this.statements[0].until) {
          layer.msg('你已交班，盘点记录已自动生成')
          return;
        }
        if (this.rowData.stockChecked) {
          layer.msg("商品已盘点")
          return;
        }
        GET(`/api/cashier/shift/${params.rowData.id}/stock-check`).then(data => {
          if (data.classes) {
            vm.checkGoodsList = data.classes.map(item => {
              if (Array.isArray(item.checks)) {
                item.checks = item.checks.map(goods => {
                  return Object.assign({}, goods, {checked: goods.current})
                })
              }
              return item
            });
            vm.tableGoods.data = vm.checkGoodsList[vm.selectedCategoryIndex].checks
            vm.categories = vm.checkGoodsList.map(item => {
              return item.klass;
            });
            // vm.checkGoods = Object.assign({}, data.classes[vm.selectedCategoryIndex], {checked: data.classes[vm.selectedCategoryIndex].current});
            vm.checkGoods = {
              current: data.current,
              sold: data.sold,
              checked: data.current
            }
          }
          this.layerId = layer.open({
            type: 1,
            title: '商品盘点',
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
      filterGoodsByCat(index) {
        if (this.selectedCategoryIndex === index) return;
        let checkGoodsInTheCat = this.checkGoodsList[vm.selectedCategoryIndex];
        this.selectedCategoryIndex = index;
        this.tableGoods.data = checkGoodsInTheCat.checks.map(item => {
          return Object.assign({}, item, {checked: item.current})
        });
        // this.checkGoods = Object.assign({}, checkGoodsInTheCat, {checked: checkGoodsInTheCat.current});
      },
      cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
        this.tableGoods.data[rowIndex][field] = +newValue;
        // if (newValue > oldValue) {
        //   this.checkGoods.checked = +this.checkGoods.checked + (+newValue - +oldValue)
        // } else {
        //   this.checkGoods.checked = +this.checkGoods.checked - (+oldValue - +newValue)
        // }
        // 接下来处理你的业务逻辑，数据持久化等...
      },
      submitCheckGoods() {
        let list = [];
        this.checkGoodsList.forEach(item => {
          if (item.checks.length > 0) {
            item.checks.forEach(goods => {
              list.push({
                goodsId: goods.goodsId,
                checked: goods.checked
              })
            })
          }
        })

        POST(`/api/cashier/shift/${this.rowData.id}/stock-check`, list)
          .then(() => {
            layer.msg('提交盘点成功')
          })
      },
      openCheckCashLayer(params) {
        this.rowData = params.rowData;
        if (this.rowData.cashChecked) {
          layer.msg("现金已盘点")
          return;
        }
        GET(`/api/cashier/shift/${params.rowData.id}/cash-check`).then(data => {
          vm.checkCash = data;
          vm.layerId = layer.open({
            type: 1,
            title: '现金盘点',
            area: ['420px', '350px'],
            content: $('#cashLayer')
          })
        })
      },
      submitCheckCash() {
        POST(`api/cashier/shift/${this.rowData.id}/cash-check`, {
          checked: this.checkCash.checked,
          rotaId: this.rowData.id
        })
          .then(() => {
            layer.msg('现金盘点提交成功')
          })
      },
      pageChange(pageIndex) {
        vm.statementListParams.page = pageIndex - 1;
        getStatement(); //pageChange
      },
      pageSizeChange(newPageSize) {
        vm.statementListParams.size = newPageSize;
        getStatement(); //pageSizeChange
      },
      cancelLayer() {
        layer.close(this.layerId)
      }
    },
    created() {
      vm = this;
      getStatement(); //created
      // getCategories();
    }
  }
  // function getCategories () {
  //   GET('/api/stock/class/queryByGc')
  //     .then(data => {
  //       vm.categories = data;
  //     })
  // }
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
                    <a v-if="rowData.approved" href="javascript:;" @click.stop.prevent="publishOperate(operates[0])">{{operates[0].name}}</a>
                    <a v-if="index == 0 && operates[1].page() == 0" href="javascript:;" @click.stop.prevent="publishOperate(operates[1])">{{operates[1].name}}</a>
                    <a v-if="index == 0 && operates[1].page() == 0" href="javascript:;" @click.stop.prevent="publishOperate(operates[2])">{{operates[2].name}}</a>
                    <span v-if="!rowData.approved && index != 0 && operates[1].page() == 0">--</span>
                    <span v-else-if="!rowData.approved && operates[1].page() != 0">--</span>
                </span>`,
  //   <template v-for="(item, i) in operates">
  //   <a href="javascript:;" @click.stop.prevent="publishOperate(item)" :key="index" v-if="item.type === 'result' && rowData.approved">{{item.name}}</a>
  // <a href="javascript:;" @click.stop.prevent="publishOperate(item)" :key="index"
  // v-else-if="item.page() == 0 && index === 0 && item.type === 'pandian' && !rowData.stockChecked" style="margin-left: 5px;">{{item.name}}</a>
  // <span v-else-if="!rowData.approved && i !== 0">--</span>
  //   </template>
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
  .status-select-box{
    display: inline-block;
    width: 100px;
    vertical-align: middle;
  }
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
  .layer-goods{
    padding-left: 20px;
    padding-right: 20px;
    .category-wrap{
      float: left;
      /*height: 300px;*/
      width: 150px;
      margin-bottom: 10px;
      //padding-right: 17px;
    }
    .category{
      border: 1px solid $border-color;
      width: 150px !important;
      padding-top: 36px;
      /*overflow: initial !important;*/
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
          position: absolute;
          top: 1px;
          right: 1px;
          left: 1px;
          z-index: 1;
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
      float: right;
      width: 630px;
      .paging{
        padding-top: 10px;
      }
    }
    .total-bar{
      clear: both;
      display: flex;
      justify-content: space-between;
      border: 1px solid $border-color;
      height: 40px;
      .name{
        width: 149px;
        border-right: 1px solid $border-color;
        text-align: center;
        line-height: 38px;
        font-weight: bold;
        color: $text-dark;
      }
      .data{
        display: flex;
        width: calc(100% - 150px);
        >div{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          label{
            margin-bottom: 0;
            margin-right: 10px;
          }
          strong{
            color: #dc2630;
          }
          &:last-child{
            text-align: left;
            .form-control{
              width: 100px;
              display: inline-block;
              vertical-align: middle;
              height: 26px;
            }
          }
        }
      }
    }
  }
</style>
