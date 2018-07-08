import $ from 'jquery'
import Vue from 'vue'

function makePromise() {
  const promise = {}
  promise.instance = new Promise((resolve, reject) => {
    promise.resolve = resolve
    promise.reject = reject
  })
  return promise
}

function templateReady(me) {
  const readyOptions = me.$options.ready
  if (!readyOptions || Object.keys(readyOptions).length === 0) {
    return
  }

  const mountPromise = me.__mount_promise__ = makePromise()

  Object.entries(readyOptions).forEach(entry => {
    const ready = entry[0]
    let props = entry[1]
    if (!(props instanceof Array)) {
      props = [props]
    }
    const promises = props.map(prop => {
      const promise = makePromise()
      me.$watch(prop, (newValue, oldValue) => {
        if (newValue !== undefined && newValue !== null && newValue !== oldValue) {
          promise.resolve(newValue)
        }
      })
      return promise.instance
    })

    promises.unshift(mountPromise.instance)

    const combined = Promise.all(promises)
    combined.then(function (value) {
      if (me.hasOwnProperty(ready)) {
        me[ready](value)
      }
    })
  })
}


export default {
  install (vue) {
    vue.mixin({
      beforeCreate () {
        const me = this
        //
        // const componentsOptions = me.$options.components || {}
        // if (componentsOptions instanceof Array) {
        //   debugger
        //   me.options.components = componentsOptions.reduce((map, c) => { map[c.name] = c; return map }, {})
        // }

        const domOptions = me.$options.dom || {}
        Object.entries(domOptions).forEach(entry => {
          const name = entry[0]
          const selector = entry[1]
          if (me.hasOwnProperty(name)) {
            throw new Error(`The dom getter {${name}} has already been token by others!`)
          }
          const descriptor = Object.create(null)
          descriptor.get = function domGetter () {
            return $(selector, this.$el)
          }
          descriptor.configurable = false
          Object.defineProperty(me, name, descriptor)
        })

        const childrenOptions = me.$options.children || {}
        Object.entries(childrenOptions).forEach(entry => {
          const name = entry[0]
          const vueKey = entry[1]
          if (me.hasOwnProperty(name)) {
            throw new Error(`The child component getter {${name}} has already been token by others!`)
          }
          const descriptor = Object.create(null)
          descriptor.get = function childGetter () {
            return me.$C(vueKey)
          }
          // descriptor.configurable = false
          Object.defineProperty(me, name, descriptor)
        })
      },
      created () {
        templateReady(this)
      },
      mounted () {
        if (this.__mount_promise__) {
          this.__mount_promise__.resolve(true)
        }
      },
      methods: {
        $C(key) {
          return this.$children.find(c => c.$vnode.key === key)
        },
        $Q(selector) {
          return $(selector, this.$el)
        }
      }
      // $on (selector, eventType, data, listener) {
      //   return $(selector, this.$el).on(eventType, selector, data, listener)
      // },
      // $click (selector, eventType, data, listener) {
      //   return $(selector, this.$el).on(eventType, selector, data, listener)
      // }
    })
  }
}
