const COLOR = {
  CYAN: '#5EBAA0',
  WHITE: '#FFFFFF',
  BLUE: '#333963',
  GREY: '#E7E4DE',
  DARK_GREY: '#C3C4CB',

  TRANSPARENT: 'transparent',

  TRANSLUCENT_BLACK: 'rgba(0, 0, 0, 0.3)',
}

const FONT_WEIGHT = {
  HAIRLINE: 100,
  LIGHTER: 200,
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
  BOLDER: 800,
  BOLDEST: 900,
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
