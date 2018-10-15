import moment from 'moment'
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
        },
        formatTime(value, format) {
          if (value) {
            return moment(value).format(format)
          } else {
            return '--'
          }
        },
        formatYAxis(value, interval) {
          if (value) {
            if (value < 10) {
              return interval * 2;
            } else if (value < 100) {
              if ((value % interval) > 0) {
                let a = interval - (value % interval);
                value = value + a
              }
              return value + interval
            } else {
              let str = String(parseInt(value)), len = str.length, zero = '', b = 1;
              for (let i = 0; i < len - 2; i++) {
                zero += '0'
                if (i > 0) {
                  b *= 10
                }
              }
              return +(str.substr(0, 2) + zero) + interval * 2 * b
            }
          }
        }
      }
    })
  }
}
