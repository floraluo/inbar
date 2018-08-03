<template>
  <div class="page">
    <div class="page-content container-fluid" style="padding-left: 240px">
      <!--
      <div class="for-liucheng">
        <div class="liulist for-cur"></div>
        <div class="liulist"></div>
        <div class="liulist"></div>
        <div class="liulist"></div>
        <div class="liutextbox">
          <div class="liutext for-cur"><em>1</em><br />
            <strong>填写账户名</strong></div>
          <div class="liutext"><em>2</em><br />
            <strong>验证身份</strong></div>
          <div class="liutext"><em>3</em><br />
            <strong>设置新密码</strong></div>
          <div class="liutext"><em>4</em><br />
            <strong>完成</strong></div>
        </div>
      </div>
      <form action="forgetPwd2.htm|" method="get" class="forget-pwd">
        <dl>
          <dt>账户名：</dt>
          <dd>
            <input type="text" />
          </dd>
          <div class="clears"></div>
        </dl>
        <dl>
          <dt>验证码：</dt>
          <dd>
            <input type="text" />
            <div class="yanzma"> <img src="yzm.gif" /> <a href="#">换一换</a> </div>
          </dd>
          <div class="clears"></div>
        </dl>
        <div class="subtijiao">
          <input type="submit" value="提交" />
        </div>
      </form>
      -->
      <div class=" panel  height-full">
        <div class="modal-dialog  panel-center">
          <span>重置密码</span>
          <div class="pearls pearls-xs  ">
            <div class="pearl done col-xs-6 ">
              <span class="pearl-number"></span> <span class="pearl-title">验证身份</span>
            </div>

            <div class="pearl col-xs-6">
              <span class="pearl-number"></span> <span class="pearl-title">更改姓名</span>
            </div>
          </div>
              <div class="change-pane" id="exampleAccountOne" role="tabpanel" aria-expanded="false">
                <form id="formContainerOne" novalidate="novalidate">
                  <div class=" form-group ">
                    <small class="phone-number">请发送验证码到手机123****1111</small>
                    <label  class="control-label" for="inputUserNameOne">验证码</label>
                    <input type="text" class="form-control width" id="inputUserNameOne" name="username" required="required" placeholder="请输入验证码">
                    <span class=" btn btn-primary btn-get">获取验证码</span>
                    <span class="password "><a  herf="">改为密码验证</a></span>
                  </div>

                </form>
              </div>
                  <div class="wizard-pane" id="exampleAccountTwo" role="tabpanel" aria-expanded="false">
                    <form id="formContainerTwo" novalidate="novalidate">
                  <div class="form-group ">
                    <label class="control-label" for="inputPasswordOne">输入密码</label>
                    <input type="password" class="form-control " id="inputPasswordOne" name="password" required="required"  placeholder="请输入登陆密码">
                    <span class="password "><a  herf="">改为手机验证</a></span>
                  </div>
                </form>
              </div>
              <div class="wizard-pane active" id="exampleBillingOne" role="tabpanel" aria-expanded="true">
                <form id="formContainerthree" novalidate="novalidate">
                  <div class="form-group ">
                    <label class="control-label" for="inputCardNumberOne">输入新密码</label>
                    <input type="text" class="form-control" id="inputCardNumberOne" name="number" placeholder="请输入密码" aria-describedby="inputCardNumberOne-error">
                  </div>
                  <div class="form-group ">
                    <label class="control-label" for="inputCVVOne">确认新密码</label>
                    <input type="text" class="form-control" id="inputCVVOne" name="cvv" placeholder="请输入密码" aria-describedby="inputCVVOne-error">
                  </div>
                </form>
              </div>
          <div class="wizard-buttons">
            <button class="btn btn-primary btn-block margin-top-20" href="#exampleWizardFormContainer" data-wizard="next" role="button">下一步</button>
          </div>
            </div>

        </div>
      </div>

    </div>
</template>
<script>
    export default {
        name: "change-password"
    }
</script>

<style scoped lang="scss">
  @import "../sass/change-password";

</style>
