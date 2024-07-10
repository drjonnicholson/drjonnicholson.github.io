// 'use strict'

// const camelCase = require('lodash/camelCase')
// const isArray = require('lodash/isArray')
// const isObject = require('lodash/isObject')
// const transform = require('lodash/transform')

// const camelize = (obj) =>
//   transform(obj, (acc, value, key, target) => {
//     const camelKey = isArray(target) ? key : camelCase(key)
//     acc[camelKey] = isObject(value) ? camelize(value) : value
//   })

// exports.__esModule = true
// exports.camelize = camelize

export const asMonth = (bibMonth) => {
  return Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`1/${bibMonth}/2000`))
}
