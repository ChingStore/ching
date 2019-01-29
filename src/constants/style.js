const COLOR = {
  CYAN: '#5EBAA0',
  WHITE: '#FFFFFF',
  BLUE: '#333963',
  GREY: '#E7E4DE',

  TRANSLUCENT_BLACK: 'rgba(0, 0, 0, 0.3)',
}

const FONT_WEIGHT = {
  BOLD: 'bold',
}

const FONT = {
  WEIGHT: FONT_WEIGHT,
}

const PRESETS = {
  ABSOLUTE_FILL: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}

export default {
  COLOR,
  FONT,
  ...PRESETS,
}
