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
              <div class="pearl  col-xs-6" :class="{done:validType==3}">
                <span class="pearl-number"></span> <span class="pearl-title">更改密码</span>
              </div>
            </div>
          </div>
            <div class="change-pane" >
              <form id="formContainerOne" novalidate="novalidate">
                <div class=" form-group " v-show="validType === 1">
                  <small class="phone-number">将发送验证码到手机123****1111</small>
                  <label  class="control-label col-xs-3 " for="inputUserNameOne">验证码</label>
                  <input type="text" class="input-group col-xs-9" id="inputUserNameOne" name="username" required="required" placeholder="请输入验证码">
                  <span class=" btn btn-primary btn-get">获取验证码</span>
                  <span class="password "><a  herf="javascript:;" @click="validType = 2">改为密码验证</a></span>
                  <button class="btn btn-primary btn-block margin-top-60" href="javascript:;" @click="validType = 3" :class="{succsee:validType === 3}">下一步</button>
                </div>
                <div class="form-group " v-show="validType === 2">
                  <label class="control-label col-xs-3" for="inputPasswordOne">输入密码</label>
                  <input type="password" class="input-group col-xs-9 " id="inputPasswordOne" name="password" required="required"  placeholder="请输入登陆密码">
                  <span class="password padding-left-80"><a  herf="javascript:;" @click="validType = 1">改为手机证码</a></span>
                  <button class="btn btn-primary btn-block margin-top-60" href="javascript:;" @click="validType = 3" :class="{succsee:validType === 3}">下一步</button>
                </div>
                <div class="form-group" v-show="validType === 3">
                  <label class="control-label col-xs-3" for="inputCardNumberOne">输入新密码</label>
                  <input type="text" class="input-group col-xs-9" id="inputCardNumberOne" name="number" placeholder="请输入密码" aria-describedby="inputCardNumberOne-error">
                  <label class="control-label col-xs-3" for="inputCVVOne">确认新密码</label>
                  <input type="text" class="input-group col-xs-9" id="inputCVVOne" name="cvv" placeholder="请输入密码" aria-describedby="inputCVVOne-error">
                  <button class="btn btn-primary btn-block margin-top-70" href="javascript:;" @click="validType = 4">确认修改</button>
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
  export default {
    name: "modify-pwd",
    data() {
      return {
        validType: 1
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/account/modify-pwd";

</style>
