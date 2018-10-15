<template>
  <div class="page-main " >
    <!--显示在线人数等-->
    <div class="row">
      <div class="col-lg-3 col-sm-6 col-xs-12 ">
        <div class="panel  widget">
          <div class="col-xs-6 ">
            <img src="../assets/online1.gif" alt="">
          </div>
          <div class="col-xs-6 text-left">
            <p class="padding-bottom-15">激活人数</p>
            <span class="counter-number " style="color:#ff3268 " >{{onlineStatistic.total}}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-xs-12 ">
        <div class="panel  widget">
          <div class="col-xs-6 ">
            <img src="../assets/online2.gif" alt="">
          </div>
          <div class="col-xs-6 text-left">
            <p class="padding-bottom-15">上机人数</p>
            <span class="counter-number " style="color:#4659ed ">{{onlineStatistic.online}}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-xs-12 ">
        <div class="panel  widget">
          <div class="col-xs-6 ">
            <img src="../assets/online3.gif" alt="">
          </div>
          <div class="col-xs-6 text-left">
            <p class="padding-bottom-15">会员</p>
            <span class="counter-number " style="color:#049c49 ">{{onlineStatistic.member}}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-xs-12 ">
        <div class="panel  widget">
          <div class="col-xs-6 ">
            <img src="../assets/online4.png" alt="">
          </div>
          <div class="col-xs-6 text-left">
            <p class="padding-bottom-15">临时卡</p>
            <span class="counter-number " style="color:#c725da ">{{onlineStatistic.temporal}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="online-bottom-container ">
      <!--表单-->
      <div class="form-inline">
        <div class="form-group ">
          <label class="control-label  text-left" >会员卡号:</label>
          <input type="text" class="form-control"  placeholder="请输入" v-model="memberId">
        </div>
        <div class="form-group  ">
          <label class="control-label text-left" >机器号:</label>
          <input type="text" class="form-control"  placeholder="请输入" v-model="equipNo">
        </div>
        <div class="form-group  ">
          <label class="control-label" >类型:</label>
          <div class="status-select-box">
            <multiselect
              value="id"
              v-model="selectedMemberStatus"
              label="name"
              placeholder="请选择"
              track-by="id"
              :maxHeight="200"
              :showLabels="false"
              :close-on-select="true"
              :searchable="false"
              :allow-empty="false"
              :options="memberStatusList">
            </multiselect>
          </div>
        </div>
        <div class="form-group ">
          <button type="submit" class="btn  btn-primary" @click="filterList">查询</button>
          <button type="submit" class="btn  btn-success  margin-left-10" @click="resetNum" >刷新</button>
        </div>
        <div class="form-group  ">
          <a  class="btn  btn-round btn-primary " href="#/recharge" >
            <i class="iconfont icon-chongzhijilu1" aria-hidden="true"></i>
            充值
          </a>
          <a class="btn  btn-round btn-primary " href="#/goods" >
            <i class="iconfont icon-shangpin" aria-hidden="true"></i>
            销售
          </a>
          <button type="button" class="btn  btn-round btn-primary " @click="settingPhone">
            <i class="iconfont icon-bangdingshouji01" aria-hidden="true"></i>
            绑定手机
          </button>
          <a  class="btn  btn-round btn-primary " href="#/member/modify-pwd" >
            <i class="iconfont icon-zhongzhimima" aria-hidden="true"></i>
            重置密码
          </a>
        </div>
      </div>
      <!--在线会员列表-->
      <div id="dataTableExample_wrapper" class="online-table-box dataTables_wrapper form-inline dt-bootstrap padding-top-5">
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
                 :columns="onlineColumns"
                 :table-data="onlines"
                 :select-change="selectOnline"
                 :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
        <div class="paging" v-if="onlinePage.totalPage > 1">
          <v-pagination :total="onlinePage.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
        </div>
      </div>

    </div>

    <!--绑定手机模态框-->
    <div class="layer-open " id="settingPhone" >
      <form>
        <div class="col-xs-12 margin-top-20 " v-show="validType===1">
          <div class="form-group " >
            <label class="control-label col-xs-4 " ><span class="value">*</span>请输入手机号：</label>
            <div class="col-xs-8">
              <input v-model="onlineParam.mobile"
                     v-validate="'required'"
                     data-vv-as="手机号"
                     name="mobile"
                     type="text"
                     class="form-control"
                     placeholder="请输入手机号">
              <small class="error" v-show="errors.has('mobile')">（*{{ errors.first('mobile') }}）</small>
            </div>
            <div class="btn-bottom pull-right">
              <button class="btn btn-default margin-right-15 " @click="cancelLayer">取消</button>
              <button class="btn btn-primary"  @click="bindingPhone">确认</button>
            </div>
          </div>
        </div>
        <div class="col-xs-12 margin-top-20 " v-show="validType===2">
          <div class="form-group text-center" >
            <span><i class="iconfont icon-tishi" aria-hidden="true" ></i>是否要绑定新的手机号？</span>
          </div>
          <div class="btn-bottom pull-right">
            <button class="btn btn-default margin-right-15 " @click="cancelLayer">取消</button>
            <button class="btn btn-primary"  type="button" @click="submitNewPhone">确认</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import '../../static/vendor/layer/layer'
  import multiselect from 'vue-multiselect'
  import moment from 'moment'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../core/http'
  import store from '@/core/store'

  let vm;
  export default {
    name: "online-members",
    components: {multiselect},
    data(){
      return{
        layerId: null,
        validType: 1,
        selectedMemberStatus: null,
        moIds:[],
        memberStatusList: [
          {id: 0, name: '所有', value: null},
          {id: 2, name: '会员卡', value: 'Inbar'},
          {id: 3, name: '临时卡', value: 'Temporal'},
        ],
        tableLoading: false,
        onlines: [],
        onlineStatistic: {},
        onlineTotalPage: null,
        onlineParam: {},
        bmId: '',
        memberId: '',
        equipNo: '',
        scope: '',
        selectedMemberType: false,
        onlineListParam: {
          page: 0,
          size:10,
          sort:'activeAt,desc'
        },
        onlinePage: {
          totalPage: 0,
          amount: 0,
        },
        onlineColumns: [
          { title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: true,formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'memberId', title: '会员卡号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'mobile', title: '手机号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'scope', title: 'VIP', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'scope', title: '会员类型', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,formatter: (rowData) => {
              if (rowData.scope === 'Inbar') {
                return '会员卡'
              } else if(rowData.scope === 'Temporal') {
                return '临时卡'
              }
            }
          },
          //{field: '', title: '消费金额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'cash', title: '剩余金额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize:true},
          {field: 'equipNo', title: '机器号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          //{field: '', title: '剩余时长', width: 100, titleAlign: 'center', columnAlign: 'center',  isResize: true},
          //{field: '', title: '上网时长', width: 100, titleAlign: 'center', columnAlign: 'center',  isResize: true},
          {field: 'activeAt', title: '开卡时间', width: 100, titleAlign: 'center', columnAlign: 'center',  isResize: true,formatter(rowData) { return moment(rowData.activeAt).format('YYYY-MM-DD HH:mm') }},
        ]
      }
    },
    methods: {
      filterList() {
        if (!this.selectedMemberStatus|| !this.selectedMemberStatus.value ) {
          delete this.onlineListParam.scope;
        } else {
          this.onlineListParam.scope = this.selectedMemberStatus.value;
        }
        if (this.memberId) {
          vm.onlineListParam.memberId = this.memberId;
        } else {
          delete  vm.onlineListParam.memberId
        }
        console.log(vm.onlineListParam.memberId);
        if (this.equipNo) {
          vm.onlineListParam.equipNo = this.equipNo;
        } else {
          delete   vm.onlineListParam.equipNo
        }
        getAllOnline()
      },
      settingPhone(){
        if (vm.moIds.length === 0 ||vm.moIds.length > 1 ) {
          layer.msg("请勾选一项")
        } else {
          this.layerId = layer.open({
            type: 1,
            title: '绑定手机号',
            area: ['420px', '220px'],
            content: $('#settingPhone'),
            success() {
              vm.$validator.errors.clear();
            },
            end() {
              clearOnlineParams();
              // layer.msg("我是销毁回调")
            }
          })
        }
      },
      bindingPhone(){
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any() || vm.onlineParam.mobile === null) {
            layer.msg('你还有错误消息未处理！')
          }else {
            this.validType = 2
          }
        })
      },
      submitNewPhone(){
        vm.onlineParam.bmId=this.moIds;
        let query = _serialize();
        PATCH(`/api/member/mobile?${query}`)
          .then((data)=>{
            layer.close(vm.layerId);
            layer.msg('绑定成功');
            getAllOnline();
          })
      },
      resetNum(){
        this.memberId='';
        this.equipNo='';
        this.selectedMemberStatus=null;
      },
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      selectOnline(selection) {
        //this.moIds = rowData.memberId;
        //this.moIds.push(param.rowData.bmId)
        vm.moIds = [];
        selection.forEach(item => {
          vm.moIds.push(item.bmId);
        });
        console.log(vm.moIds);
        debugger
      },

      pageChange(pageIndex) {
        vm.onlineListParam.page = pageIndex - 1;
        getAllOnline();
      },
      pageSizeChange(newPageSize) {
        vm.onlineListParam.size = newPageSize;
        getAllOnline();
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
      getAllOnline();
      getOnlineStatistic();
    },
  }
  function getAllOnline () {
    vm.tableLoading = true;
    GET('/api/member/active/', vm.onlineListParam)
      .done((data) => {
        vm.tableLoading = false;
        vm.onlinePage.totalPage = data.totalPages;
        vm.onlinePage.amount = data.totalElements;
        vm.onlines = data.content;
      })
  }
  function getOnlineStatistic() {
    GET('/api/member/active/statistics')
      .done((data) => {
        vm.onlineStatistic = data;
      })
  }
  function _serialize () {
    let query = '';
    Object.keys(vm.onlineParam).forEach(paramsKey => {
      if(Array.isArray(vm.onlineParam[paramsKey])){
        vm.onlineParam[paramsKey].forEach(value => {
          if (value){
            query = `${query}&${paramsKey}=${value}`;
          }
        })
      }else {
        if (vm.onlineParam[paramsKey]) {
          query = `${query}&${paramsKey}=${vm.onlineParam[paramsKey]}`
        }
      }
    })
    query = query.replace(/^&|&$/g,'');
    return query;
  }
  function clearOnlineParams () {}

</script>


<style scoped lang="scss">
  @import "../sass/online-members";
  .status-select-box{
    display: inline-block;
    width: 100px;
    vertical-align: middle;
  }
  .form-control{
    width: 120px;
  }
</style>
