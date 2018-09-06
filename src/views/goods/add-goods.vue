<template>
<div class="page-main">
  <div class="btn-return">
    <router-link :to="{name: 'goods-info-list'}" replace>返回 <i class="iconfont icon-fanhui"></i></router-link>
  </div>
  <div content="sub-main">
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#goodsCustom" data-toggle="tab">自定义商品</a></li>
      <li role="presentation"><a href="#goodsCloud" data-toggle="tab">云商品导入</a></li>
      <li role="presentation"><a href="#goodsLocal" data-toggle="tab">本地导入</a></li>
    </ul>
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active custom-pane" id="goodsCustom">
        <custom-goods></custom-goods>
      </div>
      <div role="tabpanel" class="tab-pane  cloud-goods-pane clearfix" id="goodsCloud">
        <div class="select-cloud-goods-panel" v-show="cloudGoodsPane === 0">
          <div class="page-aside-switch j-page-aside-switch">
            <i class="icon wb-chevron-left" aria-hidden="true"></i>
            <i class="icon wb-chevron-right" aria-hidden="true"></i>
          </div>
          <ul class="cloud-category">
            <li :class="{active: selectedCloudCategory === null}" @click="filerCloudGoodsByCat()">全部</li>
            <li :class="{active: selectedCloudCategory && item.gcId === selectedCloudCategory.gcId}"
                v-for="item in cloudCategories"
                :key="item.gcId"
                @click="filerCloudGoodsByCat(item)">
              {{item.gcName}}
            </li>
          </ul>
          <div class="cloud-content">
            <div class="top-operate-group clearfix">
              <div class="input-group">
                <input type="text" id="searchGoodsName" v-model="searchGoodsName" class="form-control" placeholder="请输入商品名称检索">
                <span class="input-group-btn">
                <button class="btn btn-default" @click="filterCloudGoodsByName(searchGoodsName)">搜索</button>
              </span>
              </div>
              <div class="checkbox-custom checkbox-primary" >
              <span  @click="selectAllGoods">
                <input type="checkbox" id="allCloudGoods" :checked="markSelectedAllGoods">
                <label for="allCloudGoods" @click="selectAllGoods">全选</label>
              </span>
              </div>
              <!--<p class="tip">提示：将为您自动过滤系统中已导入过的商品</p>-->
            </div>
            <div class="table-goods" :class="{'loading': tableLoading}">
              <base-loading :loading="tableLoading"></base-loading>
              <div class="no-data" v-show="!tableLoading && cloudGoods.length === 0">
                <span v-if="selectedCloudCategory">暂无{{searchGoodsName}}相关的{{selectedCloudCategory.gcName}}</span>
                <span v-else>暂无{{searchGoodsName}}</span>
              </div>
              <ul class="table-goods-body clearfix">
                <li v-for="(item, index) in cloudGoods" :key="item.goodsId" @click="selectGoods(item, index)">
                  <div class="li-content">
                    <div class="img-box"></div>
                    <div class="checkbox-custom checkbox-primary" :class="{checked: markSelectedAllGoods || item.checked}" v-if="item.isUpdate === 0">
                      <input type="checkbox" :id="`cloudGoods${item.goodsId}`" :checked="markSelectedAllGoods || item.checked">
                      <label :for="`cloudGoods${item.goodsId}`"></label>
                    </div>
                    <div class="imported-mark"  v-if="item.isUpdate === 1">
                      <img src="@/assets/img/imported.png" alt="">
                    </div>
                    <p class="name">{{item.goodsName}}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="paging" v-if="cloudGoodsPage.totalPage > 1">
              <v-pagination :total="cloudGoodsPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
            </div>
            <div class="bottom-btn-group">
              <button class="btn btn-primary" @click="switchToSelectedGoodsList">导入</button>
              <button class="btn btn-default" @click="$router.back()">取消</button>
            </div>
          </div>
        </div>
        <div class="look-cloud-goods-panel" v-if="cloudGoodsPane === 1">
          <v-table is-horizontal-resize
                   is-vertical-resize
                   style="width:100%"
                   row-hover-color="#eee"
                   row-click-color="#edf7ff"
                   title-bg-color="#f0f2f9"
                   :title-row-height="52"
                   :height="455"
                   :min-height="455"
                   :columns="goodsColumns"
                   :table-data="selectedGoods"
                   :show-vertical-border="false"
                   :cell-edit-done="cellEditDone"  @on-custom-comp="someOperate"></v-table>
          <div class="bottom-btn-group center">
            <button class="btn btn-primary" @click="importCloudGoods">确认</button>
            <button class="btn btn-default" @click="cloudGoodsPane = 0">取消</button>
          </div>
        </div>
        <div class="success-cloud-goods-panel" v-show="cloudGoodsPane === 2">
          <div class="success-content">
            <i class="iconfont icon-chenggong"></i>
            <strong>导入成功</strong>
            <p>导入商品成功，您可在商品信息列表中修改商品属性！</p>
            <div class="bottom-btn-group center">
              <button class="btn btn-primary" @click="$router.back()">返回列表</button>
              <button class="btn btn-default" @click="continueAddCloudGoods">继续添加</button>
            </div>
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="goodsLocal">
        <local-import :tempUrl="'/api/stock/inbar/downExcel'" :isLayer="false" @submit-import="submitLocalImport" @cancel-import="cancelLocalImport"></local-import>
      </div>
    </div>
  </div>

