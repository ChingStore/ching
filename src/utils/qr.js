import QRious from 'qrious'

function generate(url) {
  var qr = new QRious({
    background: 'white',
    foreground: 'blue',
    foregroundAlpha: 0.8,
    level: 'H',
    padding: 25,
    size: 5000,
    value: url
  });

  return qr.toDataURL('image/jpeg')
}

export default {
  generate
}
