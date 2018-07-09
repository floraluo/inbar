<template>
<div class="layout-full">
  <div class="page bg-white animation-fade page-users">
      <div class="page-aside">
          <div class="page-aside-switch">
              <i class="icon wb-chevron-left" aria-hidden="true"></i>
              <i class="icon wb-chevron-right" aria-hidden="true"></i>
          </div>
          <div class="page-aside-inner height-full" data-plugin="slimScroll">
              <div class="page-aside-section">
                  <div class="list-group">
                      <a class="list-group-item active" id="allUsers" href="javascript:;">
                          <span class="item-right" data-allUsers="${total}">{{total}}</span><i class="icon wb-tag" aria-hidden="true"></i>所有用户
                      </a>
                  </div>
              </div>
              <div class="page-aside-section">
                  <h5 class="page-aside-title">角色</h5>
                  <div class="list-group has-actions role-contents">
                    <template v-for="role in roles" >
                      <div class="list-group-item" data-user="0" v-bind:key="role.id" v-bind:data-id="role.id" data-url="">
                        <div class="list-content">
                          <span class="item-right">{{ role.count }}</span> <span class="list-text">{{role.name}}</span>
                          <div class="item-actions">
                            <span class="btn btn-pure btn-icon btn-edit" @click="editRole(role)" data-toggle="modal" data-target="#roleForm" data-page-height="520" data-page="${ctx}/system/user/_role-info"><i class="icon wb-edit" aria-hidden="true"></i></span>
                            <span class="btn btn-pure btn-icon" data-tag="list-delete"><i class="icon wb-close" aria-hidden="true"></i></span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
              </div>
              <div class="page-aside-section hidden-xs">
                  <a class="list-group-item" href="#" data-toggle="modal" data-target="#roleForm" data-page-height="520" data-page="${ctx}/system/user/_role-info" @click="editRole" id="addRoleToggle">
                      <i class="icon wb-plus" aria-hidden="true"></i> 添加新角色
                  </a>
              </div>
          </div>
      </div>
      <div class="page-main">
          <div class="page-header">
              <h3 class="page-title">用户列表</h3>
          </div>
          <div class="page-content" data-user-table>
              <table class="table table-bordered table-hover text-nowrap dataTable table-striped margin-vertical-10 width-full print-hidden-first-column print-hidden-last-column" data-selectable="selectable" data-column-defs='[{ "orderable": false, "targets": 0},{ "orderable": false, "targets": 6}]'>
                  <thead>
                  <tr>
                      <th width="20" data-order="false">
                          <span class="checkbox-custom checkbox-primary user-select-all">
                              <input type="checkbox" class="user-checkbox selectable-all">
                              <label></label>
                          </span>
                      </th>
                      <th>用户名</th>
                      <th>创建日期</th>
                      <th>最后登录</th>
                      <th>登录次数</th>
                      <th>登录IP</th>
                      <th>操作</th>
                  </tr>
                  </thead>
              </table>
          </div>
      </div>

      <div class="site-action">
          <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating" @click="siteActionClicked">
              <i class="front-icon wb-plus animation-scale-up" aria-hidden="true" data-toggle="tooltip" data-placement="left" title="添加"></i>
              <i class="back-icon wb-close animation-scale-up" aria-hidden="true" data-toggle="tooltip" data-placement="left" title="关闭"></i>
          </button>
          <div class="site-action-buttons">
              <button @click="deleteUser" type="button" data-action="delete" class="btn-raised btn btn-success btn-floating animation-slide-bottom" data-toggle="tooltip" data-placement="left" title="删除所选用户">
                  <i class="icon wb-trash" aria-hidden="true"></i>
              </button>
              <button @click="forbidden" type="button" data-action="move" class="btn-raised btn btn-success btn-floating animation-slide-bottom" data-toggle="tooltip" data-placement="left" title="禁用所选用户">
                  <i class="icon wb-lock" aria-hidden="true"></i>
              </button>
          </div>
      </div>
  </div>
  <user-edit key="userEdit"/>
  <role-edit key="roleEdit" :role="currentRole"/>
</div>
</template>

<script>
import $ from 'jquery'

import toastr from 'toastr'

