/** @jsx jsx */
// import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

// import Flex from 'components/common/flex'

// import style from './index.style.js'

class Button extends React.Component {
  render() {
    // const { alt, img } = this.props
    // return (
    //   <Flex css={style.base}>
    //     <Flex
    //       css={style.back__button}
    //       {...this.props}
    //       onClick={this.handleClick}
    //       type="button"
    //     >
    //       <img src={img} alt={alt} />
    //     </Flex>
    //   </Flex>
    // )
  }

  handleClick = event => {
    const { history, onClick } = this.props
    console.log(this.props)
    if (onClick) {
      onClick(event)
    }
    history.goBack()
  }
}

export default ReactRouter.withRouter(Button)
