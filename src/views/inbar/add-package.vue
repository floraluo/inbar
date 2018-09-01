<template>
  <div class="page-main" >
    <div class="btn-return">
      <router-link :to="{name: 'manage-package'}" class="btn-pure btn-default" replace>返回 <i class="iconfont icon-fanhui"></i></router-link>
    </div>
    <div class="page-main-top">
      <ul class="nav nav-tabs" role="tablist">
        <li :class="{active: packageType}" role="presentation" @click="switchPackageType"><a href="javascript:;">普通套餐</a></li>
        <li :class="{active: !packageType}" role="presentation"  @click="switchPackageType"><a href="javascript:;">特殊套餐</a></li>
      </ul>
    </div>

    <div class="page-main-content form-horizontal">
      <div class="form-group"><label class="row-name" >套餐名称： <small class="error" v-show="errors.has('name')">（*{{ errors.first('name') }}）</small></label>
        <div class="col-xs-9">
          <input v-model="packageParam.name"
                 data-vv-as="套餐名称"
                 name="name"
                 type="text"
                 class="form-control "
                 placeholder="请输入名称">
        </div>
      </div>
      <div class="form-group"><label class="row-name" > 会员等级：</label>
        <div class="col-xs-10">
          <ul class=" check-member">
            <li class="checkbox-custom checkbox-primary " >
              <input type="checkbox" @change="selectAllLevel($event.target.checked)" id="allLevel"><label for="allLevel">全选</label>
            </li>
            <li class="checkbox-custom checkbox-primary" v-for="(item, index) in levels" :key="item.id">
              <input :value="item.id" :checked="item.checked" type="checkbox" :id="'memberLevel'+item.id" @change="selectLevel($event.target.checked, item.id, index)">
              <label :for="'memberLevel'+item.id">{{item.levelName}}</label>
            </li>
          </ul>
        </div>
      </div>

      <div class="form-group"><label class="row-name " >赠送类别：</label>
        <div class="col-xs-9">
          <ul class="radio-list">
            <li class="radio-custom radio-primary">
              <input v-model="packageParam.overchargeType" value="0" type="radio" name="type" id="type1"><label for="type1">网费</label>
            </li>
            <li class="radio-custom radio-primary">
              <input v-model="packageParam.overchargeType" value="1" type="radio" name="type" id="type2"><label for="type2">商品</label>
            </li>
            <li class="radio-custom radio-primary">
              <input v-model="packageParam.overchargeType" value="2" type="radio" name="type" id="type3"><label for="type3">网费+商品</label>
            </li>
          </ul>
        </div>
      </div>

      <div class="form-group"><label class="row-name" >充值金额： <small class="error" v-show="errors.has('amount')">（*{{ errors.first('amount') }}）</small></label>
        <div class="input-group col-xs-9">
          <input v-model="packageParam.amount"
                 name="amount"
                 type="text"
                 class="form-control"
                 placeholder="请输入金额">
          <span class="input-group-addon">元</span>
        </div>
      </div>
      <div class="form-group"  v-show="packageParam.overchargeType == 0 || packageParam.overchargeType == 2"><label  class="row-name" >赠送网费： <small class="error" v-show="errors.has('overed')">（*{{ errors.first('overed') }}）</small></label>
        <div class="input-group" v-if="packageType">
          <input v-model="packageParam.overed"
                 name="overed"
                 type="text"
                 class="form-control"
                 placeholder="请输入金额">
          <span class="input-group-addon">元</span>
        </div>
        <div class="input-group" v-else>
          <input v-model="packageParam.overed"
                 name="overed"
                 type="text"
                 class="form-control"
                 placeholder="请输入赠送百分比">
          <span class="input-group-addon">%</span>
        </div>
      </div>

      <div class="form-group" v-show="packageParam.overchargeType == 1 || packageParam.overchargeType == 2" ><label  class="row-name" >赠送商品： <small class="error" v-show="errors.has('overed')">（*{{ errors.first('overed') }}）</small></label>
        <div class=" col-xs-9">
          <div class="form-group">
            <button class="btn btn-primary margin-right-10" type="button" @click="openGoodsLayer">选择商品</button>
            <!--<span>已选商品“”个</span>-->
          </div>
          <div class="select-goods-group" v-for="(item, index) in selectedGoods" :key="item.goodsId">
            <input type="text" class="form-control name" :value="item.goodsName" disabled>
            <div class="input-group">
              <input type="text" class="form-control" v-model="item.goodsCount">
              <span class="input-group-addon">{{item.unit || '　'}}</span>
            </div>
            <div class="btn-group">
              <a href="javascript:;" @click="deleteThisGoods(index)">删除</a>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group"><label class="row-name " >生效时间：</label>
        <div class="col-xs-9">
          <ul class="radio-list">
            <li class="radio-custom radio-primary">
              <input v-model="packageParam.effectiveTime" value="0" type="radio" name="time" id="time1"><label for="time1">无限制</label>
            </li>
            <li class="radio-custom radio-primary">
              <input v-model="packageParam.effectiveTime" value="1" type="radio" name="time" id="time2"><label for="time2">限制时间段 </label>
            </li>
          </ul>
          <div v-show="packageParam.effectiveTime == 1">
            <date-picker v-model="packageParam.beginTime" :width="'150px'" type="datetime" :format="'YYYY-MM-DD'"  placeholder="开始时间"></date-picker>~
            <date-picker v-model="packageParam.endTime" :width="'150px'" type="datetime" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
          </div>
        </div>
      </div>
      <div class="form-group"><label  class="row-name " >时间限制：</label>
          <div class="col-xs-9">
            <ul class="radio-list">
              <li class="radio-custom radio-primary ">
                <input v-model="packageParam.limitTimeType" value="NONE" type="radio" name="limit" id="limit1"><label for="limit1">无限制</label>
              </li>
              <li class="radio-custom radio-primary">
                <input v-model="packageParam.limitTimeType" value="MONTH" type="radio" name="limit" id="limit2"><label for="limit2">每月</label>
              </li>
            </ul>
            <div >
              <ul class="checkbox-list" v-show="packageParam.limitTimeType === 'MONTH'">
                <li class="checkbox-custom checkbox-primary" v-for="n in 31" :key="n">
                  <input :value="n" type="checkbox" :id="'limitDays' + n" @change="selectDay($event.target.checked, n)"><label :for="'limitDays' + n">{{ n }}号</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      <div class="form-group btn-row">
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
          <v-table ref="tableGoods" is-horizontal-resize
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
                   :columns="tableGoods.columns"
                   :table-data="tableGoods.data"
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
  export default {
    name: "add-package",
    components: {DatePicker},
    data() {
      return {
        layerId: null,
        packageType: true,
        searchGoodsName: '',
        selectedCategory: null,
        categories: [],
        selectedGoods: [],
        tableLoading: false,
        levels: [],
        memberType: new Set(),
        limitDays: new Set(),
        packageParam: {
          name: '',
          memberType: '',
          overchargeType: 0, // 0:送金額，1:送商品，2:都送
          amount: '',
          overed: '',
          overedGoodsList: [],
          effectiveTime: 0, //0-> 无限制, 1-> 限制时间段
          beginTime: '',
          endTime: '',
          limitTimeType: 'NONE', //时间限制类型 month|week|none
          limitDays: ''
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
        tableGoods: {
          data: [],
          columns: [
            {title: '编号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
            {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
            {field: 'goodsImage', title: '图片', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter: (rowData) => {
                // todo: tupian
                return `<i class="iconfont icon-tupian"></i>`
              }
            },
            {field: 'goodsName', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'goodsSerial', title: '商品编号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'goodsPrice', title: '商品价格/元', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true}
          ]
        }
      }
    },
    methods: {
      switchPackageType() {
        this.packageType = !this.packageType;
      },
      selectAllLevel(value) {
        if (value) {
          this.levels.forEach(item => {
            item.checked = true;
            this.packageParam.memberType = `${this.packageParam.memberType},${item.id}`;
            this.packageParam.memberType = this.packageParam.memberType.replace(/^,/, '')
          })
        } else {
          this.levels.forEach(item => {
            item.checked = false;
          })
          this.packageParam.memberType = '';
        }
      },
      selectLevel(checked, id, index) {
        if (checked) {
          this.memberType.add(id);
        } else {
          this.memberType.delete(id);
        }
        this.levels[index].checked = !this.levels[index].checked;
        this.packageParam.memberType = [...this.memberType].sort((a, b) => { return a - b }).toString();
        console.log(this.packageParam.memberType)
      },
      openGoodsLayer () {
        this.layerId = layer.open({
          type: 1,
          title: '选择商品',
          area: ['850px', '570px'],
          content: $('#selectGoodLayer'),
          success() {
            vm.selectedCategory = null;
            vm.searchGoodsName = '';
            vm.goodsListParams.page = 0;
            vm.goodsListParams.size = 10;
            vm.tableGoods.data = formatGoods(vm.goods);
            // vm.$refs['tableGoods'].resize();
            $('.j-category').slimScroll({
              height: '325px'
            })
          }
        })
      },
      deleteThisGoods(index) {
        this.selectedGoods.splice(index, 1);
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
        this.selectedGoods = this.selectedGoods.concat(initGoodsCount(selection)); //selectGoodsInLayer
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
      selectDay(checked, day) {
        if (checked) {
          this.limitDays.add(day);
        } else {
          this.limitDays.delete(day);
        }
        this.packageParam.limitDays = [...this.limitDays].sort((a, b) => { return a - b }).toString()
      },
      submitAddPackage() {
        this.packageParam.overedGoodsList = this.selectedGoods.map(item => {
          return {
            goodsId: item.goodsId,
            quantity: item.goodsCount
          }
        })
        let url;
        if (this.packageType) {
          url = '/api/overcharge-rule/'
        } else {
          url = '/api/overcharge-rule/special'
        }
        POST(url, this.packageParam)
          .then(() => {
            layer.msg('保存成功');
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
      getLevels();
      getAllGoods()
      getCategories();
    },

    mounted() {
      publish('crumb.push', {
        crumb: {name: '新增套餐'},
        toggleMenubar: false
      })
    }
  }
  async function getAllGoods () {
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
    vm.tableGoods.data = [];
    vm.tableLoading = true;
    GET('/api/stock/inbar/queryByPageGoods', vm.goodsListParams)
      .then((data) => {
        vm.tableLoading = false;
        vm.goodsPage.totalPage = data.totalPages;
        vm.goodsPage.amount = data.totalElements;
        vm.tableGoods.data = formatGoods(data.content);
        if (vm.goods.length === 0) {
          vm.goods = vm.tableGoods.data;
        }
      })
  }
  function getCategories () {
    GET('/api/stock/class/queryByGc')
      .then(data => {
        vm.categories = data;
      })
  }
  function initGoodsCount (data) {
    return data.map(item => {
      return Object.assign({}, item, {goodsCount: 1});
    });
  }
  function formatGoods (data) {
    return data.map(item => {
      if (!findSelectedGoods(item)) {
        return Object.assign({}, item, {_checked: false});
      } else {
        return Object.assign({}, item, {_checked: true});
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
        vm.levels = data.map(item => {
          return Object.assign({}, item, {checked: false})
        });
      })
  }

</script>

<style scoped lang="scss">
  @import "../../sass/repertory";
  .page-main-content{
    padding-top: 30px;
    .form-group{
      padding-left: 12px;
      padding-right: 12px;
      &.btn-row{
        margin-left: 5em;
        margin-bottom: 50px;
      }
    }
    .row-name{
      float: left;
      height: 32px;
      line-height: 32px;
      + div{
        width: calc(100% - 5em);
        max-width: 350px;
        padding-left: 12px;
      }
    }
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
        width: calc(100% / 5);
        /*padding: 0 6px;*/
      }
    }
  }
  .check-member{
    width: 100%;
    /*padding-left: 15px;*/
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li{
      margin: 0;
      width: calc(100% / 3);
      /*padding: 0 6px;*/
      &:nth-child(1){
        width: 100%;
      }
    }
  }
  .input-group-btn{
    padding: 0 20px;
  }

  .select-goods-group{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .name{
      width: 200px;
    }
    .input-group{
      margin-left: 10px;
      width: 110px;
    }
    .btn-group{
      margin-left: 10px;
      /*width: 100px;*/
      width: 40px;
      .btn{
        padding: 0;
        height: 32px;
        width: 32px;
        border: 1px solid #d6d6d6;
        border-radius: 0;
        background-color: #fff;
      }
    }
  }

</style>
