<template>
<div class="page-manager-content">
  <div class="page-crumbs"><span class="highlight">员工管理&nbsp;&frasl;</span>&nbsp;维护金管理</div>
  <div class="page-main">
    <div class="btn-operate-group">
      <button class="btn btn-primary" @click="clickAddMaintain"><i class="iconfont icon-add"></i>新增</button>
      <!--<button class="btn btn-primary" @click="clickDeleteStaffs"><i class="iconfont icon-close"></i>删除</button>-->
    </div>
  </div>

  <!--添加维护金-->
  <div class="layer-add-maintain layer-open" id="addMaintainLayer">
    <form>
      <div class="form-group"><label for="">维护金名称<small class="error"  v-show="errors.has('name')">*{{ errors.first('name') }}</small></label>
        <input v-model="maintainParam.name"
               data-vv-as="名称"
               v-validate="'required'"
               name="name"
               type="text" class="form-control" placeholder="请输入名称">
      </div>
      <div class="form-group"><label for="">维护金金额<small class="error"  v-show="errors.has('sum')">*{{ errors.first('sum') }}</small></label>
        <div class="input-group">
          <input v-model="maintainParam.amount"
                 data-vv-as="金额"
                 v-validate="'required|sum'"
                 name="sum"
                 type="text" class="form-control" placeholder="请输入金额">
          <span class="input-group-addon">元</span>
        </div>
      </div>
      <div class="form-group form-date-group"><label for="">使用时间限制 <small class="error" v-show="maintainParam.time !== null && maintainParam.time === ''">*日期为必选项</small></label>
        <date-picker v-model="maintainParam.time" :width="datapickerWidth" type="month" :format="'YYYY-MM'"></date-picker>
      </div>
    </form>
    <div class="form-group layer-btn-operate-group">
      <button class="btn btn-default" @click="cancelLayer">取消</button>
      <button class="btn btn-primary" @click="saveAddMaintain">保存</button>
    </div>
  </div>
</div>
</template>

<script>
  import $ from 'jquery'
  import DatePicker from 'vue2-datepicker'
  import layer from '../../static/vendor/layer/layer'
  let vm;

  function openLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['600px', '410px'],
      content: $('#addMaintainLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      cancel() {
        // layer.msg("我是取消回调")
      },
      end() {
        clearMaintainParams();
        // layer.msg("我是销毁回调")
      }
    })
  }
  function clearMaintainParams () {
    vm.maintainParam = {
      name: '',
      amount: '',
      time: null
    }

  }

  export default {
    name: 'miantain-money-manage',
    components: { DatePicker },
    data() {
      return {
        layerId: null,
        datapickerWidth: '100%',
        maintainParam: {
          name: '',
          amount: '',
          time: null
        }
      }
    },
    methods: {
      clickAddMaintain() {
        openLayer('新增员工维护金')
      },
      cancelLayer() {
        layer.close(vm.layerId);
      },
      saveAddMaintain() {
        this.$validator.validate().then(() => {
          const error = vm.$validator.errors;
          if (error.any() || vm.maintainParam.time === null || vm.maintainParam.time === '') {
            layer.msg('你还有错误消息未处理！')
            if (vm.maintainParam.time === null) vm.maintainParam.time = '';
          } else {
            // -----doPost()
            layer.msg('保存成功！');
            layer.close(vm.layerId);
          }
        })
      }
    },
    created() {
      vm = this;
    }
  }
</script>
<style lang="scss">
  .layui-layer-page .layui-layer-content{
    overflow: initial;
  }
  .form-date-group{
    .mx-datepicker-popup{
      bottom: initial !important;
      width: 100%;
      .mx-calendar,
      .mx-calendar-content{
        width: 100%;
      }
    }
    .mx-calendar-content{
      height: 124px;
      border-top: 1px solid #d6d6d6;
    }
    .mx-panel-month .cell{
      width: calc((100% - 24px) / 6);
      margin: 8px 0;
    }
  }
</style>
<style scoped lang="scss">
  @import "../sass/maintain-manage.scss";
</style>