// import 'bootstrap/dist/css/bootstrap-theme.css'
//
// import 'datatables'
// import 'datatables/media/css/jquery.dataTables.css'
// import 'datatables-buttons'
// import 'datatables-buttons/css/buttons.bootstrap.scss'
// import 'datatables-buttons/js/buttons.html5'
// import 'datatables-buttons/js/buttons.print'
//
//
// import 'datatables-bootstrap'
// import 'datatables-bootstrap/css/dataTables.bootstrap.css'
//
// import 'datatables-responsive'
// import 'datatables-responsive/js/responsive.bootstrap'
// // import 'datatables-responsive/css/responsive.foundation.scss'
// import 'datatables-responsive/css/responsive.bootstrap.scss'
// // import 'datatables-responsive/css/responsive.dataTables.scss'

// TODO:
// import '../../static/vendor/datatables-bootstrap/dataTables.bootstrap.css'
// import '../../static/vendor/datatables-responsive/dataTables.responsive.css'
//
// import '../../static/themes/classic/global/css/bootstrap.css'
// import '../../static/themes/classic/base/skins/grey/site.css'


import '../../static/vendor/slimscroll/jquery.slimscroll'
import '../../static/vendor/datatables/jquery.dataTables'
import '../../static/vendor/datatables-bootstrap/dataTables.bootstrap'
import '../../static/vendor/datatables-responsive/dataTables.responsive'
import '../../static/vendor/datatables-buttons/dataTables.buttons'
import '../../static/vendor/datatables-buttons/buttons.print'
import '../../static/vendor/datatables-buttons/buttons.html5'



// import '../../static/vendor/datatables-responsive/dataTables.responsive.css'
// import '../../static/vendor/datatables-bootstrap/dataTables.bootstrap.min.js'
// import '../../static/vendor/datatables-responsive/dataTables.responsive.min.js'
import '../../static/vendor/jszip/jszip.min.js'
// import '../../static/vendor/datatables-buttons/dataTables.buttons.min.js'
// import '../../static/vendor/datatables-buttons/buttons.print.min.js'
// import '../../static/vendor/datatables-buttons/buttons.html5.min.js'
import '../../static/admui/core'
import '../../static/admui/configs/site-configs'
import '../../static/admui/components'
// import '../../static/admui/components/selectable'
import '../../static/admui/components/datatables'
import '../../static/admui/plugins/action-btn'
import '../../static/admui/plugins/selectable'
import '../../static/admui/components/selectable'
import '../../static/vendor/jstree/jstree'

import '../../static/vendor/layer/theme/default/layer.css'
import layer from '../../static/vendor/layer/layer'

import { components } from "../core";
import UserEdit from './user-edit'
import RoleEdit from './role-edit'
import UserTable from './user-table'

import { POST } from '../core/http'

let vm

function editUser () {
  var $item = $(this).closest('tr'),
    $currentRow = $item.prev();

  if ($item.hasClass('child') && $currentRow.hasClass('parent')) {
    $item = $currentRow;
  }

  // self.$item = $item;
  // self.currentRow = self.table.row($item).data();
  vm.userEdit.edit(vm.table.row($item).data())
}

function hideActions() {
  vm.actionBtn.hide();
}

// 删除所选用户
function deleteUser() {
  let $tr = this.$Q('[data-user-table] tbody > tr');
  let userIds = [];

  layer.confirm("您确定要删除所选用户吗？", function (index) {
    $tr.each(function () {
      if ($(this).find(':checkbox').is(':checked')) {
        userIds.push(vm.table.row($(this)).data().userId);
      }
    });

    POST('/api/user/delete', {userId: userIds})
      .done(function (data) {
        if (data.success) {
          $tr.each(function () {
            if ($(this).find(':checkbox').is(':checked')) {
              vm.table.row($(this)).remove().draw(false);
            }
          });

          toastr.success('删除成功！');
          layer.close(index);
          hideActions()
        } else {
          toastr.error('出错了，请重试！');
        }
      })
      .fail(function () {
        toastr.error('服务器异常，请稍后再试！');
      });
  }, hideActions);
}

// 禁用选中用户
function forbidden() {
  var $tr = $('#user_tables').find('tbody > tr'),
    userIds = [];

  layer.confirm('你确定要禁用所选用户吗？', function (index) {
    $tr.each(function () {
      if ($(this).find(':checkbox').is(':checked')) {
        userIds.push(vm.table.row($(this)).data().userId);
      }
    });

    POST('/api/user/forbid', {userId: userIds})
      .done(function (data) {
        if (data.success) {
          $tr.each(function () {
            if ($(this).find(':checkbox').is(':checked')) {
              $(this).addClass('disabled');
              vm.table.row($(this)).data().state = 'FORBIDDEN';
            }
          });

          toastr.success('已禁用选中用户！');
          layer.close(index);
          vm.actionBtn.hide();
        } else {
          toastr.error('出错了，请重试！');
        }
      })
      .fail(function () {
        toastr.error('服务器异常，请稍后再试！');
      })
  }, hideActions);
}

