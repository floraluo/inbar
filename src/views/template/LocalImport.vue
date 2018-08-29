<template>
  <div class="local-import" :class="{'is-layer': isLayer}">
    <ul>
      <li>
        第一步：
        <a :href="tempUrl" :download="`${templateName}数据模板.xls`">导出数据模板1</a>
        <!--<a :href="tempUrl" download="zz.xls">导出数据模板</a>-->
      </li>
      <li>第二步：在模板中录入数据</li>
      <li>第三步：
        <label class="btn btn-primary btn-sm btn-upload" for="importData">
          <i class="iconfont icon-file"></i>选择文件
          <input class="sr-only" @change='importFile($event)' accept=".xls,.xlsx,.xlsm,.xltx,.xltm,.xlsb,.xlam" type="file" id="importData">
        </label>
        <span v-if="file">{{file.name}}</span>
      </li>
    </ul>
    <div class="form-group layer-btn-operate-group">
      <button class="btn btn-primary" @click="submitImport">导入</button>
      <button class="btn btn-default" @click="cancelImport">取消</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LocalImport',
    props: {
      tempUrl: String,
      isLayer: {
        type: Boolean,
        default: true
      },
      templateName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        file: null
      }
    },
    methods: {
      cancelImport() {
        this.file = null;
        this.$emit('cancel-import')
      },
      submitImport() {
        this.$emit('submit-import', this.file)
      },
      importFile(event) {
        let files = event.target.files;

        if (!files.length) {
          return;
        }

        this.file = files[0];
      }
    }
  }
</script>

<style scoped lang="scss">
.local-import{
  ul{
    padding-top: 50px;
  }
  li{
    /*padding-left: 160px;*/
    margin-bottom: 20px;
  }
  &.is-layer li{
    padding-left: 160px;
  }
  .btn-upload{
    padding-right: 8px;
    color: #fff;
  }
}
.is-layer .layer-btn-operate-group{
  text-align: right;
}
.layer-btn-operate-group{
  margin-top: 50px;
  .btn{
    margin-left: 15px;
  }
}
</style>
