<template>
  <div class="page-content " >
    <!--显示在线人数等-->
    <div class="row">
      <div class="col-lg-3 col-sm-6 col-xs-12 ">
        <div class="panel  widget">
            <div class="col-xs-6 ">
              <img src="../assets/online1.gif" alt="">
            </div>
            <div class="col-xs-6 text-left">
                <p class="padding-bottom-15">在线人数</p>
              <span class="counter-number " style="color:#ff3268 ">6000</span>
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
            <span class="counter-number " style="color:#4659ed ">6000</span>
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
            <span class="counter-number " style="color:#049c49 ">6000</span>
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
            <span class="counter-number " style="color:#c725da ">6000</span>
          </div>
        </div>
      </div>
    </div>

    <div class="online-bottom-container ">
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
            </li>
          </ul>
        </form>
      </div>
      <!--在线会员列表-->
      <div id="dataTableExample_wrapper" class="online-table-box dataTables_wrapper form-inline dt-bootstrap padding-top-5">

        <table class="table  table-hover dataTable  width-full text-nowrap text-center"  data-selectable="selectable" data-row-selectable="true">
          <thead>
          <tr>
            <th>序号</th>
            <th class="width-50"></th>
            <th>卡号</th>
            <th>手机号</th>
            <th class="hidden-xs">VIP</th>
            <th >姓名</th>
            <th>会员类型</th>
            <th>消费金额</th>
            <th>剩余金额</th>
            <th>机器号</th>
            <th>剩余时长</th>
            <th>上网时长</th>
            <th>开卡时间</th>
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

        <!--显示几条记录-->
        <div class="col-sm-5" >
          <label>
            共100条记录，每页显示
            <select   class="form-control input-sm">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            条
          </label>
        </div>

        <!--分页-->
        <div class="col-sm-7">
          <nav>
            <ul data-plugin="twbsPagination" data-total-pages="50" data-pagination-class="pagination pagination-no-border" class="pagination pagination-no-border">
              <li class="page-item first disabled">
                <a href="#" class="page-link">
                  <span class="icon fa-angle-double-left" title="第一页"></span>
                </a>
              </li>
              <li class="page-item prev disabled">
                <a href="#" class="page-link">
                  <span class="icon fa-angle-left" title="上一页"></span>
                </a>
              </li>
              <li class="page-item active">
                <a href="#" class="page-link">1</a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">2</a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">3</a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">4</a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">5</a>
              </li>
              <li class="page-item next">
                <a href="#" class="page-link">
                  <span class="icon fa-angle-right" title="下一页"></span>
                </a>
              </li>
              <li class="page-item last">
                <a href="#" class="page-link">
                  <span class="icon fa-angle-double-right" title="最后一页"></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </div>

      <!--绑定手机模态框-->
      <div class="layer-phone " id="settingPhone" >
        <div class="form-group padding-top-10" v-show="validType === 1">
          <label class="control-label col-xs-4 padding-left-20" ><span class="value">*</span>请输入手机号</label>
          <input type="password" class="input-group col-xs-7"  >
          <div class="btn-bottom pull-right">
            <button class="btn btn-default margin-right-15 " @click="cancelLayer">取消</button>
            <button class="btn btn-primary" href="javascript:;" @click="validType = 2">确认</button>
          </div>
        </div>
        <div class=" form-group padding-top-10 padding-left-20" v-show="validType === 2">
          <i class="iconfont icon-tishi" aria-hidden="true" ></i>
          <span > 是否要绑定新的手机？</span>
          <div class="btn-bottom ">
            <button  class="btn btn-default margin-right-15" @click="cancelLayer" >否</button>
            <button type="button" class="btn btn-primary" @click=" submitPhone()">是</button>
          </div>
        </div>

      </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import '../../static/vendor/layer/layer'
  let vm;
  export default {
    name: "online-members",
    data(){
      return{
        layerId: null,
        validType: 1
      }
    },
    created() {
      vm = this;
    },
    methods: {
      settingPhone(){
        this.layerId = layer.open({
          type: 1,
          title: '绑定手机号',
          area: ['420px', '220px'],
          content: $('#settingPhone'),
        })
      },
      submitPhone() {
        this.cancelLayer()
      },
      cancelLayer() {
        layer.close(this.layerId)
      },
      refundBox(){
        this.layerId = layer.open({
          type: 1,
          title: '退单',
          area: ['690px', '445px'],
          content: $('#refundBox'),
        })
      },
    }
  }


</script>


<style scoped lang="scss">
  @import "../sass/online-members";
</style>
