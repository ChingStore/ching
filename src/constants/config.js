console.log({
  PUBLIC_URL: process.env.PUBLIC_URL,
  NODE_PUBLIC_URL: process.env.NODE_PUBLIC_URL,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
})

export default {
  PUBLIC_URL:
    process.env.NODE_PUBLIC_URL ||
    process.env.REACT_APP_API_URL ||
    'https://app.ching.store',
}
