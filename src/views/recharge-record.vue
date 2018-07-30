<template>
    <div class="page">
      <div class="page-content"  >
        <div class="bar-left-container1  ">
          <!--时间查询-->
          <div class=" panel inquiry-box padding-30">
            <ul >
            <li class="padding-bottom-15" ><label class="control-label"   for="inputInlineUsernumber" >会员卡号：</label>
            <input type="text" class="form-control "  id="inputInlineUsernumber" name="inputUsernumber" placeholder="请输入" autocomplete="off">
            </li>
              <li class="padding-bottom-15 ">
              <label class="control-label"   >开始时间：</label>
              <input type="text" class="form-control form-width" data-plugin="datepicker" data-language="zh-CN" value="2018-07-25"><span class="input-addon" ><i class="icon wb-calendar" aria-hidden="true"></i></span>
              </li>
              <li class="padding-bottom-15 ">
              <label class="control-label"  >结束时间：</label>
              <input type="text" class="form-control form-width" data-plugin="datepicker" data-language="zh-CN" value="2018-07-25"><span class="input-addon"><i class="icon wb-calendar" aria-hidden="true"></i></span>
              </li>
              <li class="text-center padding-10 ">
            <button type="submit" class="btn  btn-success btn-long margin-right-15 ">重置</button>
            <button type="submit" class="btn  btn-primary btn-long">查询</button>
              </li>
            </ul>
          </div>
          <!--会员信息-->
          <div class="panel card-info-box padding-30 ">
            <p class="me">会员信息</p>
          <p class="number">卡号：654543233454321345</p>
          <ul class="detail clearfix">
            <li>姓名：<span>sdfad</span></li>
            <li>手机号码：<span></span></li>
            <li>总额：<span></span></li>
            <li>储值：<span></span></li>
            <li>积分：<span></span></li>
            <li>类型：<span></span></li>
            <li>现金：<span></span></li>
            <li>赠送：<span></span></li>
          </ul>
          </div>
        </div>
        <div class="bar-right-container1 panel   margin-left-20  ">
          <!--退单 恢复操作-->
          <div class="row padding-top-10 ">
          <ul class="form-inline ">
            <li class="form-group "><p class="me">会员充值记录</p></li>
            <li class="form-group  pull-right padding-right-20">
          <button type="button" class="btn btn-primary  btn-round margin-right-10">
            <i class="iconfont icon-tuidanguanli" aria-hidden="true"></i>
            退单
          </button>
          <button type="button" class="btn btn-primary  btn-round">
            <i class=" iconfont icon-huifu" aria-hidden="true"></i>
            恢复
          </button>
            </li>
          </ul>
          </div>
          <!--充值记录表格-->
          <div  class=" dataTables_wrapper form-inline dt-bootstrap padding-top-5 recharge-table-box">
            <table class="table table-bordered table-hover width-full text-nowrap text-center recharge-table"  data-selectable="selectable" data-row-selectable="true">
              <thead>
              <tr  >
                <th width="20" >
                  序号
                </th>
                <th >

                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="######" value="#">
                                                <label for="#"></label>
                                            </span>
                </th>
                <th>
                  充值
                </th>
                <th>
                  赠送
                </th>
                <th >
                  充值时间
                </th>
                <th >
                  收银员
                </th>
                <th>
                  备注
                </th>
                <th>
                  状态
                </th>
              </tr>
              </thead>
              <tbody class="min">
              <tr>
                <td>1</td>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="#" value="#">
                                                <label for="#"></label>
                                            </span>
                </td>
                <td>24.00</td>
                <td>0.00</td>
                <td >2018-07-23-24:00</td>
                <td >张晓欢</td>
                <td>xxxxxx</td>
                <td>
                  <button type="button" class="btn btn-sm btn-warning ">可以退单</button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="##" value="#">
                                                <label for="#"></label>
                                            </span>
                </td>
                <td>24.00</td>
                <td>0.00</td>
                <td >2018-07-23-24:00</td>
                <td >张xx</td>
                <td>xxxxxxx</td>
                <td>
                  <button type="button" class="btn btn-sm btn-warning ">可以退单</button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="###" value="#">
                                                <label for="#"></label>
                                            </span>
                </td>
                <td>24.00</td>
                <td>0.00</td>
                <td >2018-07-23-24:00</td>
                <td >张xx</td>
                <td>xxxxxxx</td>
                <td>
                  <button type="button" class="btn btn-sm btn-warning ">可以退单</button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="####" value="#">
                                                <label for="#"></label>
                                            </span>
                </td>
                <td>24.00</td>
                <td>0.00</td>
                <td >2018-07-23-24:00</td>
                <td >张xx</td>
                <td>xxxxxxx</td>
                <td>
                  <button type="button" class="btn btn-sm  btn-warning ">可以退单</button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="#####" value="#">
                                                <label for="#"></label>
                                            </span>
                </td>
                <td>24.00</td>
                <td>0.00</td>
                <td >2018-07-23-24:00</td>
                <td >张xx</td>
                <td>xxxxxxx</td>
                <td>
                  <button type="button" class="btn btn-sm btn-warning">可以退单</button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="#######" value="#">
                                                <label for="#"></label>
                                            </span>
                </td>
                <td>24.00</td>
                <td>0.00</td>
                <td >2018-07-23-24:00</td>
                <td >张xx</td>
                <td>xxxxxxx</td>
                <td>
                  <button type="button" class="btn  btn-sm btn-warning">可以退单</button>
                </td>
              </tr>

              <tr>
                <td colspan="4">充值总额：<span class="red-800">￥</span></td>
                <td colspan="2">累计使用：<span class="red-800">￥</span></td>
                <td colspan="2">账户余额：<span class="red-800">￥</span></td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
        <!--退单模态框-->
        <!--
        <div class="modal fade in" id="examplePositionCenter" aria-hidden="true" aria-labelledby="examplePositionCenter" role="dialog" tabindex="-1" style="display: block; padding-right: 17px;">
          <div class="modal-dialog modal-center">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="关闭">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" >退单</h4>
              </div>
              <div class="modal-body padding-10">
                <div class=" form-group padding-top-20 ">
                  <ul class="ul-control clearfix">
                  <li style="width: 100%">
                    <div style="width: 55%">
                    <label class="control-label" for="examplePositionCenter" >会员卡号：</label>
                  <input type="text" class="form-control  " id="inputUsernumber" name="inputUsernumber"  autocomplete="off">
                </div> </li>
                    <li >
                      <label class=" control-label" for="examplePositionCenter" >姓名：</label>
                    <input type="text" class="form-control " id="inputUsername" name="inputUsername"  autocomplete="off" ></li>
                    <li >
                      <label class=" control-label text-right" for="examplePositionCenter">手机号：</label>
                      <input type="text" class="form-control " id="" name="inputUserphone"  autocomplete="off"></li>

                    <li><label class="control-label" for="examplePositionCenter" > 总额：</label>
                      <input type="text" class="form-control " id="" name="inputUsername"  autocomplete="off"  ></li>
                    <li><label class=" control-label text-right" for="examplePositionCenter" > 储值：</label>
                      <input type="text" class="form-control " id="" name="inputUsername"  autocomplete="off"  ></li>

                    <li><label class=" control-label " for="examplePositionCenter" > 积分：</label>
                      <input type="text" class="form-control  " id="" name="inputUsername"  autocomplete="off" ></li>
                    <li><label class=" control-label " for="examplePositionCenter" >类型：</label>
                      <input type="text" class="form-control " id="" name="inputUsername"  autocomplete="off" ></li>

                    <li><label class=" control-label" for="examplePositionCenter">现金：</label>
                      <input type="text" class="form-control " id="" name="inputUsername"  autocomplete="off" ></li>
                    <li><label class=" control-label" for="examplePositionCenter" >赠送：</label>
                      <input type="text" class="form-control " id="" name="inputUsername"  autocomplete="off"></li>
                  </ul>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">
                  取消
                </button>
                <button type="button" class="btn btn-primary">退单</button>
              </div>
            </div>
          </div>
        </div>
      -->
        <!--恢复模态框  -->
        <!--
       <div class="modal fade in " id="examplePositionCenter" aria-hidden="true" aria-labelledby="examplePositionCenter" role="dialog" tabindex="-1" style="display: block; padding-right: 17px;">
         <div class="modal-dialog modal-center ">
           <div class="modal-content">
             <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal" aria-label="关闭">
                 <span aria-hidden="true">×</span>
               </button>
               <h4 class="modal-title" >恢复</h4>
             </div>
             <div class="modal-body padding-10">
               <div class=" form-group text-center padding-20 ">
                 <i class="iconfont icon-tishi" aria-hidden="true" ></i>
                 <span > 是否要恢复数据</span>
               </div>
             </div>
             <div class="modal-footer text-center">
               <button type="button" class="btn btn-default margin-right-20" >否</button>
               <button type="button" class="btn btn-primary">是</button>
             </div>
           </div>
         </div>
       </div>
        -->

      </div>
    </div>
</template>

<script>
    export default {
        name: "recharge-record"
    }
</script>;

<style scoped lang="scss">
  @import "../sass/recharge-record";

</style>
