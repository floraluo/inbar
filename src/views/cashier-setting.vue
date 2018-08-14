<template>
  <div class="page-manager-content">
    <div class="page-crumbs">
      <span class="highlight">网吧设置&nbsp;&frasl;</span>&nbsp;收银台设置
    </div>
    <div class="page-main ">
      <div class="btn-top">
        <button class="btn btn-primary btn-round" @click="addCashier" ><i class="iconfont icon-add"></i> 添加</button>
        <button class="btn btn-primary btn-round"  @click="modifyCashier" ><i class="iconfont icon-bianji2"></i> 修改</button>
        <button class="btn btn-primary btn-round "  @click="deleteCashier" ><i class="iconfont icon-"></i> 解绑</button>
      </div>
      <div class="row cashier-content-box ">
        <div class="checkbox-custom checkbox-primary col-xs-2">
          <input type="checkbox" name="inputCheckboxes" checked="">
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
      <div class="row cashier-content-box ">
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
      <div class="row cashier-content-box ">
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
    <div id="addCashier" class="layer-add clearfix">
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
    <div id="modifyCashier" class="layer-modify clearfix">
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
    <div id="deleteCashier" class="layer-delete clearfix">
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
  import $ from 'jquery'
  import layer from '../../static/vendor/layer/layer'
  let vm;
  export default {
    name: "cashier-setting",
    data() {
      return {
        layerId: null,
      }
    },
    created() {
      vm = this;
    },
    methods: {

      addCashier() {
        this.layerId = layer.open({
          type: 1,
          title: '新增收银台',
          area: ['552px', '400px'],
          content: $('#addCashier'),
        })
      },
      submitPhone() {
        this.cancelLayer()
      },
      cancelLayer() {
        layer.close(this.layerId)
      },
      modifyCashier() {
        this.layerId = layer.open({
          type: 1,
          title: '修改收银台',
          area: ['552px', '410px'],
          content: $('#modifyCashier'),
        })
      },
      deleteCashier() {
        this.layerId = layer.open({
          type: 1,
          title: '提示',
          area: ['440px', '220px'],
          content: $('#deleteCashier'),
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/cashier-setting";
</style>
