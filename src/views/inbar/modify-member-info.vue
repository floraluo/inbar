<template>
  <div class="page-main">
    <div class="btn-return">
      <router-link :to="{name: 'manage-member-data'}" replace>返回 <i class="iconfont icon-fanhui"></i></router-link>
    </div>
    <div class="modify-main row clearfix">
      <div class="col-xs-12 col-sm-3 left-portrait">
        <div class="portrait-box">
          <img :src="portraitDataURL" alt="" v-if="portraitDataURL">
          <img :src="`/api/files?path=${portraitPath}`" alt="" v-else-if="portraitPath">
          <i class="iconfont icon-tupian" v-else></i>
        </div>
        <!--<label class="btn btn-primary btn-upload" for="selectImg">更改头像-->
          <!--<input class="sr-only" @change='importFile($event)' accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" type="file" id="selectImg">-->
        <!--</label>-->
        <base-select-file :path="portraitPath" :disableIcon="true" @onUploadSuccess="uploadPortrait" @onReadSuccess="readSuccess"></base-select-file>
        <strong>{{member.name}}</strong>
        <p class="id">{{member.memberId}}</p>
      </div>
      <div class="col-xs-12 col-sm-9 right-panel">
        <form>
          <div class="panel">
            <div class="panel-title">基本信息</div>
            <div class="panel-content">
              <div class="form-group"><span class="label-span">姓名</span><span v-model="member.name"  :format="'YYYY-MM-DD'"></span></div>
              <div class="form-group"><span class="label-span">性别</span><span>{{member.sex === 0 ? '女' : '男'}}</span></div>
              <div class="form-group"><span class="label-span">账号</span><span>{{member.memberId}}</span></div>
              <div class="form-group"><span class="label-span">手机号</span>
                <div class="input-group">
                  <input v-model="memberParams.mobile" v-validate="'mobile'"
                         data-vv-as="手机号"
                         name="number"
                         class="form-control" type="text"><i></i>
                </div>
                <span class="error" v-show="errors.has('number')">*{{ errors.first('number') }}</span>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-title">私密信息</div>
            <div class="panel-content">
              <div class="form-group"><span class="label-span">会员生日</span>
                <div class="input-group">
                  <date-picker v-model="memberParams.birthday" :width="'280'" :editable="true" :format="'YYYY-MM-DD'"></date-picker>
                  <i></i>
                </div>
              </div>
              <div class="form-group"><span class="label-span">QQ号</span>
                <div class="input-group">
                  <input v-model="memberParams.qq" v-validate="'numeric'" data-vv-as="QQ号" name="qq" type="text" class="form-control"><i></i>
                </div>
                <span class="error" v-show="errors.has('qq')">*{{ errors.first('qq') }}</span>
              </div>
              <div class="form-group"><span class="label-span">微信号</span>
                <div class="input-group">
                  <input v-model="memberParams.wechat" type="text" class="form-control"><i></i>
                </div>
              </div>
              <div class="form-group"><span class="label-span">邮箱</span>
                <div class="input-group">
                  <input v-model="memberParams.email" v-validate="'email'" data-vv-as="邮箱"  type="text" name="email" class="form-control"><i></i>
                  <span class="error" v-show="errors.has('email')">*{{ errors.first('email') }}</span>
                </div>
              </div>
              <div class="form-group"><span class="label-span">所在地区</span>
                <div class="input-group">
                  <div class="linkage member-linkage" @focus.capture="clickLinkage($event)">
                    <multiselect
                      value="code"
                      v-model="memberAddress.province"
                      label="name"
                      placeholder="省"
                      track-by="code"
                      @input="updateProvince"
                      :maxHeight="200"
                      :showLabels="false"
                      :close-on-select="true"
                      :searchable="false"
                      :allow-empty="false"
                      :tabindex="0"
                      :options="provinces">
                    </multiselect>
                    <multiselect
                      value="code"
                      v-model="memberAddress.city"
                      label="name"
                      placeholder="市"
                      track-by="code"
                      @input="updateCity"
                      :maxHeight="200"
                      :showLabels="false"
                      :close-on-select="true"
                      :searchable="false"
                      :allow-empty="false"
                      :tabindex="1"
                      :options="cities">
                    </multiselect>
                    <multiselect
                      value="code"
                      v-model="memberAddress.area"
                      label="name"
                      placeholder="区/县"
                      track-by="code"
                      @input="updateArea"
                      :maxHeight="200"
                      :showLabels="false"
                      :close-on-select="true"
                      :searchable="false"
                      :allow-empty="false"
                      :tabindex="2"
                      :options="areas">
                    </multiselect>
                  </div>
                </div>
              </div>
              <div class="form-group"><span class="label-span">详细地址</span>
                <div class="input-group">
                  <input v-model="memberAddress.detail" type="text" class="form-control"><i></i>
                </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-title">其他信息</div>
            <div class="panel-content">
              <div class="form-group"><span class="label-span">VIP级别</span>
                <div class="input-group">
                  <multiselect
                    value="id"
                    v-model="selectedLevel"
                    label="levelName"
                    placeholder="请选择级别"
                    track-by="id"
                    @input="updateLevel"
                    :maxHeight="200"
                    :showLabels="false"
                    :close-on-select="true"
                    :searchable="false"
                    :allow-empty="false"
                    :options="levels">
                  </multiselect>
                  <!--<input v-model="member.level" type="text" class="form-control"><i></i>-->
                </div>
              </div>
              <div class="form-group"><span class="label-span">会员积分</span>
                <div class="input-group">
                  <input v-model="memberParams.coins" type="text" class="form-control"><i></i>
                </div>
              </div>
              <div class="form-group"><span class="label-span">备注</span>
                <div class="input-group">
                  <input v-model="memberParams.remark" type="text" class="form-control"><i></i>
                </div>
              </div>
              <div class="form-group"><span class="label-span">是否启用</span>
                <ul class="radio-list">
                  <li class="radio-custom radio-primary">
                    <input v-model="memberParams.enabled" value="true" type="radio" name="enabled" id="enabled1"><label for="enabled1">启用</label>
                  </li>
                  <li class="radio-custom radio-primary">
                    <input v-model="memberParams.enabled" value="false" type="radio" name="enabled" id="enabled2"><label for="enabled2">禁用</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="bottom-btn-group">
      <button class="btn btn-primary" @click="save">保存</button>
      <button class="btn btn-default">取消</button>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import DatePicker from 'vue2-datepicker'
  import multiselect from 'vue-multiselect'
  import {publish} from 'pubsub-js'
  import layer from '../../../static/vendor/layer/layer'
  import {GET, POST, PATCH, MultiFormed} from '../../core/http'
  import provinces from '../../assets/city/provinces_cn.json'
  import cities from '../../assets/city/cities_cn.json'
  import areas from '../../assets/city/areas_cn.json'

  let vm;
  function _getNextAddress () {
    let nextCities = [], nextAreas = [];
    if (vm.memberAddress.province) {
      cities.forEach(c => {
        if (c.parent_code === vm.memberAddress.province.code) {
          nextCities.push(c)
        }
      })
    }
    if (vm.memberAddress.city) {
      areas.forEach(a => {
        if (a.parent_code === vm.memberAddress.city.code) {
          nextAreas.push(a)
        }
      })
    }
    return { nextCities, nextAreas }
  }
  function _setMemberLevel () {
    vm.levels.some(level => {
      if (+level.id === +vm.member.level) {
        vm.selectedLevel = level;
      }
    })
  }
  function _initMemberParams () {
    // vm.memberParams.area: null,
    // vm.memberParams.city: null,
    // vm.memberParams.province: null,
    // vm.memberParams.level: null,
    vm.memberParams.id = vm.$route.params.id;
    vm.memberParams.address = vm.member.address;
    vm.memberParams.birthday = vm.member.birthday;
    vm.memberParams.coins = vm.member.coins;
    vm.memberParams.email = vm.member.email;
    vm.memberParams.enabled = vm.member.enabled;
    vm.memberParams.mobile = vm.member.mobile;
    vm.memberParams.qq = vm.member.qq;
    vm.memberParams.remark = vm.member.remark;
    vm.memberParams.wechat = vm.member.wechat;
  }
  function _initAddress () {
    if (vm.member.province) {
      provinces.some(item => {
        if (item.code === vm.member.province) {
          vm.memberAddress.province = item;
          return true;
        }
      })
      vm.cities = _getNextAddress().nextCities;
    }
    if (vm.member.city) {
      cities.some(item => {
        if (item.code === vm.member.city) {
          vm.memberAddress.city = item;
          return true;
        }
      })
      vm.areas = _getNextAddress().nextAreas;
    }
    if (vm.member.area) {
      areas.some(item => {
        if (item.code === vm.member.area) {
          vm.memberAddress.area = item;
          return true;
        }
      })
    }
    if (vm.member.address && vm.member.address.search('#-#') > 0) {
      vm.memberAddress.detail = vm.member.address.split('#-#')[1];
    } else if (vm.member.address && vm.member.address.search('#/#') === -1) {
      vm.memberAddress.detail = vm.member.address;
    }
  }
  function formatAddressParam () {
    if (vm.memberAddress.detail) {
      if (!vm.memberAddress.province) {
        layer.msg('请选择省')
        return true;
      } else {
        vm.memberParams.province = vm.memberAddress.province.code;
        vm.memberParams.address = vm.memberAddress.province.name;
      }

      if (!vm.memberAddress.city) {
        layer.msg('请选择市')
        return true;
      } else {
        vm.memberParams.city = vm.memberAddress.city.code;
        vm.memberParams.address = `${vm.memberParams.address}#/#${vm.memberAddress.city.name}`;
      }

      if (!vm.memberAddress.area) {
        layer.msg('请选择区/县');
        return true;
      } else {
        vm.memberParams.area = vm.memberAddress.area.code;
        vm.memberParams.address = `${vm.memberParams.address}#/#${vm.memberAddress.area.name}`;
      }

      vm.memberParams.address = `${vm.memberParams.address}#-#${vm.memberAddress.detail}`;
    }
  }
  function getMemberLevels () {
    GET('/api/overcharge-rule/getLevel')
      .then(data => {
        vm.levels = data;
        _setMemberLevel();
      })
  }
  function getDetail() {
    GET(`/api/member/inbar/${vm.$route.params.id}`)
      .then(data => {
        vm.member = data;
        vm.portraitPath = data.avatar;
        _initAddress();
        _initMemberParams();
        getMemberLevels();
      })
  }
  export default {
    name: 'modify-member-info',
    components: { DatePicker, multiselect },
    data() {
      return {
        portraitPath: null,
        portraitDataURL: null,
        hasPortrait: false,
        birthday: '',
        selectedLevel: null,
        levels: [],
        member: {},
        memberAddress: {
          province: null,
          city: null,
          area: null,
          detail: ''
        },
        memberParams: {
          address: '',
          area: null,
          birthday: '',
          city: null,
          coins: '',
          email: '',
          enabled: null, //0:禁用 1:启用
          id: '',
          level: null,
          mobile: '',
          province: null,
          qq: '',
          remark: '',
          wechat: ''
        },
        provinces: provinces,
        cities: cities,
        areas: areas
      }
    },
    methods: {
      uploadPortrait() {
        layer.msg('更改成功');
      },
      readSuccess(params) {
        this.portraitDataURL = params.result;
      },
      save() {
        if (!formatAddressParam()) {
          PATCH('/api/member/', vm.memberParams)
            .then(() => {
              layer.msg('修改成功');
              this.$router.replace({name: 'manage-member-data'})
            })
        }
      },
      clickLinkage(event) {
        const tabIndex = $(event.target).closest('.multiselect').attr('tabindex')
        if (+tabIndex === 1 && !vm.memberAddress.province) {
          event.stopPropagation();
          layer.msg("请先选择省")
        } else if (+tabIndex === 2 && !vm.memberAddress.city) {
          event.stopPropagation();
          layer.msg("请先选择市")
        }
      },
      updateProvince(option) {
        this.memberAddress.city = null;
        this.memberAddress.area = null;
        this.cities = _getNextAddress().nextCities;
        this.areas = []
      },
      updateCity(option) {
        this.memberAddress.area = null;
        this.areas = _getNextAddress().nextAreas
      },
      updateArea(option) {
        // if (option.code !== this.memberAddress.area.code) {
        //   this.memberAddress.area = option;
        // }
      },
      updateLevel(option) {
        vm.memberParams.level = option.id;
      }
    },
    created() {
      vm = this;
      getDetail();
    },
    mounted() {
      // this.$emit('crumb-push', {
      //   crumb: {name: '变更会员信息'},
      //   toggleMenubar: false
      // })
      this.$emit('crumb-push', {
        crumb: {name: '变更会员信息'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/base-manage";
  %circle{
    position: absolute;
    width: 14px;
    height: 14px;
    display: inline-block;
    border: 1px solid #b3b3b3;
    border-radius: 14px;
    background-color: #e0e0e0;
  }
  .modify-main{
    /*padding-top: 70px;*/
    margin-right: -20px;
    margin-left: 0;
    border: 1px solid $border-color;
    .right-panel{
      padding-left: 0;
      padding-right: 0;
      border-left: 1px solid $border-color;
    }
  }
  .left-portrait{
    padding-top: 110px;
    text-align: center;
    .portrait-box{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 10px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #ebebeb;
      img{
        width: 80%;
        height: 80%;
        border-radius: 50%;
      }
      .iconfont{
        font-size: 56px;
        color: #CECECE;
      }
    }
    .btn{
      border-color: $theme-color;
      border-radius: 50px;
      color: $theme-color;
      background-color: #fff;
      &:hover{
        color: #fff;
        background-color: $theme-color;
      }
    }
    strong{
      display: block;
      padding-top: 40px;
      padding-bottom: 20px;
    }
  }
  .panel{
    padding-bottom: 20px;
    padding-left: 30px;
    border-bottom: 1px solid $border-color;
    &:last-child{
      border-bottom: 0;
      margin-bottom: 0;
    }
    .panel-title{
      padding-left: 0;
      font-size: 14px;
      font-weight: bold;
    }
    .form-group{
      font-size: 0;
      position: relative;
      .error{
        padding-right: 12px;
        font-size: 12px;
        color: #f00;
      }
    }
    .form-group:last-child .label-span:before{
      display: none;
    }
    .label-span{
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      width: 4em;
      text-align: right;
      margin-right: 35px;
      font-size: 14px;
      &:before{
        content: '';
        display: inline-block;
        position: absolute;
        width: 1px;
        height: 45px;
        left: 71px;
        margin-top: 5px;
        background-color: #b3b3b3;
      }
      &:after{
        content: '';
        margin-top: 4px;
        margin-left: 9px;
        @extend %circle;
      }
      + span{
        font-size: 14px;
        padding-left: 12px;
      }
    }
    .label-span + .input-group{
      display: inline-block;
      font-size: 14px;
      vertical-align: bottom;
      width: 280px;
      > .form-control{
        border-color: $border-color;
        &:focus{
          border-color: $theme-color;
          + i{
            @extend %circle;
            left: -26px;
            top: 9px;
            border-color: #0791fa;
            background-color: #7cc2f8;
            box-shadow: 0 0 6px 2px #7cc2f8;
            transition: all .2s;
          }
        }
      }
    }
  }
  .linkage{
    display: flex;
    justify-content: space-between;
    .multiselect{
      width: calc((100% - 20px) / 3);
      .multiselect__content-wrapper{
        width: 280px;
      }
    }
  }
  .radio-list{
    font-size: 14px;
    display: flex;
    position: absolute;
    left: 90px;
    top: -10px;
    li{
      margin-right: 20px;
    }
  }
  .bottom-btn-group{
    height: 80px;
    margin-top: 40px;
    margin-left: calc(100% / 12 * 3);
  }
</style>
