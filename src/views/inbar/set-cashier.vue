<template>
  <div class="">
    <div class="page-main ">
      <div class="page-main-top">
        <button class="btn btn-primary btn-round" @click="clickAddCashier" ><i class="iconfont icon-add"></i> 添加</button>
        <button class="btn btn-primary btn-round"  @click="modifyCashier" ><i class="iconfont icon-bianji2"></i> 修改</button>
        <button class="btn btn-primary btn-round "  @click="clickDeleteCashiers" ><i class="iconfont icon-jiebang"></i> 解绑</button>
      </div>

     <div class="row Counter-content-box ">
      <ul class="" >
        <li class="active-box"
            v-for="(item, index) in cashier"
            :key="item.id">
          <div class="checkbox-custom checkbox-primary col-xs-2">
            <input type="checkbox"  checked=""  @click="selectSetmeal(item, index)">
            <label class="checkbox-text">{{item.counterName}}</label>
          </div>
          <div class="col-xs-4 form-group">
            <label class="col-xs-3 ">IP地址</label>
            <div class="col-xs-9">
              <input v-model="item.ip" type="text" class="form-control" >
            </div>
          </div>
          <div class="col-xs-4 form-group">
            <label class="col-xs-3 ">mac地址</label>
            <div class="col-xs-9">
              <input v-model="item.mac" type="text" class="form-control" >
            </div>
          </div>
        </li>
      </ul>
      </div>

      <div class="row Counter-content-box ">
        <div class="checkbox-custom checkbox-primary col-xs-2">
          <input type="checkbox"  checked="">
          <label class="checkbox-text">{{cashier.counterName}}</label>
        </div>
        <div class="col-xs-4 form-group">
          <label class="col-xs-3 ">IP地址</label>
          <div class="col-xs-9">
            <input v-model="cashier.ip" type="text" class="form-control" >
          </div>
        </div>
        <div class="col-xs-4 form-group">
          <label class="col-xs-3 ">mac地址</label>
          <div class="col-xs-9">
            <input v-model="cashier.mac" type="text" class="form-control" >
          </div>
        </div>
      </div>
      <div class="row Counter-content-box ">
        <div class="checkbox-custom checkbox-primary col-xs-2">
          <input type="checkbox" name="inputCheckboxes" >
          <label class="checkbox-text">收银台2</label>
        </div>
        <div class="col-xs-4 form-group">
          <label class="col-xs-3 ">IP地址</label>
          <div class="col-xs-9">
            <input class="form-control"  placeholder="192.168.2.52" readonly="true">
          </div>
        </div>
        <div class="col-xs-4 form-group">
          <label class="col-xs-3 ">mac地址</label>
          <div class="col-xs-9">
            <input class="form-control" readonly="true">
          </div>
        </div>
      </div>
      <div class="row Counter-content-box ">
        <div class="checkbox-custom checkbox-primary col-xs-2">
          <input type="checkbox" name="inputCheckboxes" >
          <label class="checkbox-text">收银台3</label>
        </div>
        <div class="col-xs-4 form-group">
          <label class="col-xs-3 ">IP地址</label>
          <div class="col-xs-9">
            <input class="form-control"  placeholder="192.168.2.52" readonly="true">
          </div>
        </div>
        <div class="col-xs-4 form-group">
          <label class="col-xs-3 ">mac地址</label>
          <div class="col-xs-9">
            <input class="form-control" readonly="true">
          </div>
        </div>
      </div>
    </div>

    <!--新增收银台-->
    <div class="layer-add-cashier layer-open" id="addCashierLayer">
      <form>
        <div class="form-group"><label for="">收银台名称： <small class="error" v-show="errors.has('counterName')">（*{{ errors.first('counterName') }}）</small></label>
          <input v-model="cashierParam.counterName"
                 v-validate="'required'"
                 data-vv-as="收银台名称"
                 name="counterName"
                 type="text"
                 class="form-control"
                 placeholder="请输入收银台名称">
        </div>
        <div class="form-group"><label for="">IP地址： <small class="error" v-show="errors.has('ip')">（*{{ errors.first('ip') }}）</small></label>
          <input v-model="cashierParam.ip"
                 v-validate="'required'"
                 data-vv-as="IP地址"
                 name="ip"
                 type="text"
                 class="form-control"
                 placeholder="请输入IP地址">
        </div>
        <div class="form-group"><label for="">MAC地址： <small class="error" v-show="errors.has('mac')">（*{{ errors.first('mac') }}）</small></label>
          <input v-model="cashierParam.mac"
                 v-validate="'required'"
                 data-vv-as="MAC地址"
                 name="ip"
                 type="text"
                 class="form-control"
                 placeholder="请输入MAC地址">
        </div>
      </form>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default margin-right-15" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitAddCashier">保存</button>
      </div>
    </div>

        <!--解绑收银台-->
    <div id="deleteCashierLayer" class="layer-delete clearfix">
      <i class="iconfont icon-tishi" aria-hidden="true" ></i>
      <span > 确定要解绑该收银台？</span>
      <div class="btn-bottom ">
        <button  class="btn btn-default margin-right-15" @click="cancelLayer" >否</button>
        <button type="button" class="btn btn-primary" @click=" deleteCashier()">是</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import { publish, subscribe } from 'pubsub-js'
  import layer from '../../../static/vendor/layer/layer'
  import {GET, POST, PUT, PATCH, DELETE} from '../../core/http'
  let vm;

  function openCashierLayer (title) {
    layer.open({
      type: 1,
      title,
      area: ['520px', '400px'],
      content: $('#addCashierLayer'),
    })
  }
  function deleteCashierLayer (title) {
    layer.open({
      type: 1,
      title,
      area: ['520px', '400px'],
      content: $('#deleteCashierLayer'),
    })
  }
  function cancelLayer () {
    layer.close(vm.layerId);
    clearCashierParams();
  }
  function clearCashierParams () {

  }
  function getAllCashier () {
    vm.tableLoading = true;
    GET('/api/counter/')
      .done((data) => {
        vm.tableLoading = false;
        vm.cashier = data
      })
  }

  function postAddCashier () {
    POST('/api/counter/', vm.cashierParam)
      .done(() => {
        getAllCashier();
        clearCashierParams();
        layer.close(vm.layerId);
        layer.msg('新建成功！')
      })
  }
  function patchModifyCashier () {
    PATCH('/api/counter/', vm.cashierParam)
      .done(() => {
        getAllCashier();
        clearCashierParams();
        layer.close(vm.layerId);
        layer.msg('修改成功！')
      })
  }

  function deleteCashier () {
    let query = vm.delIds.reduce((result, cashier) => {
      return `${result}&ids=${cashier}`;
    })
    const url = `/api/counter/?ids=${query}`;
    DELETE(url, {ids: vm.delIds})
      .done(() => {
        layer.msg("解绑成功");
        getAllCashier();
        vm.delIds = []
      })
  }
  export default {
    name: "set-counter",
    data() {
      return {
        layerId: null,
        markCashierIndex: null,
        cashierLayerType: 0, //0 新增 1 修改
        tableLoading: false,
        delIds: [],
        cashier: [],
        cashierTotalPage: null,
        cashierParam: {
          counterName: '',
          id: '',
          ip: '',
          mac: '',
          enabled: true,
        },
      }
    },

    methods: {
      clickAddCashier() {
        openCashierLayer('新增收银台');
      },
      clickDeleteCashiers() {
          if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteCashierLayer('提示');
        }
      },

      deleteOneCashier(msg, param) {
        this.delIds = [];
        this.delIds.push(param.rowData.id)
        deleteCashier();
      },



      modifyCashier(msg, param) {
        const cashiers = param.rowData
        vm.cashierLayerType = 1;
        vm.cashierParam.id = cashiers.id
        vm.cashierParam.counterName = cashiers.counterName;
        vm.cashierParam.ip = cashiers.ip;
        vm.cashierParam.mac = cashiers.mac;
        openCashierLayer('修改收银台');
      },

      submitAddCashier() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (this.cashierLayerType === 0) {
            postAddCashier()
          } else {
            patchModifyCashier();
          }
        })
      },
      selectSetmeal(active, index) {
        if (this.markSetmealIndex === null || this.markSetmealIndex !== index) {
          this.unwatch = this.unwatch || this.$watch(this.money, this.deleteRechargeSetmeal);
          this.markSetmealIndex = index;
          this.rechargeSum = item;
          this.money = String(item.amount);
          this.params.goodsId = item.goodsId;
          this.params.ruleId = item.id;
        } else {
          this.markSetmealIndex = null;
          this.rechargeSum = null;
        }
      },

      selectCashier(selection) {
        // console.log("))))))))))))", selection)
        vm.delIds = [];
        selection.forEach(cashier => {
          vm.delIds.push(cashier.id);
        })
      },
      cancelLayer() {
        cancelLayer();
      },
      created() {
        vm = this;
        getAllCashier();
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/cashier-setting";
</style>
