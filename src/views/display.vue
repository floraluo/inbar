<template>
  <div class="page animation-fade page-display">
    <div class="page-content">
      <form id="displayForm" class="form-horizontal padding-vertical-30">
        <div class="form-group">
          <label class="col-sm-2 control-label">导航条颜色：</label>
          <div class="col-sm-10" id="skintoolsNavbar">
            <ul class="list-unstyled list-inline color-radio" @click="navbarImprove($event)">
              <li v-for="(item, index) in skins" :key="index">
                <div :class="['radio-custom', 'radio-' + item.themeColor]">
                  <input type="radio"  name="navigationColor" v-model="display.navColor" :value="item.navColor"
                         :checked="item.navColor === display.navColor || item.themeColor === 'primary'">
                  <label></label>
                </div>
              </li>
            </ul>
            <!--<div class="checkbox-custom checkbox-primary margin-top-10">-->
              <!--<input type="checkbox"-->
                     <!--@click="navbarImprove($event)"-->
                     <!--v-model="display.acrossFlag"-->
                     <!--:checked="display.acrossFlag === 'navbar-inverse'"-->
                     <!--id="navbarDisplay" name="acrossFlag" value="navbar-inverse">-->
              <!--<label for="navbarDisplay">通栏显示</label>-->
            <!--</div>-->
          </div>
        </div>
        <hr>
        <div class="form-group">
          <label class="col-sm-2 control-label">菜单主题：</label>
          <div class="col-sm-10">
            <select id="skintoolsSidebar" name="menuTheme" @change="sidebarImprove($event.target.value)">
              <option value="site-menubar-dark" :selected="display.menuTheme === 'site-menubar-dark'">深色主题</option>
              <option value="site-menubar-light" :selected="display.menuTheme === 'site-menubar-light'">浅色主题</option>
            </select>
          </div>
        </div>

        <!--<div class="form-group">-->
          <!--<label class="col-sm-2 control-label">菜单显示：</label>-->
          <!--<div class="col-sm-10">-->
            <!--<div class="radio-inline radio-custom radio-primary">-->
              <!--<input type="radio" id="menuUnfold" :checked="display.menuDisplay === 'site-menubar-unfold'" name="menuDisplay" value="site-menubar-unfold">-->
              <!--<label for="menuUnfold">默认展开</label>-->
            <!--</div>-->
            <!--<div class="radio-inline radio-custom radio-primary">-->
              <!--<input type="radio" id="menuFold" :checked="display.menuDisplay === 'site-menubar-fold'" name="menuDisplay" value="site-menubar-fold">-->
              <!--<label for="menuFold">默认收起</label>-->
            <!--</div>-->
            <!--<div :class="['margin-top-10', {hidden: display.menuDisplay === 'site-menubar-unfold'}]" id="menuFoldSetting">-->
            <!--<span>鼠标经过菜单时显示：</span>-->
            <!--<div class="btn-group btn-group-xs" data-toggle="buttons">-->
              <!--<label class="btn  btn-outline btn-dark active" for="textIconKeep">-->
                <!--<input type="radio"-->
                       <!--id="textIconKeep"-->
                       <!--autocomplete="off"-->
                       <!--hidden="hidden"-->
                       <!--name="menuTxtIcon"-->
                       <!--:checked="display.menuTxtIcon === 'site-menubar-keep'"-->
                       <!--value="site-menubar-keep"> 文字-->
              <!--</label>-->
              <!--<label class="btn btn-outline btn-dark" for="textIconAlt">-->
                <!--<input type="radio"-->
                       <!--id="textIconAlt"-->
                       <!--autocomplete="off"-->
                       <!--hidden="hidden"-->
                       <!--name="menuTxtIcon"-->
                       <!--:checked="display.menuTxtIcon === 'site-menubar-fold-alt'"-->
                       <!--value="site-menubar-fold-alt"> 图标-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->
          <!--<span class="help-block">仅在可视区域宽度大于768px生效</span>-->
        <!--</div>-->
    <!--</div>-->
    <hr>
    <div class="form-group">
      <label class="col-sm-2 control-label">主题颜色：</label>
      <div class="col-sm-10" id="skintoolsPrimary">
        <ul class="list-unstyled list-inline color-radio" @click="themeImprove($event)">
          <li v-for="(item, index) in skins" :key="index">
            <div :class="['radio-custom', 'radio-' + item.themeColor]">
              <input type="radio" :checked="display.themeColor === item.themeColor" name="themeColor" v-model="display.themeColor" :value="item.themeColor">
              <label></label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <hr>
    <!--<div class="form-group">-->
      <!--<label class="col-sm-2 control-label">Tab 页签：</label>-->
      <!--<div class="col-sm-10">-->
        <!--<div class="radio-inline radio-custom radio-primary">-->
          <!--<input type="radio" id="tabDisplayShow" :checked="display.tabFlag === 'site-contabs-open'" name="tabFlag" value="site-contabs-open">-->
          <!--<label for="tabDisplayShow">开启</label>-->
        <!--</div>-->
        <!--<div class="radio-inline radio-custom radio-primary">-->
          <!--<input type="radio" id="tabDisplayHide" :checked="display.tabFlag === ''" name="tabFlag" value="">-->
          <!--<label for="tabDisplayHide">关闭</label>-->
        <!--</div>-->
        <!--<span class="help-block">Tab 页签必须保存以后才能看到效果</span>-->
      <!--</div>-->
    <!--</div>-->
    <hr>
    <div class="form-group">
      <div class="col-sm-10 col-sm-offset-2 margin-top-20">
        <button type="button" class="btn btn-primary" name="save" value="true" @click="save">保存</button>
        <button type="button" class="btn btn-outline btn-default" name="reset" value="reset" @click="reset">恢复默认</button>
      </div>
    </div>
    </form>
  </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import '../../static/vendor/bootstrap-select/bootstrap-select.css'
  import '../../static/vendor/bootstrap-select/bootstrap-select'
  import '../../static/css/system/settings/display.css'

  //导航条颜色
  //通栏显示  navbar-inverse
  //菜单主题  site-menubar-dark  site-menubar-light
  //菜单显示 默认展开:site-menubar-unfold 默认收起:site-menubar-fold
  //文字：site-menubar-keep 图标：site-menubar-fold-alt
  export default {
    name: "display",
    data() {
      return {
        display: {
          navColor: 'bg-blue-600',
          acrossFlag: 'navbar-inverse',
          menuTheme: 'site-menubar-dark',
          menuDisplay: 'site-menubar-fold',
          menuTxtIcon: 'site-menubar-keep',
          themeColor: 'primary',
          tabFlag: 'site-contabs-open'
        },
        skins: [{
          themeColor: 'primary',
          navColor: 'bg-blue-600'
        }, {
          themeColor: 'brown',
          navColor: 'bg-brown-600'
        }, {
          themeColor: 'cyan',
          navColor: 'bg-cyan-600'
        }, {
          themeColor: 'green',
          navColor: 'bg-green-600'
        }, {
          themeColor: 'pink',
          navColor: 'bg-pink-600'
        }],
        themeColorArr: ['primary', 'brown', 'cyan', 'green'],
        navColorArr: ['bg-blue-600', 'bg-brown-600', 'bg-cyan-600', 'bg-green-600']
      }
    },
    created() {
      if (!localStorage.zhInbarSkin) return;
      this.$data.display = JSON.parse(localStorage.zhInbarSkin);
    },
    mounted() {
      $(document).on("change", 'input[name="menuDisplay"]', function () { // 菜单显示
        var $menuFold = $("#menuFoldSetting"),
          value = $(this).val();
        if (value === 'site-menubar-unfold') {
          $menuFold.addClass("hidden");
          $.site.menubar.unfold();
        } else {
          $menuFold.removeClass("hidden");
          $.site.menubar.fold();
        }
      });
      $(document).on('change', 'input[name="tabFlag"]', function () { // Tab页签
        const value = $(this).val();
        if (value === 'site-contabs-open') {
          $('#admui-siteConTabs ul.con-tabs').removeAttr('style');
          $("body").addClass("site-contabs-open");
        } else {
          $("body").removeClass("site-contabs-open");
        }
      });
      $('#skintoolsSidebar').selectpicker($.po('selectpicker'));
    },
    methods: {
      navbarImprove(event) {
        const val = event.target.value,
          $siteNavbar = $('.site-navbar'),
          navbarSkins = this.$data.themeColorArr.map(item => { return 'bg-' + item + '-600'; }).join(' ');

        if (val === 'navbar-inverse') {
          event.target.checked ? $siteNavbar.addClass(val) : $siteNavbar.removeClass(val);
        } else {
          $siteNavbar.removeClass(navbarSkins).addClass(val);
        }
        console.log(this.$data.display)
      },
      sidebarImprove(val) {
        const $siteSidebar = $('.site-menubar');
        this.$data.display.menuTheme = val;
        if (val === 'site-menubar-light') {
          $siteSidebar.removeClass('site-menubar-dark').addClass(val);
        } else {
          $siteSidebar.removeClass('site-menubar-light').addClass(val);
        }
      },
      themeImprove(event) {
        console.log(event)
        let indexHref, siteHref,
          $indexLink = $('#indexStyle'),
          $siteLink = $('#siteStyle');

        const val = event.target.value,
          path = './static/themes/classic/base/';
        if (val === 'primary') {
          indexHref = path + 'css/index.css';
          siteHref = path + 'css/site.css'
        } else {
          indexHref = path + 'skins/' + val + '/index.css';
          siteHref = path + 'skins/' + val + '/site.css';
        }

        if (!$indexLink.length) {
          $indexLink = $('<link rel="stylesheet" id="indexStyle" href="' + indexHref + '">');
          $('head').append($indexLink);
        } else {
          $indexLink.attr('href', indexHref);
        }

        if (!$siteLink.length) {
          $siteLink = $('<link rel="stylesheet" id="siteStyle" href="' + siteHref + '">');
          $('head').append($siteLink);
        } else {
          $siteLink.attr('href', siteHref);
        }
      },
      save() {
        console.log(this.$data.display.themeColor)
        if (localStorage.getItem('zhInbarSkin')) localStorage.removeItem('zhInbarSkin');
        localStorage.setItem('zhInbarSkin', JSON.stringify(this.$data.display))
        // Object.assign(localStorage.zhInbarSkin, this.$data.display);
        console.log(localStorage.zhInbarSkin.themeColor)
      },
      reset() {
        if (!localStorage.zhInbarSkin) return;
        this.$data.display = {
          navColor: 'bg-blue-600',
          acrossFlag: 'navbar-inverse',
          menuTheme: 'site-menubar-dark',
          menuDisplay: 'site-menubar-fold',
          menuTxtIcon: 'site-menubar-keep',
          themeColor: 'primary',
          tabFlag: 'site-contabs-open'
        };
        localStorage.zhInbarSkin.removeItem('zhInbarSkin')
      }
    }
  }
</script>

<style scoped>

</style>
