import STYLE from 'constants/style'

const style = {
  base: {
    height: 44,
    marginTop: 10,
    marginBottom: 10,

    display: 'flex',
    flexDirection: 'row',

    // borderRadius: '20px 20px 0 0',
    // backgroundColor: STYLE.COLOR.WHITE,
  },

  descriptionText: {
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
    fontSize: 16,
    color: STYLE.COLOR.BLUE,
    margin: 0,
  },

  quantityInput: {
    border: `1px solid ${STYLE.COLOR.GREY}`,
    borderRadius: 7,
  },
}

export default style
