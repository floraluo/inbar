<template>
  <div class="page-main" >

    <div class="btn-return">
      <router-link :to="{name: 'manage-package'}" class="btn-pure btn-default" replace>返回 <i class="iconfont icon-fanhui"></i></router-link>
    </div>

    <div class="page-main-top">
      <ul class="nav nav-tabs" role="tablist">
        <li class="active" role="presentation"><router-link :to="{name: 'add-package'}">普通套餐</router-link></li>
        <li role="presentation"><router-link :to="{name: 'add-package'}">特殊套餐</router-link></li>
      </ul>
    </div>

    <div class="page-main-content col-lg-7  col-xs-12" >
      <form >
        <div class="form-group col-xs-12"><label class="col-xs-2" >套餐名称： <small class="error" v-show="errors.has('name')">（*{{ errors.first('name') }}）</small></label>
          <div class="col-xs-9">
            <input v-model="packageParam.name"
                   v-validate="'required'"
                   data-vv-as="套餐名称"
                   name="name"
                   type="text"
                   class="form-control "
                   placeholder="请输入名称">
          </div>
        </div>
        <div class="form-group"><label class="col-xs-2" > 会员等级：</label>
          <div class="col-xs-10">
            <ul class=" check-member">
              <li class="checkbox-custom checkbox-primary " >
                <input type="checkbox" ><label >全选</label>
              </li>
              <li class="checkbox-custom checkbox-primary" v-for="item in levels" :key="item.id">
                <input v-model="packageParam.memberLevelList" :value="item.id" type="checkbox" :id="'memberLevelList'+item.id"><label :for="'memberLevelList'+item.id">{{item.levelName}}</label>
              </li>
            </ul>
            <small class="error" v-show="selectedMemberType !== false && packageParam.memberLevelList.length === 0">（*至少选择一个等级）</small>
          </div>
        </div>

        <div class="form-group col-xs-12"><label class="col-xs-2 " >赠送类别：</label>
          <div class="col-xs-9">
            <ul class="radio-list">
              <li class="radio-custom radio-primary">
                <input v-model="packageParam.overchargeType" value="0" type="radio" name="type" id="type1" @click="validType = 1"><label for="type1">网费</label>
              </li>
              <li class="radio-custom radio-primary">
                <input v-model="packageParam.overchargeType" value="1" type="radio" name="type" id="type2" @click="validType = 2"><label for="type2">商品</label>
              </li>
              <li class="radio-custom radio-primary">
                <input v-model="packageParam.overchargeType" value="2" type="radio" name="type" id="type3" @click="validType = 3"><label for="type3">网费+商品</label>
              </li>
            </ul>
          </div>
        </div>

        <div class="form-group col-xs-12"><label class="col-xs-2" >充值金额： <small class="error" v-show="errors.has('amount')">（*{{ errors.first('amount') }}）</small></label>
          <div class="input-group col-xs-9">
            <input v-model="packageParam.amount"
                   name="amount"
                   type="text"
                   class="form-control"
                   placeholder="请输入金额">
            <span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group col-xs-12"  v-show="validType === 1 || validType === 3"><label  class="col-xs-2" >赠送网费： <small class="error" v-show="errors.has('overed')">（*{{ errors.first('overed') }}）</small></label>
          <div class="input-group col-xs-9">
            <input v-model="packageParam.overed"
                   name="overed"
                   type="text"
                   class="form-control"
                   placeholder="请输入金额">
            <span class="input-group-addon">元</span>
          </div>
        </div>

        <div class="form-group col-xs-12" v-show="validType === 2 || validType === 3" ><label  class="col-xs-2" >赠送商品： <small class="error" v-show="errors.has('overed')">（*{{ errors.first('overed') }}）</small></label>
          <div class=" col-xs-9">
            <div class="input-group">
            <button class="btn btn-primary margin-right-10" @click="openGoodsLayer">选择商品</button>
            <span>已选商品“”个</span>
            </div>
            <div class="">
            <ul >
              <li v-for="(item, index) in cart" :key="item.index" @click="markCartStock(index, $event)" :class="{'active':markOrderIndex === index}">
                <div class="list-shop">{{item.goodsName || item.setmealName}}</div>
                <div class="list-number">{{item.num || 1}}{{item.status ? '*' + item.status : ''}}</div>
                <div class="list-value">{{item.goodsPrice ? item.goodsPrice : item.setmealCurrent | formatMoney}}</div>
                <input class="btn"v-model=item.num>
                <button class="btn btn-num" @click="minusMarkStockNum">-</button>
                <button class="btn btn-num" @click="plusMarkStockNum">+</button>
              </li>
            </ul>
          </div>
        </div>
        </div>

        <div class="form-group col-xs-12"><label class="col-xs-2 " >生效时间：</label>
          <div class="col-xs-9">
            <ul class="radio-list">
              <li class="radio-custom radio-primary">
                <input v-model="packageParam.effectiveTime" value="0" type="radio" name="time" id="time1" @click="validType=4"><label for="time1">无限制</label>
              </li>
              <li class="radio-custom radio-primary">
                <input v-model="packageParam.effectiveTime" value="1" type="radio" name="time" id="time2" @click="validType=5"><label for="time2">限制时间段</label>
              </li>
            </ul>
            <div class=""v-show="validType===5">
              <date-picker v-model="packageParam.beginTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD'"  placeholder="开始时间"></date-picker>~
              <date-picker v-model="packageParam.endTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
            </div>
          </div>
        </div>
        <div class="form-group col-xs-12 padding-bottom-30 "><label  class="col-xs-2 " >时间限制：</label>
          <div class="col-xs-9">
            <ul class="radio-list">
              <li class="radio-custom radio-primary ">
                <input v-model="packageParam.limitTimeType" value="none" type="radio" name="limit" id="limit1" @click="validType=6"><label for="limit1">无限制</label>
              </li>
              <li class="radio-custom radio-primary">
                <input v-model="packageParam.limitTimeType" value="month" type="radio" name="limit" id="limit2" @click="validType=7"><label for="limit2">每月</label>
              </li>
            </ul>
            <div >
              <ul class="checkbox-list "  v-show="validType===6">
                <li class="checkbox-custom checkbox-primary" v-for="n in 31" :key="n.id">
                  <input v-model="packageParam.limitDays" :value="n.id" type="checkbox" :id="limitDays"><label :for="limitDays" >{{ n }}号</label>
                </li>
              </ul>
              <small class="error" v-show="selectedMemberType !== false && packageParam.memberLevelList.length === 0">（*至少选择一个等级）</small>
            </div>
          </div>
        </div>

      </form>

      <div class="form-group text-center">
        <button class="btn btn-primary " @click="submitAddPackage">保存</button>
        <button class="btn btn-default margin-left-30" @click="cancelLayer">取消</button>
      </div>
    </div>


    <!--选择商品-->
    <div class="layer-open layer-add-pickup-goods" id="selectGoodLayer">
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

  </div>
