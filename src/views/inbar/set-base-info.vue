<template>
  <div class="page-manager-content">
    <div class="page-crumbs">
      <span class="highlight">网吧设置&nbsp;&frasl;</span>&nbsp;基本信息
      <!--
         <a class="crumbs-right"><i class="iconfont icon-bianji2" ></i>编辑</a>
         -->
      <a class="btn-pure btn-default btn-return">返回  <i class="iconfont icon-fanhui" ></i></a>
    </div>
    <div class="page-main">
      <h4 >基础信息</h4>
      <div class="row padding-10">
        <div class="col-xs-4  padding-right-30">
          <div class="form-group ">
            <label class="col-xs-4 control-label">网吧名称</label>
            <div class="col-xs-8">
              <input class="form-control " name="password" required="required"  placeholder="网鱼网咖一店">
            </div>
            <label class="col-xs-4 control-label">所属城市</label>
            <div class="col-xs-8">
              <input  class="form-control ">
            </div>
            <label class="col-xs-4 control-label">详细地址</label>
            <div class="col-xs-8">
              <input class="form-control " name="password" required="required"  placeholder="浙江省杭州市西湖区西湖文化广场26号">
            </div>
          </div>
        </div>
        <div class="col-xs-4 padding-right-30 ">
          <div class="form-group ">
            <label class="col-xs-4 control-label">网吧所属连锁</label>
            <div class="col-xs-8">
              <input class="form-control " name="password" required="required"  placeholder="连锁">
            </div>
            <label class="col-xs-4 control-label">业主姓名</label>
            <div class="col-xs-8">
              <input  class="form-control" placeholder="刘xx">
            </div>
            <label class="col-xs-4 control-label">电脑数量</label>
            <div class=" input-group col-xs-8">
              <input class="form-control" name="password" required="required"  placeholder="300">
              <span class="input-group-addon">台</span>
            </div>
          </div>
        </div>
        <div class="col-xs-4 padding-right-50">
          <div class="form-group ">
            <label class="col-xs-4 control-label">网吧QQ群</label>
            <div class=" col-xs-8">
              <input class="form-control" name="password" required="required"  placeholder="网鱼网咖一店" >
            </div>
            <label class="col-xs-4 control-label">电话</label>
            <div class=" col-xs-8">
              <input  class="form-control">
            </div>
            <label class="col-xs-4 control-label">面积</label>
            <div class="input-group col-xs-8">
              <button class="form-control " name="password" required="required"  placeholder="300"  ></button>
              <span class="input-group-addon ">m²</span>
            </div>
          </div>
        </div>
      </div>

      <h4 >营业信息</h4>
      <div class="row padding-10">
        <div class="col-xs-4 padding-right-30">
          <div class="form-group ">
            <label type="text" class="col-xs-4 control-label">身份证号</label>
            <div class=" col-xs-8">
              <input class="form-control" name="password" required="required"  placeholder="">
            </div>
            <label class="col-xs-4 control-label">身份证照片</label>
            <div class="col-xs-8">
              <img class="col-xs-6 control-label" src="@/assets/img/card01.png" alt="">
              <img  class="col-xs-6 control-label" src="@/assets/img/card02.png" alt="">
            </div>
          </div>
        </div>
        <div class="col-xs-4 padding-right-30">
          <div class="form-group ">
            <label class="col-xs-4 control-label">提现银行卡号</label>
            <div class=" col-xs-8">
              <input class="form-control" name="password" required="required"  placeholder="">
            </div>
            <label class="col-xs-4 control-label">银行卡照片</label>
            <div class="col-xs-8">
              <img class="col-xs-6 control-label" src="@/assets/img/bank01.png" alt="">
            </div>
          </div>
        </div>
        <div class="col-xs-4 padding-right-50">
          <div class="form-group ">
            <label class="col-xs-4 control-label">营业执照</label>
            <div class=" col-xs-8">
              <input class="form-control" name="password" required="required"  placeholder="">
            </div>
            <label class="col-xs-4 control-label">营业执照照片</label>
            <div class="col-xs-8">
              <img class="col-xs-6 control-label" src="@/assets/img/business01.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="btn-bottom col-xs-4">
        <div class="col-xs-4"></div>
        <button class="btn btn-primary margin-right-25">保存</button>
        <button class="btn btn-default">取消</button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "set-base-info"
  }
</script>

<style scoped lang="scss">
  @import "../../sass/set-base-info";
</style>

