import * as Emotion from '@emotion/core'

export default Emotion.css`
  @import url('https://rsms.me/inter/inter-ui.css');

  html {
    font-family: 'Inter UI', sans-serif;
    font-style: normal;

    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  // Prevent any scrolling except when explicitly allowed.
  html, body {
    position: fixed;
    overflow: hidden;
  }

  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter UI var alt', sans-serif;
    }
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 568px;
    width: 100%;
  }

  /**
   * Reset button styles.
   */
  button {
    display: inline-block;
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    background-image: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    /* show a hand cursor on hover; some argue that we
    should keep the default arrow cursor for buttons */
    cursor: pointer;
  }
`
