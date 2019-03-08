// @flow

const { NODE_ENV, NODE_PUBLIC_URL, REACT_APP_API_URL } = process.env

const IS_PRODUCTION = NODE_ENV === 'production'
const PUBLIC_URL =
  NODE_PUBLIC_URL || REACT_APP_API_URL || 'https://app.ching.store'

console.log({
  NODE_ENV,
  NODE_PUBLIC_URL,
  REACT_APP_API_URL,

  IS_PRODUCTION,
  PUBLIC_URL,
})

console.log('process.env', JSON.stringify(process.env))

export default {
  IS_PRODUCTION,
  PUBLIC_URL,
}
