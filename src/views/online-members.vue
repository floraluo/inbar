<template>
  <div class="page">
    <div class="page-content " style="padding-left: 220px">
      <!--显示在线人数等-->
      <div class="row">
        <div class="col-lg-3 col-sm-6 col-xs-12 ">
          <div class="widget  padding-35">
            <div class="widget-content  bg-white clearfix padding-10">
              <div class="pull-left white">
                 <img src="../assets/online1.gif">
              </div>
              <div class="counter counter-md   text-center pull-right">
                <div class="counter-label text-uppercase padding-bottom-20">在线人数</div>
                <span class="counter-number " style="color:#ff3268 ">6000</span>
              </div>
            </div>
          </div>
      </div>
        <div class="col-lg-3 col-sm-6 col-xs-12 ">
          <div class="widget  padding-35">
            <div class="widget-content  bg-white clearfix padding-10">
              <div class="pull-left white ">
                <img src="../assets/online2.gif">
              </div>
              <div class="counter counter-md  text-center pull-right">
                <div class="counter-label text-uppercase padding-bottom-20 ">上机人数</div>
                <span class="counter-number" style="color:#4659ed ">6000</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-xs-12 ">
          <div class="widget  padding-35">
            <div class="widget-content  bg-white clearfix padding-10">
              <div class="pull-left white">
                <img src="../assets/online3.gif">
              </div>
              <div class="counter counter-md  text-center pull-right ">
                <div class="counter-label text-uppercase padding-bottom-20">会员</div>
                <span class="counter-number" style="color:#049c49 ">600</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-xs-12 ">
          <div class="widget  padding-35">
            <div class="widget-content  bg-white clearfix padding-10">
              <div class="pull-left white">
                <img src="../assets/online4.png">
              </div>
              <div class="counter counter-md  text-center pull-right">
                <div class="counter-label text-uppercase padding-bottom-20">临时卡</div>
                <span class="counter-number" style="color:#c725da ">150</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      <div class="panel bg-white padding-20">
        <!--表单-->
          <div class="row  form-top-box">
            <form class="form-inline padding-left-15 padding-right-15">
              <ul>
              <li class="form-group ">
                <label class="control-label" for="inputInlineUsername">会员卡号</label>
                <input type="text" class="form-control" id="inputInlineUsername" name="inputUsername" placeholder="请输入" autocomplete="off">
              </li>
              <li class="form-group ">
                <label class="control-label" for="inputInlinePassword">机器号</label>
                <input type="password" class="form-control" id="inputInlinePassword" name="inputPassword" placeholder="请输入" autocomplete="off">
              </li>
              <li class="form-group ">
                <label class="control-label " for="inputInlinePassword">类型</label>
                  <select class="form-control type-select-box" name="requiredSelect" data-placeholder="请选择" data-fv-notempty="true" data-fv-field="requiredSelect">
                    <option value="" >请选择</option>
                    <option value="">临时卡</option>
                    <option value="">会员卡</option>
                  </select>
              </li>
              <li class="form-group ">
                <button type="submit" class="btn  btn-primary">查询</button>
                <button type="submit" class="btn  btn-success margin-left-20">刷新</button>

              </li>
              <li class="form-group btn-phone-box text-right">
                <button type="button" class="btn  btn-round btn-primary " data-target="#FormModal" data-toggle="modal" >
                  <i class="iconfont icon-chongzhijilu1" aria-hidden="true"></i>
                 充值
                </button>
                <button type="button" class="btn  btn-round btn-primary " data-target="#FormModal" data-toggle="modal" >
                  <i class="iconfont icon-shangpin" aria-hidden="true"></i>
                  销售
                </button>
                <button type="button" class="btn  btn-round btn-primary " data-target="#examplePositionCenter" data-toggle="modal" >
                  <i class="iconfont icon-bangdingshouji01" aria-hidden="true"></i>
                  绑定手机
                </button>
                <button type="button" class="btn  btn-round btn-primary " data-target="#exampleFormModal" data-toggle="modal" >
                  <i class="iconfont icon-zhongzhimima" aria-hidden="true"></i>
                  重置密码
                </button>
              </li>
              </ul>
            </form>
          </div>
        <!--在线会员列表-->
        <div id="dataTableExample_wrapper" class="online-table-box dataTables_wrapper form-inline dt-bootstrap padding-top-5">
            <table class="table  table-hover dataTable  width-full text-nowrap text-center"  data-selectable="selectable" data-row-selectable="true">
            <thead>
            <tr>
              <th>
                序号
              </th>
              <th class="width-50">
              </th>
              <th>
                卡号
              </th>
              <th>
                手机号
              </th>
              <th class="hidden-xs">
                VIP
              </th>
              <th class="hidden-xs">
                姓名
              </th>
              <th>
               会员类型
              </th>
              <th>
                消费金额
              </th>
              <th>
                剩余金额
              </th>
              <th>
                机器号
              </th>
              <th>
                剩余时长
              </th>
              <th>
                上网时长
              </th>
              <th>
                开卡时间
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="#" value="#">
                                                <label for="#"></label>
                                            </span>
              </td>
              <td>3302121000000000000</td>
              <td>15232333333</td>
              <td >二级</td>
              <td >张xx</td>
              <td>临时卡</td>
              <td>24.00</td>
              <td>24.00</td>
              <td>001</td>
              <td>20</td>
              <td>一小时45分钟</td>
              <td>2018-07-23-24:00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="##" value="#">
                                                <label for="#"></label>
                                            </span>
              </td>
              <td>3302121000000000000</td>
              <td>15232333333</td>
              <td >二级</td>
              <td >张xx</td>
              <td>临时卡</td>
              <td>24.00</td>
              <td>24.00</td>
              <td>001</td>
              <td>20</td>
              <td>一小时45分钟</td>
              <td>2018-07-23-24:00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="###" value="#">
                                                <label for="#"></label>
                                            </span>
              </td>
              <td>3302121000000000000</td>
              <td>15232333333</td>
              <td >二级</td>
              <td >张xx</td>
              <td>临时卡</td>
              <td>24.00</td>
              <td>24.00</td>
              <td>001</td>
              <td>20</td>
              <td>一小时45分钟</td>
              <td>2018-07-23-24:00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="####" value="#">
                                                <label for="#"></label>
                                            </span>
              </td>
              <td>3302121000000000000</td>
              <td>15232333333</td>
              <td >二级</td>
              <td >张xx</td>
              <td>临时卡</td>
              <td>24.00</td>
              <td>24.00</td>
              <td>001</td>
              <td>20</td>
              <td>一小时45分钟</td>
              <td>2018-07-23-24:00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="#####" value="#">
                                                <label for="#"></label>
                                            </span>
              </td>
              <td>3302121000000000000</td>
              <td>15232333333</td>
              <td >二级</td>
              <td >张xx</td>
              <td>临时卡</td>
              <td>24.00</td>
              <td>24.00</td>
              <td>001</td>
              <td>20</td>
              <td>一小时45分钟</td>
              <td>2018-07-23-24:00</td>
            </tr>
            </tbody>
          </table>
            <div class=" col-sm-5  dataTables_length" >
              <label>
                共100条记录，每页显示
                <select name="dataTableExample_length" aria-controls="dataTableExample" class="form-control input-sm">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                条
              </label>
            </div>
            <div class="  col-sm-7 paging_simple_numbers" id="dataTableExample_paginate">
              <nav>
                <ul data-plugin="twbsPagination" data-total-pages="50" data-pagination-class="pagination pagination-no-border" class="pagination pagination-no-border">
                  <li class="page-item first disabled">
                    <a href="#" class="page-link">
                      <span class="icon fa-angle-double-left" title="第一页"></span></a></li>
                  <li class="page-item prev disabled"><a href="#" class="page-link"><span class="icon fa-angle-left" title="上一页"></span></a></li>
                  <li class="page-item active"><a href="#" class="page-link">1</a></li><li class="page-item"><a href="#" class="page-link">2</a></li>
                  <li class="page-item"><a href="#" class="page-link">3</a></li><li class="page-item"><a href="#" class="page-link">4</a></li>
                  <li class="page-item"><a href="#" class="page-link">5</a></li>
                  <li class="page-item next"><a href="#" class="page-link"><span class="icon fa-angle-right" title="下一页"></span></a>
                  </li><li class="page-item last"><a href="#" class="page-link"><span class="icon fa-angle-double-right" title="最后一页"></span></a></li>
                </ul>
              </nav>
            </div>
          </div>
        <!--绑定手机模态框-->
        <div class="modal fade in" id="examplePositionCenter" aria-hidden="true" aria-labelledby="examplePositionCenter" role="dialog" tabindex="-1" style="display: block; padding-right: 17px;">
          <div class="modal-dialog modal-center">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="关闭">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" >绑定手机号</h4>
              </div>
              <div class="modal-body">
                <div class=" form-group padding-left-30">
                  <label class="control-label" for="inputInlineUsername"><span class="red-800" >*</span>请输入手机号</label>
                  <input type="text" class="" id="" name="inputUsername"  autocomplete="off">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">
                  取消
                </button>
                <button type="button" class="btn btn-primary">确定</button>
              </div>
            </div>
          </div>
        </div>

          </div>
        </div>

      </div>

</template>

<script>
  import $ from 'jquery'


</script>


<style scoped lang="scss">
  @import "../sass/online-members";
</style>
