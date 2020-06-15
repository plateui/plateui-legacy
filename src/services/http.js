const REQUEST_HOOKS = []
const RESPONSE_HOOKS = []

function request (url, payload = {}) {
  let { headers = {}, data, body, method } = payload

  if (data) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }
    body = JSON.stringify(data)
  }

  if (!method) {
    method = body ? 'POST' : 'GET'
  }

  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)

  // use hooks to set withCredentials
  // xhr.withCredentials = true

  Object.keys(headers).forEach(k => {
    xhr.setRequestHeader(k, headers[k])
  })

  if (xhr.upload && payload.onprogress) {
    xhr.upload.onprogress = function progress (e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100
      }
      payload.onprogress(e)
    }
  }

  REQUEST_HOOKS.forEach(fn => fn(xhr))

  return new Promise((resolve, reject) => {
    xhr.onerror = function (error) {
      error.xhr = xhr
      reject(error)
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE && xhr.status) {
        const text = xhr.responseText
        if (text && /json/.test(xhr.getResponseHeader('Content-Type'))) {
          xhr.data = JSON.parse(text)
        }
        RESPONSE_HOOKS.forEach(fn => fn(xhr))

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr)
        } else {
          const error = new Error(url)
          error.status = xhr.status
          error.text = text
          error.xhr = xhr
          reject(error)
        }
      }
    }

    xhr.send(body)
  })
}

const _CACHE = {}

async function get (url, { params, headers } = {}) {
  if (params) {
    const qs = Object.keys(params).map(k => `${k}=${params[k]}`).join('&')
    if (qs) {
      if (/\?/.test(url)) {
        url += '&' + qs
      } else {
        url += '?' + qs
      }
    }
  }
  if (_CACHE[url]) {
    return _CACHE[url]
  }
  const resp = await request(url, { headers })
  // cache for 5 seconds to prevent duplicate requests
  // this is useful when many widgets share the same endpoint
  _CACHE[url] = resp
  setTimeout(() => {
    delete _CACHE[url]
  }, 5000)
  return resp
}

function del (url) {
  return request(url, { method: 'DELETE' })
}

function post (url, { data, headers } = {}) {
  return request(url, { data, headers, method: 'POST' })
}

function put (url, { data, headers } = {}) {
  return request(url, { data, headers, method: 'PUT' })
}

function patch (url, { data, headers } = {}) {
  return request(url, { data, headers, method: 'PATCH' })
}

function addHook (fn, isResponseHook = false) {
  if (isResponseHook) {
    RESPONSE_HOOKS.push(fn)
  } else {
    REQUEST_HOOKS.push(fn)
  }
}

async function paginate (url, params = {}) {
  const xhr = await get(url, { params })
  let pagination = { page: params.page || 1 }
  let items = []
  const data = xhr.data
  if (Array.isArray(data)) {
    items = data
    const header = xhr.getResponseHeader('Link')
    if (header) {
      const links = parseWebLinks(header)
      links.forEach(d => {
        if (d.rel === 'last' && d.page) {
          pagination.last = d.page
        }
      })
    }
  } else {
    if (data.pagination) {
      pagination = data.pagination
    }
    // guess items from data
    if (data.results) {
      items = data.results
    } else if (data.data) {
      items = data.data
    } else if (data.items) {
      items = data.items
    }
  }
  return { pagination, items }
}

export default {
  addHook,
  request,
  get,
  post,
  del,
  patch,
  put,
  paginate,
}

function parseWebLinks (header) {
  const items = header.split(',').map(s0 => {
    const parts = s0.trim().split(';')
    const link = parts[0]
    const rv = {}
    parts.slice(1).forEach(s1 => {
      const [k, v] = s1.trim().split('=')
      rv[k.trim()] = v.replace(/"/g, '')
    })
    rv.url = link.slice(1, -1)
    const m = link.match(/(?:page|p)=(\d+)/)
    if (m) {
      rv.page = parseInt(m[1], 10)
    }
    return rv
  })
  return items
}
