export default {
  fields: {
    loginName: {
      validators: {
        notEmpty: {
          message: '账号信息不能为空'
        }
      }
    },
    password: {
      validators: {
        notEmpty: {
          enabled: true,
          message: '密码不能为空'
        },
        stringLength: {
          min: 6,
          max: 30,
          message: '密码必须大于6且小于30个字符'
        }
      }
    },
    confirm: {
      validators: {
        notEmpty: {
          enabled: true,
          message: '确认密码不能为空'
        },
        identical: {
          field: 'password',
          message: '确认密码必须和密码保持一致'
        }
      }
    },
    limit: {
      validators: {
        notEmpty: {
          message: '必须选中一个角色'
        }
      }
    }
  }
}