// 删除当前角色
function deleteRole (e) {
  var $item = $(this).closest("div.list-group-item"),
    dataUser = $item.attr("data-user"),
    dataId = $item.attr("data-id");

  layer.confirm("您确定要删除该角色吗？", function (index) {
    POST('/api/role/delete?roleId=' + dataId)
      .done(function (data) {
        var $itemNext, $itemPrev, _callback = vm.reloadRole;

        if (data.success) {
          $itemNext = $item.next('.list-group-item');
          $itemPrev = $item.prev('.list-group-item');
          vm.allUsers -= dataUser;
          $("[data-allUsers]").attr("data-allUsers", vm.allUsers).text(vm.allUsers);

          if ($itemNext.length) {
            _callback.call(vm, $itemNext);
          } else if ($itemPrev.length) {
            _callback.call(vm, $itemPrev);
          } else {
            _callback.call(vm, $('#allUsers'));
          }

          $item.remove();
          toastr.success("角色删除成功！");
          layer.close(index);
        } else {
          toastr.error(data.msg);
        }
      })
      .fail(function () {
        toastr.error('服务器异常，请稍后再试！');
      })
  });

  e.stopPropagation();
}

export default {
  name: 'user',
  components: components(UserEdit, RoleEdit),
  created () {
    vm = this
    console.log('created user: ', vm.$children)
  },
  data () {
    return {
      total: 4,
      currentRole: null,
      currentUser: null,
      roles: [
        { id: 0, name: '系统管理员', count: 2 },
        { id: 1, name: '项目经理', count: 1 },
        { id: 2, name: '程序员', count: 1 }
      ]
    }
  },
  // dom: {dataTable: '.dataTable'},
  children: {userEdit: 'userEdit', roleEdit: 'roleEdit'},
  mounted () {
    this.elClicked('[data-tag="list-delete"]', deleteRole)
    this.elClicked('.page-users button[data-toggle=edit]', editUser)
    // 选中当前角色，加载相关用户
    this.elClicked(
      '.page-aside-inner .page-aside-section:not(.hidden-xs) .list-group-item',
        function () { vm.reloadRole($(this)); }
    );

    let actionBtn = this.actionBtn = $('.site-action').actionBtn().data('actionBtn');
    let $selectable = $('.dataTable');

    vm.table = $('.dataTable').DataTable($.po('dataTable', UserTable(vm.currentUser)));
    $selectable.asSelectable($.po('selectable', $(this).data()));

    // 表格选中项对应右下角按钮状态
    $(this.$el).on('asSelectable::change', '.dataTable', function (e, api, checked) {
      if (checked) {
        actionBtn.show();
      } else {
        actionBtn.hide();
      }
    });
  },
  methods: {
    elClicked (selector, listener) {
      return $(this.$el).on('click', selector, listener)
    },
    forbidden,
    deleteUser,
    editUser,
    editRole (role) {
      var $item = $(this);
      vm.$currentRole = $item.closest('div.list-group-item');
      // e.stopPropagation();
      this.roleEdit.edit(role)
    },
    siteActionClicked (e) {
      // 新增用户
      this.currentRow = undefined;
      this.userEdit.create()
      e.stopPropagation();
    },
    reloadRole ($item) {
      var $parents = $('.page-aside-inner'),
        ID = $item.attr('data-id'),
        url = $.ctx + (typeof ID === 'undefined' ? '/role/user' : '/role/user?roleId=' + ID);

      if (!$item.is('.active')) {
        $parents.find('.list-group-item').removeClass('active');
        $item.addClass('active');
        this.table.ajax.url(url).load();
      }
    }
  }
}
</script>

<style>
  @media (max-width: 767px) {
    .page-content-actions .actions-right {
      display: block;
      float: none;
    }
    .page-content-actions .actions-right .dropdown-toggle {
      border-color: #e4eaec;
    }
  }
  @media (max-width: 480px) {
    .page-header .page-header-actions {
      position: relative;
      top: 0;
      right: 0;
      margin-top: 20px;
      -webkit-transform: none;
      -ms-transform: none;
      -o-transform: none;
      transform: none;
    }
  }
</style>
