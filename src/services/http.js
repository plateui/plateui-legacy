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
  xhr.withCredentials = true

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

  return new Promise((resolve, reject) => {
    xhr.onerror = function (error) {
      error.xhr = xhr
      reject(error)
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE && xhr.status) {
        if (xhr.status >= 500) {
          const error = new Error(xhr.statusText)
          error.xhr = xhr
          return reject(error)
        }

        let resp = xhr.responseText
        if (resp && /json/.test(xhr.getResponseHeader('Content-Type'))) {
          resp = JSON.parse(resp)
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          xhr.data = resp
          resolve(xhr)
        } else {
          const error = new Error(url)
          error.data = resp
          error.xhr = xhr
          reject(error)
        }
      }
    }

    xhr.send(body)
  })
}

function get (url, { params, headers } = {}) {
  if (params) {
    if (/\?/.test(url)) {
      url += '&'
    } else {
      url += '?'
    }
    url += Object.keys(params)
      .map(k => `${k}=${params[k]}`)
      .join('&')
  }
  return request(url, { headers })
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

export default {
  request,
  get,
  post,
  del,
  patch,
  put,
}
