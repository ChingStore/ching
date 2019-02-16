import STYLE from 'constants/style'

const style = {
  base: {
    ...STYLE.ABSOLUTE_FILL,
    backgroundColor: STYLE.COLOR.WHITE,

    // Prevent any scrolling except when explicitly allowed.
    position: 'fixed',
    overflow: 'hidden',
  },
}

export default style
