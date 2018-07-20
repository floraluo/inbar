import $ from './$'
export default {
  removeMenu() {
    $('html').removeClass('css-menubar');
    $('body').removeClass('site-menubar-unfold');
  },
  addMenu() {
    $('html').addClass('css-menubar');
    $('body').addClass('site-menubar-unfold');
  }
}
