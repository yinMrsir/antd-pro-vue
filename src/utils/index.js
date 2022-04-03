/**
 * 获取url参数
 * @param{string} name 参数key
 * @returns {string|null}
 */
function getUrlParams(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * @param{number} time 秒数
 * @returns {Promise<null>}
 */
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}

/**
 * 数组 根据对象中的属性去重
 * @param{Array<Object>} arr 数组
 * @param{string} ukey - 需要处理的key
 * @returns {{}}
 */
function unique(arr, ukey) {
  let result = []
  let obj = {}
  for (let i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i][ukey]]) {
      result.push(arr[i])
      obj[arr[i][ukey]] = true
    }
  }
  return result
}

/**
 * 返回数据类型
 * @param obj
 * @return {string|*}
 */
function getType(obj) {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Data]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }

  if (obj instanceof window.Element) {
    return 'element'
  }

  return map[Object.prototype.toString.call(obj)]
}

export { getUrlParams, sleep, unique, getType }
