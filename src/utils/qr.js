import QRious from 'qrious'

import CONFIG from 'constants/config'
import STYLE from 'constants/style'
import SHOPPING_CART from 'constants/shopping-cart'
import orderUtil from 'utils/order'

// const SERVER_URL = 'https://39143ec6.ngrok.io'
const SERVER_URL = CONFIG.PUBLIC_URL
const STATUS_UL = 'https://get.status.im/browse/'

function generate(url) {
  const qr = new QRious({
    background: 'white',
    foreground: STYLE.COLOR.BLUE,
    level: 'H',
    size: SHOPPING_CART.QR_CODE_MAX_SIZE,
    value: url,
  })

  return qr.toDataURL('image/jpeg')
}

function getImage({ asset, order, orderId, walletAddress }) {
  const totalPrice = orderUtil.getTotalPrice(order)

  const url = `${STATUS_UL}${SERVER_URL}/payment/${walletAddress}/${asset}/${totalPrice}/${orderId}`

  console.log('Generating QR for:', url)

  return generate(url)
}

export default {
  generate,
  getImage,
}
