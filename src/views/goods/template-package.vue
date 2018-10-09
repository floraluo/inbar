<template>
  <div >
    <form >
      <div class="form-group col-xs-12"><label class="col-xs-2" >套餐名称 </label>
        <div class="col-xs-9">
          <input v-model="packagesParam.setmealName"
                 v-validate="'required'"
                 data-vv-as="套餐名称"
                 name="setmealName"
                 type="text"
                 class="form-control "
                 placeholder="请输入名称">
          <small class="error" v-show="errors.has('setmealName')">（*{{ errors.first('setmealName') }}）</small>
        </div>
      </div>
      <div class="form-group col-xs-12"><label class="col-xs-2" >套餐原价 </label>
        <div class="input-group col-xs-9">
          <input v-model="packagesParam.setmealOrig"
                 v-validate="'required|sum'"
                 name="sum"
                 type="text"
                 class="form-control"
                 placeholder="请输入金额">
          <span class="input-group-addon">元</span>
        </div>
      </div>
      <div class="form-group col-xs-12"><label class="col-xs-2" >套餐现价 </label>
        <div class="col-xs-9">
          <div class="input-group ">
            <input v-model="packagesParam.setmealCurrent"
                   v-validate="'required|sum'"
                   data-vv-as="现价"
                   name="sum"
                   type="text"
                   class="form-control"
                   placeholder="请输入金额">
            <span class="input-group-addon">元</span>
          </div>
          <small class="error" v-show="errors.has('sum')">（*{{ errors.first('sum') }}）</small>
        </div>
      </div>
      <div class="form-group col-xs-12"><label class="col-xs-2 " >生效日期</label>
        <div class="col-xs-9">
          <date-picker v-model="packagesParam.startTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD '"  placeholder="开始时间"></date-picker>~
          <date-picker v-model="packagesParam.endTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD '" placeholder="结束时间"></date-picker>
        </div>
      </div>
      <div class="form-group col-xs-12"><label  class="col-xs-2 " >包含商品</label>
        <div class="col-xs-9">
          <button class="btn btn-primary margin-right-10" type="button" @click="openGoodsLayer">选择商品</button>
          <small class="error" v-show=" hasGoosList &&goodsList.length === 0">（*至少选择一个商品）</small>
          <div class="select-goods-group" v-for="(item, index) in goodsList" :key="item.goodsId">
            <input type="text" class="form-control name" :value="item.goodsName" disabled>
            <div class="input-group">
              <input type="text" class="form-control" v-model="item.goodsNum">
              <span class="input-group-addon">{{ item.unit || ''}}</span>
            </div>
            <div class="btn-group">
              <a href="javascript:;" @click="deleteThisGoods(index)">删除</a>
            </div>
          </div>
          <div >
          </div>
        </div>

      </div>
      <div class="form-group col-xs-12  padding-bottom-10 "><label class="col-xs-2 " >上传图片</label>
        <div class="col-xs-9">
          <div class="btn-box">
            <label class="btn btn-primary btn-upload" for="selectImg">
              <i class="iconfont icon-tupian"></i>选择图片
              <input class="sr-only" @change='importFile($event)' accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" type="file" id="selectImg">
            </label>
            <span>支持jpe、jpeg、gif、png、bmp格式的图片</span>
          </div>
          <div class="img-container">
            <div class="default-img"  v-if="!setmealImage" ><i class="iconfont icon-tupian1"></i> </div>
            <img :src="setmealImage" v-else>
          </div>
          <label v-if="!modify">
            <input type="checkbox" v-model="continueAdd"  v-if="!modify"> 保存后继续添加套餐
          </label>
        </div>
      </div>

    </form>

    <div class="form-group text-center"  >
      <button class="btn btn-primary " @click="submitPackage">保存</button>
      <button class="btn btn-default margin-left-30" @click="cancel">取消</button>
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

  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import DatePicker from 'vue2-datepicker'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT,  MultiFormed} from '../../core/http'

  let vm;
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
      return Object.assign({}, item, {goodsNum: 1});
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
    if (vm.goodsList.length === 0) return false;
    vm.goodsList.some((item, index) => {
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
  function initPackagesParam(msg, params) {
    const packages = vm.packages;
    Object.keys(vm.packagesParam).forEach(key => {
      vm.packagesParam[key] = packages[key];
    })
    vm.packagesParam.setmealId = packages.setmealId;
    vm.goodsList = packages.goodsList;
  }
  function _serialize () {
    let query = '';
    Object.keys(vm.packagesParam).forEach(paramsKey => {
      if(Array.isArray(vm.packagesParam[paramsKey])){
        vm.packagesParam[paramsKey].forEach(value => {
          if (value){
            query = `${query}&${paramsKey}=${value}`;
          }
        })
      }else {
        if (vm.packagesParam[paramsKey]) {
          query = `${query}&${paramsKey}=${vm.packagesParam[paramsKey]}`
        }
      }
    })
    query = query.replace(/^&|&$/g,'');
    // Object.keys(vm.packagesParam).reduce((result, second, index) => {
    //   if (index === 1) {
    //     if (Array.isArray(vm.packagesParam[result]))
    //     return `${result}=${vm.packagesParam[result]}&${second}=${vm.packagesParam[second]}`
    //   } else {
    //     if (Array.isArray(vm.packagesParam[second]) && vm.packagesParam[second].length > 1) {
    //       let formatSecond;
    //       formatSecond = vm.packagesParam[second].reduce((r, s) => {
    //         return `${second}=${r}&${second}=${s}`;
    //       })
    //       return `${result}&${formatSecond}`
    //     } else {
    //       return `${result}&${second}=${vm.packagesParam[second]}`
    //     }
    //   }
    // })
    return query;
  }
  export default {
    name: "tePackage",
    components: {DatePicker},
    props: {
      packages: Object,
      modify: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return  {
        continueAdd: true,
        hasGoosList: false,
        validType: 1,
        searchGoodsName: '',
        selectedCategory: null,
        categories: [],
        goodsList: [],
        layerId: null,
        tableLoading: false,
        goodsImg: null,
        datapickerWidth: '48%',
        selectedMemberType: false,
        setmealImage	: null ,
        packagesParam:{
          goodsIds: '',
          goodsNum:'',
          startTime: '',
          endTime: '',
          setmealId: '',
          setmealName: '',
          setmealOrig: '',
          setmealCurrent: '',
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
            {title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter: (rowData, rowIndex) => {
                return rowIndex + 1}
            },
            {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
            {field: 'goodsImage', title: '图片', width: 70, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter: (rowData) => {
                // todo: tupian
                return `<i class="iconfont icon-tupian"></i>`}
            },
            {field: 'goodsName', title: '商品名称', width: 155, titleAlign: 'center', columnAlign: 'left', isResize: true},
            {field: 'goodsNumber', title: '仓库库存（件）', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'goodsNumberB', title: '吧台库存（件）', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true},
          ]},
      }

    },

    methods: {
      importFile(event) {
        let fileReader = new FileReader(),
          files = event.target.files, file;

        if (!files.length) {
          return;
        }
        file = files[0];
        if (/^image\/\w+$/.test(file.type)) {
          fileReader.readAsDataURL(file);
          fileReader.onload = function () {
            vm.setmealImage = this.result;
          };
        }
        vm.file = files[0];
      },
      /*customSave(msg,item) {
        this.packagesParam.goodsIds =this.goodsList.map(item => {
          return `${item.goodsId}` })
        this.packagesParam.goodsNum =this.goodsList.map(item => {
          return `${item.goodsNum}`})
        let formData = new FormData();
        formData.append('file', vm.file)
        let query = _serialize();
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any() || vm.packagesParam.setmealCurrent.length === 0 || vm.packagesParam.goodsNum.length === 0 ||vm.packagesParam.setmealName.length === 0) {
            layer.msg('你还有错误消息未处理！')
          } else {
            POST(`/api/stock/setmeal/insert?${query}`, vm.packagesParam)
              .then(data => {
                layer.msg('添加成功');
                if (!vm.continueAdd) {
                  vm.$router.back()
                }
              })
          }
        })
      },*/
      submitPackage(msg) {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if(vm.packagesParam.setmealName.length > 0 )vm.hasGoosList=true;
          if (error.any() ||vm.packagesParam.setmealName.length === 0 ) {
           vm.hasGoosList=true;
            layer.msg('你还有错误消息未处理！')
          } else {
            if(vm.packagesParam.startTime) vm.packagesParam.startTime = moment(vm.packagesParam.startTime).format('YYYY-MM-DDTHH:mm:ss')
            if(vm.packagesParam.endTime) vm.packagesParam.endTime = moment(vm.packagesParam.endTime).format('YYYY-MM-DDTHH:mm:ss')
            vm.packagesParam.goodsIds =vm.goodsList.map(item => {
              return `${item.goodsId}` });
            vm.packagesParam.goodsNum =vm.goodsList.map(item => {
              return `${item.goodsNum}`});
            let formData = new FormData();
            formData.append('file', vm.file);
            let query = _serialize();
            let url, text;
            // Object.keys(vm.packagesParam).forEach(item => {
            //   if (Array.isArray(vm.packagesParam[item])) {
            //     vm.packagesParam[item].forEach(value => {
            //       formData.append(item, value);
            //       console.log('arrary,',item,value)
            //     })
            //   } else {
            //     formData.append(item, vm.packagesParam[item]);
            //     console.log('-----,',item)
            //   }
            // });
            if (vm.modify) {
              url = `/api/stock/setmeal/update?${query}`;
              // url = `/api/stock/setmeal/update`;
              text = '修改成功'
            } else {
              url = `/api/stock/setmeal/insert?${query}`;
              text = '添加成功';
            }
            POST(url, MultiFormed(formData))
              .then(data => {
                layer.msg(text);
                if (vm.modify) vm.$emit('save')
              })
         }
        })
        //     POST(`/api/stock/setmeal/update?${query}`, MultiFormed(formData))
        //       .then(data => {
        //         layer.msg('修改成功')
        //         publish('modify.success.packages')
        //       })
        //   }
        // })
      },
      cancel() {
        if (this.modify) {
          this.$emit('cancel')
        } else {
          this.$router.back()
        }
      },
      openGoodsLayer () {
        this.layerId = layer.open({
          type: 1,
          title: '选择商品',
          area: ['835px', '570px'],
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
        this.goodsList.splice(index, 1);
      },
      updateGoods() {
        let amount = 0;
        this.tableUpdate.goodsList.forEach((item) => {
          amount += +item.updateAmount;
        })
        return {amount};
      },
      enterSelectedGoods() {
        this.cancelLayer();
      },
      filterGoodsByCat(category) {
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
        this.goodsList = this.goodsList.concat(initGoodsCount(selection)); //selectGoodsInLayer
        if (this.goodsList.length > 1) {
          let hash = {};
          this.goodsList = this.goodsList.reduce((previousValue, currentValue, currentIndex) => {
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

    watch: {
      packages (newValue) {
        initPackagesParam(newValue);
      }
    },
    created() {
      vm = this;
      getAllGoods()
      getCategories();
      // subscribe('layer.opened.packages', this.initPackagesParam)
      // subscribe('layer.modify.save.packages', this.modifySave);
    },

  }

</script>
<style lang="scss">
  .col-xs-2,.col-xs-9,.col-xs-12{
    padding-left: 0;
    padding-right: 0;
  }
  .col-xs-2{
    text-align: center;
  }
  .page-main-content{
    .radio-list{
      display:flex;
      .radio-custom{
        padding-right: 20px;
      }
    }
  }
  .img-container{
    margin: 2em 0;
    border: 3px solid #D6D6D6;
    border-radius: 8px;
    padding: 20px;
    height: 245px;
    width:245px;
    img{
      max-width: 100%;
    }
  }
  .default-img{
    width: 100%;
    height: 100%;
    background-color: #ebebeb;
    display: flex;
    align-items: center;
    justify-content: center;
    i{
      font-size: 56px;
      color: #fff;
    }
  }
  .select-goods-group{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
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
  .error{
    color: #f00;
  }
</style>
<style scoped lang="scss">
  @import "../../sass/repertory";


</style>
