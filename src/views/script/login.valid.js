const localDictionary = {
  messages: {
    required: (filed) => filed + '不能为空',
    max: (filed, args) => filed + '不能大于' + args[0] + '个字符'
  },
  attributes: {

  }
};
const extendFields = {
  mobile: {
    getMessage: (filed) => '请输入正确的' + filed,
    validate: (value) => parseInt(value.length) === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  },
  password: {
    getMessage: (filed, args) => '密码长度为' + args[0] + '到' + args[1] + '位字符',
    validate: (value, args) => value.length >= args[0] && value.length <= args[1]
  }
};
export {localDictionary, extendFields}
