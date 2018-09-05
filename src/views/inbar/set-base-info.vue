<template>
  <div class="">
    <div class="page-main" >
      <div class="btn-return">
        <router-link :to="{name: 'inbar-base-info'}" replace> 返回 <i class="iconfont icon-fanhui" > </i></router-link>
      </div>
      <base-loading :loading="loading"></base-loading>
      <h4 >基础信息</h4>
      <div class="row padding-10">
        <div class="col-md-4 col-xs-6   padding-right-10">
          <div class="form-group ">
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">网吧名称</label>
              <div class="col-xs-8 ">
                <input v-model="inbarParams.inbName" type="text" class="form-control" >
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">所属城市</label>
              <div class="col-xs-8 ">
                <div class="linkage  inbar-linkage" @focus.capture="clickLinkage($event)"  >
                  <multiselect
                    value="code"
                    v-model="inbarAddress.province"
                    label="name"
                    placeholder="省"
                    track-by="code"
                    @input="updateProvince"
                    :maxHeight="200"
                    :showLabels="false"
                    :close-on-select="true"
                    :searchable="false"
                    :allow-empty="false"
                    :tabindex="10"
                    :options="provinces">
                  </multiselect>
                  <multiselect
                    value="code"
                    v-model="inbarAddress.city"
                    label="name"
                    placeholder="市"
                    track-by="code"
                    @input="updateCity"
                    :maxHeight="200"
                    :showLabels="false"
                    :close-on-select="true"
                    :searchable="false"
                    :allow-empty="false"
                    :tabindex="1"
                    :options="cities">
                  </multiselect>
                  <multiselect
                    value="code"
                    v-model="inbarAddress.area"
                    label="name"
                    placeholder="区/县"
                    track-by="code"
                    @input="updateArea"
                    :maxHeight="200"
                    :showLabels="false"
                    :close-on-select="true"
                    :searchable="false"
                    :allow-empty="false"
                    :tabindex="2"
                    :options="areas">
                  </multiselect>
                </div>
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">详细地址</label>
              <div class="col-xs-8">
                <input v-model="inbarAddress.detail" type="text" class="form-control" >
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-6  padding-right-10 ">
          <div class="form-group ">
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">网吧所属连锁</label>
              <div class="col-xs-8">
                <input v-model="inbar.csType" type="text" class="form-control" disabled>
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">业主姓名</label>
              <div class="col-xs-8">
                <input v-model="inbarParams.ownerName" type="text" class="form-control" >
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label ">电脑数量</label>
              <div class=" input-group col-xs-8 padding-left-10">
                <input v-model="inbarParams.computerNum" type="text" class="form-control" >
                <span class="input-group-addon">台</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-6  padding-right-20">
          <div class="form-group ">
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">网吧QQ群</label>
              <div class=" col-xs-8">
                <input v-model="inbarParams.qqGroup" type="text" class="form-control" >
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">电话</label>
              <div class=" col-xs-8">
                <input v-model="inbarParams.ownerMobile" type="text" class="form-control" >
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">面积</label>
              <div class="input-group col-xs-8 padding-left-10">
                <input v-model="inbarParams.inbSq" type="text" class="form-control" >
                <span class="input-group-addon ">m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4 >营业信息</h4>
      <div class="row padding-10">
        <div class="col-md-4 col-xs-6 padding-right-10">
          <div class="form-group ">
            <div class="col-xs-12">
              <label type="text" class="col-xs-4 control-label">身份证号</label>
              <div class=" col-xs-8">
                <input v-model="inbarParams.idNumber" type="text" class="form-control" >
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">身份证照片</label>
              <div class="col-xs-8">
                <img class="col-xs-6 control-label" v-model="inbar.idCardBack"  src="@/assets/img/card01.png" alt="">
                <img  class="col-xs-6 control-label"v-model="inbar.idCardFront"  src="@/assets/img/card02.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-6  padding-right-10">
          <div class="form-group ">
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">提现银行卡号</label>
              <div class=" col-xs-8">
                <input v-model="inbarParams.cashoutAccount" type="text" class="form-control"  >
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">银行卡照片</label>
              <div class="col-xs-8">
                <img class="col-xs-6 control-label" v-model="inbarParams.bankCardNumber" src="@/assets/img/bank01.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-6 padding-right-20">
          <div class="form-group ">
            <label class="col-xs-4 control-label">营业执照</label>
            <div class=" col-xs-8">
              <input v-model="inbarParams.businessNumber" type="text" class="form-control"  >
            </div>
            <label class="col-xs-4 control-label">营业执照照片</label>
            <div class="col-xs-8">
              <img class="col-xs-6 control-label" v-model="inbarParams.businessNumberUrl" src="@/assets/img/business01.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="btn-bottom col-xs-4" >
        <div class="col-xs-4" ></div>
        <button class="btn btn-primary margin-right-25" @click="save">保存</button>
        <button class="btn btn-default" >取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import multiselect from 'vue-multiselect'
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PATCH,} from '../../core/http'
  import provinces from '../../assets/city/provinces_cn.json'
  import cities from '../../assets/city/cities_cn.json'
  import areas from '../../assets/city/areas_cn.json'

  let vm
  function _getNextAddress () {
    let nextCities = [], nextAreas = [];
    if (vm.inbarAddress.province) {
      cities.forEach(c => {
        if (c.parent_code === vm.inbarAddress.province.code) {
          nextCities.push(c)
        }
      })
    }
    if (vm.inbarAddress.city) {
      areas.forEach(a => {
        if (a.parent_code === vm.inbarAddress.city.code) {
          nextAreas.push(a)
        }
      })
    }
    return { nextCities, nextAreas }
  }
  function _initInbarParams () {
    vm.inbarParams.inbName = vm.inbar.inbName;
    vm.inbarParams.inbId = vm.inbar.inbId;
    vm.inbarParams.inbSq = vm.inbar.inbSq;
    vm.inbarParams.nbAddress = vm.inbar.nbAddress;
    vm.inbarParams.ownerMobile = vm.inbar.ownerMobile;
    vm.inbarParams.ownerName = vm.inbar.ownerName;
    vm.inbarParams.qqGroup = vm.inbar.qqGroup;
    vm.inbarParams.idNumber = vm.inbar.idNumber;
    vm.inbarParams.idCardBack = vm.inbar.idCardBack;
    vm.inbarParams.idCardFront = vm.inbar.idCardFront;
    vm.inbarParams.computerNum = vm.inbar.computerNum;
    vm.inbarParams.cashoutAccount = vm.inbar.cashoutAccount;
    vm.inbarParams.bankCardNumber = vm.inbar.bankCardNumber;
    vm.inbarParams.businessNumber = vm.inbar.businessNumber;
    vm.inbarParams.businessNumberUrl = vm.inbar.businessNumberUrl;
    vm.inbarParams.provinceId = vm.inbar.provinceId;
    vm.inbarParams.cityId = vm.inbar.cityId;
    vm.inbarParams.areaId = vm.inbar.areaId;
  }
  function _initAddress () {
    if (vm.inbar.provinceId) {
      provinces.some(item => {
        if (item.code == vm.inbar.provinceId) {
          vm.inbarAddress.province = item;
          return true;
        }
      })
      vm.cities = _getNextAddress().nextCities;
    }
    if (vm.inbar.cityId) {
      cities.some(item => {
        if (item.code == vm.inbar.cityId) {
          vm.inbarAddress.city = item;
          return true;
        }
      })
      vm.areas = _getNextAddress().nextAreas;
    }
    if (vm.inbar.areaId) {
      areas.some(item => {
        if (item.code == vm.inbar.areaId) {
          vm.inbarAddress.area = item;
          return true;
        }
      })
    }
    if (vm.inbar.nbAddress && vm.inbar.nbAddress.search('#-#') > 0) {
      vm.inbarAddress.detail = vm.inbar.nbAddress.split('#-#')[1];
    } else if (vm.inbar.nbAddress && vm.inbar.nbAddress.search('#/#') === -1) {
      vm.inbarAddress.detail = vm.inbar.nbAddress;
    }
  }
  function formatAddressParam () {
    if (vm.inbarAddress.detail) {
      if (!vm.inbarAddress.province) {
        layer.msg('请选择省')
        return true;
      } else {
        vm.inbarParams.provinceId = vm.inbarAddress.province.code;
        vm.inbarParams.nbAddress = vm.inbarAddress.province.name;
      }

      if (!vm.inbarAddress.city) {
        layer.msg('请选择市')
        return true;
      } else {
        vm.inbarParams.cityId = vm.inbarAddress.city.code;
        vm.inbarParams.nbAddress = `${vm.inbarParams.nbAddress}#/#${vm.inbarAddress.city.name}`;
      }

      if (!vm.inbarAddress.area) {
        layer.msg('请选择区/县');
        return true;
      } else {
        vm.inbarParams.areaId = vm.inbarAddress.area.code;
        vm.inbarParams.nbAddress = `${vm.inbarParams.nbAddress}#/#${vm.inbarAddress.area.name}`;
      }

      vm.inbarParams.nbAddress = `${vm.inbarParams.nbAddress}#-#${vm.inbarAddress.detail}`;
    }
  }
  function getAllInfo () {
    vm.loading = true;
    GET('/api/inbar-info/')
      .then((data) => {
        vm.inbar = data;
        vm.loading = false;
        _initAddress();
        _initInbarParams();
      })
  }

  export default {
    name: "set-base-info",
    components: {multiselect},
    data() {
      return {
        validType: 0,
        edit1: true,
        edit2: true,
        loading: true,
        inbar:{},
        inbarAddress: {
          province: null,
          city: null,
          area: null,
          detail: ''
        },
        inbarParams: {
          businessNumber: '',
          cashoutAccount: '',
          computerNum:0,
          csType: '',
          idCardBack: '',
          idCardFront: '',
          inbId:41,
          inbName: '',
          inbSq: '',
          nbAddress: '',
          ownerMobile: '',
          ownerName: '',
          qqGroup: '',
          areaId: '',
          provinceId: '',
          cityId: '',
          idNumber: '',
        },
        provinces: provinces,
        cities: cities,
        areas: areas
      }
    },
    methods:{

      save() {
        if (!formatAddressParam()) {
          PATCH('/api/inbar-info/', vm.inbarParams)
            .then(() => {
              getAllInfo ()
              layer.msg('设置成功');
              this.$router.replace({name: 'inbar-base-info'})
            })
        }
      },
      clickLinkage(event) {
        const tabIndex = $(event.target).closest('.multiselect').attr('tabindex')
        if (+tabIndex === 1 && !vm.inbarAddress.province) {
          event.stopPropagation();
          layer.msg("请先选择省")
        } else if (+tabIndex === 2 && !vm.inbarAddress.city) {
          event.stopPropagation();
          layer.msg("请先选择市")
        }
      },
      updateProvince(option) {
        this.inbarAddress.city = null;
        this.inbarAddress.area = null;
        this.cities = _getNextAddress().nextCities;
        this.areas = []
      },
      updateCity(option) {
        this.inbarAddress.area = null;
        this.areas = _getNextAddress().nextAreas
      },
      updateArea(option) {
        // if (option.code !== this.inbarAddress.area.code) {
        //   this.inbarAddress.area = option;
        // }
      },
    },
    created(){
      vm=this
      _initInbarParams ()
      getAllInfo ();
    }
  }
</script>
<style lang="scss">
  .control-label{
    padding-left: 0;
    text-align: right;
  }
  input::-webkit-input-placeholder{
    color:#76838f;
  }
  .input-group{
    padding: 0 12px;
  }
  .col-xs-12{
    padding: 0;
  }
  .col-xs-8{
    padding-right: 0;
    margin-bottom: 15px;
  }
  .btn-bottom {
    padding-top: 96px;
  }

  .btn-return{
    top: -40px;
    right: 20px;
    text-decoration: none;
    color: #0191FA;
    a{
      text-decoration: none;
    }
  }
  .linkage{
    display: flex;
    justify-content: space-between;
    .multiselect{
      width: calc((100% - 5px) / 3);
      .multiselect__content-wrapper{
        width: 300px;
      }
    }
  }



</style>
<style scoped lang="scss">
  @import "../../sass/inbar-setting";

</style>

