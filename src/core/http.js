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

function prepare (options) {
  options.headers = $.extend({}, HEADERS, options.headers)
  let data = $.extend({}, options.data)
  let params = []
  spring(params, data, '')
  options.data = params.join('&')
  return options
}

function likeGET (method, url, data) {
  return $.ajax(prepare({
    url,
    data: data,
    type: method,
    dataType: 'json'
  }))
}

export default {
  post (url, data) {
    return $.ajax(prepare({
      url,
      data: JSON.stringify(data),
      type: 'POST',
      dataType: 'json'
    }))
  },
  get (url, data) {
    return likeGET('GET', url, data)
  },
  delete (url, data) {
    return likeGET('DELETE', url, data)
  },
  head (url, data) {
    return likeGET('HEAD', url, data)
  },
  options (url, data) {
    return likeGET('OPTIONS', url, data)
  }
}
