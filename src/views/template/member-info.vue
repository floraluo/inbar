<template>
  <div>
    <div class="panel panel-card-info">
      <div class="input-box">
        <label>卡号/机器号</label>
        <input type="text" class="form-control" @input="searchActiveMember(searchCardNum)" v-model="searchCardNum">
        <button class="btn btn-primary">重置</button>
        <button class="btn btn-primary">刷新</button>
      </div>
      <p>卡号：{{member.memberId || '--'}}</p>
      <ul class="detail clearfix">
        <li>姓名：<span>{{member.name || '--'}}</span></li>
        <li>手机号码：<span>{{member.mobile || '--'}}</span></li>
        <li>现金：<span>{{member.cash || '--'}}</span></li>
        <li>积分：<span>{{member.coins || '--'}}</span></li>
        <li>赠送：<span>{{member.restrictedCash || '--'}}</span></li>
        <li>类型：<span>{{member.ip || '--'}}</span></li>
      </ul>
    </div>
    <div :class="['panel', 'panel-client-list', {'has-bottom': hasBottom}]">
      <div class="title">激活客户列表</div>
      <div class="no-data" v-if="activeCusList.length == 0">暂无激活用户！</div>
      <ul v-for="(item) in activeCusList" :key="item.id" v-else>
        <li @click="selectMember(item)"><span>{{item.name}}</span>item.memberId</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { POST, GET } from '@/core/http';
  export default {
    name: "member-info",
    props: {
      hasBottom: Boolean
    },
    data() {
      return {
        searchCardNum: '',
        member: '',
        activeCusList: []
      }
    },
    methods: {
      selectMember(item) {
        this.$data.member = item;
      },
      searchActiveMember(value) {
        const self = this;
        GET('/api/member/active/', {name: value}).done(function (data) {
          self.$data.activeCusList = data.content;
        })
      }
    }
  }
</script>

<style scoped>

</style>
<style scoped lang="scss">
  @import "../../sass/variables";
  @import "../../sass/mixin";
  .panel-card-info{
    padding: 25px 15px;
    height: 270px;
    .input-box{
      label{
        margin-right: 10px;
        font-weight: bold;
        font-size: 16px;
        color: $text-dark;
      }
      .form-control{
        margin-right: 15px;
        width: 176px;
        display: inline-block;
        vertical-align: top;
      }
      .btn+.btn{
        margin-left: 5px;
      }
    }
    >p{
      padding-left: 40px;
      margin-top: 25px;
      margin-bottom: 20px;
      //text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: $theme-color;
    }
    >.detail{
      line-height: 2.4;
      padding-left: 40px;
      li{
        float: left;
        width: 40%;
        font-size: 14px;
        color: $text-dark;
        //list-style: none;
        &:nth-child(even){
          width: 60%;
        }
        >span{
          color: $text-light;
        }
      }
    }
  }
  .panel-client-list{
    min-height: 540px;
    &.has-bottom{
      min-height: 365px;
    }
    >.title{
      padding-top: 30px;
      padding-bottom: 30px;
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      color: $text-dark;
    }
    li{
      line-height: 2.6;
      text-align: center;
      font-size: 16px;
      color: $text;
      >span{
        display: inline-block;
        text-align: left;
        width: 6em;
      }
    }
    .no-data{
      @include no-data;
    }
  }
</style>
