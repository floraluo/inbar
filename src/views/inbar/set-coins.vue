<template>
  <div class="">
    <!--<div class="page-crumbs"><span class="highlight">网吧设置&nbsp;&frasl;</span>&nbsp;积分设置</div>-->
    <div class="page-main" >

      <div class="page-main-top padding-bottom-20">
          <button class="btn btn-primary btn-round" @click="clickAddCoin"><i class="iconfont icon-add"></i> 新增</button>
          <button class="btn btn-primary btn-round" @click="clickDeleteCoins"><i class="iconfont icon-close"></i> 删除</button>

      </div>

      <v-table is-horizontal-resize
               is-vertical-resize
               style="width:100%"
               row-hover-color="#eee"
               row-click-color="#edf7ff"
               title-bg-color="#f0f2f9"
               :title-row-height="52"
               :is-loading="tableLoading"
               :height="455"
               :min-height="455"
               :columns="coinColumns"
               :table-data="coins"
               :select-all="selectCoin"
               :select-group-change="selectCoin"
               :show-vertical-border="false"  @on-custom-comp="someOperate"></v-table>
      <div class="paging" v-if="coinList.totalPage > 1">
        <v-pagination :total="coinList.amount" @page-change="pageChange" @page-size-change="pageSizeChange"></v-pagination>
      </div>
    </div>

    <!--添加区域-->
    <div class="layer-add-coin layer-open" id="addCoinLayer">
      <form>
        <div class="form-group col-xs-6"><label >名称： <small class="error" v-show="errors.has('name')">（*{{ errors.first('name') }}）</small></label>
          <input v-model="coinParam.name"
                 v-validate="'required'"
                 data-vv-as="名称"
                 name="name"
                 type="text"
                 class="form-control"
                 placeholder="请输入名称">
        </div>
        <div class="form-group col-xs-6"><label >起充金额 <small class="error" v-show="errors.has('sum')">（*{{ errors.first('sum') }}）</small></label>
          <div class="input-group">
          <input v-model="coinParam.amount"
                 v-validate="'required|sum'"
                 data-vv-as="金额"
                 name="sum"
                 type="text"
                 class="form-control"
                 placeholder="请输入金额">
          <span class="input-group-addon">元</span>
          </div>
        </div>
        <div class="form-group "><label >充值一元赠送积分数：<small class="error" v-show=" coinParam.handselCoins.length === 0">（*至少填写一项）</small></label>
          <ul class="form-group input-list ">
            <li class="input-group" v-for="(item, index) in levels"  :key="item.id" >
              <label  :for="'handselCoins'+item.id">{{item.levelName}}</label>
              <input class="input-coins" v-model="hCoins[index]"  type="text" :id="'handselCoins'+item.id"><span>个</span>

            </li>
          </ul>
        </div>
        <div class="form-group"><label >是否启用：</label>
          <ul class="radio-list">
            <li class="radio-custom radio-primary">
              <input v-model="coinParam.enabled" value="true" type="radio" name="enableds" id="enabled1"><label for="enabled1">启用</label>
            </li>
            <li class="radio-custom radio-primary">
              <input v-model="coinParam.enabled" value="false" type="radio" name="enableds" id="enabled2"><label for="enabled2">禁用</label>
            </li>
          </ul>
        </div>
      </form>
      <div class="form-group layer-btn-operate-group">
        <button class="btn btn-default" @click="cancelLayer">取消</button>
        <button class="btn btn-primary" @click="submitAddCoin">保存</button>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import layer from '../../../static/vendor/layer/layer'
  import moment from 'moment'
  import { publish, subscribe } from 'pubsub-js'
  import {GET, POST, PUT, PATCH, DELETE, MultiFormed} from '../../core/http'

  let vm;
  function openCoinLayer (title) {
    vm.layerId = layer.open({
      type: 1,
      title,
      area: ['700px', '420px'],
      content: $('#addCoinLayer'),
      success() {
        vm.$validator.errors.clear();
      },
      end() {
        clearCoinParams();
        // layer.msg("我是销毁回调")
      }
    })
  }

  function cancelLayer () {
    layer.close(vm.layerId);
    clearCoinParams();
  }
  function clearCoinParams () {

  }
  function formatCoins() {
    //let newArr = {};
    vm.coinParam.handselCoins = vm.levels.map((item, index) => {
        // if(!item.coins) {
        //   newArr.push(item)
         return Object.assign({}, {id: item.id, coins: vm.hCoins[index]})
    })
  }
  function getLevels () {
    GET('/api/overcharge-rule/getLevel')
      .done((data) => {
        vm.levels = data;
      })
  }
  function getAllCoin () {
    vm.tableLoading = true;
    GET('/api/coins/', vm.coinList)
      .done((data) => {
        vm.tableLoading = false;
        vm.coinList.totalPage = data.totalPages;
        vm.coinList.amount = data.totalElements;
        vm.coins = data.content;
      })
  }

  function postAddCoin () {
    POST('/api/coins/', vm.coinParam)
      .done(() => {
        getAllCoin();
        clearCoinParams();
        layer.close(vm.layerId);
        layer.msg('新增积分成功！')
      })
  }
  function patchModifyCoin () {
    PATCH('/api/coins/', vm.coinParam)
      .done(() => {
        getAllCoin();
        clearCoinParams();
        layer.close(vm.layerId);
        layer.msg('修改成功！')
      })
  }

  function deleteCoin () {
    let query = vm.delIds.reduce((result, item) => {
      return `${result}&ids=${item}`;
    })
    const url = `/api/coins/?ids=${query}`;
    DELETE(url, {ids: vm.delIds})
      .done(() => {
        layer.msg("删除成功");
        getAllCoin();
        vm.delIds = []
      })
  }
  export default {
    name: 'set-coins',
    data() {
      return {
        layerId: null,
        coinLayerType: 0, //0 新增 1 修改
        tableLoading: false,
        file: null,
        delIds: [],
        levels: [],
        hCoins: [],
        coins: [],
        coinTotalPage: null,
        coinParam: {
          id:0,
          createTime: new Date(),
          handselCoins: [],
          name: '',
          amount: '',
          enabled: true,
        },
        selectedMemberType: false,
        coinList: {
          page: 0,
          size: 10,
          totalPage: 0,
          amount: 0
        },
        importErrorMsg: [],
        coinColumns: [
          { title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center',isResize: true,formatter: (rowData, rowIndex) => { return rowIndex + 1 }},
          {width: 40, titleAlign: 'center', columnAlign: 'center', type: 'selection', isResize: true},
          {field: 'name', title: '名称', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'amount', title: '起送金额', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: ' handselCoins', title: '充值一元赠送积分数', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter: (rowData, rowIndex) => {
              let type = JSON.parse(rowData.handselCoins).map(item => { return item.name +'：'+item.coins }), html, placement;
              if (rowIndex < (vm.coinList.size / 2)) {
                placement = 'bottom';
              } else {
                placement = 'top';
              }
              html = `<span class="v-table-popover-content" data-content="${type.join(' ')}" data-placement="${placement}" data-trigger="hover" data-toggle="popover"  >${type.join('、')}</span>`;
              return html;
            }
          },

          {field: {name: 'enabled', valueKey: 'enabled', callback: this.toggleCoinStatus},
            title: '状态', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'BaseSwitch'},
          {field: 'createTime', title: '创建时间', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: true,
            formatter(rowData) { return moment(rowData.createTime).format('YYYY-MM-DD') }
          },
          {field: [
              {name: '修改', type: "modify", callback: this.modifyCoin},
              {name: '删除', type: "delete", callback: this.deleteOneCoin}
            ], title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'BaseTableOperation2', isResize: true}

        ]
      }
    },
    methods: {
      someOperate(params) {
        if (params.callback) {
          params.callback(params);
        }
      },
      clickAddCoin() {
        vm.coinLayerType = 0
        openCoinLayer('新增积分');
      },
      clickDeleteCoins() {
        if (vm.delIds.length === 0) {
          layer.msg("请至少勾选一项")
        } else {
          deleteCoin();
        }
      },

      deleteOneCoin(param) {
        this.delIds = [];
        this.delIds.push(param.rowData.id)
        deleteCoin();
      },

      modifyCoin(param) {
        const coin=param.rowData
        vm.coinLayerType = 1;
        vm.coinParam.id=coin.id
        vm.coinParam.name = coin.name;
        vm.coinParam.amount = coin.amount;
        vm.coinParam.handselCoins = coin.handselCoins;
        vm.coinParam.enabled = coin.enabled;
        openCoinLayer('修改积分');
      },

      submitAddCoin() {
        formatCoins();
         this.$validator.validate().then(() => {
           const error = vm.$validator.errors;
            if (this.coinLayerType === 0) {
             postAddCoin()
              } else {
                patchModifyCoin();
            }
         })
      },
      selectCoin(selection) {
        // console.log("))))))))))))", selection)
        vm.delIds = [];
        selection.forEach(item => {
          vm.delIds.push(item.id);
        })
      },
      toggleCoinStatus(params) {
        const rowData = params.rowData;
        let url = rowData[params.valueKey] === false ? `/api/coins/enable/?ids=${rowData.id}` : `/api/coins/disable/?ids=${rowData.id}`;
        PATCH(url)
          .done(() => {
            vm.coins[params.index][params.valueKey] = !vm.coins[params.index][params.valueKey];
          })
      },
         pageChange(pageIndex) {
        vm.coinList.page = pageIndex - 1;
        getAllCoin();
      },
      pageSizeChange(newPageSize) {
        vm.coinList.size = newPageSize;
        getAllCoin();
      },
      cancelLayer() {
        cancelLayer();
      }
    },
    updated() {
      $('.v-table-body-class [data-toggle="popover"]').popover();
    },
    created() {
      vm = this;
      getLevels();
      getAllCoin();
      // subscribe('modify.table.operate.coin', this.modifyCoin)
      // subscribe('delete.table.operate.coin', this.deleteOneCoin)
      console.log(this.$route)
    }
  }
</script>
<style scoped lang="scss">
  @import "../../sass/inbar-setting";
</style>


