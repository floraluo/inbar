<template>
  <div class="clearfix">
    <div class="col-xs-6">
      <form class="form-horizontal">
        <div class="form-group"><label for="" class="control-label">商品名称</label>
          <div class="input-box">
            <input class="form-control"
                   type="text"
                   v-model="goodsParams.goodsName"
                   v-validate="'required'"
                   data-vv-as="商品名称"
                   name="goodsName"
                   placeholder="请输入商品名称">
            <div class="error" v-show="errors.has('goodsName')">{{ errors.first('goodsName') }}</div>
          </div>
        </div>
        <div class="form-group"><label for="" class="control-label">所属类别</label>
          <div class="input-box">
            <multiselect
              value="gcId"
              label="gcName"
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
            <input type="hidden"
                   v-model="selectedCategory"
                   v-validate="'required'"
                   data-vv-as="类别"
                   name="category">
            <div class="error" v-show="errors.has('category')">{{ errors.first('category') }}</div>
          </div>
        </div>
        <div class="form-group"><label for="" class="control-label">售价</label>
          <div class="input-box">
            <div class="input-group">
              <input class="form-control" type="text" placeholder="请输入售价"
                     v-model="goodsParams.goodsPrice"
                     v-validate="'required|decimal:2'"
                     data-vv-as="售价"
                     name="goodsPrice"><span class="input-group-addon">元</span>
            </div>
            <div class="error" v-show="errors.has('goodsPrice')">{{ errors.first('goodsPrice') }}</div>
          </div>
        </div>
        <div class="form-group"><label for="" class="control-label">商品条码</label>
          <div class="input-box">
            <div class="input-group ">
              <input class="form-control" type="text" placeholder="请手动输入或使用扫码枪录入商品条码"
                     v-model="goodsParams.goodsBarcode"
                     v-validate="'required'"
                     data-vv-as="条码"
                     name="goodsBarcode"><span class="input-group-addon saoma"><i class="iconfont icon-saoma"></i></span>
            </div>
            <div class="error" v-show="errors.has('goodsBarcode')">{{ errors.first('goodsBarcode') }}</div>
          </div>
        </div>
        <div class="form-group"><label for="" class="control-label">单位</label>
          <div class=" input-box">
            <input-multiselect
              mtValue="name"
              label="name"
              placeholder="请输入或点击右侧按钮选择单位"
              track-by="id"
              v-model="goodsParams.unit"
              :selected="selectedUnit"
              :options="units"
            ></input-multiselect>
            <input type="hidden"
                   v-model="goodsParams.unit"
                   v-validate="'required'"
                   data-vv-as="单位"
                   name="unit">
            <div class="error" v-show="errors.has('unit')">{{ errors.first('unit') }}</div>
          </div>
        </div>
        <!--<div class="form-group"><label for="" class="control-label">商品编码</label>-->
        <!--<div class="input-box"><input class="form-control" type="text"></div>-->
        <!--</div>-->
        <div class="form-group"><label for="" class="control-label">商品属性</label>
          <div class="input-box input-property">
            <div class="input-group" v-for="(item, index) in goodsParams.goodsSpecList" :key="index">
              <input class="form-control" type="text" v-model="goodsParams.goodsSpecList[index]" placeholder="点击右边【+】按钮，添加更多属性">
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
        <div class="bottom-btn-group text-center">
          <button class="btn btn-primary" @click="submitGoods" type="button">保存</button>
          <button class="btn btn-default" @click="cancel" type="button">取消</button>
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
      submitGoods(msg) {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any() || vm.time === null || vm.time === '') {
            layer.msg('你还有错误消息未处理！')
            if (vm.time === null) vm.time = '';
          } else {
            let formData = new FormData();
            formData.append('file', vm.file)
            // let query = _serialize();
            let url, text;
            Object.keys(vm.goodsParams).forEach(item => {
              formData.append(item, vm.goodsParams[item]);
            })
            if (this.modify) {
              url = `/api/stock/inbar/update`
              text = '修改成功'
            } else {
              url = `/api/stock/inbar/insert`
              text = '添加成功';
            }
            POST(url, MultiFormed(formData))
              .then(data => {
                layer.msg(text)
                if (this.modify) this.$emit('save')
              })
          }
        })
      },
      cancel() {
        if (this.modify) {
          this.$emit('cancel')
        } else {
          this.$router.back()
        }
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
      }
    },
    watch: {
      goods (newValue) {
        initGoodsParams(newValue);
      }
    },
    created() {
      vm = this;
      getCategories();
      getUnits();
      // subscribe('layer.opened.goods', this.initGoodsParams)
      // subscribe('layer.modify.save.goods', this.submitGoods);
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
  function initGoodsParams (params) {
    // (params) {
      // const goods = params.rowData;
      const goods = vm.goods;
      Object.keys(vm.goodsParams).forEach(key => {
        vm.goodsParams[key] = goods[key];
      })
      vm.goodsParams.goodsId = goods.goodsId;
      if (goods.goodsSpec) {
        vm.goodsParams.goodsSpecList = goods.goodsSpec.split(',');
      } else {
        vm.goodsParams.goodsSpecList = [''];
      }
      if (goods.gcId) {
        vm.categories.some(item => {
          if (item.gcId === goods.gcId) {
            vm.selectedCategory = item;
          }
        })
      }
    // }
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
  .error{
    color: $c-error;
    clear: left;
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
