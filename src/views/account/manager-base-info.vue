<template>
  <div class="page-content ">
    <div class="panel">
    <div class="panel-center">
      <div class="col-xs-12 panel-portrait">
          <div class="col-xs-6 text-right padding-right-40" >
            <img v-if="!avatar" src="@/assets/img/portrait.png" alt=""></img>
            <img :src="avatar" alt="">
          </div>
          <div class="col-xs-6 text-left">
            <button class="btn  btn-outline btn-primary btn-round margin-bottom-20" @click="modifyPortrait">更改头像</button>
            <p>{{ Get_Greetings }}好！{{account.name}}  {{ call }}</p>
            <p class="time">上次登陆：{{ login }}</p>
          </div>

      </div>
      <div class="col-xs-12 text-left">
          <div class="form-horizontal">
            <div class=" col-xs-5">
              <label >登陆账号：</label>
              <span>{{ names }}</span>
            </div>
            <div class="col-xs-7 info-right">
              <label >姓名：</label>
              <span>{{account.name}} <a href="javascript:;" @click="modifyName">修改</a> </span>
            </div>
            <div class=" col-xs-5 ">
              <label >密码：</label>
              <span> ****** <a href="#/account/modify-pwd">修改</a></span>
            </div>

            <div class="col-xs-7 info-right">
              <label >性别：</label>
              <span>{{ sexs }}<a href="javascript:;" @click="modifySex">修改</a> </span>
            </div>
            <div class="col-xs-5 ">
              <label >开通时间：</label>
              <span>{{ created }}  </span>
            </div>
            <div class="col-xs-7 info-right">
              <label >手机号：</label>
              <span>{{ phone }} <a href="javascript:;" @click="modifyPhone">修改</a> </span>
            </div>
          </div>
      </div>
    </div>
    </div>
    <!--修改头像-->
    <div id="modifyPortrait" class="layer-portrait clearfix">
      <div class="btn-top">
        <label class="btn btn-primary btn-upload" for="selectImg">
          <i class="iconfont icon-tupian"></i>选择图片
          <input class="sr-only" @change='inputPortrait($event)' accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" type="file" id="selectImg">
        </label>
        <span>支持jpe、jpeg、gif、png、bmp格式的图片</span>
      </div>
      <div class="img-container">
        <img class="cropper-hidden" id="cropImg" src="@/assets/img/girl.png" alt="">
      </div>
      <div class="cropper-preview clearfix" id="cropperPreview">
        <p>预览</p>
        <div class="img-preview preview-lg"></div>
      </div>
      <div class="btn-bottom">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitPortrait">确认</button>
      </div>
    </div>

    <!--修改姓名-->
    <div id="modifyName" class="layer-name clearfix layer-open">
      <span>修改姓名</span>
      <div class="pearls  pearls-xs padding-top-5">
        <div class="pearl done  col-xs-6">
          <span class="pearl-number"></span> <span class="pearl-title">验证身份</span>
        </div>
        <div class="pearl  col-xs-6" :class="{done:validType==2}">
          <span class="pearl-number"></span> <span class="pearl-title">更改姓名</span>
        </div>
      </div>
      <div class="change-pane " >
        <form data-vv-scope="modifyNameForm" >
          <div class=" form-group padding-top-50" v-show="validType === 1">
            <small class="phone-number">将发送验证码到手机{{ phone }}</small>
            <div class="form-group"><label class="control-label col-xs-3" >验证码    </label>
              <div class="col-xs-9 margin-bottom-30">
                <input v-model="codes"
                       v-validate="'required'"
                       data-vv-as="验证码"
                       name="codes"
                       type="text"
                       class="form-control "
                       placeholder="请输入验证码">
                <span v-show="sendAuthCode"  class=" btn btn-primary btn-get" @click="getAuthCode">获取验证码</span>
                <span v-show="!sendAuthCode" class=" btn btn-primary btn-get " > <span class="auth_text_blue">{{auth_time}} </span> 秒后重新获取</span>
                <span class="password "><a  herf="javascript:;" @click="validType = 3">改为密码验证</a>
              </span><span class="error"  v-show="errors.has('modifyNameForm.codes')" >（*{{ errors.first('modifyNameForm.codes') }}）</span>

              </div>
              <button class="btn btn-primary btn-block margin-top-50" type="button" @click="checkCodes">下一步</button>
            </div>
          </div>

          <div class="form-group  padding-top-80" v-show="validType === 3">
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
              <span class="error"  v-show="errors.has('modifyNameForm.password')" >（*{{ errors.first('modifyNameForm.password') }}）</span>
            </div>
            <button class="btn btn-primary btn-block margin-top-50" type="button"  @click="checkPsw" >下一步</button>
          </div>

          <div class="form-group padding-top-80" v-show="validType === 2">
            <label class="control-label col-xs-3" >更改姓名 </label>
            <div class="col-xs-9 margin-bottom-50">
              <input v-model="accountParam.name"
                     v-validate="'required|max:30'"
                     data-vv-as="姓名"
                     type="text"
                     class="form-control"
                     name="name"
                     placeholder="请输入姓名" >
              <span class="error"  v-show="!errorMsg &&errors.has('modifyNameForm.name')" >（*{{ errors.first('modifyNameForm.name') }}）</span>
            </div>
            <button class="btn btn-primary btn-block margin-top-50" type="button" @click="submitName" >确认修改</button>
          </div>
        </form>
      </div>
    </div>

    <!--修改手机-->
    <div id="modifyPhone" class="layer-name clearfix">
      <span>修改手机</span>
      <div class="pearls  pearls-xs padding-top-5">
        <div class="pearl done  col-xs-6">
          <span class="pearl-number"></span> <span class="pearl-title">验证身份</span>
        </div>
        <div class="pearl  col-xs-6" :class="{done:validType==2}">
          <span class="pearl-number"></span> <span class="pearl-title">更改手机</span>
        </div>
      </div>
      <div class="change-pane " >
        <form data-vv-scope="modifyPhoneForm" >
          <div class="form-group  padding-top-80" v-show="validType === 1">
            <label class="control-label col-xs-3" >密码验证 </label>
            <div class="col-xs-9 margin-bottom-30">
              <input v-model="formMess.psw"
                     v-validate="{required: true, password: [6, 18], verify: [errorMsg]}"
                     data-vv-as="密码"
                     type="password"
                     class="input-group"
                     name="password"
                     @input="errorMsg=null"
                     placeholder="请输入登陆密码">
              <span class="error"  v-show="errors.has('modifyPhoneForm.password')" >（*{{ errors.first('modifyPhoneForm.password') }}）</span>
              <!--<span class="error" v-show="errorMsg">{{errorMsg}}</span>-->
            </div>
            <button class="btn btn-primary btn-block " type="button" @click="checkPsw" >下一步</button>
          </div>
          <div class="form-group padding-top-80" v-show="validType === 2">
            <label class="control-label col-xs-3" >更改手机 </label>
            <div class="col-xs-9 margin-bottom-30">
              <input v-model="accountParam.mobile"
                     v-validate="{required:true,mobile:11}"
                     data-vv-as="手机号"
                     type="text"
                     class="input-group"
                     name="mobile"
                     placeholder="请输入新的手机号">
              <span class="error"  v-show="!errorMsg &&errors.has('modifyPhoneForm.mobile')" >（*{{ errors.first('modifyPhoneForm.mobile') }}）</span>
            </div>
            <button class="btn btn-primary btn-block margin-top-50" type="button" @click="submitPhone" >确认修改</button>
          </div>
        </form>
      </div>
    </div>

    <!--修改性别-->
    <div id="modifySex" class="layer-open layer-sex clearfix">
      <form class=" padding-top-40  text-center">
        <div class="form-group  padding-left-60 padding-bottom-50"><label class="col-xs-3" >请选择：</label>
          <ul class="radio-list col-xs-6">
            <li class="radio-custom radio-primary radio-inline">
              <input v-model="accountParam.sex" value="0" type="radio" name="enabled" id="enabled1"><label for="enabled1">女</label>
            </li>
            <li class="radio-custom radio-primary radio-inline">
              <input v-model="accountParam.sex" value="1" type="radio" name="enabled" id="enabled2"><label for="enabled2">男</label>
            </li>
          </ul>
        </div>
        <div class="btn-bottom ">
          <button class="btn btn-default margin-right-20" @click="cancelLayer">取消</button>
          <button class="btn btn-primary" @click="submitSex">确认</button>
        </div>
      </form>
    </div>


  </div>
  <!--</div>-->
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
    name: 'manager-base-info',
    data() {
      return {
        inputImg: '',
        portraitTem: '',
        layerId: null,
        validType: 1,
        formMess:{
          psw: '',
        },
        account:{
        },
        avatar: null,
        errorMsg: null,
        sendAuthCode:true,
        auth_time: 0,
        codes:'',
        accountParam:{
          mobile: '',
          code: '',
          name: '',
          sex: '',
          username: '',
        }
      }
    },

    computed:{
      names () {
        if (String(vm.account.username).length >0) {
          var na = String(vm.account.username);
          var userreg = /^(..).+(..)$/g;//加密用户名
          return  na.replace(userreg, '$1****$2');
        }
        else {
          return vm.account.username
        }//  return this.account.username.replace(userreg, "$1***$2")
      },
      phone(){
        if (Number(vm.account.mobile) && String(vm.account.mobile).length === 11) {
          var mobile = String(vm.account.mobile)
          var reg = /^(\d{3})\d{4}(\d{4})$/
          return mobile.replace(reg, '$1****$2')
        } else {
          return vm.account.mobile
        }
        //  return  this.account.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

      },
      call(){
        if(vm.account.sex===0){return '女士'}else {return '先生'}
      },
      sexs(){
        if(vm.account.sex===0){return '女'}else {return '男'}
      },
      login () {
        return this.account.loginAt ? moment(this.account.loginAt).format('YYYY-MM-DD') : '--'
      },
      created(){
        return this.account.createdAt? moment(this.account.createdAt).format('YYYY-MM-DD hh:mm') : '--'},

      Get_Greetings()
      {
        var str = "";
        var now = new Date();
        var times =  now.getHours();
        if (times >= 0 && times < 6) { str = "凌晨"; }
        if (times >= 6 && times < 9) { str = "早上"; }
        if (times >= 9 && times < 11) { str = "上午"; }
        if (times >= 11 && times < 13) { str = "中午"; }
        if (times >= 13 && times < 17) { str = "下午"; }
        if (times >= 17 && times < 19) { str = "傍晚"; }
        if (times >= 19 && times < 24) { str = "晚上"; }
        return str;
      }
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
      modifyPortrait() {
        this.layerId = layer.open({
          type: 1,
          title: '修改头像',
          area: ['835px', '600px'],
          content: $('#modifyPortrait'),
          success: function() {
            $('#cropImg').cropper({
              // aspectRatio: 1,
              // responsive: true,
              preview: '#cropperPreview > .img-preview'
            })
          }
        })
      },
      inputPortrait(event) {
        let fileReader = new FileReader(),
          files = event.target.files,
          file;

        if (!files.length) {
          return;
        }

        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          fileReader.readAsDataURL(file);
          fileReader.onload = function () {
            $('#cropImg').cropper("reset", true).cropper("replace", this.result);
            $('#selectImg').val("");
          };
        } else {
          // toastr.warnings("请选择图片文件");
          layer.alert('请选择图片文件')
        }
      },
      submitPortrait() {
        POST('api/me/')
          .then(data => {
            layer.close(vm.layerId);
            layer.msg('修改成功')
          })
      },
      cancelLayer() {
        layer.close(this.layerId)
      },
      //修改姓名
      modifyName(){
        this.layerId = layer.open({
          type: 1,
          title: '修改姓名',
          area: ['800px', '515px'],
          content: $('#modifyName'),
          success() {
            vm.$validator.errors.clear();
          },
          end() {
            clearAccountParams();
          }
        })

      },
      submitName(){
        POST('api/me/rename',{
          code: this.accountParam.code,
          name: this.accountParam.name
        })
          .then(data => {
            layer.close(vm.layerId);
            layer.msg('修改成功')
          })
      },
      //修改手机
      modifyPhone(){
        this.layerId = layer.open({
          type: 1,
          title: '修改手机',
          area: ['800px', '515px'],
          content: $('#modifyPhone'),
          success() {
            vm.$validator.errors.clear();
          },
          end() {
            clearAccountParams();
          }
        })

      },

      submitPhone(){
        PATCH('api/me/mobile',{
          code: this.accountParam.code,
          mobile: this.accountParam.mobile
        })
          .then(data => {
            layer.msg('修改成功')
            layer.close(this.layerId)
            vm.account.mobile = this.accountParam.mobile
          })
      },
      //修改性别
      modifySex(){
        vm.accountParam.sex=vm.account.sex;
        this.layerId = layer.open({
          type: 1,
          title: '修改性别',
          area: ['400px', '225px'],
          content: $('#modifySex'),
          success() {
            vm.$validator.errors.clear();
          },
          end() {
            clearAccountParams();
          }
        })
      },
      submitSex() {
        let query=vm.accountParam.sex;
        PATCH(`api/me/sex/?sex=${query}`)
          .then(data => {
            layer.close(vm.layerId);
            layer.msg('修改成功')
          })
      },
    },
    created() {
      vm = this;
      getALLAccount();
      _initAccountParams();
    },
  }
  function  getALLAccount(){
    GET('api/me/')
      .then((data) => {
        vm.account = data;
        _initAccountParams()
      })
  }
  function clearAccountParams() {
    vm.accountParam={
      mobile: '',
      name: '',
      sex: '',
    }
  }
  function _initAccountParams() {
    vm.accountParam.sex=vm.account.sex
    vm.accountParam.mobile=vm.account.mobile
  }
  function  getAuthCode () {
    const code =this.account.mobile;
    const url = ""
    console.log("url",url);
    this.$http.get(url).then(function (response) {
      console.log("请求成功",response)
    }, function (error) {
      console.log("请求失败",error);
    })
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
  }




</script>
<style lang="scss">
  .page-content {
    &:before, &:after {
      display: table;
      content: " ";
      clear: both;
    }
  }
  .panel{
    width: 100%;
    min-height: 840px;
  }
  .panel-portrait{
    padding-top: 130px;
    padding-bottom: 80px;
  }

  .form-horizontal{
    padding-left: 70px;
    .col-xs-5,.col-xs-7{
      padding-top: 30px;
      span{
        a{
          margin-left: 10px;
        }
      }
    }
    .info-right{
      padding-left:100px;
    }
  }
  .error{
    font-size: 12px;
    color: #f00;
    float: left ;
  }
</style>
<style scoped lang="scss">
  @import "../../sass/account/base-info.scss";

</style>
