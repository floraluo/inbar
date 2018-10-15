<template>
  <div class="page-main">
    <div class="page-main-top padding-bottom-20">
      <button class="btn btn-primary btn-round" @click="clickAddAnnounce"><i class="iconfont icon-add"></i> 新增</button>
      <button class="btn btn-primary btn-round"  @click="clickDeleteAnnounce"><i class="iconfont icon-close"></i> 删除</button>
    </div>
    <div class="table-box">
      <v-table is-horizontal-resize
               is-vertical-resize
               style="width:100%"
               row-hover-color="#eee"
               row-click-color="#edf7ff"
               title-bg-color="#f0f2f9"
               sortable="endTime"
               :title-row-height="52"
               :is-loading="tableLoading"
               :height="455"
               :min-height="455"
               :multiple-sort="multipleSort"
               :columns="announceColumns"
               :table-data="announces"
               :select-all="selectAnnounce"
               :select-group-change="selectAnnounce"
               :show-vertical-border="false"
               @sort-change="sortChange"
               @on-custom-comp="someOperate"></v-table>
    </div>

    <!--修改公告-->
    <div id="modifyAnnounceLayer" class="layer-open">
      <cAnnouncement :announce="oneAnnounce" :modify="true"></cAnnouncement>
      <div class="form-group  col-xs-12 text-center">
        <button class="btn btn-default margin-right-30" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="layerSaveGoods">保存</button>
      </div>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE} from '../../core/http'
  import cAnnouncement from  './template-announce.vue'

  let vm;

  function getAllAnnounce () {
    vm.tableLoading = true;
    GET('/api/announcement/', vm.announceList)
      .done((data) => {
        vm.tableLoading = false;
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
  function clearAnnounceParams(){

  }
  export default {
    name: 'set-announce',
    components: { cAnnouncement },
    data() {
      return {
        multipleSort:false,
        tableLoading: false,
        delIds: [],
        announces: [],
        oneAnnounce : {},
        announceTotalPage: null,
        announceParam: {
          name: '',
          beginTime:'',
          endTime:'',
          description: '',
          enabled: true
        },
        announceList: {
          beginTime:'',
          endTime:'',
          page: 0,
          size: 10,
          sort:'endTime,desc'
        },
        announceColumns: [
          { title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center',isResize: true,formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
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
          {field: {name: 'enabled', valueKey: 'enabled', callback: this.toggleAnnounceStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'beginTime', title: '开始时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD ') }},
          {field: 'endTime', title: '结束时间', width: 120, titleAlign: 'center', columnAlign: 'center', orderBy:'desc',isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) { return moment(rowData[field]).format('YYYY-MM-DD ') }},
          {field: [
              {name: '查看', type: "look", callback: this.checkOneAnnounce},
              {name: '修改', type: "modify", callback: this.modifyAnnounce},
              {name: '删除', type: "delete", callback: this.deleteOneAnnounce}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}
        ]
      }
    },
      methods: {
        sortChange(params){
          console.log(params)
        },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      clickAddAnnounce(){
        this.$router.push({
          name: 'add-announcement',})
      },
      clickDeleteAnnounce() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteAnnounce();
        }
      },
      checkOneAnnounce(params){
        this.$router.push({
          name: 'announcement-check',
          params: {
            id: params.rowData.id
          }
        })
      },
      deleteOneAnnounce(params) {
        console.log(params)
        this.delIds = [];
        this.delIds.push(params.rowData.id)
        deleteAnnounce();
      },
      toggleAnnounceStatus(params) {
        const rowData = params.rowData;
        let url = rowData[params.valueKey] === false ? `/api/announcement/status/enable/?ids=${rowData.id}` : `/api/announcement/status/forbid/?ids=${rowData.id}`;
        PATCH(url)
          .done(() => {
            vm.announces[params.index][params.valueKey] = !vm.announces[params.index][params.valueKey];
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
      modifyAnnounce(params) {
        this.oneAnnounce = params.rowData;
        this.layerId = layer.open({
          type: 1,
          title: '修改公告',
          area: ['835px', '700px'],
          content: $('#modifyAnnounceLayer'),
          success() {
            publish('layer.opened.announce', Object.assign(params, {type: 'modify'}));
            vm.$validator.errors.clear();
          },
          end() {
            clearAnnounceParams();
          }
        })
      },
      layerSaveGoods() {
        publish('layer.modify.save.announce')
      },
      modifySuccess() {
        this.cancelLayer();
        getAllAnnounce();
      },
      cancelLayer() {
        layer.close(this.layerId);
      }
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created() {
      vm = this;
      getAllAnnounce();
      subscribe('modify.success.announce', this.modifySuccess)
      console.log(this.$route)
    }
  }

</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>
