import $ from 'jquery'
import store from './store'
import toastr from 'toastr'

function makePromise() {
  const promise = {
    $codes$: {},
    $done$: [],
    $fail$: [],
    $always$: [],
    done (callback) {
      this.$done$.push(callback)
      return this
    },
    fail (callback) {
      this.$fail$.push(callback)
      return this
    },
    then (resolve, reject) {
      this.$done$.push(resolve)
      this.$fail$.push(reject)
    },
    always (callback) {
      this.$always$.push(callback)
    },
    code (code, callback) {
      if (!this.$codes$[code]) {
        this.$codes$[code] = []
      }
      this.$codes$[code].push(callback)
    }
  }
  promise.instance = new Promise((resolve, reject) => {
    promise.resolve = resolve
    promise.reject = reject
  })
  return promise
}
function HEADERS(url) {
  let o = {
    version: '1.0.0-alpha',
    client_id: store.client_id
  };

  if (url !== '/api/oauth/token' && url.search('/core/captcha/_verify') === -1) {
    if (store.token.expiring) {
      //----- do refresh token ------
      post('/api/oauth/token', formed({
        grant_type: 'refresh_token',
        refresh_token: store.token.refresh_token
      })).done(function (data) {
        store.token = data
      })
    } else if (store.token.ready) {
      o['Authorization'] = `Bearer ${store.token.access_token}`
    } else {
      location.replace('/#/login')
    }
  }
  return o
}
$.ajaxPrefilter((options, original, xhr) => {
  let type = (options.type || options.method)
  // let headers = (options.headers || {})
  let isForm = (options.data && options.data['$form$'] === true)
  if (isForm) delete options.data['$form$']
  prepare(options, isForm || type === 'GET' || type === 'DELETE' || type === 'HEAD' || type === 'OPTIONS')
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

function _parseError (xhr) {
  if (xhr.responseText) {
    return JSON.parse(xhr.responseText)
  } else {
    return {
      get status () {
        return xhr.status
      },
      get statusText () {
        return xhr.statusText
      },
      get responseText () {
        return xhr.responseText
      },
      abort (status) {
        return xhr.abort(status)
      }
    }
  }
}

function promisedXHR (xhr) {
  let promise = makePromise()
  promise.$ = xhr
  function invoke (name, d) {
    promise[name].forEach(fun => fun.call(promise.$, d))
  }
  function errorCode(code, error) {
    (promise.$codes$[code] || []).forEach(callback => {
      callback(error)
    })
  }
  xhr.always((jqXHR, status) => {
    if (status === 'parsererror' && !(jqXHR.responseText || jqXHR.responseXML)) {
      status = 'nocontent'
    }
    if (status === 'error' || status === 'timeout' || status === 'parsererror' || status === 'abort') {
      promise['$always$'].forEach(fun => fun.call(promise.$, status, _parseError(xhr)))
    }
  })
  xhr.done(json => promise.resolve(json))
  xhr.fail(_xhr => {
    const d = _parseError(_xhr)
    if (/2\d{2}/.test(String(_xhr.status))) {
      promise.resolve(d)
    } else {
      if (d.error && d.error === 'Internal Server Error') {
        toastr.warning('请稍后重试或联系我们', '服务器异常!')
        return
      } else if (d.error) {
        errorCode(d.error, d)
        return
      }
      promise.reject(d)
    }
  })


  promise.instance.then(d => invoke('$done$', d), d => invoke('$fail$', d))

  return promise
}
function isEmpty (value) {
  return value === null || value === undefined
}
const varPattern = /(\{[^{]+\})/
function extractUri (template, data) {
  const rawParts = (template || '').split(varPattern)
  const finalParts = []
  const variables = isEmpty(data) ? {} : data
  for (let i = 0; i < rawParts.length; i++) {
    const rawPart = rawParts[i]
    if (varPattern.test(rawPart)) {
      const optional = (rawPart.indexOf(':') === 1 || rawPart.indexOf('?') === 1)
      const greedy = rawPart.indexOf(':') === 1
      const name = rawPart.substring(optional ? 2 : 1, rawPart.length - 1)
      const value = variables[name]
      const has = !isEmpty(value)
      if (!has && !optional) {
        throw Error(`The required variable "${name}" in "${template}" in can't found'`)
      }
      if (has) {
        finalParts.push(value)
      } else {
        if (greedy && finalParts.length > 0) {
          const prev = i - 1
          const part = finalParts[prev]
          if (part.length > 1 && part.endsWith('/')) {
            finalParts[prev] = part.substring(0, part.length - 1)
          }
        }
      }
    } else {
      finalParts.push(rawPart)
    }
  }
  return finalParts.join('')
}

function likeGET (method, url, data) {
  let xhr = $.ajax({
    url: extractUri(url, data),
    data: data,
    processData: false,
    type: method,
    dataType: 'json'
  }, true)

  return promisedXHR(xhr)
}

function likePOST (method, url, data) {
  let isForm = (data && data['$form$'] === true)
  let isMultiForm = (data && data['$multiform$'] === true)
  let contentType;
  if (isForm) {
    contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (isMultiForm) {
    contentType = false;
  } else {
    contentType = 'application/json; charset=UTF-8'
  }
  console.log(data);
  let xhr = $.ajax({
    url: extractUri(url, data),
    data: isForm || isMultiForm ? data : JSON.stringify(data),
    processData: false,
    contentType: contentType,
    type: method,
    dataType: 'json'
  }, isForm)

  return promisedXHR(xhr)
}

function formed (data) {
  data = data || {}
  data['$form$'] = true
  return data
}

function multiFormed (data) {
  data = data || {}
  data['$multiform$'] = true
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
function patch (url, data) {
  return likePOST('PATCH', url, data)
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
  extractUri as uri,
  extractUri as Uri,
  merge,
  formed as Formed,
  multiFormed as MultiFormed,
  get as GET,
  post as POST,
  put as PUT,
  patch,
  patch as PATCH,
  delete_ as DELETE,
  head as HEAD,
  options as OPTIONS
}

export default {
  uri: extractUri,
  Uri: extractUri,
  merge,
  Merge: merge,
  formed,
  Formed: formed,
  MultiFormed: multiFormed,
  get,
  GET: get,
  post,
  POST: post,
  put,
  PUT: put,
  patch,
  PATCH: patch,
  delete: delete_,
  DELETE: delete_,
  head,
  HEAD: head,
  options,
  OPTIONS: options
}
