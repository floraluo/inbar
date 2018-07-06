import $ from 'jquery'
import Breakpoints from 'breakpoints-js/src/breakpoints'
import screenfull from '../static/vendor/screenfull/screenfull'

const variables = { $, jQuery: $, screenfull, Breakpoints }

Object.entries(variables).forEach(e => {
  window[e[0]] = e[1]
})

export { $, $ as jQuery, screenfull, Breakpoints }

export default window
