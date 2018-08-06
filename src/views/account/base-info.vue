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
                <div class="col-xs-8">****** <a href="javascript:;">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">姓名</label>
                <div class="col-xs-8">刘安 <a href="javascript:;">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">性别</label>
                <div class="col-xs-8">女 <a href="javascript:;">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-xs-4 col-sm-3 col-md-2">手机号</label>
                <div class="col-xs-8">158****6985 <a href="javascript:;">修改</a></div>
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
        layerId: null
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
      }
    }
  }
</script>

<style scoped lang="scss">
@import "@/sass/account/base-info.scss";
</style>
