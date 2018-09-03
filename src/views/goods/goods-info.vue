<template>
  <div class="page-main">
    <div class="page-main-top">
      <ul class="nav nav-tabs" role="tablist">
        <li :class="{active: goodsParams.gcId === ''}" role="presentation"><a href="javascript:;" @click="filterGoods()">全部</a></li>
        <li :class="{active: goodsParams.gcId === item.gcId}" role="presentation" v-for="item in categories" :key="item.gcId"><a href="javascript:;" @click="filterGoods(item)">{{item.gcName}}</a></li>
      </ul>
      <div class="btn-operate-group">
        <button class="btn btn-primary" @click="clickAddGoods"><i class="iconfont icon-add"></i>新增</button>
        <button class="btn btn-primary" @click="clickDeleteGoods"><i class="iconfont icon-close"></i>删除</button>
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
             :height="455"
             :min-height="455"
             :columns="goodsColumns"
             :table-data="goods"
             :select-all="selectGoods"
             :select-group-change="selectGoods"
             :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
    <div class="paging" v-if="goodsPage.totalPage > 1">
      <v-pagination :total="goodsPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>


    <!--修改商品-->
    <div id="modifyGoodsLayer" class="layer-open">
      <custom-goods :goods="oneGoods" :modify="true"></custom-goods>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="layerSaveGoods">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import mySwitch from 'vue-switch/switch-2.vue';
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  import CustomGoods from './template-custom-goods.vue'
  let vm;
  export default {
    name: 'goods-info',
    components: {CustomGoods},
    data() {
      return {
        layerId: null,
        delIds: [],
        tableLoading: false,
        categories: [],
        goodsColumns: [
          {field: 'goodsId', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'gcName', title: '类别', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsImage', title: '商品图片', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsName', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsCostprice', title: '进货价', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsPrice', title: '售价', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'unit', title: '单位', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsBarcode', title: '条码', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: {name: 'goodsStatus', valueKey: 'goodsStatus', callback: this.toggleGoodsStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          // {field: 'createTime', title: '创建时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
          //   formatter(rowData) { return moment(rowData.createTime).format('YYYY-MM-DD') }
          // },
          {field: [
              {name: '修改', type: "modify", callback: this.modifyGoods},
              {name: '删除', type: "delete", callback: this.deleteOneGoods}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ],
        goods: [],
        oneGoods: {},
        goodsParams: {
          gcId: '',
          page: 0,
          size: 10
        },
        goodsPage: {
          totalPage: 0,
          amount: 0
        }
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      clickAddGoods() {
        this.$router.push({name: 'add-goods'})
      },
      clickDeleteGoods() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteGoods();
        }
      },
      deleteOneGoods(params) {
        // const goods = params.rowData;
        vm.delIds[0] = params.rowData.goodsId;
        deleteGoods();
      },
      filterGoods(cat) {
        this.goodsParams.gcId = cat ? cat.gcId : '';
        this.goodsParams.page = 0;
        getAllGoods();
      },
      modifyGoods(params) {
        this.oneGoods = params.rowData;
        this.layerId = layer.open({
          type: 1,
          title: '修改商品信息',
          area: ['835px', '600px'],
          content: $('#modifyGoodsLayer'),
          success() {
            publish('layer.opened.goods', Object.assign(params, {type: 'modify'}));
            vm.$validator.errors.clear();
          },
          end() {
            clearGoodsParams();
          }
        })
      },
      layerSaveGoods() {
        publish('layer.modify.save.goods')
      },
      modifySuccess() {
        this.cancelLayer();
        getAllGoods();
      },
      selectGoods(selection) {
        // console.log("))))))))))))", selection)
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.goodsId);
        })
      },
      toggleGoodsStatus(params) {
        const rowData = params.rowData;
        PATCH(`/api/stock/inbar/upAndLow/${rowData.goodsId}`)
          .done(() => {
            // getAllGoods();
            vm.goods[params.index][params.valueKey] = !vm.goods[params.index][params.valueKey];
            // publish('switch.toggle', params.goodsId)
          })
      },
      pageChange(pageIndex) {
        vm.goodsParams.page = pageIndex - 1;
        getAllGoods();
      },
      pageSizeChange(newPageSize) {
        vm.goodsParams.size = newPageSize;
        getAllGoods();
      },
      cancelLayer() {
        layer.close(this.layerId);
      }
    },
    created() {
      vm = this;
      getCategories();
      getAllGoods();
      subscribe('modify.success.goods', this.modifySuccess)
      // subscribe('modify.table.operate.goods', this.modifyGoods)
      // subscribe('delete.table.operate.goods', this.deleteOneGoods)
      console.log(this.$route)
    }
  }
  function deleteGoods () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/stock/inbar/deleteGoods/?ids=${query}`;
    DELETE(url)
      .done(() => {
        getAllGoods();
        layer.msg("删除成功")
        vm.delIds = []
      })
  }
  function getAllGoods () {
    vm.tableLoading = true;
    GET('/api/stock/inbar/queryByPageGoods', vm.goodsParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.goodsPage.totalPage = data.totalPages;
        vm.goodsPage.amount = data.totalElements;
        vm.goods = data.content;
      })
  }
  function getCategories() {
    GET('/api/stock/class/queryByGc')
      .then(data => {
        vm.categories = data;
      })
  }
  function clearGoodsParams() {

  }
</script>

<style scoped lang="scss">
@import "../../sass/base-manage";
</style>
