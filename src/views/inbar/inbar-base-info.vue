<template>
  <div class="">
    <div class="page-main">
     <div class="btn-return">
        <router-link :to="{name: 'set-base-info'}" replace><i class="iconfont icon-bianji2" ></i>编辑</router-link>
      </div>
      <h4 >基础信息</h4>
      <div class="row padding-10">
        <div class="col-md-4 col-xs-6  padding-right-10">
          <div class="form-group ">
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">网吧名称</label>
              <div class="col-xs-8 ">
                <input v-model="inbar.inbName" type="text" class="form-control"  readonly="true">
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
                    :maxHeight="200"
                    :showLabels="false"
                    :close-on-select="true"
                    :searchable="false"
                    :allow-empty="false"
                    :tabindex="10"
                    :disabled="true"
                    :options="provinces">
                  </multiselect>
                  <multiselect
                    value="code"
                    v-model="inbarAddress.city"
                    label="name"
                    placeholder="市"
                    track-by="code"
                    :maxHeight="200"
                    :showLabels="false"
                    :close-on-select="true"
                    :searchable="false"
                    :allow-empty="false"
                    :tabindex="1"
                    :disabled="true"
                    :options="cities">
                  </multiselect>
                  <multiselect
                    value="code"
                    v-model="inbarAddress.area"
                    label="name"
                    placeholder="区/县"
                    track-by="code"
                    :maxHeight="200"
                    :showLabels="false"
                    :close-on-select="true"
                    :searchable="false"
                    :allow-empty="false"
                    :tabindex="2"
                    :disabled="true"
                    :options="areas">
                  </multiselect>
                </div>
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">详细地址</label>
              <div class="col-xs-8">
                <input v-model="inbarAddress.detail" type="text" class="form-control" readonly="true">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-6 padding-right-10 ">
          <div class="form-group ">
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">网吧所属连锁</label>
              <div class="col-xs-8">
                <input v-model="inbar.csType" type="text" class="form-control" readonly="true">
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">业主姓名</label>
              <div class="col-xs-8 ">
                <input v-model="inbar.ownerName" type="text" class="form-control" readonly="true">
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label ">电脑数量</label>
              <div class=" input-group col-xs-8 padding-left-10">
                <input v-model="inbar.computerNum" type="text" class="form-control" readonly="true">
                <span class="input-group-addon">台</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-6 padding-right-20">
          <div class="form-group ">
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">网吧QQ群</label>
              <div class=" col-xs-8">
                <input v-model="inbar.qqGroup" type="text" class="form-control" readonly="true">
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">电话</label>
              <div class=" col-xs-8">
                <input v-model="inbar.ownerMobile" type="text" class="form-control" readonly="true">
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label ">面积</label>
              <div class="input-group col-xs-8 padding-left-10">
                <input v-model="inbar.inbSq" type="text" class="form-control" readonly="true">
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
                <input v-model="inbar.idNumber" type="text" class="form-control" readonly="true">
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
                <input v-model="inbar.cashoutAccount" type="text" class="form-control" readonly="true">
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">银行卡照片</label>
              <div class="col-xs-8">
                <img class="col-xs-6 control-label" v-model="inbar.bankCardNumber" src="@/assets/img/bank01.png"  alt="">
              </div>
            </div>
          </div>
        </div>
        <div class=" col-md-4 col-xs-6 padding-right-20">
          <div class="form-group ">
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">营业执照</label>
              <div class=" col-xs-8">
                <input v-model="inbar.businessNumber" type="text" class="form-control" readonly="true">
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">营业执照照片</label>
              <div class="col-xs-8">
                <img class="col-xs-6 control-label" v-model="inbar.businessNumberUrl"  src="@/assets/img/business01.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { publish, subscribe } from 'pubsub-js'
  import {GET} from '../../core/http'
  import multiselect from 'vue-multiselect'
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
    GET('/api/inbar-info/')
      .then((data) => {
        vm.inbar = data;
        _initAddress();
        formatAddressParam ();
      })
  }
  export default {
    name: "inbar-base-info",
    components: {multiselect},
    data() {
      return {
        inbarAddress: {
          province: null,
          city: null,
          area: null,
          detail: ''
        },
        inbar: {},
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
    created(){
      vm = this;
      getAllInfo();
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

