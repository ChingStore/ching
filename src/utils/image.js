import { readAndCompressImage } from 'browser-image-resizer'

const config = {
  quality: 0.7,
  width: 800,
  height: 600,
}

async function resize(img) {
  try {
    const resizedImage = await readAndCompressImage(img, config)
    return resizedImage
  } catch (err) {
    console.error('image resizer error', err)
    return img
  }
}

export default {
  resize,
}
