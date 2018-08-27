<template>
  <div class="clearfix">
    <div class="col-xs-6">
      <form class="form-horizontal">
        <div class="form-group"><label for="" class="control-label">商品名称</label>
          <div class="input-box"><input class="form-control" type="text" v-model="goodsParams.goodsName"></div>
        </div>
        <div class="form-group"><label for="" class="control-label">所属类别</label>
          <div class="input-box">
            <multiselect
              value="gcId"
              label="typeName"
              placeholder="请选择类别"
              track-by="gcId"
              v-model="selectedCategory"
              @input="updateCategory"
              :maxHeight="200"
              :showLabels="false"
              :close-on-select="true"
              :searchable="false"
              :allow-empty="false"
              :options="categories">
            </multiselect>
          </div>
        </div>
        <div class="form-group"><label for="" class="control-label">售价</label>
          <div class="input-group input-box">
            <input class="form-control" type="text" v-model="goodsParams.goodsPrice"><span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group"><label for="" class="control-label">商品条码</label>
          <div class="input-group input-box">
            <input class="form-control" type="text" v-model="goodsParams.goodsBarcode"><span class="input-group-addon saoma"><i class="iconfont icon-saoma"></i></span>
          </div>
        </div>
        <div class="form-group"><label for="" class="control-label">单位</label>
          <div class=" input-box">
            <input-multiselect
              mtValue="name"
              label="name"
              placeholder="请输入/选择单位"
              track-by="id"
              v-model="goodsParams.unit"
              :selected="selectedUnit"
              :options="units"
            >

            </input-multiselect>
            <!--<multiselect-->
              <!--value="id"-->
              <!--label="name"-->
              <!--placeholder="请选择单位"-->
              <!--track-by="id"-->
              <!--v-model="selectedUnit"-->
              <!--@input="updateUnit"-->
              <!--:maxHeight="200"-->
              <!--:showLabels="false"-->
              <!--:close-on-select="true"-->
              <!--:searchable="false"-->
              <!--:allow-empty="false"-->
              <!--:options="units">-->
            <!--</multiselect>-->

          </div>
        </div>
        <!--<div class="form-group"><label for="" class="control-label">商品编码</label>-->
        <!--<div class="input-box"><input class="form-control" type="text"></div>-->
        <!--</div>-->
        <div class="form-group"><label for="" class="control-label">商品属性</label>
          <div class="input-box input-property">
            <div class="input-group" v-for="(item, index) in goodsParams.goodsSpecList" :key="index">
              <input class="form-control" type="text" v-model="goodsParams.goodsSpecList[index]">
              <span class="input-group-btn">
                  <button class="btn btn-default" type="button" @click="minusProperty(index)" v-show="goodsParams.goodsSpecList.length > 1">-</button>
                  <button class="btn btn-default" type="button" @click="plusProperty">+</button>
                </span>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="!modify">
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="continueAdd"> 保存后继续添加商品
            </label>
          </div>
        </div>
      </form>
    </div>
    <div class="col-xs-6">
      <label>上传图片</label>
      <div class="img-box">
        <div class="btn-box">
          <label class="btn btn-primary btn-upload" for="selectImg">
            <i class="iconfont icon-tupian"></i>选择图片
            <input class="sr-only" @change='importFile($event)' accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" type="file" id="selectImg">
          </label>
          <span>支持jpe、jpeg、gif、png、bmp格式的图片</span>
        </div>
        <div class="img-container">
          <div class="default-img" v-if="!goodsImg"><i class="iconfont icon-tupian1"></i></div>
          <img :src="goodsImg" v-else>
        </div>
      </div>
    </div>
    <div class="bottom-btn-group"  v-if="!modify">
      <button class="btn btn-primary" @click="customSave">保存</button>
      <button class="btn btn-default" @click="$router.back()">取消</button>
    </div>
  </div>
</template>

