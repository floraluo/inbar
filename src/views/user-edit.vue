<template>
<div class="modal modal-fall" id="userInfoForm" aria-hidden="true" aria-labelledby="userInfoForm" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-center">
    <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" aria-hidden="true" data-dismiss="modal">×</button>
          <h4 class="modal-title">用户信息</h4>
      </div>
      <form action="javascript:void(0);" method="post" id="userAccountInfo">
          <div class="modal-body">
              <div class="form-group">
                  <input type="hidden" name="userId">
                  <input type="text" class="form-control" name="loginName" placeholder="用户名" v-model="user.loginName" :readonly="editing">
              </div>
              <div class="form-group">
                  <input type="password" class="form-control" name="password" placeholder="密码" v-model="user.password" data-plugin="strength">
              </div>
              <div class="form-group">
                  <input type="password" class="form-control" name="confirm" placeholder="确认密码" v-model="user.confirmedPassword">
              </div>
              <div class="form-group">
                  <select name="roleIds" class="form-control multi-select-methods form-control" multiple="multiple" v-model="roleIds">
                    <template v-for="auth in auths">
                      <option :key="auth.id" :value="auth.id">{{auth.id}}</option>
                    </template>
                  </select>
              </div>
              <div class="form-group">
                  <div class="checkbox-custom checkbox-inline checkbox-primary">
                      <input type="checkbox" id="disabledUser1" name="state" :checked="user.forbidden">
                      <label for="disabledUser1">禁用该用户</label>
                  </div>
              </div>
              <div class="form-group margin-top-25">
                  <button class="btn btn-primary margin-right-10" type="submit">保存</button>
                  <a class="btn btn-default" data-dismiss="modal">取消</a>
              </div>
          </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
  import '../../static/vendor/multi-select/multi-select.css'
  import '../../static/vendor/multi-select/jquery.multi-select'
  import '../../static/vendor/formvalidation/formValidation.css'
  import '../../static/vendor/formvalidation/formValidation'
  import '../../static/vendor/formvalidation/framework/bootstrap'
  import '../../static/vendor/formvalidation/language/zh_CN'
  import '../../static/vendor/toastr/toastr.css'
  import toastr from '../../static/vendor/toastr/toastr'
  import $ from 'jquery'
  import editValid from './user-edit-valid'
  import http from '@/core/http'

  function E () {
    let result = {}
    $.makeArray(arguments).forEach(data => $.extend(result, data))
    return result
  }

  function validateForm(form) {
    form.success(e => {
      e.preventDefault();

      console.log('roleIds', vm.role)
      console.log('user', vm.user)

      http.post(`/api/user/save`, E(vm.user, { roleIds: vm.roleIds }))
        .done(function (data) {
          if (data.success) {
            vm.$emit(`user.${vm.editing ? 'saved' : 'created'}`, data)
            vm._hide()
            toastr.success(data.msg);
          } else {
            toastr.error(data.msg);
          }
        })
        .fail(function error () {
          vm._hide()
          vm.form.enableSubmit()
          toastr.error('服务器异常，请稍后再试！');
          vm._show()
        })
    });
  }

  let vm

  export default {
    name: 'user-edit',
    forms: editValid,
    data () {
      return {
        editing: false,
        user: {
          userId: null,
          loginName: null,
          password: null,
          confirmedPassword: null,
          forbidden: false
        },
        roleIds: [],
        auths: [{
          id: 1,
          permission: true,
          text: '管理员'
        }, {
          id: 2,
          permission: true,
          text: '研发'
        }]
      }
    },
    created () {
      window.vm = vm = this
    },
    mounted () {
      validateForm(this.form)
    },
    methods: {
      _show () {
        $(this.$el).modal('show')
        this.$Q('select[name=roleIds]').multiSelect('refresh')
      },
      _hide () {
        $(this.$el).modal('hide')
      },
      create () {
        this.editing = false
        this._show()
      },
      edit (user) {
        this.editing = true
        this.user = user
        this.form.enableRule('password', 'notEmpty')
        this.form.enableRule('confirm', 'notEmpty')
        this._show()
      }
    }
  }
</script>

