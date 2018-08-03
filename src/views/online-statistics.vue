<template>
  <div class="page">
    <div class="page-content " >
      <div class="panel bar-top-container">
        <div class="panel-heading title-bot">
          <p class="panel-title">上机统计预览</p>
        </div>
        <online-amount></online-amount>
      </div>
      <div class="panel bar-bottom-container">
        <div class="panel-heading ">
          <p class="panel-title">上机明细</p>
        </div>
        <div class="col-md-12 ">
          <table class="table table-bordered table-center">
            <thead>
            <tr>
              <th>序号</th>
              <th>会员类型</th>
              <th>会员卡号</th>
              <th>结账款</th>
              <th>短信费</th>
              <th>上网时长</th>
              <th>上机时间</th>
              <th>下机时间</th>
              <th>结账时间</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>临时卡</td>
              <td>5615612510651145</td>
              <td>120.00</td>
              <td>100.00</td>
              <td>1小时30分</td>
              <td>2018-08-03-24：00</td>
              <td>2018-08-03-24：00</td>
              <td>2018-08-03-24：00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>临时卡</td>
              <td>5615612510651145</td>
              <td>120.00</td>
              <td>100.00</td>
              <td>1小时30分</td>
              <td>2018-08-03-24：00</td>
              <td>2018-08-03-24：00</td>
              <td>2018-08-03-24：00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>临时卡</td>
              <td>5615612510651145</td>
              <td>120.00</td>
              <td>100.00</td>
              <td>1小时30分</td>
              <td>2018-08-03-24：00</td>
              <td>2018-08-03-24：00</td>
              <td>2018-08-03-24：00</td>
            </tr>
            </tbody>
          </table>
        </div>




      </div>
    </div>
  </div>
</template>

<script>
    import OnlineAmount from "./template/online-stasistics-box";
    export default {
        name: "online-statistics",
      components: {OnlineAmount}
    }
</script>

<style scoped lang="scss">
@import "../sass/online-statistics";
</style>
