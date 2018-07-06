import jquery from 'jquery'
let { keys } = Object
let $ = jquery

export default {
  install (Vue) {
    Vue.mixin({
      created () {
        let opts = this.$options.forms;

        if (!opts) return

        let forms = []
        let fields = keys(opts).filter(k => k === 'fields').length;
        if (fields === 1) {
          forms.push(opts)
        } else if (fields === 0) {
          keys(opts.forms).forEach(k => {
            forms.push({
              name: k,
              fields: opts.forms[k].fields || {},
              selector: opts.forms[k].selector || 'form'
            })
          })
        }

        let me = this

        me.forms = []

        forms.forEach(f => {
          let formName = f.hasOwnProperty('name') && f.name ? f.name : 'form';
          if (me.hasOwnProperty(formName)) {
            throw new Error(`[${formName} property has already been defined!`)
          }
          me.forms.push(me[formName] = {
            name: formName || 'form',
            selector: f.selector || 'form',
            el () {
              return $(this.selector, me.$el)
            },
            initialize() {
              this.el().formValidation($.po('formValidation', {fields: f.fields}))
              this.success(e => {
                me.$emit(`form.${formName}.validated`, me, e)
              })
            },
            validate () {
              return this.el().validate()
            },
            enableRule (field, validator) {
              this.el().formValidation('enableFieldValidators', field, false, validator)
            },
            enableSubmit() {
              this.el().formValidation('disableSubmitButtons', false)
            },
            on (event, callback) {
              this.el().on(event, callback)
            },
            success (callback) {
              this.on('success.form.fv', callback)
            },
            error (callback) {
              this.on('err.form.fv', callback)
            }
          })
        })
      },
      mounted() {
        if (this.forms) {
          this.forms.forEach(f => f.initialize())
        }
      }
    })
  }
}
