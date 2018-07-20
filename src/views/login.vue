<template>
  <div class="login-body">
    <div class="introduction">
      <strong>一站式网吧管理平台</strong>
    </div>
    <div class="login-content">
      <strong class="title">欢迎登录</strong>
      <form class="form-horizontal">
        <div class="col-sm-12">
          <div :class="['form-tip', {'show':manualValidate}]" v-show="manualValidate">
            <i class="iconfont icon-tishi"></i>
            <span class="j-error-msg">{{errorMsg}}</span>
          </div>

          <div class="form-group">
            <i class="iconfont icon-person"></i>
            <input v-model="params.account" v-validate="'required|max:3'" @input="calcValidate" data-vv-as="账号" type="text" class="form-control" name="account" placeholder="请输入账号（用户名或手机号码）">
            <span class="error" v-show="!manualValidate && errors.has('account')">*{{ errors.first('account') }}</span>
          </div>
          <div class="form-group">
            <i class="iconfont icon-person"></i>
            <input v-model="params.password" v-validate="'required|password:6,18'" @input="calcValidate" data-vv-as="密码" type="password" class="form-control" name="password" placeholder="请输入密码">
            <span class="error" v-show="!manualValidate && errors.has('password')">*{{ errors.first('password') }}</span>
          </div>
          <div class="form-group">
            <i class="iconfont icon-person"></i>
            <input v-model="params.verify" v-validate="'required'" @input="calcValidate" data-vv-as="验证码" type="text" class="form-control" name="verify" placeholder="请输入验证码">
            <span class="error" v-show="!manualValidate && errors.has('verify')">*{{ errors.first('verify') }}</span>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" checked> 记住密码
            </label>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-block" @click="submitLogin">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
  import {localDictionary, extendFields} from './script/login.valid'

  function initVeeValidate(dictionary, fields) {
    const keys = Object.keys(fields), vm = this;
    vm.$validator.localize('zh_CN', dictionary);
    keys.forEach(key => {
      vm.$validator.extend(key, fields[key])
    })
  }
  export default {
    name: "login",
    data() {
      return {
        manualValidate: false,
        errorMsg: '',
        params: {
          account: '',
          password: '',
          verify: ''
        }
      }
    },
    mounted() {
      initVeeValidate.call(this, localDictionary, extendFields)
    },
    methods: {
      calcValidate() {
        if (this.$data.manualValidate) {
          if (this.$validator.errors.any()) {
            this.$validator.errors.clear();
          }
          this.$data.manualValidate = false;
        }
      },
      submitLogin() {
        // const fileds = ['account', 'password', 'verify'];
        this.$data.manualValidate = true;
        this.$validator.validate().then(() => {
          const error = this.$validator.errors;
          if (error.any()) {
            this.$data.errorMsg = error.all()[0];
          } else {
            this.$data.manualValidate = false;

            //do login
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  html{
    font-size: 80px;
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
