// @flow

const {
  NODE_ENV,
  REACT_APP_ENV,
  NODE_PUBLIC_URL,
  REACT_APP_PUBLIC_URL,
} = process.env

const IS_PRODUCTION = REACT_APP_ENV === 'production'
const PUBLIC_URL =
  NODE_PUBLIC_URL || REACT_APP_PUBLIC_URL || 'https://app.ching.store'

console.log({
  NODE_ENV,
  REACT_APP_ENV,
  NODE_PUBLIC_URL,
  REACT_APP_PUBLIC_URL,

  IS_PRODUCTION,
  PUBLIC_URL,
})

console.log('process.env', JSON.stringify(process.env))

export default {
  IS_PRODUCTION,
  PUBLIC_URL,
}
