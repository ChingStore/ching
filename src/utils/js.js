// @flow

function removeUndefined(obj: Object): Object {
  return JSON.parse(JSON.stringify(obj))
}

function deepCopy(obj: Object): Object {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  deepCopy,
  removeUndefined,
}
