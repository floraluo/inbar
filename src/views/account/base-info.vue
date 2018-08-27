<template>
  <!--<div>-->
    <div class="page-content clearfix">
      <div class="row">
        <div class="col-xs-12 col-sm-4">
          <div class="panel panel-base-info panel-portrait">
            <div class="portrait-box">
              <img src="@/assets/img/portrait.png" alt="">
            </div>
            <button class="btn btn-default" @click="modifyPortrait">更改头像</button>
            <p>早上好！xxx女士</p>
            <p class="time">上次登陆：2018-07-20 09:30</p>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8">
          <div class="panel panel-base-info panel-info">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">登陆账号</label>
                <div class="col-xs-8">158****4554</div>
              </div>
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">密码</label>
                <div class="col-xs-8">****** <a href="#/member/modify-pwd">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">姓名</label>
                <div class="col-xs-8">刘安 <a href="javascript:;" @click="modifyName">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">性别</label>
                <div class="col-xs-8">女 <a href="javascript:;" @click="modifySex">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">手机号</label>
                <div class="col-xs-8">158****6985 <a href="javascript:;" @click="modifyPhone">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">开通时间</label>
                <div class="col-xs-8">2018-02-36 </div>
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
      <div id="modifyName" class="layer-name clearfix">
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
          <form id="formContainerOne" novalidate="novalidate">
            <div class=" form-group padding-top-50" v-show="validType === 1">
              <small class="phone-number">将发送验证码到手机123****1111</small>
              <label  class="control-label col-xs-3" for="inputProNumberOne">验证码</label>
              <input type="text" class="input-group col-xs-9" id="inputProNumberOne" name="username" required="required" placeholder="请输入验证码">
              <span class=" btn btn-primary btn-get">获取验证码</span>
              <span class="password "><a  herf="javascript:;" @click="validType = 2">改为密码验证</a></span>
              <a class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="validType = 3">下一步</a>
            </div>
            <div class="form-group  padding-top-80" v-show="validType === 2">
              <label class="control-label col-xs-3" for="inputPasswordOne">输入密码</label>
              <input type="password" class="input-group col-xs-9" id="inputPasswordOne" name="password" required="required"  placeholder="请输入登陆密码">
              <span class="password padding-left-80"><a  herf="javascript:;" @click="validType = 1">改为手机证码</a></span>
              <a class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="validType = 3" >下一步</a>
            </div>
            <div class="form-group padding-top-80" v-show="validType === 3">
              <label class="control-label col-xs-3" for="inputNewName">更改姓名</label>
              <input type="text" class="input-group col-xs-9" id="inputNewName" name="number" placeholder="请输入姓名" aria-describedby="inputCardNumberOne-error">
              <a class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="submitName" >确认修改</a>
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
          <form id="formContainerTwo" novalidate="novalidate">
            <div class="form-group  padding-top-80" v-show="validType === 1">
              <label class="control-label col-xs-3" for="inputPasswordOne">密码验证</label>
              <input type="password" class="input-group col-xs-9" id="inputPasswordTwo" name="password" required="required"  placeholder="请输入登陆密码">
              <button class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="validType = 2" >下一步</button>
            </div>
            <div class="form-group padding-top-80" v-show="validType === 2">
              <label class="control-label col-xs-3" for="inputNewPhone">更改手机</label>
              <input type="text" class="input-group col-xs-9" id="inputNewPhone" name="number" placeholder="请输入姓名" aria-describedby="inputCardNumberOne-error">
              <button class="btn btn-primary btn-block margin-top-50" href="javascript:;" @click="submitName" >确认修改</button>
            </div>
          </form>
        </div>
      </div>

      <!--修改性别-->
      <div id="modifySex" class="layer-sex clearfix">
        <div class="sex-content">
           <div class="col-sm-3 padding-right-0">请选择：</div>
           <div class="col-sm-8 margin-bottom-50 ">
             <div class="radio-custom radio-default radio-inline">
               <input type="radio" id="inputLabelMale" name="inputRadioGender" >
               <label for="inputLabelMale">男</label>
             </div>
             <div class="radio-custom radio-default radio-inline">
               <input type="radio" id="inputLabelFemale" name="inputRadioGender" checked="" >
               <label for="inputLabelFemale">女</label>
             </div>
           </div>
           <div class="btn-bottom pull-right">
              <button class="btn btn-default" @click="cancelLayer">取消</button>
              <button class="btn btn-primary" @click="submitSex">确认</button>
           </div>
        </div>
      </div>



    </div>
  <!--</div>-->
</template>

<script>
  import $ from 'jquery'
  import '../../../node_modules/cropper/dist/cropper.min.css'
  import 'cropper'
  import layer from '../../../static/vendor/layer/layer'
  let vm;



  export default {
    name: 'base-info',
    data() {
      return {
        inputImg: '',
        portraitTem: '',
        layerId: null,
        validType: 1
      }
    },
    created() {
      vm = this;
    },
    methods: {

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
        this.cancelLayer()
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
        layer.close(this.layerId)
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
      submitPhone(){
    layer.close(this.layerId)
  },
      //修改性别
      modifySex(){
        this.layerId = layer.open({
          type: 1,
          title: '修改性别',
          area: ['435px', '225px'],
          content: $('#modifySex'),
        })

      },
      submitSex(){
        this.cancelLayer()
      }
    }

  }
</script>

<style scoped lang="scss">
@import "../../sass/account/base-info.scss";
</style>
