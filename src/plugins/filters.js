export default {
  install (Vue) {
    Vue.mixin({
      filters: {
        formatMoney(v) {
          let value = String(v);
          if (+value === 0) return '0.00';
          if (value.search(/\./) > 0) {
            const valArr = value.split('.');
            if (+valArr[1] === 0) return valArr[0] + '.' + '00';
            if (valArr[1] > 0 && valArr[1] < 10) return valArr[0] + '.' + valArr[1] + '0';
          }
          if (value.search(/\./) === -1) return value + '.00';
          return value;
        },
        formatIDCard(value) {
          const id = String(value);
          return `${id.substr(0, 6)}********${id.substr(-4, 4)}`;
        }
      }
    })
  }
}
