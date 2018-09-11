<template>
  <div class="page-content " >
    <div class="panel" id="modifyPwd">
      <div class="panel-center">
        <div class="top-box" :class="{none:validType==4}">
          <p>重置密码</p>
          <div class="pearls pearls-xs  ">
            <div class="pearl done col-xs-6 ">
              <span class="pearl-number"></span> <span class="pearl-title">验证身份</span>
            </div>
            <div class="pearl  col-xs-6" :class="{done:validType==2}">
              <span class="pearl-number"></span> <span class="pearl-title">更改密码</span>
            </div>
          </div>
        </div>
        <div class="change-pane" >

          <form data-vv-scope="modifyPswForm">
            <div class=" form-group " v-show="validType === 1">
              <small class="phone-number">将发送验证码到手机{{ phone }}</small>
              <div class="form-group"><label class="control-label col-xs-3" >验证码 </label>
                <div class="col-xs-9 margin-bottom-50">
                  <input v-model="codes"
                         v-validate="'required'"
                         data-vv-as="验证码"
                         name="codes"
                         type="text"
                         class="form-control "
                         placeholder="请输入验证码">
                  <span v-show="sendAuthCode"  class=" btn btn-primary btn-get" @click="getAuthCode">获取验证码</span>
                  <span v-show="!sendAuthCode" class=" btn btn-primary btn-get " > <span class="auth_text_blue">{{auth_time}} </span> 秒后重新获取</span>
                  <span class="password "><a  herf="javascript:;" @click="validType = 3">改为密码验证</a></span>
                  <span class="error"  v-show="errors.has('modifyPswForm.codes')" >（*{{ errors.first('modifyPswForm.codes') }}）</span>
                </div>
                <button class="btn btn-primary btn-block margin-top-60" type="button" @click="checkCodes">下一步</button>
              </div>
            </div>
            <div class="form-group  " v-show="validType === 3">
              <label class="control-label col-xs-3" >输入密码 </label>
              <div class="col-xs-9 margin-bottom-50">
                <input v-model="formMess.psw"
                       v-validate="{required: true, password: [6, 18], verify: [errorMsg]}"
                       data-vv-as="密码"
                       type="password"
                       class="form-control "
                       name="password"
                       @input="errorMsg=null"
                       placeholder="请输入登陆密码">
                <span class="password padding-left-80"><a  herf="javascript:;" @click="validType = 1">改为手机证码</a></span>
                <span class="error"  v-show="errors.has('modifyPswForm.password')" >（*{{ errors.first('modifyPswForm.password') }}）</span>
              </div>
              <button class="btn btn-primary btn-block" type="button"  @click="checkPsw" >下一步</button>
            </div>


            <div class="form-group " v-show="validType === 2">
              <label class="control-label col-xs-3" >输入新密码 </label>
              <div class="col-xs-9 margin-bottom-20">
                <input v-model="accountParam.firstPsw"
                       v-validate="'required|password:6,18'"
                       data-vv-as="新密码"
                       type="text"
                       class="form-control"
                       name="firstPsw"
                       placeholder="请输入密码" >
                <span class="error"  v-show="!errorMsg &&errors.has('modifyPswForm.firstPsw')" >（*{{ errors.first('modifyPswForm.firstPsw') }}）</span>
              </div>
              <label class="control-label col-xs-3" >确认新密码 </label>
              <div class="col-xs-9 margin-bottom-50">

                <input v-model="accountParam.secondPsw"
                       v-validate="{required: true, password: [6, 18], repassword: [accountParam.firstPsw]}"
                       data-vv-as="新密码"
                       type="text"
                       class="form-control"
                       name="secondPsw"
                       placeholder="请输入密码">
                <span class="error"  v-show="!errorMsg &&errors.has('modifyPswForm.secondPsw')" >（*{{ errors.first('modifyPswForm.secondPsw') }}）</span>
              </div>
              <button class="btn btn-primary btn-block margin-top-70" type="button" @click="submitPsw" >确认修改</button>
            </div>

          </form>

        </div>
        <!--修改成功-->
        <div class="success "  v-show="validType === 4">
          <span><i class="iconfont icon-wancheng" ></i></span>
          <h1 class="margin-0">修改成功</h1>
          <p class="padding-bottom-60 padding-top-25" >您的登陆密码已成功修改！</p>
          <a class="btn btn-primary margin-right-20" href="#/login">重新登陆 </a>
          <a class="btn btn-outline btn-default "  href="#/member/base-info" >下次登陆</a>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
  import $ from 'jquery'
  import '../../../node_modules/cropper/dist/cropper.min.css'
  import 'cropper'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import {Formed, publish, subscribe } from 'pubsub-js'
  import {GET,DELETE,PATCH,POST} from '../../core/http'
  let vm;

  export default {
    name: 'modify-pwd',
    data() {
      return {
        validType: 1,
        formMess:{
          psw: '',
        },
        account:{},
        avatar: null,
        errorMsg: null,
        sendAuthCode:true,
        auth_time: 0,
        codes:'',
        accountParam:{
          mobile: '',
          code: '',
          firstPsw: '',
          secondPsw: '',
        }
      }
    },

    computed:{
      phone(){
        if (Number(vm.account.mobile) && String(vm.account.mobile).length === 11) {
          var mobile = String(vm.account.mobile)
          var reg = /^(\d{3})\d{4}(\d{4})$/
          return mobile.replace(reg, '$1****$2')
        } else {
          return vm.account.mobile
        }//  return  this.account.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      },
    },
    methods: {
      checkPsw() {
        POST('api/me/password/check',this.formMess)
          .then((date) => {
            this.validType = 2;
            vm.accountParam.code=date;
          },(error) => {
            if (error.status === 412) {
              vm.errorMsg = '密码错误！';
              vm.$validator.validate('modifyPhoneForm.password');
              vm.$validator.validate('modifyNameForm.password');
            }
          })
      },
      getAuthCode () {
        GET('api/me/msg')
        this.sendAuthCode = false;
        //设置倒计时秒
        this.auth_time = 20;
        var auth_timetimer = setInterval(()=>{
          this.auth_time--;
          if(this.auth_time<=0){
            this.sendAuthCode = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
      },
      checkCodes(){
        var query=this.codes;
        POST(`api/me/msg/check/?code=${query}`)
          .then((date) => {
            this.validType = 2
            vm.accountParam.code=date;
          },(error) => {
            if  (error.status === 412) {
              vm.errorMsg = '验证码错误！';
              vm.$validator.validate('modifyNameForm.codes');
            }

          })
      },
      submitPsw(){
        POST('api/me/password/reset',{
          code: this.accountParam.code,
          firstPsw: this.accountParam.firstPsw,
          secondPsw: this.accountParam.secondPsw
        })
          .then(data => {
            this.validType = 4
          })
      }
    },
    created() {
      vm = this;
      getALLAccount();
    },
  }
  function  getALLAccount(){
    GET('api/me/')
      .then((data) => {
        vm.account = data;
      })
  }
  function clearAccountParams() {
    vm.accountParam={
      mobile: '',
      name: '',
      sex: '',
    }
  }

</script>
<style lang="scss">
  .error{
    font-size: 12px;
    color: #f00;
    float: left ;
  }
</style>
<style scoped lang="scss">
  @import "../../sass/account/modify-pwd";

</style>
