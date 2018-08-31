<template>
  <label class="btn btn-primary btn-upload" for="selectFile">
    <i class="iconfont icon-tupian" v-if="!disableIcon"></i>{{btnText}}
    <input class="sr-only" @change='importFile($event)' :accept="acceptType" type="file" id="selectFile">
  </label>
</template>

<script>
  import layer from '../../../static/vendor/layer/layer'
  import {POST, MultiFormed} from '../../core/http'

  export default {
    name: 'BaseSelectFile',
    props: {
      disableIcon: {
        type: Boolean,
        default: false
      },
      btnText: {
        type: String,
        default: '选择图片'
      },
      acceptType: {
        type: String,
        default: '.jpg,.jpeg,.png,.gif,.bmp,.tiff'
      },
      path: String
    },
    methods: {
      importFile(event) {
        const vm = this;
        let fileReader = new FileReader(), files = event.target.files, file, formData = new FormData();
        file = files[0];
        formData.append('file', file)
        formData.append('path', this.path)
        POST(`/api/files`, MultiFormed(formData)).then(data => {
          vm.$emit("onUploadSuccess")
        })
        if (/^image\/\w+$/.test(file.type)) {
          fileReader.onload = function () {
            vm.$emit('onReadSuccess', {
              files: files,
              result: this.result
            })
          };
          fileReader.readAsDataURL(file);
        }
      }
    }
  }
</script>

<style scoped>

</style>
