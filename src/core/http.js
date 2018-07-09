import $ from 'jquery'

const HEADERS = {
  version: '1.0.0-alpha',
  token: null
}
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
  options.headers = $.extend({}, HEADERS, options.headers)
  if (queried) {
    let data = $.extend({}, options.data)
    let params = []
    spring(params, data, '')
    options.data = params.join('&')
  }
  return options
}

function likeGET (method, url, data) {
  return $.ajax(prepare({
    url,
    data: data,
    type: method,
    dataType: 'json'
  }, true))
}

///================ HTTP METHODS ========================///
function post (url, data) {
  return $.ajax(prepare({
    url,
    data: JSON.stringify(data),
    type: 'POST',
    dataType: 'json'
  }, false))
}
function put (url, data) {
  return $.ajax(prepare({
    url,
    data: JSON.stringify(data),
    type: 'PUT',
    dataType: 'json'
  }, false))
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
  get as GET,
  post as POST,
  put as PUT,
  delete_ as DELETE,
  head as HEAD,
  options as OPTIONS
}

export default {
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