</template>

<script>
  import Vue from 'vue'
  import mySwitch from 'vue-switch/switch-2.vue';
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm;

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
        vm.goods = data.content;
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
  function getLevels () {
    GET('/api/overcharge-rule/getLevel')
      .done((data) => {
        vm.levels = data;
      })
  }
  function postAddPackage () {
    POST('/api/overcharge-rule/', vm.areaParam)
      .done(() => {
        getAllPackage();
        layer.close(vm.layerId);
        layer.msg('新增套餐成功！')
      })
  }
  function postAddGood() {

  }

  export default {
    name: "add-package",
    components: {DatePicker},
    data() {
      return  {
        validType: 1,
        searchGoodsName: '',
        selectedCategory: null,
        categories: [],
        layerId: null,
        tableLoading: false,
        levels: [],
        datapickerWidth: '48%',
        selectedMemberType: false,
        packageParam:{
          id:0,
          amount: '',
          beginTime: '',
          effectiveTime: 0,
          endTime: '',
          limitDays: '',
          limitTimeType: 'none',
          memberLevelList: [],
          name: '',
          overchargeType: 0,
          overed: '',
          overedGoods: '',
          goodsId: '',
          percentage:'',
          enabled:'true',
        },
        goods: [],
        goodsListParams: {
          gcId: '',
          page: 0,
          size: 10
        },
        goodsPage: {
          totalPage: 0,
          amount: 0
        },
        goodsColumns: [
          {title: '编号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center',type: 'selection', isResize: true},
          {field: 'goodsImage', title: '图片', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData) => {
              // todo: tupian
              return `<i class="iconfont icon-tupian"></i>`
            }
          },
          {field: 'goodsName', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsSerial', title: '商品编号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsPrice', title: '商品价格/元', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true},]
      }

    },

    methods: {
      openGoodsLayer () {
        this.layerId = layer.open({
          type: 1,
          title: '选择商品',
          area: ['850px', '570px'],
          content: $('#selectGoodLayer'),
          success() {
            getAllGoods(); //openAddGoodsLayer
            $('.j-category').slimScroll({
              height: '325px'
            })
          }
        })
      },
      updateGoods() {
        let amount = 0;
        this.tableUpdate.goodsList.forEach((item) => {
          amount += +item.updateAmount;
        })
        return {amount};
      },
      enterSelectedGoods() {
        // this.selectedGoodsList = this.tableUpdate.goodsList = JSON.parse(JSON.stringify(this.selectedGoods));
        this.cancelLayer();
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
    submitAddPackage() {
      this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          postAddPackage();
        }
      )
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
    getLevels();
    getAllGoods()
    getCategories();
    getAllPackage();
  },

  mounted() {
    publish('crumb.push', {
      crumb: {name: '新增套餐'},
      toggleMenubar: false
    })
  }
  }

</script>

<style scoped lang="scss">
  @import "../../sass/repertory";

  .col-xs-2,.col-xs-9,.col-xs-12{
    padding-left: 0;
    padding-right: 0;
  }
  .page-main-content{
    padding: 20px;
    .radio-list{
      display:flex;
      .radio-custom{
        padding-right: 20px;
      }
    }
    .checkbox-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      li {
        margin: 0;
        width: calc((100% - 2px) / 7);
        padding: 0 6px;
      }
    }
  }
  .check-member{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li{
      margin: 0;
      width: calc((100% - 2px) / 5);
      padding: 0 6px;
      &:nth-child(1){
        margin-right: 9999px;
        label{
          width: 50px;
        }
      }
    }
  }
  .input-group-btn{
    padding: 0 20px;
  }


</style>