</div>
</template>

<script>
  import $ from 'jquery'
  import multiselect from 'vue-multiselect'
  import {publish, subscribe} from 'pubsub-js'
  import layer from '../../../static/vendor/layer/layer'
  import {GET, POST, PATCH, MultiFormed} from '../../core/http'
  import CustomGoods from './template-custom-goods.vue'
  import LocalImport from '../template/LocalImport'
  let vm;
  export default {
    name: 'add-goods',
    components: { multiselect, CustomGoods, LocalImport },
    data() {
      return {
        tableLoading: true,
        file: null,
        selectedCloudCategory: null,
        searchGoodsName: '',
        selectedGoods: [],
        cloudGoodsPane: 0, //0 选择云商品 1已选择商品列表 2导入成功
        markSelectedAllGoods: false,
        cloudGoods: [],
        cloudCategories: [],
        cloudGoodsParams: {
          gcId: '',
          page: 0,
          size: 24
        },
        cloudGoodsPage: {
          totalPage: 0,
          amount: 0
        },
        goodsColumns: [
          {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {field: 'goodsImage', title: '商品图片', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              return '<i class="iconfont icon-tupian" style="color:#bbb"></i>'
            }},
          {field: 'goodsName', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsPrice', title: '售价/元', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true,
            formatter: (rowData, rowIndex, pagingIndex, field) => {
              return `<span style="display: none">${rowData[field]}</span><input class="cell-edit-input" type="text" style="text-align: center; width: 100%; height:80%" value="${rowData[field]}"/>`
            }
          },
          {field: 'unit', title: '单位', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: {name: 'goodsStatus', valueKey: 'goodsStatus', callback: this.toggleStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: [
              {name: '删除', type: "delete", callback: this.deleteSelectedGoods}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ]
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      switchToSelectedGoodsList() {
        const selectedGoodsLen = this.selectedGoods.length;
        if (selectedGoodsLen === 0) {
          layer.msg('您还未选择任何商品');
        } else {
          this.cloudGoodsPane = 1;
        }
      },
      importCloudGoods() {
        const selectedGoodsLen = this.selectedGoods.length;
        let query;
        if (selectedGoodsLen === 0) {
          layer.msg('无可导入商品，点击【取消】按钮返回添加商品');
          return;
        }
        if (selectedGoodsLen > 1) {
          query = this.selectedGoods.reduce((result, item, currentIndex) => {
            if (currentIndex === 1) {
              return `ids=${result.goodsId}&goodsPrice=${result.goodsPrice}&goodsStatus=${result.goodsStatus}&ids=${item.goodsId}&goodsPrice=${item.goodsPrice}&goodsStatus=${item.goodsStatus}`;
            } else {
              return `${result}&ids=${item.goodsId}&goodsPrice=${item.goodsPrice}&goodsStatus=${item.goodsStatus}`;
            }
          })
        } else {
          query = `ids=${this.selectedGoods[0].goodsId}&goodsPrice=${this.selectedGoods[0].goodsPrice}&goodsStatus=${this.selectedGoods[0].goodsStatus}`
        }
        const url = `/api/stock/inbar/uploadYun?${query}`;
        POST(url)
          .then(() => {
            this.cloudGoodsPane = 2;
            this.selectedGoods = [];
            this.markSelectedAllGoods = false;
            // this.cloudGoods = this.cloudGoods.map(item => {
            //   return Object.assign(item, {checked: false})
            // })
            getAllCloudGoods(); //after importCloudGoods
          })
      },
      filerCloudGoodsByCat(category) {
        this.markSelectedAllGoods = false;
        this.selectedCloudCategory = category || null;
        this.cloudGoodsParams.page = 0;
        getAllCloudGoods(); //filerCloudGoodsByCat
      },
      filterCloudGoodsByName() {
        if (!this.searchGoodsName) {
          layer.msg('请输入商品名称')
          $('#searchGoodsName').trigger('focus')
        } else {
          getAllCloudGoods(); //filterCloudGoodsByName
        }
      },
      selectGoods(goods, index) {
        const selected = findSelectedGoods(goods, (thisIndex) => { vm.selectedGoods.splice(thisIndex, 1) });
        if (!selected) {
          this.selectedGoods.push(goods);
          this.cloudGoods[index]['checked'] = true;
        } else {
          this.cloudGoods[index]['checked'] = false;
        }
      },
      selectAllGoods() {
        this.selectedGoods = [];
        if (this.markSelectedAllGoods) {
          // this.selectedGoods = [];
          this.cloudGoods.forEach(item => {
            if (item.isUpdate === 0) {
              item.checked = false;
            }
          })
        } else {
          this.cloudGoods.forEach(item => {
            if (item.isUpdate === 0) {
              item.checked = true;
              vm.selectedGoods.push(item);
            }
          })
        }
        this.markSelectedAllGoods = !this.markSelectedAllGoods;
      },
      toggleStatus(params) {
        this.selectedGoods[params.index].goodsStatus = !this.selectedGoods[params.index].goodsStatus
      },
      cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
        this.selectedGoods[rowIndex].goodsPrice = newValue;
      },
      continueAddCloudGoods() {
        this.cloudGoodsPane = 0;
        this.selectedGoods = [];
      },
      deleteSelectedGoods(params) {
        this.selectedGoods.splice(params.index, 1)
        this.cloudGoods.some(item => {
          if (item.goodsId === params.rowData.goodsId) {
            item.checked = false;
            return true;
          }
        })
      },
      submitLocalImport(file) {
        if (!file) {
          layer.msg('您还未选择文件')
          return;
        }
        let formData = new FormData();
        formData.append('file', file)
        POST("/api/stock/inbar/uploadExcel", MultiFormed(formData))
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
      cancelLocalImport() {
        this.$router.back();
      },
      pageChange(pageIndex) {
        vm.cloudGoodsParams.page = pageIndex - 1;
        getAllCloudGoods(); //pageChange
      },
      pageSizeChange(newPageSize) {
        vm.cloudGoodsParams.size = newPageSize;
        getAllCloudGoods(); //pageSizeChange
      }
    },
    created() {
      vm = this;
      getAllCloudGoods(); //created
      getCloudCategories();
      // subscribe('delete.table.operate.add.goods', this.deleteSelectedGoods)
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '新增商品'},
        toggleMenubar: false
      })
    }
  }

  function getAllCloudGoods () {
    if (vm.searchGoodsName !== '') {
      vm.cloudGoodsParams.name = vm.searchGoodsName;
    } else {
      delete vm.cloudGoodsParams['name'];
    }
    if (vm.selectedCloudCategory !== null) {
      vm.cloudGoodsParams.gcId = vm.selectedCloudCategory.gcId;
    } else {
      delete vm.cloudGoodsParams.gcId;
    }
    vm.cloudGoods = [];
    vm.tableLoading = true;
    GET('/api/stock/inbar/queryByPageGoodsYun', vm.cloudGoodsParams)
      .then(data => {
        vm.tableLoading = false;
        vm.cloudGoodsPage.totalPage = data.totalPages;
        vm.cloudGoodsPage.amount = data.totalElements;
        vm.cloudGoods = formatCloudGoods(data.content);
      })
  }

  function getCloudCategories () {
    GET('/api/stock/class/queryByYunGc')
      .then(data => {
        vm.cloudCategories = data;
      })
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
    if (thisIndex != null) {
      if (callback) callback(thisIndex);
      return true;
    } else {
      return false;
    }
  }
  function formatCloudGoods (data) {
    return data.map(item => {
      if (!findSelectedGoods(item)) {
        return Object.assign(item, {checked: false});
      } else {
        return Object.assign(item, {checked: true});
      }
    });
  }
</script>

<style scoped lang="scss">
  @import "../../sass/add-goods.scss";
</style>
