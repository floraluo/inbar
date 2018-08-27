<template>
  <div class="input-select-box">
    <div class="input-group">
      <input type="text" class="form-control" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" @click="triggerSelect">
          <i>1</i>
        </button>
      </span>
    </div>
    <multiselect
      :value="mtValue"
      :label="label"
      :track-by="trackBy"
      :placeholder="placeholder"
      v-model="selected"
      @input="updateValue"
      :maxHeight="200"
      :showLabels="false"
      :close-on-select="true"
      :searchable="false"
      :allow-empty="false"
      :options="options">
    </multiselect>
  </div>
</template>

<script>
  import multiselect from 'vue-multiselect'
  export default {
    name: 'InputMultiselect',
    components: {multiselect},
    props: {
      value: String,
      placeholder: String,
      mtValue: String,
      trackBy: {
        type: String,
        default: 'id'
      },
      label: String,
      options: Array
    },
    data() {
      return {
        selected: null
      }
    },
    methods: {
      updateValue(option) {
        this.$emit('input', option[this.mtValue])
      },
      triggerSelect(event) {
        console.log(event.target)
        $(event.target).closest('.input-group').next().trigger('focus');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/variables";
  .input-select-box{
    position: relative;
    width: 100%;
    .input-group{
      position: absolute;
      z-index: 1;
    }
  }
  .btn-default > i{
    font-size: 0;
    position: relative;
    top: -2px;
    color: #999;
    border-style: solid;
    border-width: 5px 5px 0;
    border-color: #999 transparent transparent;
  }
  .form-control,
  .input-group-btn .btn-default{
    border-color: $border-color;
  }
  .form-control:focus{
    border-color: $theme-color;
  }
</style>
