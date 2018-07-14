import $ from 'jquery'
import store from './store'

function HEADERS() {
  let o = {
    version: '1.0.0-alpha',
    // client_id: 'b4179ed65e5542c394c23f4c11dc407f',
    // client_secret: 'web-frontend'
    app_id: 'inbar-web'
  }
  let token = store.oauth2.access_token
  if (token) {
    o['Authorization'] = `Bearer ${token}`
  }
  return o
}
$.ajaxPrefilter((options, original, xhr) => {
  let type = (options.type || options.method)
  // let headers = (options.headers || {})
  prepare(options, type === 'GET' || type === 'DELETE' || type === 'HEAD' || type === 'OPTIONS')
})
function join (prefix, key) {
  key = enc(key)
  if (!prefix) {
    return key
  }
  return `${prefix}.${key}`
}
const enc = encodeURIComponent
function spring (array, data, path) {
  if (!data) {
    array.push([path])
  } else if (data instanceof Array) {
    data = data.map((v, i) => [i, v])
  } else {
    data = Object.entries(data)
  }
  data.forEach(e => {
    let [ key, value ] = e
    if (value === null || value === undefined) {
      array.push(join(path, key))
    } else if ((typeof value) === 'boolean' || (typeof value) === 'string' || (typeof value) === 'number') {
      array.push([join(path, key), enc(value)].join('='))
    } else {
      spring(array, value, (typeof key) === 'number' ? `${path}[${enc(key)}]` : join(path, key))
    }
  })
}

function prepare (options, queried) {
  options.headers = $.extend({}, HEADERS(), options.headers)
  if (queried && !(typeof options.data === 'string')) {
    let data = $.extend({}, options.data)
    let params = []
    spring(params, data, '')
    options.data = params.join('&')
  }
  return options
}

function likeGET (method, url, data) {
  return $.ajax({
    url,
    data: data,
    type: method,
    dataType: 'json'
  }, true)
}

function likePOST (method, url, data) {
  let isForm = (data && data['$form$'] === true)
  if (isForm) delete data['$form$']

  return $.ajax({
    url,
    data: isForm ? data : JSON.stringify(data),
    contentType: isForm ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=UTF-8',
    type: method,
    dataType: 'json'
  }, isForm)
}

function formed(data) {
  data = data || {}
  data['$form$'] = true
  return data
}

///================ HTTP METHODS ========================///
function post (url, data) {
  return likePOST('POST', url, data)
}
function put (url, data) {
  return likePOST('PUT', url, data)
}
function get (url, data) {
  return likeGET('GET', url, data)
}
function delete_ (url, data) {
  return likeGET('DELETE', url, data)
}
function head (url, data) {
  return likeGET('HEAD', url, data)
}
function options (url, data) {
  return likeGET('OPTIONS', url, data)
}

///================ Exports ========================///

export {
  formed as Formed,
  get as GET,
  post as POST,
  put as PUT,
  delete_ as DELETE,
  head as HEAD,
  options as OPTIONS
}

export default {
  formed,
  Formed: formed,
  get,
  GET: get,
  post,
  POST: post,
  put,
  PUT: put,
  delete: delete_,
  DELETE: delete_,
  head,
  HEAD: head,
  options,
  OPTIONS: options
}
