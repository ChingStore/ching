const { PUBLIC_URL, NODE_PUBLIC_URL } = process.env

console.log({
  PUBLIC_URL,
  NODE_PUBLIC_URL,
})

export default {
  PUBLIC_URL: PUBLIC_URL || NODE_PUBLIC_URL,
}
