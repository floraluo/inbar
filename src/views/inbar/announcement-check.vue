<template>
  <div class="page-main ">
    <div class=" btn-return ">
      <router-link :to="{name: 'inbar-announcement'}" class="btn-pure btn-default" replace> 返回  <i class="iconfont icon-fanhui"></i></router-link>
    </div>
    <div class=" announce-top">
      <h1>{{accouncement.name}}</h1>
      <div class="title-bottom ">
        <span class="">开始时间：<strong >{{ begTime  }}</strong></span>
        <span class="padding-left-20">结束时间：<strong>{{ eTime }}</strong></span>
        <div class="pull-right">
          <a class="operate" target="_blank" @click="modifyAnnounce"><i class="iconfont icon-bianji2" aria-hidden="true"></i> 编辑</a>
          <a  class="padding-left-20 operate" @click="deleteAnnounce" target="_blank"><i class="iconfont icon-close" aria-hidden="true"></i> 删除</a>
        </div>
      </div>
    </div>
    <div class="page-main-contents padding-20">
      <div>{{accouncement.content}}</div>
      <div class="padding-top-20"><strong>公告说明：</strong>{{accouncement.description}}</div>
    </div>
    <!--修改公告-->
    <div id="modifyAnnounceLayer" class="layer-open">
      <form >
        <div class="form-group col-xs-12"><label class="col-xs-2 padding-0" >活动标题</label>
          <div class="col-xs-10 padding-0">
            <input v-model="announceParam.name"
                   data-vv-as="标题"
                   v-validate="'required'"
                   name="name"
                   type="text" class="form-control "><small class="error"  v-show="errors.has('name')">*{{ errors.first('name') }}</small>
          </div>
        </div>
        <div class="form-group col-xs-12"><label class="col-xs-2 padding-0">活动内容</label>
          <div class="col-xs-10">
            <textarea v-model="announceParam.content"
                      data-vv-as="内容"
                      v-validate="'required'"
                      name="content"
                      rows="13"
                      type="text" class="form-control"></textarea>
            <small class="error"  v-show="errors.has('content')">*{{ errors.first('content') }}</small>
          </div>
        </div>
        <div class="form-group col-xs-12"><label class="col-xs-2 padding-0" >活动说明</label>
          <div class="col-xs-10">
            <textarea v-model="announceParam.description"
                      data-vv-as="活动说明"
                      v-validate="'required'"
                      name="description"
                      rows="3"
                      type="text" class="form-control"></textarea>
            <small class="error"  v-show="errors.has('description')">*{{ errors.first('description') }}</small>
          </div>
        </div>
        <div class="form-group form-date-group col-xs-12 padding-bottom-50"><label class="col-xs-2"  >生效时间 <small class="error" v-show="announceParam.beginTime!== null && announceParam.beginTime === ''">*日期为必选项</small></label>
          <div class="col-xs-10">
            <date-picker v-model="announceParam.beginTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD'"  placeholder="开始时间"></date-picker>~
            <date-picker v-model="announceParam.endTime" :width="datapickerWidth" type="datetime" :format="'YYYY-MM-DD'" placeholder="结束时间"></date-picker>
          </div>
        </div>
      </form>
      <div class="form-group  col-xs-12 text-center">
        <button class="btn btn-default margin-right-30" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="modifySave">保存</button>
      </div>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET,DELETE,PATCH} from '../../core/http'

  let vm;

  function formatTime () {
    if (vm.announceParam.beginTime === null || vm.announceParam.beginTime === '') {
      layer.msg('请先选择开始时间');
    } else if (vm.announceParam.endTime === null || vm.announceParam.endTime === '') {
      layer.msg('请先选择结束时间');
    }
  }
  function getAllAnnounce(){
    GET(`/api/announcement/${vm.$route.params.id}`)
      .done((data) => {
        vm.accouncement = data;
      })
  }
  function    deleteAn() {
    const url = `/api/announcement/?ids=${vm.$route.params.id}`;
    DELETE(url)
      .done(() => {
        getAllAnnounce();
        layer.msg("删除成功")
      })
  }
  function   cancelLayer(){
  }
  export default {
    name: "announcement-check",
    components: {DatePicker},
    data() {
      return {
        accouncement:{},
        layerId: null,
        datapickerWidth: '48%',
        announceParam: {
          name: '',
          description: '',
          beginTime: null,
          endTime: null,
          content: '',
          time: null,
          enabled: true,
        }
      }
    },
    computed: {
      begTime () {
        return this.accouncement.beginTime ? moment(this.accouncement.beginTime).format('YYYY-MM-DD') : '--'
      },
      eTime(){
        return this.accouncement.endTime ? moment(this.accouncement.endTime).format('YYYY-MM-DD') : '--'
      },
    },
    methods: {
      modifyAnnounce(params) {
        vm.announceParam.id = vm.$route.params.id;
        vm.announceParam.name=vm.accouncement.name;
        vm. announceParam.content=vm.accouncement.content;
        vm. announceParam.content=vm.accouncement.content;
        vm. announceParam.description=vm.accouncement.description;
        vm. announceParam.beginTime=vm.accouncement.beginTime;
        vm. announceParam.endTime=vm.accouncement.endTime;
        this.layerId = layer.open({
          type: 1,
          title: '修改公告',
          area: ['835px', '700px'],
          content: $('#modifyAnnounceLayer'),
          success() {
            vm.$validator.errors.clear();
          },
          end() {
            cancelLayer();
          }
        })
      },
      modifySave() {
        if(!formatTime()){
          PATCH('/api/announcement/update', vm.announceParam)
            .then(()=> {
              layer.msg('修改成功')
              layer.close(vm.layerId);
            })
        }
      },
      moment(time) {
        var date = new Date(time);
        return moment(date, 'YYYY-MM-dd');
      },

      cancelLayer() {
        layer.close(this.layerId);
      },
      deleteAnnounce() {
        layer.confirm('当前分类下还有商品，删除后该分类下的商品分类也将删除，确定要删除该分类吗？', {icon: 7, title: '提示'}, (index) => {
          layer.close(index);
          deleteAn()
        })
      },

    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created() {
      vm = this;
      console.log(vm.accouncement)
      getAllAnnounce();
    },
    mounted() {
      publish('crumb.push', {
        crumb: {name: '查看公告'},
        toggleMenubar: false
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/inbar-setting";
  .pull-right{
    a{
      cursor: pointer;
    }
  }
</style>
