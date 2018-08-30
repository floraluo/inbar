<template>

  <div class="">
    <!--<div class="page-crumbs"><span class="highlight">网吧设置&nbsp;&frasl;</span>&nbsp;积分设置</div>-->
    <div class="page-main" >

      <div class="page-main-top padding-bottom-20">
        <button class="btn btn-primary btn-round" @click="clickAddCategory"><i class="iconfont icon-add"></i> 新增</button>
        <button class="btn btn-primary btn-round" @click="clickDeleteCategorys"><i class="iconfont icon-close"></i> 删除</button>

      </div>

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
               :columns="categoryColumns"
               :table-data="categorys"
               :select-all="selectCategory"
               :select-group-change="selectCategory"
               :show-vertical-border="false"  @on-custom-comp="enableCategory"></v-table>
      <div class="paging" v-if="categoryPage.totalPage > 1">
        <v-pagination :total="categoryPage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>

    <!--添加区域-->
    <div class="layer-add-category layer-open" id="addCategoryLayer">
      <form>
        <div class="form-group "><label>分类名称： <small class="error" v-show="errors.has('gcName')">（*{{ errors.first('gcName') }}）</small></label>
          <input v-model="categoryParam.gcName"
                 v-validate="'required'"
                 data-vv-as="分类名称"
                 name="gcName"
                 type="text"
                 class="form-control"
                 placeholder="请输入名称">
        </div>
        <div class="form-group"><label >说明： <small class="error" v-show="errors.has('explain')">（*{{ errors.first('explain') }}）</small></label>
          <input v-model="categoryParam.explain"
                 name="explain"
                 type="text"
                 class="form-control"
                 placeholder="请输入说明">
        </div>
            </form>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitAddCategory">保存</button>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import mySwitch from 'vue-switch/switch-2.vue';
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm;
  function openCategoryLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['500px', '420px'],
      content: $('#addCategoryLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      end() {
        clearCategoryParams();
        // layer.msg("我是销毁回调")
      }
    })
  }

  function cancelLayer () {
    layer.close(vm.layerId);
    clearCategoryParams();
  }
  function clearCategoryParams () {
  }
  function getAllCategory () {
    vm.tableLoading = true;
      GET('/api/stock/class/queryByPageGc', vm.categoryList)
      .done((data) => {
        vm.tableLoading = false;
        vm.categoryPage.totalPage = data.totalPages;
        vm.categoryPage.amount = data.totalElements;
        vm.categorys = data.content;
      })
  }

  function postAddCategory () {
    let query=_serialize();
    POST(`/api/stock/class/insert?${query}`, vm.categoryParam)
      .then((date) => {
        layer.close(vm.layerId);
        layer.msg('新增成功！')
      })
  }

  function deleteCategory () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/stock/class/delete/?ids=${query}`;
    DELETE(url, {ids: vm.delIds})
      .done(() => {
        getAllCategory();
        layer.msg("删除成功");
        vm.delIds = []
      })
  }
  function _serialize () {
    return Object.keys(vm.categoryParam).reduce((result, second, index) => {
      if (index === 1) {
        return `${result}=${vm.categoryParam[result]}&${second}=${vm.categoryParam[second]}`
      } else {
        if (Array.isArray(vm.categoryParam[second]) && vm.categoryParam[second].length > 1) {
          let formatSecond;
          formatSecond = vm.categoryParam[second].reduce((r, s) => {
            return `${second}=${r}&${second}=${s}`;
          })
          return `${result}&${formatSecond}`
        } else {
          return `${result}&${second}=${vm.categoryParam[second]}`
        }
      }
    })
  }
  export default {
    name: 'category-manage',
    data() {
      return {
        layerId: null,
        categoryLayerType: 0, //0 新增 1 修改
        tableLoading: false,
        delIds: [],
        categorys: [],
        categoryTotalPage: null,
        categoryParam: {
          gcId: '',
          gcName: '',
          explain: '',
        },
        selectedMemberType: false,
        categoryList: {
          page: 0,
          size: 10,
        },
        categoryPage :{
          totalPage: 0,
          amount: 0
        },
        importErrorMsg: [],
        categoryColumns: [
          {field: 'gcId', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'gcName', title: '分类', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'count', title: '商品数量', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'gcStatus', title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'CategoryInnerSwitch'},
          {field: 'createTime', title: '创建时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData) { return moment(rowData.createTime).format('YYYY-MM-DD') }
          },
          {field: 'category|1,2', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation', isResize: true}

        ]
      }
    },
    methods: {
      clickAddCategory() {
        vm.categoryLayerType = 0
        openCategoryLayer('新增分类');
      },
      clickDeleteCategorys() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteCategory();
        }
      },

      deleteOneCategory(msg, params) {
        vm.delIds[0] = params.rowData.gcId;
        deleteCategory();
      },

      modifyCategory(msg, params) {
        const category=params.rowData
        vm.categoryLayerType = 1;
        vm.categoryParam.gcId = category.gcId;
        vm.categoryParam.gcName = category.gcName;
        vm.categoryParam.explain = category.explain;
        openCategoryLayer('修改类目');
      },

      submitAddCategory() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (this.categoryLayerType === 0) {
            postAddCategory()
          } else if(this.categoryLayerType === 1){
            let query = '';
            console.log(Object.keys(vm.categoryParam));
            Object.keys(vm.categoryParam).forEach(item => {
              if (vm.categoryParam[item] !== null || vm.categoryParam[item] !== undefined) {
                query += `${item}=${vm.categoryParam[item]}&`
              }
            })
            POST(`/api/stock/class/update?${query}`)
              .then((date) => {
                getAllCategory();
                layer.close(vm.layerId);
                layer.msg('修改成功！')
              })
          }
        })
      },
      selectCategory(selection) {
        // console.log("))))))))))))", selection)
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.gcId);
        })
      },
      enableCategory(params) {
        PATCH(`/api/stock/class/upAndLow/${params.gcId}`)
          .done(() => {
            publish('switch.toggle', params.gcId)
          })
      },
      pageChange(pageIndex) {
        vm.categoryList.page = pageIndex - 1;
        getAllCategory();
      },
      pageSizeChange(newPageSize) {
        vm.categoryList.size = newPageSize;
        getAllCategory();
      },
      cancelLayer() {
        cancelLayer();
      }
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created() {
      vm = this;
      getAllCategory();
      subscribe('modify.table.operate.category', this.modifyCategory)
      subscribe('delete.table.operate.category', this.deleteOneCategory)
      console.log(this.$route)
    }
  }
  Vue.component('CategoryInnerSwitch', {
   template: `<base-switch open-name="启用" close-name="禁用" size="lg" :rowData="rowData" v-model="rowData.gcStatus"  @click-switch="clickSwitch"></base-switch>`,
     props: {
      rowData: {
        type: Object
       },
      field: {
         type: String
      },
      index: {
        type: Number
      }
    },
    components: {
       'my-switch': mySwitch
     },
    methods: {
       clickSwitch(param) {
        this.$emit('on-custom-comp', param);
       },
      toggleSwitch(msg, id) {
        if (this.rowData.gcId === id) {
          this.rowData.gcStatus = !this.rowData.gcStatus;
        }
      }
     },
     created() {
       subscribe('switch.toggle', this.toggleSwitch)
     }
   })
</script>
<style lang="scss">
  .vue-switch{
    /*width: 54px;*/
    height: 22px !important;
    line-height: 22px  !important;
    margin-top: 9px;
    &.z-on span{
      /*left: 4px !important;*/
    }
    span.close{
      color: #fff !important;
      opacity: 1;
      line-height: inherit;
      /*left: 20px !important;*/
    }
  }
</style>

<style scoped lang="scss">
  @import "../../sass/base-manage";
</style>
