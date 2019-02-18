import STYLE from 'constants/style'

export default {
  base: {
    width: '80%',
    maxWidth: 1024,
    alignSelf: 'center',
  },

  backButton: {
    paddingTop: 40,
    paddingRight: 20,
  },

  title: {
    flex: 0.134,
  },

  title__text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: STYLE.COLOR.BLUE,
  },

  inputItemName: {
    flex: 0.16,
  },

  inputItemPriceAndStock: {
    flex: 0.117,
  },

  photo_title: {
    flex: 0.061,

    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 14,
    color: STYLE.COLOR.BLUE,
  },

  photo_imageWrapper: {
    flex: 0.271,
  },
  photo_image: {
    flex: 1,
    maxHeight: '100px',
    objectFit: 'cover',
    objectPosition: 'center',
    overflow: 'hidden',
  },
  photo_image__missing: {
    border: `1px dashed ${STYLE.COLOR.GREY}`,
    borderRadius: 4,
    boxSizing: 'border-box',
  },

  footer: {
    flex: 0.182,
  },

  submitButtonWrapper: {
    flex: 0.135,
  },
  deleteLinkWrapper: {
    flex: 0.047,
  },
  deleteLink: {
    color: STYLE.COLOR.RED,
  },
}
