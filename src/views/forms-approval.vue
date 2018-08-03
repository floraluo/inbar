<template>
  <div class="page">
  <div class="page-content"  >
    <div class="panel">
      <div class="top">
        <ul >
          <li class="form-group ">
            <label class="control-label " >班次：</label>
            <select class="form-control type-select-box" name="requiredSelect" data-placeholder="请选择" data-fv-notempty="true" data-fv-field="requiredSelect">
              <option value="" >早班</option>
              <option value="">中班</option>
              <option value="">晚班</option>
            </select>
          </li>
          <li class="padding-bottom-15 ">
            <label class="control-label"   >请选择时间：</label>
            <input type="text" class="form-control form-width" data-plugin="datepicker" data-language="zh-CN" value="2018-07-25"><span class="input-addon" ><i class="icon wb-calendar" aria-hidden="true"></i></span>
          </li>
          <li class="padding-bottom-15 ">
            <label class="control-label"  >--</label>
            <input type="text" class="form-control form-width" data-plugin="datepicker" data-language="zh-CN" value="2018-07-25"><span class="input-addon"><i class="icon wb-calendar" aria-hidden="true"></i></span>
          </li>
          <li class="form-group ">
            <label class="control-label " >完成状态：</label>
            <select class="form-control type-select-box" name="requiredSelect" data-placeholder="请选择" data-fv-notempty="true" data-fv-field="requiredSelect">
              <option value="" >已交班</option>
              <option value="">未交班</option>
            </select>
          </li>
          <li class="text-center padding-10 ">
            <button type="submit" class="btn  btn-primary btn-long">查询</button>
          </li>
        </ul>
      </div>
      <div class="bottom">
          <div class="example">
            <table class="table table-hover" data-selectable="selectable" data-row-selectable="true">
              <thead>
              <tr>
                <th >序号</th>
                <th>班次名称</th>
                <th>门店名称</th>
                <th >换人</th>
                <th >开始时间</th>
                <th >结束时间</th>
                <th >本班值班人</th>
                <th >下午值班人</th>
                <th >状态</th>
                <th >材质</th>

              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="row-619" value="619">
                                                <label for="row-619"></label>
                                            </span>
                </td>
                <td>619</td>
                <td>月球探测项目</td>
                <td class="hidden-xs">
                  <span class="label label-primary">幻想中</span>
                </td>
                <td class="hidden-xs">
                  <span data-plugin="peityLine" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="18" width="44"><polygon fill="#e3dbf4" points="0 11.125 0 0.5 4.888888888888889 4.75 9.777777777777779 6.875 14.666666666666668 13.25 19.555555555555557 17.5 24.444444444444446 15.375 29.333333333333336 6.875 34.22222222222223 4.75 39.111111111111114 0.5 44 6.875 44 11.125"></polygon><polyline fill="none" points="0 0.5 4.888888888888889 4.75 9.777777777777779 6.875 14.666666666666668 13.25 19.555555555555557 17.5 24.444444444444446 15.375 29.333333333333336 6.875 34.22222222222223 4.75 39.111111111111114 0.5 44 6.875" stroke="#926dde" stroke-width="1" stroke-linecap="square"></polyline></svg>
                </td>
              </tr>
              <tr>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="row-620" value="620">
                                                <label for="row-619"></label>
                                            </span>
                </td>
                <td>620</td>
                <td>接见法国总理</td>
                <td class="hidden-xs">
                  <span class="label label-warning">待安排</span>
                </td>
                <td class="hidden-xs">
                  <span data-plugin="peityLine" style="display: none;">1,-1,0,2,3,1,-1,1,4,2</span><svg class="peity" height="18" width="44"><polygon fill="#e3dbf4" points="0 14.1 0 10.7 4.888888888888889 17.5 9.777777777777779 14.1 14.666666666666668 7.300000000000001 19.555555555555557 3.8999999999999986 24.444444444444446 10.7 29.333333333333336 17.5 34.22222222222223 10.7 39.111111111111114 0.5 44 7.300000000000001 44 14.1"></polygon><polyline fill="none" points="0 10.7 4.888888888888889 17.5 9.777777777777779 14.1 14.666666666666668 7.300000000000001 19.555555555555557 3.8999999999999986 24.444444444444446 10.7 29.333333333333336 17.5 34.22222222222223 10.7 39.111111111111114 0.5 44 7.300000000000001" stroke="#926dde" stroke-width="1" stroke-linecap="square"></polyline></svg>
                </td>
              </tr>
              <tr>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="row-621" value="621">
                                                <label for="row-619"></label>
                                            </span>
                </td>
                <td>621</td>
                <td>人造太阳计划</td>
                <td class="hidden-xs">
                  <span class="label label-info">测试中</span>
                </td>
                <td class="hidden-xs">
                  <span data-plugin="peityLine" style="display: none;">2,3,-1,-3,-1,0,2,4,5,3</span><svg class="peity" height="18" width="44"><polygon fill="#e3dbf4" points="0 11.125 0 6.875 4.888888888888889 4.75 9.777777777777779 13.25 14.666666666666668 17.5 19.555555555555557 13.25 24.444444444444446 11.125 29.333333333333336 6.875 34.22222222222223 2.625 39.111111111111114 0.5 44 4.75 44 11.125"></polygon><polyline fill="none" points="0 6.875 4.888888888888889 4.75 9.777777777777779 13.25 14.666666666666668 17.5 19.555555555555557 13.25 24.444444444444446 11.125 29.333333333333336 6.875 34.22222222222223 2.625 39.111111111111114 0.5 44 4.75" stroke="#926dde" stroke-width="1" stroke-linecap="square"></polyline></svg>
                </td>
              </tr>
              <tr>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="row-622" value="622">
                                                <label for="row-619"></label>
                                            </span>
                </td>
                <td>622</td>
                <td>购买F22战机</td>
                <td class="hidden-xs">
                  <span class="label label-danger">已取消</span>
                </td>
                <td class="hidden-xs">
                  <span data-plugin="peityLine" style="display: none;">1,-2,0,2,4,5,3,2,4,2</span><svg class="peity" height="18" width="44"><polygon fill="#e3dbf4" points="0 12.642857142857142 0 10.214285714285715 4.888888888888889 17.5 9.777777777777779 12.642857142857142 14.666666666666668 7.7857142857142865 19.555555555555557 2.928571428571429 24.444444444444446 0.5 29.333333333333336 5.357142857142858 34.22222222222223 7.7857142857142865 39.111111111111114 2.928571428571429 44 7.7857142857142865 44 12.642857142857142"></polygon><polyline fill="none" points="0 10.214285714285715 4.888888888888889 17.5 9.777777777777779 12.642857142857142 14.666666666666668 7.7857142857142865 19.555555555555557 2.928571428571429 24.444444444444446 0.5 29.333333333333336 5.357142857142858 34.22222222222223 7.7857142857142865 39.111111111111114 2.928571428571429 44 7.7857142857142865" stroke="#926dde" stroke-width="1" stroke-linecap="square"></polyline></svg>
                </td>
              </tr>
              <tr>
                <td>
                                            <span class="checkbox-custom checkbox-primary">
                                                <input class="selectable-item" type="checkbox" id="row-623" value="623">
                                                <label for="row-619"></label>
                                            </span>
                </td>
                <td>623</td>
                <td>去好莱坞演大片</td>
                <td class="hidden-xs">
                  <span class="label label-default">等待答复</span>
                </td>
                <td class="hidden-xs">
                  <span data-plugin="peityLine" style="display: none;">4,2,-1,-3,-2,1,3,5,2,4</span><svg class="peity" height="18" width="44"><polygon fill="#e3dbf4" points="0 11.125 0 2.625 4.888888888888889 6.875 9.777777777777779 13.25 14.666666666666668 17.5 19.555555555555557 15.375 24.444444444444446 9 29.333333333333336 4.75 34.22222222222223 0.5 39.111111111111114 6.875 44 2.625 44 11.125"></polygon><polyline fill="none" points="0 2.625 4.888888888888889 6.875 9.777777777777779 13.25 14.666666666666668 17.5 19.555555555555557 15.375 24.444444444444446 9 29.333333333333336 4.75 34.22222222222223 0.5 39.111111111111114 6.875 44 2.625" stroke="#926dde" stroke-width="1" stroke-linecap="square"></polyline></svg>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "forms-approval"
    }
</script>

<style scoped lang="scss">
  @import "../sass/forms-approval";

</style>
