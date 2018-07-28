import $ from 'jquery'
import store, {setToken} from './store'

function HEADERS(url) {
  let o = {
    version: '1.0.0-alpha',
    // client_id: 'b4179ed65e5542c394c23f4c11dc407f',
    // client_secret: 'web-frontend'
    app_id: 'inbar-web'
  };

  let token = store;
  const expireTime = new Date().getTime() - 10 * 60 * 1000;
  if (url !== '/api/oauth/token' && url.search('/core/captcha/_verify') === -1) {
    if (expireTime > token.expires_in * 1000 + token.expires_at) {
      //----- do refresh token ------
      post('/api/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token
      }).done(function (data) {
        setToken(data);
      })
    }
    if (token) {
      o['Authorization'] = `Bearer ${token.access_token}`
    }
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
  options.headers = $.extend({}, HEADERS(options.url), options.headers)
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

function formed (data) {
  data = data || {}
  data['$form$'] = true
  return data
}

function merge () {
  let result = {}
  $.makeArray(arguments).forEach(data => $.extend(result, data))
  return result
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
  merge,
  formed as Formed,
  get as GET,
  post as POST,
  put as PUT,
  delete_ as DELETE,
  head as HEAD,
  options as OPTIONS
}

export default {
  merge,
  Merge: merge,
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
