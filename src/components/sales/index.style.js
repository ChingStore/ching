import STYLE from 'constants/style'

export default {
  scroller: {
    overflow: 'scroll',
    '-webkitOverflowScrolling': 'touch',
  },

  scrollerContents: {
    width: '80%',
  },

  title: {
    marginTop: 40,
    marginBottom: 40,
  },
  title_text: {
    fontSize: 32,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    color: STYLE.COLOR.BLUE,
  },
  title_downloadReportButton: {
    backgroundColor: STYLE.COLOR.TRANSLUCENT_CYAN,
    borderRadius: 6,
  },
  title_downloadReportButtonText: {
    margin: 9,
    color: STYLE.COLOR.CYAN,
    fontSize: 12,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
  },

  line: {
    borderBottom: `1px solid ${STYLE.COLOR.YELLOWISH_GREY}`,
    height: 0,
  },

  salesStats: {
    marginTop: 15,
    marginBottom: 15,
    height: 47,
  },

  salesStats_metric: {
    width: 97,
  },

  salesStats_data: {
    fontSize: 22,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    color: STYLE.COLOR.BLUE,
  },

  salesStats_name: {
    fontSize: 14,
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
    color: STYLE.COLOR.GREY,
  },
}
