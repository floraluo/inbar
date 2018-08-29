<template>
  <div>
    <div class="page-main">
      <div class="btn-operate-group">
        <button class="btn btn-primary" @click="openAddGoodsLayer"><i class="iconfont icon-add"></i>添加商品</button>
        <button class="btn btn-primary" @click="batchDeleteUpdateGoods"><i class="iconfont icon-close"></i>删除</button>
        <button class="btn btn-primary" @click="openExportBillLayer"><i class="iconfont icon-daochu"></i>导出</button>
      </div>
      <v-table ref="tableUpdate"  is-horizontal-resize
               is-vertical-resize
               style="width:100%"
               row-hover-color="#eee"
               row-click-color="#edf7ff"
               title-bg-color="#f0f2f9"
               :title-row-height="52"
               :error-content="errorContent"
               :columns="tableUpdate.goodsColumns"
               :table-data="tableUpdate.goodsList"
               :select-all="selectUpdateGoods"
               :select-change="selectUpdateGoods"
               :show-vertical-border="false"
               :cell-edit-done="cellEditDone"></v-table>
      <div class="goods-search-bar">
        <div class="search-group">
          <multiselect
            v-model="selectedGoodsList"
            id="ajax"
            label="goodsName"
            track-by="goodsId"
            placeholder="请输入商品名称按Enter进行检索"
            open-direction="bottom"
            :options="searchGoodsList"
            :multiple="true"
            :searchable="true"
            :loading="multiselectLoading"
            :internal-search="false"
            :clear-on-select="false"
            :close-on-select="false"
            :options-limit="300"
            :max-height="400"
            :showLabels="false"
            :show-no-results="false"
            :hide-selected="true"
            @open="clickGoodsListMulSelec"
            @select="selectOneGoodsInList"
            @search-change="searchGoodsByName">
            <template slot="clear" slot-scope="props">
              <div class="multiselect__clear" v-if="selectedGoodsList.length" ></div>

            </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
          </multiselect>
        </div>
      </div>
      <div class="goods-info-bar" v-if="tableUpdate.goodsList.length > 0">
        <strong class="center">共  <span>{{tableUpdate.goodsList.length}}</span>  条数据； 提货总计<span>{{updateGoods.amount}}</span>  件商品</strong>
        <div class="bottom-btn-group center">
          <button class="btn btn-primary" @click="submitPickupGoods">确定</button>
          <!--<button class="btn btn-default" @click="">取消</button>-->
        </div>
      </div>
    </div>

    <!--添加提货商品-->
    <div class="layer-open layer-add-pickup-goods" id="layerAddUpdateGoods">
      <div class="goods-content clearfix">
        <div class="search-group-bar">
          <div class="input-group">
            <input type="text" id="searchGoodsName" v-model="searchGoodsName" class="form-control" placeholder="请输入商品名称检索">
            <span class="input-group-btn">
                <button class="btn btn-default" @click="filterGoodsByName(searchGoodsName)">搜索</button>
              </span>
          </div>
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
          <!--<div class="top-operate-group clearfix">-->

            <!--<div class="checkbox-custom checkbox-primary" >-->
              <!--<span  @click="selectAllGoods">-->
                <!--<input type="checkbox" id="allCloudGoods" :checked="markSelectedAllGoods">-->
                <!--<label for="allCloudGoods" @click="selectAllGoods">全选</label>-->
              <!--</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="table-goods" :class="{'loading': tableLoading}">-->
            <!--<base-loading :loading="tableLoading"></base-loading>-->
            <!--<div class="no-data" v-show="!tableLoading && goods.length === 0"><span v-if="selectedCategory">暂无{{selectedCategory.gcName}}</span></div>-->
            <!--<ul class="table-goods-body clearfix">-->
              <!--<li v-for="(item, index) in goods" :key="item.goodsId" @click.stop="selectOneGoodsInLayer(item, index)">-->
                <!--<div class="img-box"></div>-->
                <!--<div class="checkbox-custom checkbox-primary" :class="{checked: markSelectedAllGoods || item.checked}">-->
                  <!--<input type="checkbox" :id="`repertory${item.goodsId}`" :checked="markSelectedAllGoods || item.checked">-->
                  <!--<label :for="`repertory${item.goodsId}`"></label>-->
                <!--</div>-->
                <!--<p class="name">{{item.goodsName}}</p>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
          <v-table is-horizontal-resize
                   is-vertical-resize
                   style="width:100%"
                   row-hover-color="#f8f8f8"
                   row-click-color="#f7f0dc"
                   title-bg-color="#ebebeb"
                   :title-row-height="36"
                   :row-height="36"
                   :is-loading="tableLoading"
                   :height="325"
                   :min-height="325"
                   :columns="goodsColumns"
                   :table-data="goods"
                   :select-all="selectGoodsInLayer"
                   :select-group-change="selectGoodsInLayer"></v-table>
          <div class="paging" v-if="goodsPage.totalPage > 1">
            <v-pagination
              :total="goodsPage.amount"
              @page-change="pageChange"
              @page-size-change="pageSizeChange"></v-pagination>
          </div>
        </div>
      </div>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="enterSelectedGoods">确定</button>
      </div>
    </div>

    <!--导入-->
    <div class="layer-open" id="layerImportBill">
      <local-import :tempUrl="'/api/stock/goodsStock/downExcel'" :templateName="'仓库补货'" @submit-import="submitImportBill" @cancel-import="cancelLayer"></local-import>
    </div>

    <!--导出提货单-->
    <div class="layer-open" id="layerExportBill">
      <form action="/api/stock/goodsStock/exprot" method="post">
        <template  v-for="item in tableUpdate.goodsList" >
          <div :key="item.goodsId">
            <input type="hidden" name="classify" v-model="item.gcName">
            <input type="hidden" name="name" v-model="item.goodsName">
            <input type="hidden" name="nums" v-model="item.updateAmount">
            <input type="hidden" name="price" v-model="item.goodsPrice">
            <input type="hidden" name="unit" v-model="item.unit">
          </div>
        </template>
        <input type="hidden">
        <ul class="radio-list">
          <li class="radio-custom radio-primary">
            <input v-model="exportType" value="1" type="radio" name="enabled" id="enabled1"><label for="enabled1">仅导出单据</label>
          </li>
          <li class="radio-custom radio-primary">
            <input v-model="exportType" value="2" type="radio" name="enabled" id="enabled2"><label for="enabled2">导出并打印单据</label>
          </li>
        </ul>
        <div class="form-group layer-btn-operate-group">
          <button class="btn btn-default" type="button" @click="cancelLayer">取消</button>
          <button class="btn btn-primary" type="submit">确定</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Multiselect from 'vue-multiselect'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  import LocalImport from '../template/LocalImport'

  let vm;
  export default {
    name: 'repertory-inbar-update',
    components: {Multiselect, LocalImport},
    data() {
      return {
        layerId: null,
        timer: null,
        exportType: 1,
        tableLoading: false,
        multiselectLoading: false,
        markSelectedAllGoods: false,
        searchGoodsName: '',
        selectedCategory: null,
        selectedGoods: [],
        selectedGoodsList: [],
        categories: [],
        goods: [],
        goodsColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'goodsImage', title: '图片', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              // todo: tupian
              return `<i class="iconfont icon-tupian"></i>`
            }
          },
          {field: 'goodsName', title: '商品名称', width: 155, titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'goodsNumber', title: '仓库库存（件）', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsNumberB', title: '吧台库存（件）', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true},
        ],
        goodsListParams: {
          gcId: '',
          page: 0,
          size: 10
        },
        goodsPage: {
          totalPage: 0,
          amount: 0
        },
        errorContent: `暂无补货数据，如需补货点击<span style="color: #1890ff">【添加商品】</span>按钮`,
        selectedAll: false,
        annunciator: {},
        searchGoodsNameOnly: '',
        searchGoodsList: [],
        exportParams: '',
        tableUpdate: {
          goodsList: [],
          goodsColumns: [
            {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
            {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
            {field: 'goodsName', title: '商品名称', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'goodsPrice', title: '售价/元', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
            {field: 'unit', title: '单位', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'goodsNumber', title: '仓库库存', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter: (rowData) => {
                const amount = rowData['goodsNumber'] || 0;
                if (rowData.annunciator && rowData.annunciator.enabled && rowData.annunciator.centerValue >= amount) {
                  return `<span style="position: relative;">${amount}<i class="iconfont icon-annunciator dynamic"></i></span>`;
                } else {
                  return amount;
                }
              }},
            {field: 'goodsNumberB', title: '吧台库存', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter: (rowData) => {
                const amount = rowData['goodsNumberB'] || 0;
                // return `${rowData['goodsNumber']}<i class="iconfont icon-annunciator dynamic"></i>`;
                if (rowData.annunciator && rowData.annunciator.enabled && rowData.annunciator.barValue >= amount) {
                  return `<span style="position: relative;">${amount}<i class="iconfont icon-annunciator dynamic"></i></span>`;
                } else {
                  return amount;
                }
              }
            },
            {field: 'updateAmount', title: '提货数量', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true,
              formatter: (rowData, rowIndex, pagingIndex, field) => {
                return `<span style="display: none">${rowData[field]}</span><input class="cell-edit-input" type="text" style="text-align: center; width: 100%; height:80%" value="${rowData[field]}"/>`
              }
            },
            {field: 'repertory.update|2', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation', isResize: true}
          ]
        }
      }
    },
    computed: {
      updateGoods() {
        let amount = 0;
        this.tableUpdate.goodsList.forEach((item) => {
          amount += +item.updateAmount;
        })
        return {amount};
      }
    },
    methods: {
      submitPickupGoods() {
        let query;
        if (this.tableUpdate.goodsList.length > 1) {
          query = this.tableUpdate.goodsList.reduce((result, item, currentIndex) => {
            if (currentIndex === 1) {
              return `barcode=${result.goodsBarcode}&nums=${result.updateAmount}&barcode=${item.goodsBarcode}&nums=${item.updateAmount}`;
            } else {
              return `${result}&barcode=${item.goodsBarcode}&nums=${item.updateAmount}`;
            }
          })
        } else {
          query = `barcode=${this.tableUpdate.goodsList[0].goodsBarcode}&nums=${this.tableUpdate.goodsList[0].updateAmount}`
        }
        POST(`/api/stock/goodsStock/addProducersStockB?${query}`)
          .then(data => {
            layer.msg('吧台提货成功')
          })
      },
      cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
        this.tableUpdate.goodsList[rowIndex][field] = newValue;
      },
      selectUpdateGoods(selection) {
        this.selectedUpdate = selection;
      },
      batchDeleteUpdateGoods() {
        if (this.tableUpdate.goodsList.length === 0) {
          layer.msg("无补货商品，如需补货请点击【添加商品】按钮")
          return;
        }
        if (this.selectedUpdate.length === 0) {
          layer.msg('请至少勾选一项')
        } else {
          this.selectedUpdate.forEach(selectedItem => {
            vm.tableUpdate.goodsList.some((item, index) => {
              if (selectedItem.goodsId === item.goodsId) {
                vm.tableUpdate.goodsList.splice(index, 1);
                return true
              }
            })
          })
        }
      },
      deleteOneUpdateGoods(msg, params) {
        // this.delIds[0] = params.rowData.goodsId;
        // deleteGoods();
        this.tableUpdate.goodsList.splice(params.index, 1);
      },
      clickGoodsListMulSelec() {
        this.selectedGoodsList = this.tableUpdate.goodsList
      },
      searchGoodsByName(name) {
        this.multiselectLoading = true
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          GET('/api/stock/inbar/queryByPageGoods', {
            name: name,
            page: 0,
            size: 100
          })
            .done((data) => {
              vm.multiselectLoading = false;
              vm.searchGoodsList = formatGoodsList(data.content); //searchGoodsByName
            })
        }, 1000)
      },
      selectOneGoodsInList(goods, id) {
        // this.selectedGoods.push(goods)
        this.tableUpdate.goodsList.push(goods);
        // vm.$refs['tableUpdate'].resize();
      },
      openAddGoodsLayer() {
        this.selectedCategory = null;
        this.selectedGoods = JSON.parse(JSON.stringify(this.tableUpdate.goodsList));
        this.markSelectedAllGoods = false;
        this.layerId = layer.open({
          type: 1,
          title: '添加补货',
          area: ['850px', '570px'],
          content: $('#layerAddUpdateGoods'),
          success() {
            getAllGoods(); //openAddGoodsLayer
            $('.j-category').slimScroll({
              height: '325px'
            })
          }
        })
      },
      filterGoodsByCat(category) {
        this.markSelectedAllGoods = false;
        this.selectedCategory = category || null;
        this.goodsListParams.page = 0;
        if (category) {
          this.goodsListParams.gcId = category.gcId;
        } else {
          delete this.goodsListParams.gcId
        }
        getAllGoods(); //filterGoodsByCat
      },
      filterGoodsByName() {
        if (!this.searchGoodsName) {
          layer.msg('请输入商品名称')
          $('#searchGoodsName').trigger('focus')
        } else {
          getAllGoods(); //filterGoodsByName
        }
      },
      selectGoodsInLayer(selection) {
        this.selectedGoods = this.selectedGoods.concat(formatGoodsList(selection)); //selectGoodsInLayer
        if (this.selectedGoods.length > 1) {
          let hash = {};
          this.selectedGoods = this.selectedGoods.reduce((previousValue, currentValue, currentIndex) => {
            if (currentIndex === 1) {
              hash[previousValue.goodsId] = true;
              previousValue = [previousValue];
            }
            if (!hash[currentValue.goodsId]) {
              hash[currentValue.goodsId] = true;
              previousValue.push(currentValue)
            }
            return previousValue;
          })
        }
      },
      enterSelectedGoods() {
        //this.selectedGoodsList = this.tableUpdate.goodsList = JSON.parse(JSON.stringify(this.selectedGoods));
        this.cancelLayer();
      },
      submitImportBill(file) {
        if (!file) {
          layer.msg('您还未选择文件')
          return;
        }
        let formData = new FormData();
        formData.append('file', file)
        POST("/api/stock/goodsStock/uploadExcel", MultiFormed(formData))
          .then((data) => {
            if (data.fail === 0) {
              layer.msg(`共${data.sum}条数据全部导入成功`);
            } else {
              vm.importErrorMsg = data.messages.map(item => {
                return item.message;
              })
              // openImportErrorTipLayer();
              if (data.success > 0) {
                layer.msg(`共${data.sum}条数据,导入成功${data.success}条,失败${data.fail}条`)
              }
            }
          })
      },
      openExportBillLayer() {
        if (this.tableUpdate.goodsList.length === 0) {
          layer.msg("无补货商品，如需补货请点击【添加商品】按钮")
          return;
        }
        this.layerId = layer.open({
          type: 1,
          title: '导出提货单',
          area: ['360px', '240px'],
          content: $('#layerExportBill')
        })
      },
      enterExportBill() {
        let query;
        if (this.tableUpdate.goodsList.length > 1) {
          query = this.tableUpdate.goodsList.reduce((result, item, currentIndex) => {
            if (currentIndex === 1) {
              return `classify=${result.goodsBarcode}
              &name=${result.goodsName}
              &nums=${result.updateAmount}
              &price=${result.goodsPrice}
              &unit=${result.unit}
              &classify=${item.goodsBarcode}
              &name=${item.goodsName}
              &nums=${item.updateAmount}
              &price=${item.goodsPrice}
              &unit=${item.unit}`;
            } else {
              return `${result}&classify=${item.goodsBarcode}&name=${item.goodsName}&nums=${item.updateAmount}&price=${item.goodsPrice}&unit=${item.unit}`;
            }
          })
        } else {
          const goods = this.tableUpdate.goodsList[0];
          query = `classify=${goods.goodsBarcode}&name=${goods.goodsName}&nums=${goods.updateAmount}&price=${goods.goodsPrice}&unit=${goods.unit}`
        }
        POST(`/api/stock/goodsStock/exprot?${query}`)
          .then(data => {
            layer.msg('导出成功');
          })
      },
      pageChange(pageIndex) {
        vm.goodsListParams.page = pageIndex - 1;
        getAllGoods(); //pageChange
      },
      pageSizeChange(newPageSize) {
        vm.goodsListParams.size = newPageSize;
        getAllGoods(); //pageSizeChange
      },
      cancelLayer() {
        layer.close(this.layerId);
      }
    },
    created() {
      vm = this;
      getAnnunciator().then(() => {
        if (this.$route.params.goods) {
          vm.tableLoading = true;
          this.tableUpdate.goodsList = formatGoodsList(this.$route.params.goods) //created
          vm.tableLoading = false;
        }
      });
      getCategories();
      subscribe('delete.table.operate.repertory.update', this.deleteOneUpdateGoods)
    }
  }
  async function getAnnunciator () {
    return GET('/api/stock/goodsStock')
      .then(data => {
        vm.annunciator.barValue = data.barWarningValue;
        vm.annunciator.centerValue = data.centerWarningValue;
        vm.annunciator.enabled = !!data.isEnableWarning;
        vm.annunciator.barEnabled = !!data.isEnabledBar;
        if (vm.annunciator.barEnabled) {
          // vm.tableUpdate.goodsColumns.splice(4, 0, )
          vm.$refs['tableUpdate'].resize();
        }
      })
  }
  function getAllGoods () {
    if (vm.searchGoodsName !== '') {
      vm.goodsListParams.name = vm.searchGoodsName;
    } else {
      delete vm.goodsListParams['name'];
    }
    if (vm.selectedCategory !== null) {
      vm.goodsListParams.gcId = vm.selectedCategory.gcId;
    } else {
      delete vm.goodsListParams.gcId;
    }
    vm.goods = [];
    vm.tableLoading = true;
    GET('/api/stock/inbar/queryByPageGoods', vm.goodsListParams)
      .done((data) => {
        vm.tableLoading = false;
        vm.goodsPage.totalPage = data.totalPages;
        vm.goodsPage.amount = data.totalElements;
        vm.goods = formatGoods(data.content);
      })
  }
  function getCategories () {
    GET('/api/stock/class/queryByGc')
      .then(data => {
        vm.categories = data;
      })
  }

  function formatGoodsList (data) {
    return data.map(item => {
      return Object.assign(item, {updateAmount: 10, annunciator: vm.annunciator});
    });
  }
  function formatGoods (data) {
    return data.map(item => {
      if (!findSelectedGoods(item)) {
        return Object.assign(item, {checked: false});
      } else {
        return Object.assign(item, {checked: true});
      }
    });
  }
  function findSelectedGoods (goods, callback) {
    let thisIndex = null;
    if (vm.selectedGoods.length === 0) return false;
    vm.selectedGoods.some((item, index) => {
      if (item.goodsId === goods.goodsId) {
        thisIndex = index;
        return true;
      }
    })
    if (thisIndex !== null) {
      if (callback) callback(thisIndex);
      return true;
    } else {
      return false;
    }
  }
</script>
<style lang="scss">
  .goods-search-bar{
    .multiselect__tags-wrap{
      display: none;
    }
    .multiselect__input{
      position: absolute;
      width: 100% !important;
      background: transparent;
      display: initial !important;
    }
  }

</style>
<style scoped lang="scss">
  @import "../../sass/repertory";
</style>
