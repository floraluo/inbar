<template>
  <div class="">
    <div class="page-main">
      <div class="page-main-top padding-bottom-20">
          <button class="btn btn-primary btn-round" @click="clickAddAnnounce"><i class="iconfont icon-add"></i>新增</button>
          <button class="btn btn-primary btn-round"  @click="clickDeleteAnnounce"><i class="iconfont icon-close"></i>删除</button>
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
               :columns="announceColumns"
               :table-data="announces"
               :select-all="selectAnnounce"
               :select-group-change="selectAnnounce"
               :show-vertical-border="false"
               @dblclick="clickCheckAnnounce"
               @on-custom-comp="enableAnnounce"></v-table>
      <div class="paging" v-if="announcePage.totalPage > 1">
        <v-pagination :total="announcePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>
   </div>
</template>

<script>
  import Vue from 'vue'
  import mySwitch from 'vue-switch/switch-2.vue';
  import $ from 'jquery'
  import moment from 'moment'
  import layer from '../../../static/vendor/layer/layer'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE} from '../../core/http'

  let vm;

  function getAllAnnounce () {
    GET('/api/announcement/', vm.announceList)
      .done((data) => {
        vm.announces = data;
      })
  }
  function deleteAnnounce () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/announcement/?ids=${query}`;
    DELETE(url)
      .done(() => {
        getAllAnnounce();
        layer.msg("删除成功")
        vm.delIds = []
      })
  }
  function patchModifyAnnounce () {
    PATCH('/api/announcement/update', vm.announceParam)
      .done(() => {
        getAllAnnounce();
        clearAnnounceParams();
        layer.close(vm.layerId);
        layer.msg('修改成功！')
      })
  }
  export default {
    name: 'set-announce',
     data() {
      return {
        tableLoading: false,
        delIds: [],
        announces: [],
        announceTotalPage: null,
        announceParam: {
          name: '',
          beginTime:'',
          endTime:'',
          description: '',
          enabled: true
        },
        announceList: {
          page: 0,
          size: 10
        },
        announcePage: {
          totalPage: 0,
          amount: 0
        },
        announceColumns: [
          {field: 'id', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'name', title: '公告标题', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'description', title: '说明', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, formatter: (rowData, rowIndex) => {
              let placement;
               if (rowIndex < (vm.announceList.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
            return `<span class="v-table-popover-content" data-content="${rowData.description}" data-placement="${placement}" data-trigger="hover" data-toggle="popover" >${rowData.description}</span>`;
            }
          },
          {field: 'enabled', title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'AnnounceInnerSwitch'},
          {field: 'beginTime', title: '开始时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,formatter:(rowData) =>  {
            return moment(rowData.beginTime).format('YYYY-MM-DD') }},
         {field: 'endTime', title: '结束时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,ormatter:(rowData) =>  {
             return moment(rowData.endTime).format('YYYY-MM-DD') }},
          {field: 'announce|1,2', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation', isResize: true}
        ]
      }
    },
    methods: {
      clickAddAnnounce(){
        this.$router.push({
            name: 'add-announcement',})
      },
      clickCheckAnnounce(msg, params) {
          this.$router.push({
            name: 'add-announcement',
            params: {
              id: params.rowData.id
            }
          })
        },
      clickDeleteAnnounce() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteAnnounce();
        }
      },
      deleteOneAnnounce(msg, params) {
        console.log(params)
        this.delIds = [];
        this.delIds.push(params.rowData.id)
        deleteAnnounce();
      },
      enableAnnounce(param) {
        let url = param.enabled === false ? `/api/announcement/status/enable/?ids=${param.id}` : `/api/announcement/status/forbid/?ids=${param.id}`;
        PATCH(url)
          .done(() => {
            // getAllLevel();
            publish('switch.toggle.announce', param.id)
          })
      },

        updated() {
          $('.v-table-body-class [data-toggle="popover"]').popover();

      },
      selectAnnounce(selection) {
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },

      modifyAnnounce() {
        this.$router.push({
          name: 'add-announcement',})
      },

      pageChange(pageIndex) {
        vm.announceList.page = pageIndex - 1;
        getAllAnnounce();
      },
      pageSizeChange(newPageSize) {
        vm.announceList.size = newPageSize;
        getAllAnnounce();
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
      getAllAnnounce();
      subscribe('modify.table.operate.announce', this.modifyAnnounce);
      subscribe('delete.table.operate.announce', this.deleteOneAnnounce);
      console.log(this.$route)
    }
  }
  Vue.component('AnnounceInnerSwitch', {
    template: `<base-switch open-name="启用" close-name="禁用" size="lg" :rowData="rowData" v-model="rowData.enabled"  @click-switch="clickSwitch"></base-switch>`,
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
        if (this.rowData.id === id) {
          this.rowData.enabled = !this.rowData.enabled;
        }
      }
    },
    created() {
      // console.log(this.rowData.enabled)
      console.log(this.rowData.enabled)
      // debugger
      subscribe('switch.toggle.announce', this.toggleSwitch)
    }
  })

</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>
