<template>
<div class="page-manager-content">
  <div class="page-crumbs"><span class="highlight">员工管理&nbsp;&frasl;</span>&nbsp;员工权限管理</div>
  <div class="page-aside">
    <div class="page-aside-switch j-page-aside-switch">
      <i class="icon wb-chevron-left" aria-hidden="true"></i>
      <i class="icon wb-chevron-right" aria-hidden="true"></i>
    </div>
    <div class="user-total" :class="{active: markRoleList === -1}" @click="filterAllStaff"><span>所有用户</span><span>{{usersAmount}}</span></div>
    <div class="user-title">角色</div>
    <ul class="user-list j-user-list">
      <li v-for="(item, index) in roles" :key="item.id" @click="filterStaffByRole(item, index)" :class="{active: index === markRoleList}">
        <span class="type">{{item.name}}</span><span class="amount">{{item.usersCount}}</span>
        <div class="operate-group">
          <a href="javascript:;" @click.stop="clickModifyRole(item)"><i class="iconfont icon-pen"></i></a>
          <a href="javascript:;" @click.stop="clickDeleteRole(item, index)"><i class="iconfont icon-close"></i></a>
        </div>
      </li>
    </ul>
    <div class="user-add">
      <button class="btn btn-default" @click="clickAddRole"><i class="iconfont icon-add"></i>新增角色</button>
    </div>
  </div>
  <div class="page-main">
    <div class="btn-operate-group">
      <button class="btn btn-primary" @click="clickAddStaff"><i class="iconfont icon-add"></i>新增</button>
      <!--<button class="btn btn-primary" @click="clickDeleteStaffs"><i class="iconfont icon-close"></i>删除</button>-->
    </div>
    <!--<base-loading :loading="tableLoading"></base-loading>-->
    <v-table is-horizontal-resize
             is-vertical-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#f0f2f9"
             :title-row-height="52"
             :is-loading="tableLoading"
             :height="455"
             :min-height="455"
             :columns="columns"
             :table-data="users"
             :show-vertical-border="false"></v-table>
    <div class="paging" v-if="staff.totalPage > 1">
      <v-pagination :total="usersAmount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
    </div>
  </div>

  <!--添加员工-->
  <div class="layer-add-staff layer-open" id="addStaffLayer">
    <form data-vv-scope="staffForm">
      <div class="form-group"><label for="">用户名 <small class="error" v-show="errors.has('staffForm.username')">（*{{ errors.first('staffForm.username') }}）</small></label>
        <input v-model="staffParam.username"
               v-validate="'required|username:3,18'"
               data-vv-as="用户名"
               name="username"
               type="text"
               class="form-control"
               placeholder="请输入3-18位由字母或数字组成的用户名">
      </div>
      <div class="form-group"><label for="">设置密码 <small class="error" v-show="errors.has('staffForm.password')">（*{{ errors.first('staffForm.password') }}）</small></label>
        <input v-model="staffParam.password"
               v-validate="'required|password:6,18'"
               type="password"
               name="password"
               class="form-control"
               placeholder="请输入6-18位数密码">
      </div>
      <div class="form-group"><label for="">确认密码 <small class="error" v-show="errors.has('staffForm.repassword')">（*{{ errors.first('staffForm.repassword') }}）</small></label>
        <input v-model="staffParam.rePassword"
               v-validate="{required: true, password: [6, 18], repassword: [staffParam.password]}"
               data-vv-as="密码"
               type="password"
               name="repassword"
               class="form-control"
               placeholder="请再次输入6-18位数密码">
      </div>
      <div class="form-group">
        <label for="">选择角色 <small class="error" v-show="selectedRoles !== null && selectedRoles.length === 0">（*至少选择一个角色）</small></label>
        <div class="role-box clearfix">
          <div class="role-box-ul-box rol-all-box">
            <ul class="j-role-list">
              <li v-for="item in roles" :key="item.id" @click="selectStaffRoles(item)"><span>{{item.name}}</span><i class="iconfont icon-add"></i></li>
            </ul>
          </div>
          <div class="icon-box"><i class="iconfont icon-jiaohuan"></i></div>
          <div class="role-box-ul-box role-selected-box">
            <div class="no-data" v-show="selectedRoles == null || selectedRoles.length === 0">请从左侧给员工添加角色</div>
            <ul class="j-role-list" v-show="selectedRoles !== null && selectedRoles.length > 0">
              <li v-for="(item, index) in selectedRoles" :key="item.id" @click="deleteSelectedStaffRole(item, index)"><span>{{item.name}}</span><i class="iconfont icon-minus"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </form>
    <div class="form-group layer-btn-operate-group">
      <button class="btn btn-default" @click="cancelLayer">取消</button>
      <button class="btn btn-primary" @click="submitAddStaff">确认</button>
    </div>
  </div>

  <!--新增角色-->
  <div class="layer-add-role layer-open" id="addRoleLayer">
    <form data-vv-scope="roleForm" class="clearfix">
      <div class="row">
        <div class="form-group col-xs-6"><label for="">角色名称  <small class="error"  v-show="errors.has('roleForm.roleName')">*（{{ errors.first('roleForm.roleName') }}）</small></label>
          <input v-model="roleParam.name"
                 v-validate="'required'"
                 data-vv-as="角色名"
                 name="roleName"
                 type="text"
                 class="form-control"
                 placeholder="请输入角色名称">
        </div>
        <div class="form-group col-xs-6"><label for="">备注</label>
          <input v-model="roleParam.description" type="text" class="form-control" placeholder="请输入备注">
        </div>
      </div>
      <div class="row">
        <div class="form-group col-xs-6"><label for="">权限分配 <small class="error" v-show="selectedMenus !== null && selectedMenus.length === 0">*（请至少分配一个权限）</small></label>
          <div class="input-group">
            <div class="input-group-btn">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{pmsnSearchType.name}}<span class="caret"></span></button>
              <ul class="dropdown-menu">
                <li @click="filterMenus({id:0, name:'店长权限'})"><a href="#">店长权限</a></li>
                <li @click="filterMenus({id:1, name:'收营员权限'})"><a href="#">收营员权限</a></li>
              </ul>
            </div><!-- /btn-group -->
            <input v-model="pmsnSearchKey" @change="searchMenus" type="text" class="form-control" placeholder="快速查找">
            <div class="input-group-btn"><button class="btn btn-default" type="button" @click="searchMenus"><i class="iconfont icon-search"></i></button></div>
          </div>
        </div>
        <div class="form-group col-xs-6 tree-operate-group">
          <a href="javascript:;" :class="{active: treeExpand === true}" @click="expandTree(true)">全部展开</a>
          <a href="javascript:;" :class="{active: treeExpand === false}" @click="expandTree(false)">全部收起</a>
        </div>
      </div>
      <div class="permission-tree-box">
        <v-tree ref='permissionTree' :data='menus' :multiple='true' :halfcheck='true' @node-click="nodeClickDemo"/>
      </div>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer" type="button">取消</button>
        <button class="btn btn-primary" @click="submitAddRole" type="button">确认</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../static/vendor/layer/layer'
  import moment from 'moment'
  import { subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE} from '../core/http'

  let vm;
  let tempMenus = [];
  function openRoleLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['700px', '640px'],
      content: $('#addRoleLayer'),
      success() {
        vm.$validator.errors.clear('roleForm');
        $('.permission-tree-box').slimScroll({
          height: '320px'
        })
      },
      cancel() {
        // layer.msg("我是取消回调")
      },
      end() {
        clearRoleParams();
        // layer.msg("我是销毁回调")
      }
    })
  }
  function openUserLayer (title) {
    this.layerId = layer.open({
      type: 1,
      title,
      area: ['700px', '640px'],
      content: $('#addStaffLayer'),
      success() {
        vm.$validator.errors.clear('staffForm');
        $('.j-role-list').slimScroll({
          height: '178px'
        })
      },
      end() {
        clearUserParams();
        // layer.msg("我是销毁回调")
      }
    })
  }
  function recursiveMenuTree(menus, callback) {
    menus.forEach(tMenu => {
      callback(tMenu);
      if (tMenu.children && tMenu.children.length > 0) {
        recursiveMenuTree(tMenu.children, callback);
      }
    })
  }
  function findParent (menuTree, menuNode) {
    return menuTree.some(pMenu => {
      if (pMenu.id === menuNode.parentId) {
        if (!pMenu.children) {
          pMenu['children'] = [];
          pMenu['expanded'] = false;
        }
        pMenu.children.push(menuNode);
        return true;
      }
    })
  }
  function recursiveTempMenuTree (menuTree, menuNode) {
    if (!findParent(menuTree, menuNode)) {
      menuTree.some(pMenus => {
        if (pMenus.children) {
          recursiveTempMenuTree(pMenus.children, menuNode);
        }
      })
    }
  }
  function formatMenus (menus) {
    menus.forEach(item => {
      let menu = $.extend(item, {title: item.name, checked: false, visible: item.type === vm.pmsnSearchType.id});
      if (menu.parentId === 0) {
        menu['expanded'] = false;
        tempMenus.push(menu);
      } else {
        recursiveTempMenuTree(tempMenus, menu);
      }
    })
    console.log('-----------tempMenus-------------', tempMenus)
    vm.menus = tempMenus;
  }
  function clearMenuChecked (menus) {
    recursiveMenuTree(menus, function (tMenu) {
      tMenu.checked = false;
      tMenu['selected'] = false;
    })
  }
  //新增和修改完成时，清除参数
  function clearRoleParams () {
    vm.roleParam = {
      name: '',
      menuIds: [],
      description: ''
    }
    clearMenuChecked(vm.menus);
    vm.selectedMenus = null;
  }
  function clearUserParams () {
    vm.staffParam = {
      username: '',
      password: '',
      rePassword: '',
      roleIds: []
    }
    vm.selectedRoles = null;
    // vm.$validator.errors.clear();
  }
  //修改角色时，设置角色权限树的选中状态
  function setMenuTreeStatus (menus, oMenu) {
    recursiveMenuTree(menus, function (tMenu) {
      if (tMenu.id === oMenu.id) {
        tMenu.checked = true;
      }
    })
    // menus.forEach(tMenu => {
    //   if (tMenu.id === oMenu.id) {
    //     tMenu.checked = true;
    //   }
    //   if (tMenu.children && tMenu.children.length > 0) {
    //     setMenuTreeStatus(tMenu.children, oMenu);
    //   }
    // })
  }
  function getMenus (roleId) {
    let url = !roleId ? '/api/permission/role/menu/' : `/api/permission/role/${roleId}/menu/`
    GET(url)
      .done(data => {
        formatMenus(data)
        // formatMenus(aa)
        console.log('--------role-menus--------', data)
      })
  }
  function getAllRole () {
    GET('/api/core/role/')
      .done(data => {
        vm.roles = data.roles;
        vm.usersAmount = data.usersCount;
      })
  }
  function getAllUser (id) {
    let url = !vm.staff.roleId ? '/api/permission/role/user/' : `/api/permission/role/${vm.staff.roleId}/user/`;
    vm.tableLoading = true;
    GET(url, {
      page: vm.staff.page,
      size: vm.staff.size
    })
      .done(data => {
        vm.tableLoading = false;
        vm.users = data.content;
        vm.staff.totalPage = data.totalPages
      })
  }
  function getRolePmsn(id) {
    return new Promise((resolve, reject) => {
      GET(`/api/permission/role/${id}/menu/`)
        .done(data => {
          resolve(data);
        })
        .fail((error) => {
          reject(error);
        })
    });
  }
  function postAddRole () {
    // clearRoleParams()
    POST('/api/core/role/', vm.roleParam)
      .done(() => {
        getAllRole();
        clearRoleParams();
        layer.close(vm.layerId);
        layer.msg('新增角色成功！');
      })
  }
  function postAddUser () {
    POST('/api/core/user/', vm.staffParam)
      .done(() => {
        getAllUser();
        getAllRole();
        clearUserParams();
        layer.close(vm.layerId);
        layer.msg('新增员工成功！')
      })
  }
  function deleteRole (id) {
    return new Promise((resolve, reject) => {
      DELETE(`/api/core/role/${id}`)
        .done(data => {
          resolve();
        })
        .fail((error) => {
          reject(error)
        })
    })
  }
  function deleteUser (id) {
    return new Promise((resolve, reject) => {
      DELETE(`/api/core/user/${id}`)
        .done(() => {
          resolve();
        })
        .fail((error) => {
          reject(error)
        })
    })
  }
  function putModifyRole (id) {
    // clearRoleParams()
    PUT(`/api/core/role/${id}`, vm.roleParam)
      .done(() => {
        getAllRole();
        clearRoleParams();
        layer.close(vm.layerId);
        layer.msg('修改角色成功！')
      })
  }
  function putModifyUser (id) {
    PATCH(`/api/core/user/${id}`, vm.staffParam)
      .done(() => {
        getAllRole();
        getAllUser();
        layer.close(vm.layerId);
        layer.msg('修改员工成功！')
        clearUserParams();
      })
  }

  export default {
    name: 'staff-authority-manage',
    data() {
      return {
        layerId: null,
        roleLayerType: null, //0 新增 1 修改
        staffLayerType: null,
        treeExpand: null,
        tableLoading: false,
        pmsnSearchType: {
          id: 0,
          name: '店长权限'
        },
        pmsnSearchKey: '',
        markRoleList: null,
        menus: [],
        roles: [],
        users: [],
        selectedRoles: null,
        selectedMenus: null,
        usersAmount: null,
        roleParam: {
          name: '',
          menuIds: [],
          description: ''
        },
        staffParam: {
          username: '',
          password: '',
          rePassword: '',
          roleIds: []
        },
        staff: {
          roleId: null,
          page: 0,
          size: 10,
          totalPage: 0
        },
        columns: [
          {field: 'id', title:'序号', width: 50, titleAlign: 'center', columnAlign:'center', isResize: true},
          // {width: 40, titleAlign: 'center', columnAlign:'center',type: 'selection', isResize: true},
          {field: 'username', title:'账号', width: 100, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'quanxian', title:'权限', width: 60, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'name', title:'姓名', width: 70, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'mobile', title:'手机号', width: 100, titleAlign: 'center', columnAlign:'center', isResize: true, formatter(rowData) { return rowData.mobile || '--' }},
          {field: 'loginCount', title:'登录次数', width: 70, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'enabled', title:'状态', width: 100, titleAlign: 'center', columnAlign:'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'createdAt', title:'创建时间', width: 120, titleAlign: 'center', columnAlign:'center', isResize: true, formatter() { return moment().format('YYYY-MM-DD') }},
          {field: 'operate', title:'操作', width: 80, titleAlign: 'center', columnAlign:'center', componentName: 'BaseTableOperation', isResize: true}
        ]
      }
    },
    methods: {
      clickAddRole() {
        this.roleLayerType = 0;
        openRoleLayer.call(this, '新增角色')
      },
      clickAddStaff() {
        this.staffLayerType = 0;
        openUserLayer.call(this, '添加员工')
      },
      submitAddRole() {
        this.selectedMenus = this.$refs.permissionTree.getCheckedNodes()
        this.$validator.validateAll('roleForm').then(() => {
          const error = vm.$validator.errors;
          if (error.any() || vm.selectedMenus === null || vm.selectedMenus.length === 0) {
            layer.msg('你还有错误消息未处理！')
          } else {
            vm.roleParam.menuIds = vm.selectedMenus.map(item => {
              return item.id;
            })
            console.log(this.$refs.permissionTree.getCheckedNodes())
            if (this.roleLayerType === 0) {
              postAddRole()
            } else if (this.roleLayerType === 1) {
              putModifyRole(this.roleParam.id);
            }
          }
        })
      },
      submitAddStaff() {
        this.$validator.validateAll('staffForm').then(() => {
          const error = vm.$validator.errors;
          if (error.any() || vm.selectedRoles === null || vm.selectedRoles.length === 0) {
            // layer.msg(vm.$validator.errors.items[0].msg)
            layer.msg('你还有错误消息未处理！')
            if (vm.selectedRoles === null) vm.selectedRoles = [];
          } else {
            this.staffParam.roleIds = this.selectedRoles.map(item => {
              return item.id;
            })
            console.log(this.staffParam.roleIds)
            if (this.staffLayerType === 0) {
              postAddUser()
            } else if (this.staffLayerType === 1) {
              putModifyUser(this.staffParam.id)
            }
          }
        })
      },

      clickDeleteRole(role, index) {
        this.layerId = layer.confirm('是否要删除该角色', {
          icon: 8,
          btn: ['是', '否']
        }, function () {
          deleteRole(role.id).then(() => {
            getAllRole();
            this.selectedRoles.splice(index, 1);
            layer.msg("删除角色成功");
          })
          layer.close(vm.layerId)
        });
      },
      deleteOneStaff(msd, params) {
        this.layerId = layer.confirm('是否要删除该用户', {
          icon: 8,
          btn: ['是', '否']
        }, function () {
          deleteUser(params.rowData.id).then(() => {
            getAllRole()
            vm.users.splice(params.index, 1)
            layer.close(vm.layerId)
            layer.msg(`${params.rowData.username}已被删除`);
          })
        });
      },

      clickModifyRole(role) {
        vm.roleParam.name = role.name;
        vm.roleParam.id = role.id;
        getRolePmsn(role.id).then(rolePmsn => {
          rolePmsn.forEach(oMenu => {
            setMenuTreeStatus(vm.menus, oMenu);
          })
          // vm.roleParam.menuIds = data.map(item => {
          //   return item.id;
          // })
          console.log('修改角色', vm.roleParam.menuIds)
        })
        this.roleLayerType = 1
        openRoleLayer('修改角色');
      },
      modifyStaff(msg, params) {
        console.log("修改员工")
        vm.staffParam.id = params.rowData.id;
        vm.staffParam.username = params.rowData.username;
        //TODO: vm.staffParam.roleIds = []
        this.staffLayerType = 1
        openUserLayer.call(this, '修改员工')
      },
      modifyStaffStatus(msd, id) {
        DELETE(`/api/core/user/${id}`)
      },

      //添加|修改角色时，搜索菜单
      searchMenus(event) {
        this.$refs.permissionTree.searchNodes(this.pmsnSearchKey)
      },
      //选择店长或收营员的权限菜单
      filterMenus(type) {
        this.pmsnSearchType.id = type.id
        this.pmsnSearchType.name = type.name
        recursiveMenuTree(vm.menus, function (tMenu) {
          tMenu.visible = tMenu.type === type.id
        })
      },
      filterAllStaff() {
        this.markRoleList = -1;
        vm.staff.roleId = null;
        getAllUser();
      },
      filterStaffByRole(role, index) {
        this.markRoleList = index;
        vm.staff.roleId = role.id;
        getAllUser();
      },

      selectStaffRoles(role) {
        if (this.selectedRoles === null) this.selectedRoles = [];
        const selected = this.selectedRoles.some(item => {
          if (item.id === role.id) return true;
        })
        if (!selected) this.selectedRoles.push(role);
      },
      deleteSelectedStaffRole(staff, index) {
        this.selectedRoles.splice(index, 1);
      },

      pageChange(pageIndex) {
        vm.staff.page = pageIndex - 1;
        getAllUser();
      },
      pageSizeChange(newPageSize) {
        vm.staff.size = newPageSize;
        getAllUser();
      },

      cancelLayer() {
        layer.close(this.layerId)
      },
      expandTree(status) {
        this.treeExpand = status;
        this.menus.map((item, index) => {
          vm.$set(vm.menus, index, Object.assign(vm.menus[index], {expanded: status}))
        })
      },

      nodeClickDemo() {
        console.log('select permission', this.$refs.permissionTree.getSelectedNodes().map(item => {
          return item.id;
        }))
      }
    },
    created() {
      vm = this;
      getMenus();
      getAllRole();
      getAllUser();
      subscribe('modify.table.operate', this.modifyStaff)
      subscribe('delete.table.operate', this.deleteOneStaff)
      subscribe('click.switch', this.modifyStaffStatus)
    },
    mounted() {
      $('.j-user-list').slimScroll({
        height: '500px'
      })
      // $("[style]").map((index, item) => {
        // console.log('00000000000', $(item).attr('class'));
        // if ($(item).attr('class').search('v-table') >= 0) {
        //   $(item).removeAttr('style');
        // }
      // })
    }
  }
</script>
<style lang="scss">
  .v-table-title-class{
    .v-table-title-cell{
      /*height: 52px !important;*/
      background-color: #f0f2f9;
      border-bottom: 2px solid #d6d6d6 !important;
    }
  }
  .v-table-views{
    /*height: 570px;*/
    border: none;
    /*width: calc(100% - 20px) !important;*/
  }
  .v-table-body-cell{
    border-style: dashed;
  }
</style>
<style scoped lang="scss">
  @import "../sass/staff-manage.scss";
</style>
