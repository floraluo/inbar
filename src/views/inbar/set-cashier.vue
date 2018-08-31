<template>
  <div class="page-main cashier">
    <div class="page-main-top" v-show="cashier.length > 0">
      <button class="btn btn-primary btn-round" @click="clickAddCashier" ><i class="iconfont icon-add"></i> 添加</button>
      <button class="btn btn-primary btn-round"  @click="modifyCashier" ><i class="iconfont icon-bianji2"></i> 修改</button>
      <button class="btn btn-primary btn-round "  @click="clickDeleteCashier" ><i class="iconfont icon-jiebang"></i> 解绑</button>
    </div>
    <div class="form-inline">
      <base-loading :loading="loading"></base-loading>
      <div class="no-data" v-show="cashier.length === 0">未绑定收银台，点击 <a class="highlight" href="javascript:;" @click="clickAddCashier">【添加】</a></div>
      <div class="row" v-for="(item, index) in cashier" :key="item.id">
        <div class="form-group col-sm-4">
          <div class="radio-custom radio-primary">
            <input type="radio" name="cashier" @change="selectCashier(item, index)" :id="`cashier${index}`">
            <label class="checkbox-text" :for="`cashier${index}`">{{item.counterName}}</label>
          </div>
        </div>
        <div class="form-group col-sm-4">
          <label>IP地址</label>
          <input v-model="item.ip" type="text" class="form-control" disabled>
        </div>
        <div class="form-group col-sm-4">
          <label>mac地址</label>
          <input v-model="item.mac" type="text" class="form-control" disabled>
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
  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import {GET, POST, PATCH} from '../../core/http'
  let vm;
  export default {
    name: "set-counter",
    data() {
      return {
        layerId: null,
        cashierLayerType: 0, //0 新增 1 修改
        loading: true,
        selectedCashier: null,
        cashier: [],
        cashierParam: {
          counterName: '',
          ip: '',
          mac: ''
        }
      }
    },
    methods: {
      selectCashier(cashier, index) {
        this.selectedCashier = cashier;
      },
      clickAddCashier() {
        this.cashierLayerType = 0;
        this.cashierParam = {
          counterName: '',
            ip: '',
            mac: ''
        }
        openCashierLayer('新增收银台');
      },
      clickDeleteCashier() {
        if (vm.selectedCashier === null) {
          layer.msg("请选择一个收银台")
        } else {
          layer.confirm('确定要解绑该收银台？', {icon: 7, title: '提示'}, (index) => {
            layer.close(index);
            PATCH(`/api/counter/${this.selectedCashier.id}`)
              .then(() => {
                getAllCashier();
                layer.msg('解绑成功')
              })
          });
        }
      },
      modifyCashier() {
        if (this.selectedCashier === null) {
          layer.msg('请选择一个收银台')
          return;
        }
        this.cashierLayerType = 1;
        this.cashierParam = {
          id: this.selectedCashier.id,
          counterName: this.selectedCashier.counterName,
          ip: this.selectedCashier.ip,
          mac: this.selectedCashier.mac
        }
        openCashierLayer('修改收银台');
      },
      submitAddCashier() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          let method, msg;
          if (this.cashierLayerType === 0) {
            method = POST;
            msg = '新建成功';
          } else {
            method = PATCH;
            msg = '修改成功';
          }
          method('/api/counter/', vm.cashierParam)
            .done(() => {
              getAllCashier();
              layer.close(vm.layerId);
              layer.msg(msg)
            })
        })
      },
      cancelLayer() {
        layer.close(this.layerId);
      }
    },
    created() {
      vm = this;
      getAllCashier();
    }
  }
  function openCashierLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['520px', '400px'],
      content: $('#addCashierLayer')
    })
  }

  function getAllCashier () {
    vm.loading = true;
    GET('/api/counter/')
      .done((data) => {
        vm.loading = false;
        vm.cashier = data
      })
  }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  @import "../../sass/base-manage";

  .cashier{
    .page-main-top{
      margin-bottom: 20px;
    }
    .no-data{
      font-size: 14px;
      color: $text;
    }
    .form-group{
      margin-right: 0;
      margin-bottom: 15px;
      &:first-child{
        padding-top: 5px;
      }
      &:last-child{
        margin-bottom: 30px;
      }
    }
  }
</style>
