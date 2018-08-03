<template>
<div class="modal modal-fall" id="userInfoForm" aria-hidden="true" aria-labelledby="userInfoForm" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-center">
    <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" aria-hidden="true" data-dismiss="modal">×</button>
          <h4 class="modal-title">用户信息</h4>
      </div>
      <form action="javascript:void(0);" method="post">
          <div class="modal-body">
              <div class="form-group">
                  <input type="hidden" name="userId">
                  <input class="form-control" name="loginName" placeholder="用户名" v-model="user.username" :readonly="editing">
              </div>
              <div class="form-group">
                  <input type="password" class="form-control" name="password" placeholder="密码" v-model="user.password" data-plugin="strength">
              </div>
              <div class="form-group">
                  <input type="password" class="form-control" name="confirm" placeholder="确认密码" v-model="user.confirmedPassword">
              </div>
              <div class="form-group">
                <multi-select placeholder="请授权角色" select-label="赋予" deselect-label="撤销" selected-label="已授权" :loading="!roleReady"
                              v-model="grantedRoles"
                              :options="roles"
                              :multiple="true"
                              label="name"
                              track-by="id"
                              :show-labels="true"
                              :option-height="22">
                </multi-select>
              </div>
              <div class="form-group">
                  <div class="checkbox-custom checkbox-inline checkbox-primary">
                      <input type="checkbox" name="state" :checked="!user.enabled">
                      <label>禁用该用户</label>
                  </div>
              </div>
              <div class="form-group margin-top-25">
                  <button :disabled="!roleReady" class="btn btn-primary margin-right-10">{{ buttonText }}</button>
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
  //import 'vue-multiselect/dist/vue-multiselect.min.css'
  import toastr from '../../static/vendor/toastr/toastr'
  // import multiSelect from 'vue-multiselect'
  import $ from 'jquery'
  import editValid from './user-edit-valid'
  import { POST, PATCH, GET, uri, merge } from '../core/http'


  function validateForm(form) {
    const vm = this
    form.success(e => {
      e.preventDefault();

      console.log('roleIds', vm.roleIds)
      console.log('user', vm.user);

      (vm.editing ? PATCH : POST)(`/api/core/user/{?id}`, merge(vm.user, { roleIds: vm.grantedRoles.map(r => r.id) }))
        .done(data => {
          vm.$emit(`user-${vm.editing ? 'saved' : 'created'}`, data)
          vm.$emit(`user-changed`, data)
          vm._hide()
          toastr.success('保存成功');
        })
        .fail(function error () {
          vm._hide()
          vm.form.enableSubmit()
          vm._show()
        })
    });
  }

  export default {
    name: 'user-edit',
    //components: {'multi-select': multiSelect},
    forms: editValid,
    data () {
      return {
        roleReady: false,
        editing: false,
        user: {
          userId: null,
          password: null,
          confirmedPassword: null,
          enabled: false
        },
        grantedRoles: [],
        roles: []
      }
    },
    dom: {
      roleSelector: 'select[name=roleIds]'
    },
    computed: {
      buttonText () {
        return this.roleReady ? '保存' : '加载中...'
      }
    },
    mounted () {
      validateForm.call(this, this.form)
    },
    updated () {
      if (this.roleReady) {
        this.roleSelector.multiSelect('refresh')
      }
    },
    methods: {
      _show () {
        this.roleReady = false
        this.grantedRoles = []
        GET(uri(`/api/permission/user/{:id}/role/`, {id: this.user.id}), {granted: true, template: true})
          .done(d => {
            this.roles = d
            this.grantedRoles = d.filter(r => r.granted)
            this.roleReady = true
          })
        $(this.$el).modal('show')
      },
      _hide () {
        this.roleReady = false
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

