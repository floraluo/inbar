<template>
  <div class="page">
    <div class="page-content  "  >
      <div class="row">
        <div class="col-lg-4 col-sm-6 col-xs-12 ">
          <div class="widget  machine-nmbers-box">
            <div class="widget-content  bg-white clearfix padding-10">
              <div class="pull-left white">
                <img src="../assets/online1.gif">
              </div>
              <div class="counter counter-md   text-center pull-right">
                <span class="counter-label text-uppercase padding-bottom-20">机器总数</span>
                <span class="counter-number " style="color:#4659ed ">600</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-xs-12">
          <div class="widget  machine-nmbers-box">
            <div class="widget-content  bg-white clearfix padding-10">
              <div class="pull-left white ">
                <img src="../assets/online2.gif">
              </div>
              <div class="counter counter-md  text-center pull-right">
                <span class="counter-label text-uppercase padding-bottom-20 ">￥2900</span>
                <span class="counter-number" style="color:#ff3268 ">450</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-xs-12">
          <div class="widget  machine-nmbers-box">
            <div class=" widget-content bg-white clearfix padding-10">
              <div class="pull-left white">
                <img src="../assets/online3.gif">
              </div>
              <div class="counter counter-md  text-center pull-right ">
                <span class="counter-label text-uppercase padding-bottom-20">空余机器</span>
                <span class="counter-number" style="color:#049c49 ">150</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel bg-white padding-20">
        <div class="row  form-top-box">
          <form class="form-inline padding-left-15 padding-right-15">
            <ul>
              <li class="form-group ">
                <label class="control-label" for="inputInlineMachine">机器号</label>
                <input type="text" class="form-control" id="inputInlineMachine" name="inputMachine" placeholder="请输入" autocomplete="off">
              </li>
              <li class="form-group ">
                <label class="control-label" for="inputInlineAera">区域</label>
                <input type="password" class="form-control" id="inputInlineAera" name="inputAera" placeholder="请输入" autocomplete="off">
              </li>
              <li class="form-group ">
                <button type="submit" class="btn  btn-primary">查询</button>
                <button type="submit" class="btn  btn-success margin-left-20">刷新</button>
              </li>
            </ul>
          </form>
        </div>
        <div id="dataTableExample_wrapper" class="online-table-box dataTables_wrapper form-inline dt-bootstrap padding-top-5">
          <table class="table  table-hover dataTable  width-full text-nowrap text-center"  data-selectable="selectable" data-row-selectable="true">
            <thead>
            <tr>
              <th>
                序号
              </th>
              <th>
                机器号
              </th>
              <th>
                结账
              </th>
              <th class="hidden-xs">
               机器IP
              </th>
              <th class="hidden-xs">
                区域
              </th>
              <th>
                当前用户
              </th>
              <th>
                用户姓名
              </th>
              <th>
                上网时长
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                001
              </td>
              <td></td>
              <td>192.168.0.001</td>
              <td >包房</td>
              <td >33022220000000000</td>
              <td></td>
              <td>1小时45分钟</td>
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


      </div>

    </div>

  </div>

</template>

<script>

</script>

<style scoped lang="scss">
 @import "../sass/machine-list";
</style>
