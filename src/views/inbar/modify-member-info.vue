<template>
  <div class="page-main">
    <div class="btn-return">
      <router-link :to="{name: 'manage-member-data'}" replace>返回 <i class="iconfont icon-fanhui"></i></router-link>
    </div>
    <div class="modify-main row clearfix">
      <div class="col-xs-12 col-sm-3 left-portrait">
        <button class="btn">更改头像</button>
        <strong>{{member.name}}</strong>
        <p class="id">{{member.memberId}}</p>
      </div>
      <div class="col-xs-12 col-sm-9 right-panel">
        <form>
          <div class="panel">
            <div class="panel-title">基本信息</div>
            <div class="panel-content">
              <div class="form-group"><span class="label-span">姓名</span><span>{{member.name}}</span></div>
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
  export default {
    name: 'modify-member-info'
  }
</script>

<style scoped>

</style>
