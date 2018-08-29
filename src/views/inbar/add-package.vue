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
            <div class="input-group col-xs-9">
              <button class="btn btn-primary margin-right-10" @click="selectedGoods">选择商品</button>
              <span>已选商品“”个</span>
              <ul>
                <li></li>
              </ul>

            </div>
          </div>

          <div class="form-group col-xs-12"><label class="col-xs-2 " >生效时间：</label>
            <div class="col-xs-9">
              <ul class="radio-list">
                <li class="radio-custom radio-primary">
                  <input v-model="packageParam.effectiveTime" value="0" type="radio" name="time" id="time1"><label for="time1">无限制</label>
                </li>
                <li class="radio-custom radio-primary">
                  <input v-model="packageParam.effectiveTime" value="1" type="radio" name="time" id="time2"><label for="time2">限制时间段</label>
                </li>
              </ul>
              <div class="">
                <date-picker v-model="packageParam.beginTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD'"  placeholder="开始时间"></date-picker>~
                <date-picker v-model="packageParam.endTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
              </div>
            </div>
          </div>
          <div class="form-group col-xs-12 "><label  class="col-xs-2 " >时间限制：</label>
            <div class="col-xs-9">
              <ul class="radio-list">
                <li class="radio-custom radio-primary ">
                  <input v-model="packageParam.limitTimeType" value="none" type="radio" name="limit" id="limit1" @click="validType=4"><label for="limit1">无限制</label>
                </li>
                <li class="radio-custom radio-primary">
                  <input v-model="packageParam.limitTimeType" value="month" type="radio" name="limit" id="limit2" @click="validType=5"><label for="limit2">每月</label>
                </li>
              </ul>
              <div >
                <ul class="checkbox-list "  v-show="validType===5">
                  <li class="checkbox-custom checkbox-primary" v-for="n in 31" :key="n.id">
                    <input v-model="packageParam.limitDays" :value="n.id" type="checkbox" :id="limitDays"><label :for="limitDays" >{{ n }}号</label>
                  </li>
                </ul>
                <small class="error" v-show="selectedMemberType !== false && packageParam.memberLevelList.length === 0">（*至少选择一个等级）</small>
              </div>
            </div>
          </div>
          <div class="form-group col-xs-12 padding-bottom-30"><label  class="col-xs-2 " >是否启用：</label>
            <div class="col-xs-9">
              <ul class="radio-list">
                <li class="radio-custom radio-primary">
                  <input v-model="packageParam.enabled" value="true" type="radio" name="enabled" id="enabled1"><label for="enabled1">启用</label>
                </li>
                <li class="radio-custom radio-primary">
                  <input v-model="packageParam.enabled" value="false" type="radio" name="enabled" id="enabled2"><label for="enabled2">禁用</label>
                </li>
              </ul>
            </div>
          </div>
        </form>

        <div class="form-group text-center">
          <button class="btn btn-primary " @click="submitAddPackage">保存</button>
          <button class="btn btn-default margin-left-30" @click="cancelLayer">取消</button>
        </div>
      </div>


    <!--选择商品-->
  <div class="layer-add-package layer-open" id="selectGoodLayer">
      <form  >
          <div class="form-group ">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="请输入商品名称或关键字">
              <div class="input-group-btn padding-right-20"><button class="btn btn-default" type="button"><i class="iconfont icon-search"></i>搜索</button></div>
              <small>提示：双击右侧商品即可添加</small>
            </div>
          </div>
           <div class="row">
             <div class="col-xs-4" >
               <div class="goods-title">商品分类</div>
               <ul class="good-list j-good-list">
                 <li
                   :class="{active:index === markStockList}"
                   v-for="(item, index) in stockType"
                   :key="item.id"
                   @click="queryStockByType(item, index)">
                   <span class="type">{{item.gcName}}</span>
                 </li>
               </ul>
             </div>
             <div class="col-xs-8">
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
                        :columns="goodcolumns"
                        :table-data="goods"
                        :show-vertical-border="false"></v-table>
               <div class="paging" v-if="goodPage.totalPage > 1">
                 <v-pagination :total="goodPage.Amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
               </div>
             </div>
           </div>
        <div class="form-group layer-btn-operate-group">
          <button class="btn btn-default" @click="cancelLayer" type="button">取消</button>
          <button class="btn btn-primary" @click="submitAddGood" type="button">确认</button>
        </div>
      </form>
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

  function  openGoodLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['700px', '640px'],
      content: $('#selectGoodLayer'),
      success() {
        vm.$validator.errors.clear();
      },
    })
  }

  function cancelLayer () {
    layer.close(vm.layerId);
  }

  function getLevels () {
    GET('/api/overcharge-rule/getLevel')
      .done((data) => {
        vm.levels = data;
      })
  }
  //商品分类查询
  function getAllStockType() {
    const vm = this;
    GET('/api/stock/class/queryByGc')
      .done( (data)=>  {
        vm.stockType = data.stockType
    });
  }

  function queryAllGoods(id) {
    const vm = this, url = id ? `/api/stock/queryAll?gcId=${id}` : '/api/stock/queryAll';
    vm.stockLoading = true;
    GET(url).done(function (data) {
      vm.goods = data.content || [];
      vm.stockLoading = false;
    });
  }
  function  getAllPackage() {
    GET('api/overcharge-rule/')
      .done((date)=> {
        this.packages=date;
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
        stockType:[],
        stockLoading: false,
        markStockList: null,
        layerId: null,
        packages: {},
        tableLoading: false,
        checkeds:[],
        levels: [],
        goodLayerType: null,
        datapickerWidth: '48%',
        selectedMemberType: false,
        goodSearchKey: '',
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
        goods: {},
        goodsList: {
          gcId: '',
          page: 0,
          size: 10,
          totalPage: 0,
          amount: 0
        },
        setMealParams:{},
        goodcolumns: [
          {field: 'id', title: '编号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          // {width: 40, titleAlign: 'center', columnAlign: 'center',type: 'selection', isResize: true},
          {field: 'goodsName', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsSerial', title: '商品编号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'goodsPrice', title: '商品价格/元', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true},]
          }

    },

    methods: {

      selectedGoods() {
        this.goodLayerType = 0;
        openGoodLayer( '选择商品');
      },
      filtergoodsByStock(stockType, index) {
        this.markStockList = index;
        vm.staff.stockId = stock.id;
        getAllUser();
      },

     /* searchMenus(event) {
        this.$refs.permissionTree.searchNodes(this.goodSearchKey)
      },*/
      addSelectGood() {
      },
      cancelLayer() {
        cancelLayer();
      },

      queryStockByType(item, index) {
        const vm = this, markIndex = vm.markClassifyIndex;
        this.goodsListParams.page = 0;
        if (markIndex == null || markIndex !== index) {
          //查询分类下的商品
          vm.markClassifyIndex = index;
          queryAllGoods.call(this, item.gcId);
        } else if (markIndex === index) {
          vm.markClassifyIndex = null;
          //查询所有商品
          queryAllGoods();
        }
      },


      submitAddGood() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          postAddGood();
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
        vm.goodlist.page = pageIndex - 1;
        getAllGoods();
      },
      pageSizeChange(newPageSize) {
        vm.goodlist.size = newPageSize;
        getAllGoods();
      },
    },

    created() {
      vm = this;
      getLevels();
      getAllGoods()
      getAllStockType();
      //查询所有商品
      queryAllGoods();
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
  @import "../../sass/inbar-setting";

  .col-xs-2,.col-xs-9,.col-xs-12{
    padding-left: 0;
    padding-right: 0;
  }
  .page-main-content{
    padding: 20px;
    .radio-list{
      float: left;
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
