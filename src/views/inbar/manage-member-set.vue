<template>
  <div class="">
    <!--<div class="page-crumbs"><span class="highlight">会员管理&nbsp;&frasl;</span>&nbsp;会员数据</div>-->
    <div class="page-main">
      <p><strong>会员初始密码</strong></p>
      <div class="form-group ">
        <label  type="text" class="col-xs-3 control-label">会员初始密码</label>
        <div class=" input-group col-xs-9">
          <input v-model="pswforms.psw" type="text" class="form-control"  v-if="seen">
          <input  v-model="pswforms.psw" type="password" class="form-control"  v-else>
          <span class="input-group-addon" @click="seen = !seen">
              <i class="iconfont" :class="seen ? 'icon-yanjing' : 'icon-yanjing-bi'"></i>
            </span>
        </div>
      </div>
      <div class="form-group text-center padding-top-50">
        <button class="btn btn-primary " @click="submitSetPassword">保存</button>
        <button class="btn btn-default margin-left-30" >取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'
  export default {
    name: 'manage-member-set',
    data(){
      return {
        seen: false,
        pswforms:{
          psw: '',
        },
      }
    },
    methods: {
      submitSetPassword() {
        POST('/api/member/set',vm.pswforms)
          .then(data => {
            layer.msg('设置成功！')

          })
      },
    },
    created(){
      vm=this;
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";
  .form-group{
    width: 400px;
  }
  .col-xs-3 ,.col-xs-9{
    padding: 0;
  }
</style>
