<template>
  <div class="modal fade" id="roleForm" aria-hidden="true" aria-labelledby="roleForm" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-center">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-hidden="true" data-dismiss="modal">×</button>
          <h4 class="modal-title">角色信息</h4>
        </div>
        <form action="" method="post" id="roleInfo">
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label">角色名称：</label>
              <input type="text" class="form-control" v-model="role.name">
            </div>
            <div class="form-group">
              <label class="control-label">权限分配：</label>
              <div class="jstree-box">
                <div class="jstree-tools clearfix">
                  <div class="btn-group btn-group-sm pull-right" role="group">
                    <button @click="openTree" type="button" class="btn btn-icon btn-outline btn-default btn-unfold">
                      <i class="icon fa-angle-down"></i></button>
                    <button @click="closeTree" type="button" class="btn btn-icon btn-outline btn-default btn-fold">
                      <i class="icon fa-angle-up"></i></button>
                  </div>
                  <div class="pull-left">
                    <div class="input-search">
                      <button type="button" class="input-search-btn"><i class="icon wb-search" aria-hidden="true"></i></button>
                      <input v-model="roleQuery" type="text" class="form-control input-sm" name="jstree_search" placeholder="快速查找...">
                    </div>
                  </div>
                </div>
                <div class="pagetree margin-top-10">
                  <div id="slimScroll">
                    <div data-name="jstree"></div>
                  </div>
                  <input type="hidden" name="roleId">
                  <input type="hidden" name="roleAuth">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary btn-jstree" @click="saveTree" type="submit">保存</button>
            <a class="btn btn-default" data-dismiss="modal">取消</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'toastr/toastr.scss'
//import toastr from 'toastr'
//import _ from 'lodash'
import { POST, GET, PATCH, Uri } from '../core/http'

//let vm

function _mt(root, menus) {
  root.text = root.name
  root.state = {selected: root.granted, opened: false}
  root.children = menus.filter(m => m.parent === root.path)
  // if (root.children.length) {
  //   root.state.opened = false
  // }
  root.children.forEach(c => _mt(c, menus))
}
function menuTree(menus) {
  const root = {id: 'root', path: '/', name: '臻合网吧', granted: false}
  _mt(root, menus)
  return root
}

function treeData (data, $el) {
  var $items = $el.children('ul').children('li'), i = 0;

  for (; i < $items.length; i++) {
    if ($items.eq(i).attr("aria-selected") === "true" || $items.eq(i).children('a').find('i.jstree-undetermined').length) {
      data.push($items.eq(i).prop('id'));
    }

    if ($items.eq(i).children("ul").length) {
      treeData(data, $items.eq(i));
    }
  }
}

function treeArry (data, checkedData) {
  var item = checkedData.shift(),
    temp = [];

  for (var n in data) {
    if (item !== data[n]) {
      temp.push(item);
    }
  }

  if (temp.length === data.length) {
    data.push(item);
  }

  if (checkedData.length) {
    treeArry(data, checkedData);
  }
}

export default {
  name: 'role-edit',
  data () {
    return {
      role: {
        id: null,
        name: null,
        menuIds: []
      },
      roleQuery: '',
      editing: false
    }
  },
  forms: {
    fields: {
      roleName: {
        validators: {
          notEmpty: {
            message: '请填写角色名称'
          }
        }
      }
    }
  },
  computed: {
    tree () {
      return this.$Q('[data-name=jstree]')
    }
  },
  created () {
    //vm = this
  //  this.debouncedSearch = _.debounce(this.search, 300)
  },
  watch: {
    roleQuery (newQuery, oldQuery) {
      this.debouncedSearch()
    }
  },
  mounted () {
    this.modal = $(this.$el)
    this.form.success(e => {
      e.preventDefault();
      (this.editing ? PATCH : POST)(Uri(`/api/core/role/{:id}/`, {id: this.role.id}), this.role)
        .done(data => {
          this._hide()
          this.$emit('role-changed')
        })
        .always(() => this.form.enableSubmit())
    })
  },
  methods: {
    closeTree () {
      this.tree.jstree().close_all();
    },
    openTree () {
      this.tree.jstree().open_all();
    },
    search () {
      this.tree.jstree(true).search(this.roleQuery);
    },
    _show () {
      this.form.enableSubmit()
      this.modal.modal({
        pageHeight: 480,
        show: true
      })
      $('#slimScroll').slimScroll($.po('slimScroll', {
        height: '160px'
      }));
    },
    _hide () {
      this.modal.modal('hide')
    },
    edit (data) {
      this.editing = !!data
      this.role = (data || {})

      var roleId = this.role.id

      $.jstree.destroy()
      this.tree.data('jstree', false).empty().jstree({
        "checkbox": {
          "keep_selected_style": false
        },
        "plugins": ["checkbox", "search"],
        "core": {
          data: function(obj, callback) {
            GET(Uri(`/api/permission/role/{:roleId}/menu/`, {roleId}), {template: true, granted: true})
              .then(data => {
                callback.call(this, menuTree(data))
              })
          }
        }
      });
      this._show()
    },
    saveTree () {
      let tree = this.$Q('[data-name=jstree]')
      let data = []
      let checkedData = tree.jstree("get_checked")

      treeData(data, tree)
      treeArry(data, checkedData)
      this.role.menuIds = data.filter(d => d !== 'root').map(Number)
    }
  }
}
</script>
