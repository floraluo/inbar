// import $ from 'jquery'

function token() {
  return holder.token || storage.get('token') || {}
}

const delegate = {
  get ready () {
    return !!(holder.token || (token() && token().expires_at && token().expires_at > new Date().getTime()))
  },
  /**
   * Token是否即将过期（在过期时间5分钟内即认为即将过期）
   */
  get expiring () {
    return this.ready && token().expires_at <= new Date().getTime() + 5 * 60 * 1000
  },
  get access_token() {
    return token().access_token
  },
  get token_type() {
    return token().token_type
  },
  get refresh_token() {
    return token().refresh_token
  },
  get expires_in() {
    return token().expires_in
  },
  get scope() {
    return token().scope
  },
  get user_basic() {
    return token().user_basic
  },
  clear () {
    localStorage.removeItem('token')
    holder.token = null
  }
}

const holder = {
  token: null,
  _remember: null,
  get remember () {
    return this._remember !== null ? this._remember : Boolean(localStorage.getItem('remember') || false)
  },
  set remember (value) {
    this._remember = value
    localStorage.setItem('remember', value);
  }
}
function _ () {
  return holder.remember ? localStorage : sessionStorage
}
function _set (name, value) {
  return _().setItem(name, value)
}
function _get (name) {
  return _().getItem(name)
}
function _remove (name) {
  return _().removeItem(name)
}

const storage = {
  get (name) {
    return JSON.parse(_get(name))
  },
  set (name, value) {
    if (value === null || value === undefined) {
      _remove(name)
    } else {
      _set(name, JSON.stringify(value))
    }
  },
  remove (name) {
    _remove(name)
  }
}

export default {
  client_id: 'bcRWgmVkpE2VMNvGJ4aI11',
  client_secret: 'cKp1ZNXH0O9kBlYZICdED7',

  get: storage.get,
  set: storage.set,

  remove: storage.remove,
  get token() {
    return delegate
  },
  set token (data) {
    data['expires_at'] = new Date().getTime() + data.expires_in * 1000;
    holder.token = data
    storage.set('token', data)
    return this.token
  },
  remember (value) {
    holder.remember = (value === false)
  }
}
