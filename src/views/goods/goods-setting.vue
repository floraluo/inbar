<template>
  <div class="page-main">
    <div class="setting-title">仓库设置</div>
    <div class="setting-panel">
      <div class="form-group">
        <span>是否启用吧台</span>
        <ul class="radio-list">
          <li class="radio-custom radio-primary">
            <input v-model="params.isEnabledBar"  value="1" type="radio" name="bar" id="enabled1"><label for="enabled1">启用</label>
          </li>
          <li class="radio-custom radio-primary">
            <input v-model="params.isEnabledBar" value="0" type="radio" name="bar" id="enabled2"><label for="enabled2">禁用</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="setting-title">预警设置</div>
    <div class="setting-panel">
      <div class="form-group">
        <span>是否启用库存预警</span>
        <ul class="radio-list">
          <li class="radio-custom radio-primary">
            <input v-model="params.isEnableWarning" value="1" type="radio" name="warning" id="enabled3"><label for="enabled3">启用</label>
          </li>
          <li class="radio-custom radio-primary">
            <input v-model="params.isEnableWarning" value="0" type="radio" name="warning" id="enabled4"><label for="enabled4">禁用</label>
          </li>
        </ul>
      </div>
      <div class="form-group">
        仓库库存低于 <input type="text" class="form-control" v-model="params.centerWarningValue">时预警
      </div>
      <div class="form-group">
        吧台库存低于 <input type="text" class="form-control" v-model="params.barWarningValue">时预警
      </div>
    </div>
    <div class="operate-group">
      <button class="btn btn-primary" @click="submit">保存</button>
      <!--<button class="btn btn-default">取消</button>-->
    </div>
  </div>
</template>

<script>
  import {GET, POST} from '../../core/http'
  import layer from '../../../static/vendor/layer/layer'
  export default {
    name: 'goods-setting',
    data () {
      return {
        params: {
          isEnabledBar: 1,
          isEnableWarning: 1,
          barWarningValue: '',
          centerWarningValue: ''
        }
      }
    },
    methods: {
      submit() {
        let query = `barWarningValue=${this.params.barWarningValue}
        &centerWarningValue=${this.params.centerWarningValue}
        &isEnableWarning=${this.params.isEnableWarning}
        &isEnabledBar=${this.params.isEnabledBar}`
        POST(`/api/stock/goodsStock/updateWarning?${query}`)
          .then(() => {
            layer.msg('设置成功');
          })
      }
    },
    created() {
      GET('/api/stock/goodsStock')
        .then(data => {
          this.params = data;
        })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  .page-main{
    padding-left: 25px;
    padding-right: 25px;
    .setting-title{
      font-size: 15px;
      color: $text-dark;
      font-weight: bold;
    }
    .setting-panel{
      margin-top: 15px;
      margin-bottom: 30px;
      background-color: #f5f5f5;
      color: $text;
      .form-group{
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 20px;
        display: flex;
        align-items: center;
        .form-control{
          margin-left: 5px;
          margin-right: 5px;
          width: 100px;
        }
      }
      .radio-list{
        display: flex;
        padding-left: 15px;
        li + li{
          margin-left: 20px;
        }
      }
    }
  }
</style>
