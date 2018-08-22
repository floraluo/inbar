<template>
  <!--<my-switch open-name="启用" close-name="禁用" size="lg" v-model="rowData.status" @click="clickSwitch"></my-switch>-->
  <div :class="className" @click="onClick">
    <span class="open">{{ openName }}</span>
    <span class="close">{{ closeName }}</span>
  </div>

</template>

<script>
  import mySwitch from 'vue-switch/switch-2.vue';
  // import {publish} from '../../core/topics'

  export default {
    name: 'BaseSwitch',
    props: {
      rowData: {
        type: Object
      },
      // field: {
      //   type: String
      // },
      // index: {
      //   type: Number
      // },
      value: {
        default: true
      },
      // sm小 md中 lg大
      size: {
        type: String,
        default: 'md'
      },
      color: {
        type: String,
        default: 'red'
      },
      openValue: {
        default: true
      },
      closeValue: {
        default: false
      },
      openName: {
        type: String,
        default: '是'
      },
      closeName: {
        type: String,
        default: '否'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      className() {
        let {
          value,
          openValue,
          closeValue,
          size,
          color,
          disabled
        } = this;
        return {
          'vue-switch': true,
          'z-on': value === openValue,
          'z-disabled': disabled,
          ['s-' + size]: true,
          ['c-' + color]: true
        };
      }
    },
    components: {
      'my-switch': mySwitch
    },
    methods: {
      onClick() {
        let {
          disabled,
          value,
          openValue,
          closeValue
        } = this;
        if (!disabled) {
          this.$emit('click-switch', this.rowData)
          if (openValue === value) {
            // publish('click.switch', value)
            // this.$emit('input', closeValue);
          } else {
            // publish('click.switch', value)
            // this.$emit('input', openValue);
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  // 颜色
  $c1: #d33;
  $c2: #3091f2;
  $c3: #f60;
  $c4: #0c6;

  // 尺寸
  $md: 48px;
  $lg: 60px;

  .vue-switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
    border: 1px solid #d5d5d5;
    background-color: #d5d5d5;
    cursor: pointer;
    transition: all 0.21s ease;
    user-select: none;
    overflow: hidden;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    transform: rotate(0deg);

    span {
      position: absolute;
      font-size: 12px;
      left: 25px;
      color: #222;

      &.open {
        display: none;
      }

      &.close {
        display: inline;
      }
    }

    &::after {
      position: absolute;
      content: '';
      width: 18px;
      height: 18px;
      border-radius: 18px;
      background-color: #fff;
      left: 1px;
      top: 1px;
      cursor: pointer;
      transition: left 0.23s ease, width 0.23s ease, background-color 0.23s ease;
    }

    &:active {
      &::after {
        /*width: 22px;*/
      }
    }

    &.z-on {
      background-color: $c1;
      border-color: $c1;

      &.c-blue {
        background-color: $c2;
        border-color: $c2;
      }

      &.c-orange {
        background-color: $c3;
        border-color: $c3;
      }

      &.c-green {
        background-color: $c4;
        border-color: $c4;
      }

      span {
        color: #fff;
        left: 10px;

        &.open {
          display: inline;
        }

        &.close {
          display: none;
        }
      }

      &:active {
        &::after {
          /*left: 25px;*/
        }
      }

      &::after {
        left: 29px;
      }
    }

    &.s-lg {
      width: 60px;

      &.z-on {
        &:active {
          &::after {
            /*left: 37px;*/
          }
        }

        &::after {
          left: 41px;
        }
      }
    }

    &.s-sm {
      width: 36px;
      height: 10px;
      overflow: visible;

      span {
        display: none;
      }

      &::after {
        width: 18px;
        height: 18px;
        top: -4px;
        left: -1px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.17);
      }

      &:active {
        &::after {
          width: 21px;
        }
      }

      &.z-disabled {
        background-color: #e5e5e5;
        border-color: #e5e5e5;
        cursor: not-allowed;

        &::after {
          background-color: #d5d5d5;
          box-shadow: none;
          cursor: not-allowed;
        }
      }

      &.z-on {
        background-color: lighten($c1, 40);
        border-color: lighten($c1, 40);

        &.c-blue {
          background-color: lighten($c2, 32);
          border-color: lighten($c2, 32);

          &::after {
            background-color: $c2;
          }
        }

        &.c-orange {
          background-color: lighten($c3, 30);
          border-color: lighten($c3, 30);

          &::after {
            background-color: $c3;
          }
        }

        &.c-green {
          background-color: lighten($c4, 45);
          border-color: lighten($c4, 45);

          &::after {
            background-color: $c4;
          }
        }

        span {
          display: none;
        }

        &:active {
          &::after {
            left: 15px;
          }
        }

        &::after {
          left: 19px;
          background-color: $c1;
        }

        &.z-disabled {
          &::after {
            box-shadow: none;
          }
        }
      }
    }
  }

  .vue-switch{
    /*width: 54px;*/
    height: 22px !important;
    line-height: 22px  !important;
    margin-top: 9px;
    &.z-on span{
      /*left: 4px !important;*/
    }
    span.close{
      color: #fff !important;
      opacity: 1;
      line-height: inherit;
      /*left: 20px !important;*/
    }
  }

</style>
