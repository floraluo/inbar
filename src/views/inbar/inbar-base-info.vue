<template>
  <div class="">
    <div class="page-main">
      <div class="btn-return">
        <router-link :to="{name: 'set-base-info'}" replace><i class="iconfont icon-bianji2" ></i>编辑</router-link>
      </div>
      <!--
      <a class="btn-pure btn-default btn-return">返回  <i class="iconfont icon-fanhui" ></i></a>
        -->
      <h4 >基础信息</h4>
      <div class="row padding-10">
        <div class="col-md-4 col-xs-6  padding-right-30">
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
                <multiselect v-model="inbar.province" type="text"  readonly="true"></multiselect>
                <multiselect v-model="inbar.city" type="text"  readonly="true"></multiselect>
                <multiselect v-model="inbar.area" type="text"  readonly="true"></multiselect>
              </div>
            </div>
            <div class="col-xs-12">
              <label class="col-xs-4 control-label">详细地址</label>
              <div class="col-xs-8">
                <input v-model="inbar.nbAddress" type="text" class="form-control" readonly="true">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-6 padding-right-30 ">
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
              <label class="col-xs-4 control-label">电脑数量</label>
              <div class=" input-group col-xs-8">
                <input v-model="inbar.computerNum" type="text" class="form-control" readonly="true">
                <span class="input-group-addon">台</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-xs-6 padding-right-50">
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
              <label class="col-xs-4 control-label">面积</label>
              <div class="input-group col-xs-8">
                <input v-model="inbar.inbSq" type="text" class="form-control" readonly="true">
                <span class="input-group-addon ">m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4 >营业信息</h4>
      <div class="row padding-10">
        <div class="col-md-4 col-xs-6 padding-right-30">
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
        <div class="col-md-4 col-xs-6  padding-right-30">
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
        <div class=" col-md-4 col-xs-6 padding-right-50">
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
  let vm
  function getAllInfo () {
    GET('/api/inbar-info/')
      .then((data) => {
        vm.inbar = data;
      })
  }
  export default {
    name: "inbar-base-info",
    components: {multiselect},
    data() {
      return {
        inbar: {
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
          area: '',
          province: '',
          city: '',
          idNumber: '',
          businessNumber: '',

        },
      }
    },
    created(){
      vm = this;
      getAllInfo();
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";
  .control-label{
    padding-left: 0;
    text-align: right;
  }
  .input-group{
    padding: 0 12px;
  }
  .col-xs-8{
    margin-bottom: 15px;
  }
  .btn-bottom {
    padding-top: 96px;
  }
  .btn-return{
    position: absolute;
    right: 20px;
    text-decoration: none;
    color: $theme-color;
    a{
      text-decoration: none;
    }
  }
</style>

