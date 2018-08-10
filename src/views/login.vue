<template>
  <div class="login-body">
    <div class="login-img">
    <div class="introduction ">
      <div class="logo">
        <a class="yun-logo" href="" target="_blank" title="臻合网络">臻合网络</a>
      </div>
      <strong>一站式网吧管理平台</strong>
    </div>
    <div class="login-content">
      <strong class="title">欢迎登录</strong>
      <form class="form-horizontal">
        <div class="col-sm-12">
          <div :class="['form-tip', {'show':errorMsg}]" v-show="errorMsg">
            <i class="iconfont icon-tishi"></i>
            <span class="j-error-msg">{{errorMsg}}</span>
          </div>

          <div class="form-group">
            <i class="iconfont icon-person"></i>
            <input v-model="params.account"
                   v-validate="'required|max:30'"
                   @keyup.enter.native="submitLogin"
                   @input="calcValidate"
                   data-vv-as="账号"
                   type="text"
                   class="form-control"
                   name="account"
                   placeholder="请输入账号（用户名或手机号码）">
            <span class="error" v-show="!errorMsg && errors.has('account')">*{{ errors.first('account') }}</span>
          </div>
          <div class="form-group">
            <i class="iconfont icon-unlock"></i>
            <input v-model="params.password"
                   v-validate="'required|password:6,18'"
                   @keyup.enter.native="submitLogin"
                   @input="calcValidate"
                   data-vv-as="密码"
                   type="password"
                   class="form-control"
                   name="password"
                   placeholder="请输入密码">
            <span class="error" v-show="!errorMsg && errors.has('password')">*{{ errors.first('password') }}</span>
          </div>
          <div class="form-group verify-row">
            <i class="iconfont icon-securityCode-b"></i>
            <input v-model="params.verify"
                   v-validate="'required'"
                   @keyup.enter.native="submitLogin"
                   @input="calcValidate"
                   data-vv-as="验证码"
                   type="text"
                   class="form-control"
                   name="verify"
                   placeholder="请输入验证码">
            <div class="img-wrap"><img :src=imgUrl alt="验证码" @click="refreshCaptch"></div>
            <span class="error" v-show="!errorMsg && errors.has('verify')">*{{ errors.first('verify') }}</span>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" :checked="rememberMe"> 记住密码
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block" @click.prevent="submitLogin">登录</button>
      </form>
      <div class="copy-right-box">
        <span>Copyright &copy; 2018  杭州臻合网络技术有限公司</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  // import {$} from '@/globals/index'
  import {Formed, POST, GET} from '@/core/http';
  import store from '@/core/store'
  import {localDictionary, extendFields} from './script/login.valid'

  function initVeeValidate(dictionary, fields) {
    const keys = Object.keys(fields), vm = this;
    vm.$validator.localize('zh_CN', dictionary);
    keys.forEach(key => {
      vm.$validator.extend(key, fields[key])
    })
  }
  function doLogin() {
    const vm = this;
    POST('/api/oauth/token', Formed({
      grant_type: 'password',
      client_id: store.client_id,
      client_secret: store.client_secret,
      username: vm.params.account,
      password: vm.params.password,
      captcha: vm.params.verify
    }))
      .done(function (d) {
        store.token = d

        store.remember = vm.rememberMe
        vm.$router.push('/recharge');
        // vm.$layer.alert('登录成功');
      })
      .fail(e => {
        if (e.status >= 500) {
          vm.errorMsg = e.statusText;
        } else {
          vm.errorMsg = '账户或密码错误！';
        }
      });
  }

  export default {
    name: "login",
    data() {
      return {
        imgUrl: '/api/core/captcha',
        errorMsg: null,
        rememberMe: store.remember,
        params: {
          account: 'storekeeper',
          password: '123456',
          verify: ''
        }
      }
    },
    mounted() {
      initVeeValidate.call(this, localDictionary, extendFields)
    },
    methods: {
      refreshCaptch() {
        this.imgUrl = '/api/core/captcha?' + Math.random()
      },
      calcValidate() {
        this.errorMsg = null;
      },
      submitLogin() {
        const vm = this;
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any()) {
            vm.errorMsg = error.all()[0];
            vm.$validator.errors.clear();
          } else {
            // this.$data.manualValidate = false;

            //--------do login-----------
//            doLogin.call(vm);

            GET('/api/core/captcha/_verify?captcha=' + vm.params.verify)
              .done(() => {
                doLogin.call(vm);
              })
              .code('invalid_captcha', () => {
                  vm.errorMsg = '验证码错误！';
              })
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  html{
    font-size: 100px;
    min-width: 1280px;
    min-height: 700px;
    overflow: auto;
  }
  body{
    font-size: 14px;
  }
  html, body, #app{
    height: 100%;
  }
</style>
<style scoped lang="scss">
  @import "../sass/login.scss";
</style>
