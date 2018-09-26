<template>
  <label class="btn btn-primary btn-upload" for="selectFile">
    <i class="iconfont" :class="icon" v-if="!disableIcon"></i>{{btnText}}
    <input class="sr-only" @change='importFile($event)' :accept="acceptType" type="file" id="selectFile">
  </label>
</template>

<script>
  import store from '@/core/store'
  import layer from '../../../static/vendor/layer/layer'
  import {POST, MultiFormed} from '../../core/http'

  export default {
    name: 'BaseSelectFile',
    props: {
      icon: {
        type: String,
        default: 'icon-tupian'
      },
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
      directory: String
    },
    methods: {
      importFile(event) {
        const vm = this;
        let fileReader = new FileReader(),
          files = event.target.files,
          file,
          formData = new FormData(),
          token = store.token.access_token;
        file = files[0];
        formData.append('file', file)
        if (file) {
          POST(`/api/files?__t=${token}&directory=${this.directory}`, MultiFormed(formData)).then(data => {
            vm.$emit("on-upload-success", {files: files, path: data})
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
  }
</script>

<style scoped>
  label{
    color: #fff;
  }
  label .iconfont{
    margin-right: 5px;
  }
</style>