<script>
  import multiselect from 'vue-multiselect'
  import {publish, subscribe} from 'pubsub-js'
  import layer from '../../../static/vendor/layer/layer'
  import {GET, POST, PATCH, MultiFormed} from '../../core/http'
  import InputMultiselect from '../template/InputMultiselect.vue'
  let vm;
  export default {
    name: 'template-custom-goods',
    components: {multiselect, InputMultiselect},
    props: {
      goods: Object,
      modify: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        continueAdd: true,
        selectedCategory: null,
        selectedUnit: null,
        categories: [],
        units: [],
        goodsImg: null,
        goodsParams: {
          goodsName: '',
          gcId: null,
          goodsPrice: '',
          goodsBarcode: '',
          unit: '',
          goodsSpecList: ['']
        },
        file: null
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
            vm.goodsImg = this.result;
          };
        }
        vm.file = files[0];
      },
      customSave(msg) {
        let formData = new FormData();
        formData.append('file', vm.file)
        let query = _serialize();
        POST(`/api/stock/inbar/insert?${query}`, MultiFormed(formData))
          .then(data => {
            layer.msg('添加成功');
            if (!vm.continueAdd) {
              vm.$router.back()
            }
          })
      },
      modifySave(msg) {
        let formData = new FormData();
        formData.append('file', vm.file)
        let query = _serialize();
        POST(`/api/stock/inbar/update?${query}`, MultiFormed(formData))
          .then(data => {
            layer.msg('修改成功')
            publish('modify.success.goods')
          })
      },
      updateCategory(option) {
        this.goodsParams.gcId = this.selectedCategory.gcId
        // console.log(this.selectedCategory)
      },
      updateUnit(option) {
        this.goodsParams.unit = option.name;
      },
      minusProperty(index) {
        this.goodsParams.goodsSpecList.splice(index, 1);
      },
      plusProperty() {
        this.goodsParams.goodsSpecList.push('')
      },
      initGoodsParams(msg, params) {
        const goods = params.rowData;
        Object.keys(this.goodsParams).forEach(key => {
          this.goodsParams[key] = goods[key];
        })
        if (params.type === 'modify') {
          this.goodsParams.goodsId = goods.goodsId;
        }
        if (goods.goodsSpec) {
          this.goodsParams.goodsSpecList = goods.goodsSpec.split(',');
        } else {
          this.goodsParams.goodsSpecList = [''];
        }
        if (goods.gcId) {
          this.categories.some(item => {
            if (item.gcId === goods.gcId) {
              vm.selectedCategory = item;
            }
          })
        }
      }
    },
    created() {
      vm = this;
      getCategories();
      getUnits();
      subscribe('layer.opened.goods', this.initGoodsParams)
      subscribe('layer.modify.save.goods', this.modifySave);
      // subscribe('modify.table.operate.goods', this.initGoodsParams)
    }
  }
  function getCategories () {
    GET('/api/stock/class/queryByGc')
      .then(data => {
        vm.categories = data;
      })
  }
  function getUnits () {
    GET('/api/stock/unit/queryAll')
      .then(data => {
        vm.units = data;
      })
  }
  function _serialize () {
    return Object.keys(vm.goodsParams).reduce((result, second, index) => {
      if (index === 1) {
        return `${result}=${vm.goodsParams[result]}&${second}=${vm.goodsParams[second]}`
      } else {
        if (Array.isArray(vm.goodsParams[second]) && vm.goodsParams[second].length > 1) {
          let formatSecond;
          formatSecond = vm.goodsParams[second].reduce((r, s) => {
            return `${second}=${r}&${second}=${s}`;
          })
          return `${result}&${formatSecond}`
        } else {
          return `${result}&${second}=${vm.goodsParams[second]}`
        }
      }
    })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";
  $input-width: 360px;
  $label-width: 5em;
  %cumtom-input-width {
    max-width: $input-width;
    width: calc(100% - #{$label-width} - 15px);
  }
  .control-label{
    width: $label-width;
    margin-right: 15px;
    float: left;
    color: $text;
  }
  .saoma{
    padding-left: 9px;
    padding-right: 9px;
    .icon-saoma{
      font-size: 20px;
    }
  }
  .checkbox{
    margin-left: $label-width;
    padding-left: 15px;
  }
  .input-box{
    float: left;
    @extend %cumtom-input-width;
  }
  .input-property > .input-group{
    margin-bottom: 15px;
  }
  .img-box{
    label{
      width: auto;
      color: #fff;
      i{
        padding-right: 5px;
      }
    }
    .btn-box{
      height: 100px;
    }
    .img-container{
      margin-left: 4em;
      border: 3px solid $border-color;
      border-radius: 8px;
      padding: 20px;
      height: 240px;
      width: 240px;
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
  }
</style>
