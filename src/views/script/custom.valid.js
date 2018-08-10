const localDictionary = {
  messages: {
    //自定义错误消息
    required: (filed) => `${filed}不能为空`,
    min: (filed, args) => `${filed}不能少于${args[0]}个字符`,
    max: (filed, args) => `${filed}不能大于${args[0]}个字符`
  },
  attributes: {
    //自定义属性名
    //若未指定属性名，将会使用表达式或name域的值
    //data-vv-as优先级高于内部dictionary
    // email: 'Email Address'
     password: '密码'
  }
};
const extendFields = {
  password: {
    getMessage: (filed, args) => `${filed}长度为${args[0]}到${args[1]}位字符`,
    validate: (value, args) => value.length >= args[0] && value.length <= args[1]
  },
  username: {
    getMessage: (filed, args) => `${filed}是长度为${args[0]}到${args[1]}位由字母或数字组成`,
    // validate: (value, args) => value.length >= args[0] && value.length <= args[1]
    validate: (value, args) => new RegExp(`([0-9]|[a-zA-Z]){${args[0]},${args[1]}}$`).test(value)
  },
  repassword: {
    getMessage: (filed, args) => `两次输入的密码不一样`,
    validate: (value, args) => value === args[0]
  },
  sum: {
    getMessage: (filed, args) => `${filed}格式不正确`,
    validate: (value, args) => new RegExp('^[0-9]+$', 'g').test(value)
  }
};
export {localDictionary, extendFields}
