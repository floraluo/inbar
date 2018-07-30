<template>
  <div>
    <div class="panel panel-card-info">
      <div class="input-box">
        <label>卡号{{$route.path === '/goods' ? '/机器号': ''}}</label>
        <input type="text" class="form-control" @input="searchActiveMember(searchCardNum)" v-model="searchCardNum">
        <button class="btn btn-primary">重置</button>
        <button class="btn btn-primary">刷新</button>
      </div>
      <p>卡号：{{member.memberId || '--'}}</p>
      <ul class="detail clearfix">
        <li>姓名：<span>{{member.name || '--'}}</span></li>
        <li>手机号码：<span>{{member.mobile || '--'}}</span></li>
        <li>现金：<span>{{!member.cash && member.cash != 0 ? '--' : member.cash}}</span></li>
        <li>积分：<span>{{!member.coins && member.coins != 0 ? '--' : member.coins}}</span></li>
        <li>赠送：<span>{{!member.restrictedCash && member.restrictedCash !=0 ? '--' : member.restrictedCash}}</span></li>
        <li>类型：<span>{{member.scope || '--'}}</span></li>
      </ul>
    </div>
    <div :class="['panel', 'panel-client-list', {'has-bottom': hasBottom}]">
      <loading-box :loading="memberLoading"></loading-box>
      <div class="title">激活客户列表</div>
      <div class="no-data" v-if="activeCusList.length == 0">暂无激活用户！</div>
      <ul  v-else>
        <li v-for="(item) in activeCusList" :key="item.id" @click="selectMember(item)"><span>{{item.name}}</span>{{item.memberId | formatIDCard}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import { POST, GET } from '@/core/http';
  import { GET } from '@/core/http';
  import { components } from '@/core'
  import LoadingBox from './loading-box'

  function getActiveCustomerList(value) {
    const vm = this, params = value || '';
    vm.memberLoading = true;
    GET('/api/member/active/', {keyword: params})
      .done(d => {
        vm.activeCusList = d.content;
        vm.memberLoading = false;
      })
  }
  function delayGetActiveCusList(value) {
    const vm = this;
    if (vm.timer) {
      clearInterval(this.timer);
    }
    vm.timer = setTimeout(() => {
      getActiveCustomerList.call(vm, value);
    }, 1000)
  }
  export default {
    name: "member-info",
    components: components(LoadingBox),
    props: {
      hasBottom: Boolean
    },
    data() {
      return {
        memberLoading: false,
        timer: null,
        searchCardNum: '',
        member: '',
        activeCusList: []
      }
    },
    created() {
      getActiveCustomerList.call(this);
    },
    methods: {
      selectMember(item) {
        this.member = item;
        this.$emit('onSelectActivityMemeber', item);
      },
      searchActiveMember(value) {
        delayGetActiveCusList.call(this, value);
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
    min-height: 491px;
    &.has-bottom{
      min-height: 365px;
      ul{
        max-height: 290px;
      }
    }
    >.title{
      padding-top: 20px;
      padding-bottom: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      color: $text-dark;
    }
    ul{
      max-height: 365px;
      overflow-y: auto;
    }
    li{
      line-height: 2.6;
      text-align: center;
      font-size: 16px;
      color: $text;
      cursor: pointer;
      &:hover{
        background-color: $theme-color;
        color: #fff;
      }
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
