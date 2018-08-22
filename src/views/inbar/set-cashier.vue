<template>
  <div class="">
    <!--<div class="page-crumbs">-->
    <!--<span class="highlight">网吧设置&nbsp;&frasl;</span>&nbsp;收银台设置-->
    <!--</div>-->
    <div class="page-main ">
      <div class="page-main-top">
        <button class="btn btn-primary btn-round" @click="addCounter" ><i class="iconfont icon-add"></i> 添加</button>
        <button class="btn btn-primary btn-round"  @click="modifyCounter" ><i class="iconfont icon-bianji2"></i> 修改</button>
        <button class="btn btn-primary btn-round "  @click="deleteCounter" ><i class="iconfont icon-jiebang"></i> 解绑</button>
      </div>

      <div class="row Counter-content-box ">

        <div class="checkbox-custom checkbox-primary col-xs-2">
          <input type="checkbox"  checked="">
          <label class="checkbox-text">收银台1</label>
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
    <div id="addCounter" class="layer-add clearfix">
      <div class="form-group">
        <label class="control-label">收银台名称：</label>
        <input class="form-control" placeholder="请输入收银台名称">
      </div>
      <div class="form-group margin-top-20">
        <label class="control-label">IP地址：</label>
        <input class="form-control" placeholder="请输入IP地址">
      </div>
      <div class="form-group margin-top-20">
        <label class="control-label">MAC地址：</label>
        <input class="form-control" placeholder="请输入MAC地址">
      </div>
      <div class="btn-bottom ">
        <button  class="btn btn-default margin-right-15" @click="cancelLayer" >取消</button>
        <button type="button" class="btn btn-primary" @click=" submitPhone()">确认</button>
      </div>
    </div>

    <!--修改收银台-->
    <div id="modifyCounter" class="layer-modify clearfix">
      <div class="form-group">
        <label class="control-label">收银台名称：</label>
        <input class="form-control" placeholder="请输入收银台名称">
      </div>
      <div class="form-group">
        <label class="control-label">IP地址：</label>
        <input class="form-control" placeholder="请输入IP地址">
      </div>
      <div class="form-group">
        <label class="control-label">MAC地址：</label>
        <input class="form-control" placeholder="请输入MAC地址">
      </div>
      <div class="btn-bottom ">
        <button  class="btn btn-default margin-right-15" @click="cancelLayer" >取消</button>
        <button type="button" class="btn btn-primary" @click=" submitPhone()">确认</button>
      </div>
    </div>
    <!--解绑收银台-->
    <div id="deleteCounter" class="layer-delete clearfix">
      <i class="iconfont icon-tishi" aria-hidden="true" ></i>
      <span > 确定要解绑该收银台？</span>
      <div class="btn-bottom ">
        <button  class="btn btn-default margin-right-15" @click="cancelLayer" >否</button>
        <button type="button" class="btn btn-primary" @click=" submitPhone()">是</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import mySwitch from 'vue-switch/switch-2.vue';
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import {GET, POST, PUT, PATCH, DELETE} from '../../core/http'
  let vm;
  // function openCounterLayer (title) {
  //   vm.layerId = layer.open({
  //     type: 1,
  //     title,
  //     area: ['5520px', '400px'],
  //     content: $('#addCounterLayer'),
  //     success() {
  //       vm.$validator.errors.clear();
  //     },
  //     end() {
  //       clearCounterParams();
  //       // layer.msg("我是销毁回调")
  //     }
  //   })
  // }
  // function cancelLayer () {
  //   layer.close(vm.layerId);
  //   clearCounterParams();
  // }
  // function clearCounterParams () {
  //
  // }
  export default {
    name: "set-counter",
    data() {
      return {
        layerId: null
      }
    },
    created() {
      vm = this;
    },
    methods: {

      addCounter() {
        this.layerId = layer.open({
          type: 1,
          title: '新增收银台',
          area: ['552px', '400px'],
          content: $('#addCounter')
        })
      },
      submitPhone() {
        this.cancelLayer()
      },
      cancelLayer() {
        layer.close(this.layerId)
      },
      modifyCounter() {
        this.layerId = layer.open({
          type: 1,
          title: '修改收银台',
          area: ['552px', '410px'],
          content: $('#modifyCounter')
        })
      },
      deleteCounter() {
        this.layerId = layer.open({
          type: 1,
          title: '提示',
          area: ['440px', '220px'],
          content: $('#deleteCounter')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/cashier-setting";
</style>
