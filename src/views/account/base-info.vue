<template>
  <!--<div>-->
  <div class="page-content clearfix">
    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <div class="panel panel-base-info panel-portrait">
          <div class="portrait-box" >
            <img v-if="!avatar" src="@/assets/img/portrait.png" alt=""></img>
            <img :src="avatar" alt="">
          </div>
          <button class="btn btn-default" @click="modifyPortrait">更改头像</button>
          <p>早上好！{{account.name}}  {{ sexs }}</p>
          <p class="time">上次登陆：{{ login }}</p>
        </div>
      </div>
      <div class="col-xs-12 col-sm-8">
        <div class="panel panel-base-info panel-info">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-xs-4 col-sm-3 col-md-2">登陆账号</label>
              <div class="col-xs-8">{{ names }}</div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 col-sm-3 col-md-2">密码</label>
              <div class="col-xs-8"> ****** <a href="#/member/modify-pwd">修改</a></div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 col-sm-3 col-md-2">姓名</label>
              <div class="col-xs-8">{{account.name}} <a href="javascript:;" @click="modifyName">修改</a></div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 col-sm-3 col-md-2">性别</label>
              <div class="col-xs-8">{{account.sex}}<a href="javascript:;" @click="modifySex">修改</a></div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 col-sm-3 col-md-2">手机号</label>
              <div class="col-xs-8">{{ phone }} <a href="javascript:;" @click="modifyPhone">修改</a></div>
            </div>
            <div class="form-group">
              <label class="col-xs-4 col-sm-3 col-md-2">开通时间</label>
              <div class="col-xs-8">{{ created }} </div>
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
      <form>
      <span>修改姓名</span>
      <div class="pearls  pearls-xs padding-top-5">
        <div class="pearl done  col-xs-6">
          <span class="pearl-number"></span> <span class="pearl-title">验证身份</span>
        </div>
        <div class="pearl  col-xs-6" :class="{done:validType==3}">
          <span class="pearl-number"></span> <span class="pearl-title">更改姓名</span>
        </div>
      </div>
      <div class="change-pane " >
          <div class=" form-group padding-top-50" v-show="validType === 1">
            <small class="phone-number">将发送验证码到手机{{ phone }}</small>
            <div class="form-group"><label class="control-label col-xs-3" >验证码  </label>
              <input v-model="code"
                     v-validate="'required'"
                     data-vv-as="验证码"
                     name="number"
                     type="text"
                     class="input-group col-xs-9"
                     placeholder="请输入验证码">
               <span v-show="sendAuthCode"  class=" btn btn-primary btn-get" @click="getAuthCode">获取验证码</span>
               <span v-show="!sendAuthCode" class=" btn btn-primary btn-get " > <span class="auth_text_blue">{{auth_time}} </span> 秒之后重新获取验证码</span>
              <span class="password "><a  herf="javascript:;" @click="validType = 2">改为密码验证</a></span>
              <span class="error"  v-show="!errorMsg &&errors.has('number')" >（*{{ errors.first('number') }}）</span>
              <a class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="validType = 3">下一步</a>
            </div>
          </div>

          <div class="form-group  padding-top-80" v-show="validType === 2">
            <label class="control-label col-xs-3" >输入密码 </label>
            <input v-model="account.password"
                   v-validate="'required'"
                   data-vv-as="密码"
                   type="password"
                   class="input-group col-xs-9"
                   name="password"
                   placeholder="请输入登陆密码">
            <span class="password padding-left-80"><a  herf="javascript:;" @click="validType = 1">改为手机证码</a></span>
            <span class="error"  v-show="!errorMsg &&errors.has('password')" >（*{{ errors.first('password') }}）</span>
            <a class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="validType = 3" >下一步</a>
          </div>

          <div class="form-group padding-top-80" v-show="validType === 3">
            <label class="control-label col-xs-3" >更改姓名 </label>
            <input v-model="accountParam.name"
                   data-vv-as="姓名"
                    type="text"
                    class="input-group col-xs-9"
                     name="name"
                     placeholder="请输入姓名" >
            <span class="error"  v-show="!errorMsg &&errors.has('name')" >（*{{ errors.first('name') }}）</span>
            <a class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="submitName" >确认修改</a>
          </div>
      </div>
      </form>
    </div>

    <!--修改手机-->
    <div id="modifyPhone" class="layer-name clearfix">
      <form>
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
          <div class="form-group  padding-top-80" v-show="validType === 1">
            <label class="control-label col-xs-3" >密码验证 </label>
            <div class="col-xs-9 margin-bottom-30">
            <input v-model="account.psw"
                   v-validate="'required|password:6,18'"
                   data-vv-as="密码"
                   type="password"
                   class="input-group  "
                   name="password"
                   placeholder="请输入登陆密码">
            <span class="error"  v-show="!errorMsg &&errors.has('password')" >（*{{ errors.first('password') }}）</span>
            </div>
            <button class="btn btn-primary btn-block " href="javascript:;" @click="checkPsw" >下一步</button>
          </div>
          <div class="form-group padding-top-80" v-show="validType === 2">
            <label class="control-label col-xs-3" >更改手机 </label>
            <input v-model="accountParam.mobile"
                   v-validate="'required'"
                   data-vv-as="手机号"
                   type="text"
                   class="input-group col-xs-9"
                   name="mobile"
                   placeholder="请输入新的手机号">
            <span class="error"  v-show="!errorMsg &&errors.has('mobile')" >（*{{ errors.first('mobile') }}）</span>
            <button class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="submitName" >确认修改</button>
          </div>
      </div>
      </form>
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
  import store from '@/core/store'
  import {Formed, publish, subscribe } from 'pubsub-js'
  import {GET,DELETE,PATCH,POST} from '../../core/http'
  let vm;

  export default {
    name: 'base-info',
    data() {
      return {
        inputImg: '',
        portraitTem: '',
        layerId: null,
        validType: 1,
        account:{
          psw: '',
        },
        avatar: null,
        errorMsg: null,
        code: '',
        sendAuthCode:true,
        auth_time: 0,
        accountParam:{
          code: '',
          mobile: '',
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

          var mobile = String(vm.account.mobile);

          var reg = /^(\d{3})\d{4}(\d{4})$/;

          return mobile.replace(reg, '$1****$2')

        } else {

          return vm.account.mobile

        }
      //  return  this.account.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

      },
      sexs(){
        if(vm.account.sex===0){return '女士'}else {return '先生'}
      },
      login () {
        return this.account.loginAt ? moment(this.account.loginAt).format('YYYY-MM-DD') : '--'
      },
      created(){
        return this.account.createdAt? moment(this.account.createdAt).format('YYYY-MM-DD hh:mm') : '--'
      },
    },
    methods: {
      checkPsw() {
        POST('api/me/password/check',)
          .then(data => {
            validType = 2
          })
      },
      modifyPortrait() {
        vm.accountParam.sex=account.sex;
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
        })

      },
      submitName(){
          POST('api/me/rename')
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
        })

      },
      getAuthCode () {},
      submitPhone(){
        layer.close(this.layerId)
      },
      //修改性别
      modifySex(){
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
  .error{
    font-size: 12px;
    color: #f00;
    float: left ;
  }
</style>
<style scoped lang="scss">
  @import "../../sass/account/base-info.scss";

</style>
