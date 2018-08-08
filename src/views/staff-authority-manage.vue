<template>
<div class="page-manager-content">
  <div class="page-crumbs"><span class="highlight">员工权限&nbsp;&frasl;</span>&nbsp;员工权限管理</div>
  <div class="page-aside">
    <div class="user-total"><span>所有用户</span><span>{{roles.length}}</span></div>
    <div class="user-title">角色</div>
    <ul class="user-list j-user-list">
      <li v-for="(item, index) in roles" :key="item.id">
        <span class="type">{{item.name}}</span><span class="amount">{{item.count}}</span>
        <div class="operate-group">
          <a href="javascript:;" @click="clickModifyRole(item)"><i class="iconfont icon-pen"></i></a>
          <a href="javascript:;" @click="deleteRole(index)"><i class="iconfont icon-close"></i></a>
        </div>
      </li>
    </ul>
    <div class="user-add">
      <button class="btn btn-default" @click="clickAddRole"><i class="iconfont icon-add"></i>新增角色</button>
    </div>
  </div>
  <div class="page-main">
    <div class="btn-operate-group">
      <button class="btn btn-primary" @click="addStaff"><i class="iconfont icon-add"></i>新增</button>
      <button class="btn btn-primary" @click="deleteStaff"><i class="iconfont icon-close"></i>删除</button>
    </div>
    <v-table is-horizontal-resize
             is-vertical-resize
             style="width:100%"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             title-bg-color="#f0f2f9"
             :title-row-height="52"
             :height="455"
             :min-height="455"
             :columns="columns"
             :table-data="tableData"
             :show-vertical-border="false"
             @modify-table-operate="modifyStaff"
             @delete-table-operate="deleteOneStaff"></v-table>
    <div class="paging">
      <v-pagination :total="600"></v-pagination>
    </div>
  </div>

  <!--添加员工-->
  <div class="layer-add-staff" id="addStaffLayer">
    <form action="">
      <div class="form-group"><label for="">用户名</label><input type="text" class="form-control"></div>
      <div class="form-group"><label for="">设置密码</label><input type="password" class="form-control"></div>
      <div class="form-group"><label for="">确认密码</label><input type="password" class="form-control"></div>
      <div class="form-group">
        <label for="">选择角色 <small>（点击左侧角色即可添加）</small></label>
        <div class="role-box clearfix">
          <ul class="role-all-box">
            <li><span>管理员</span><i class="iconfont icon-add"></i></li>
            <li><span>老板</span><i class="iconfont icon-add"></i></li>
            <li><span>店长</span><i class="iconfont icon-add"></i></li>
            <li><span>收营员</span><i class="iconfont icon-add"></i></li>
            <li><span>其他</span><i class="iconfont icon-add"></i></li>
          </ul>
          <div class="icon-box"><i class="iconfont icon-jiaohuan"></i></div>
          <ul class="role-selected-box">
            <li><span>店长</span><i class="iconfont icon-minus"></i></li>
            <li><span>收营员</span><i class="iconfont icon-minus"></i></li>
          </ul>
        </div>
      </div>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary">确认</button>
      </div>
    </form>
  </div>

  <!--新增角色-->
  <div class="layer-add-role" id="addRoleLayer">
    <form action="" class="clearfix">
      <div class="row">
        <div class="form-group col-xs-6"><label for="">角色名称</label><input v-model="roleParams.name" type="text" class="form-control" placeholder="请输入角色名称"></div>
        <div class="form-group col-xs-6"><label for="">备注</label><input v-model="roleParams.beizhu" type="text" class="form-control" placeholder="请输入备注"></div>
      </div>
      <div class="row">
        <div class="form-group col-xs-6"><label for="">权限分配</label>
          <div class="input-group">
            <div class="input-group-btn">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">店长权限<span class="caret"></span></button>
              <ul class="dropdown-menu">
                <li><a href="#">店长权限</a></li>
                <li><a href="#">收营员权限</a></li>
              </ul>
            </div><!-- /btn-group -->
            <input v-model="pmsnSearchKey" @change="searchPermission" type="text" class="form-control" placeholder="快速查找">
            <div class="input-group-btn"><button class="btn btn-default" type="button" @click="searchPermission"><i class="iconfont icon-search"></i></button></div>
          </div>
        </div>
        <div class="form-group col-xs-6 tree-operate-group">
          <a href="javascript:;" :class="{active: treeExpand === true}" @click="expandTree(true)">全部展开</a>
          <a href="javascript:;" :class="{active: treeExpand === false}" @click="expandTree(false)">全部收起</a>
        </div>
      </div>
      <div class="permission-tree-box">
        <v-tree ref='permissionTree' :data='menus' :multiple='true' :halfcheck='true' @node-click="selectPmsn"/>
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
  import { subscribe } from 'pubsub-js'
  import {GET, POST, Formed} from '../core/http'

  let vm;
  let tempMenus = [];
  function openRoleLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['700px', '640px'],
      content: $('#addRoleLayer'),
      success() {
        $('.permission-tree-box').slimScroll({
          height: '320px'
        })
      },
      cancel() {
        // layer.msg("我是取消回调")
      },
      end() {
        clearRoleParams();
        layer.msg("我是销毁回调")
      }
    })
  }
  function openStaffLayer (title) {
    this.layerId = layer.open({
      type: 1,
      title,
      area: ['700px', '640px'],
      content: $('#addStaffLayer')
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
  function recursiveMenu (tMenus, oMenu) {
    tMenus.some(pm => {
      if (oMenu.parent === pm.path) {
        if (!pm['children']) {
          pm['children'] = [];
          pm['expanded'] = true;
        }
        pm.children.push(oMenu);
        return true;
      } else if (oMenu.path.search(pm.path) >= 0) {
        if (!pm['children']) {
          pm['children'] = [];
          // pm['expanded'] = true;
          pm.children.push(oMenu);
        } else {
          recursiveMenu(pm.children, oMenu);
        }
        return true;
      }
    })
  }
  function formatMenus (menus) {
    menus.forEach(item => {
      let menu = $.extend(item, {title: item.name, checked: false});
      if (menu.parent === '/') {
        menu['expanded'] = false;
        tempMenus.push(menu);
      } else {
        recursiveMenu(tempMenus, menu);
      }
    })
    vm.menus = tempMenus;
  }
  function clearMenuChecked (menus) {
    recursiveMenuTree(menus, function (tMenu) {
      tMenu.checked = false;
      tMenu['selected'] = false;
    })
  }
  //新增和修改角色完成时，清除角色参数
  function clearRoleParams () {
    vm.roleParams = {
      name: '',
      menuIds: [],
      beizhu: ''
    }
    clearMenuChecked(vm.menus)
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
  function getMenus () {
    GET('/api/permission/role/2/menu/')
      .done(data => {
        // formatMenus(data)
        formatMenus(aa)
        console.log('role-menus', vm.menus)
      })
  }
  function getAllRole () {
    GET('/api/core/role/')
      .done(data => {
        vm.roles = data;
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
    clearRoleParams()
    // POST('/api/core/role/', vm.roleParams)
    //   .done(() => {
    //     clearRoleParams();
    //     layer.msg('新增成功！')
    //   })
  }
  const aa = [{"id":1,"name":"系统管理","path":"/system","parent":"/","icon":"wb-settings","ordinal":7,"buttons":[]},
    // {"id":2,"name":"充值","path":"/recharge","parent":"/","icon":"wb-settings","ordinal":7,"buttons":[]},
    {"id":3,"name":"商品销售","path":"/goods","parent":"/","icon":"wb-settings","ordinal":0,"buttons":[]},
    {"id":4,"name":"网吧管理","path":"/bar","parent":"/","icon":"wb-settings","ordinal":1,"buttons":[]},
    {"id":5,"name":"会员管理","path":"/member","parent":"/","icon":"wb-settings","ordinal":2,"buttons":[]},
    // {"id":6,"name":"经营管理","path":"/operation","parent":"/","icon":"wb-settings","ordinal":3,"buttons":[]},
    // {"id":7,"name":"进销存管理","path":"/goods","parent":"/","icon":"wb-settings","ordinal":4,"buttons":[]},
    // {"id":8,"name":"交班管理","path":"/next","parent":"/","icon":"wb-settings","ordinal":5,"buttons":[]},
    // {"id":9,"name":"店长工具","path":"/keeper","parent":"/","icon":"wb-settings","ordinal":6,"buttons":[]},
    {"id":2000,"name":"系统信息","path":"/system/info","parent":"/system","icon":"wb-settings","ordinal":0,"buttons":[]},
    {"id":2001,"name":"菜单管理","path":"/system/menu","parent":"/system","icon":"wb-settings","ordinal":0,"buttons":[]},
    {"id":2002,"name":"用户管理","path":"/system/user","parent":"/system","icon":"wb-settings","ordinal":0,"buttons":[]},
    {"id":2003,"name":"日志信息","path":"/system/log","parent":"/system","icon":"wb-settings","ordinal":0,"buttons":[]},
    {"id":2004,"name":"系统设置","path":"/system/settings","parent":"/system","icon":"wb-settings","ordinal":0,"buttons":[]},
    {"id":2005,"name":"显示设置","path":"/system/settings/ui","parent":"/system/settings","icon":"wb-settings","ordinal":0,"buttons":[]},
    {"id":3001,"name":"我的账户","path":"/account/me","parent":"/account","icon":"wb-settings","ordinal":0,"buttons":[]}]
  export default {
    name: 'staff-authority-manage',
    data() {
      return {
        layerId: null,
        treeExpand: null,
        pmsnSearchKey: '',
        menus: [],
        roles: [],
        roleParams: {
          name: '',
          menuIds: [],
          beizhu: ''
        },
        tableData: [
          {id: 1, account_id: 13312568889, quanxian: '店长', name: '小明明', cishu: 27, status: true, new_time: '2018-05-14 12:45'},
          {id: 2, account_id: 15488887777, quanxian: '收营员', name: '小明明', cishu: 27, status: true, new_time: '2018-05-14 12:45'},
          {id: 3, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 4, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 5, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 6, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 7, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 8, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 9, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 10, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 11, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 12, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'},
          {id: 13, account_id: 18795841254, quanxian: '店长', name: '小明明', cishu: 27, status: false, new_time: '2018-05-14 12:45'}
        ],
        columns: [
          {field: 'id', title:'序号', width: 50, titleAlign: 'center', columnAlign:'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign:'center',type: 'selection', isResize: true},
          {field: 'account_id', title:'账号', width: 100, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'quanxian', title:'权限', width: 60, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'name', title:'姓名', width: 70, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'cishu', title:'登录次数', width: 70, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'status', title:'状态', width: 100, titleAlign: 'center', columnAlign:'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'new_time', title:'创建时间', width: 120, titleAlign: 'center', columnAlign:'center', isResize: true},
          {field: 'operate', title:'操作', width: 80, titleAlign: 'center', columnAlign:'center', componentName: 'BaseTableOperation', isResize: true}
        ]
      }
    },
    methods: {
      submitAddRole() {
        this.roleParams.menuIds = this.$refs.permissionTree.getCheckedNodes().map(item => {
          return item.id;
        })
        console.log(this.$refs.permissionTree.getCheckedNodes())
        postAddRole()
      },
      selectPmsn() {
        console.log('select permission', this.$refs.permissionTree.getSelectedNodes().map(item => {
          return item.id;
        }))
      },
      clickAddRole() {
        openRoleLayer.call(this, '新增角色')
      },
      clickModifyRole(role) {
        vm.roleParams.name = role.name;
        getRolePmsn(role.id).then(rolePmsn => {
          rolePmsn.forEach(oMenu => {
            setMenuTreeStatus(vm.menus, oMenu);
          })
          // vm.roleParams.menuIds = data.map(item => {
          //   return item.id;
          // })
          console.log('修改角色', vm.roleParams.menuIds)
        })
        openRoleLayer('修改角色');
      },
      deleteRole() {
        this.layerId = layer.confirm('是否要删除该角色', {
          icon: 8,
          btn: ['是', '否']
        }, function () {
          layer.close(vm.layerId)
        });
      },
      addStaff() {
        openStaffLayer.call(this, '添加员工')
      },
      deleteStaff(index) {
      },
      deleteOneStaff(msd, index) {
        this.layerId = layer.confirm('是否要删除该用户', {
          icon: 8,
          btn: ['是', '否']
        }, function () {
          vm.tableData.splice(index, 1)
          layer.close(vm.layerId)
        });
      },
      modifyStaff(params) {
        console.log("修改员工")
        openStaffLayer.call(this, '修改员工')
      },
      cancelLayer() {
        layer.close(this.layerId)
      },
      searchPermission(event) {
        this.$refs.permissionTree.searchNodes(this.pmsnSearchKey)
      },
      expandTree(status) {
        this.treeExpand = status;
        this.menus.map((item, index) => {
          vm.$set(vm.menus, index, Object.assign(vm.menus[index], {expanded: status}))
        })
      }
    },
    created() {
      vm = this;
      getMenus();
      getAllRole();
      subscribe('modify.table.operate', this.modifyStaff)
      subscribe('delete.table.operate', this.deleteOneStaff)
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
