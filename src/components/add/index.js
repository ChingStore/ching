/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import ROUTE from 'constants/route'
import Icon from 'components/common/icon'
import InputField from 'components/common/input-field'
import FooterButton from 'components/common/footer-button'
import style from './index.style.js'

export default class Add extends React.PureComponent {
  state = {}

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  renderTitle = () => {
    return (
      <div css={style.title}>
        <p css={style.title__text}>Add an Item</p>
      </div>
    )
  }

  renderForm = () => {
    return (
      <div css={style.inputForm}>
        <div css={style.inputForm_firstRow}>
          <InputField
            onChange={this.handleChange}
            id="name"
            placeholder="Item name"
            labelText="Name"
          />
        </div>
        <div css={style.inputForm_secondRow}>
          <div css={style.inputForm_secondRow_firstColumn}>
            <InputField
              onChange={this.handleChange}
              id="price"
              placeholder="price"
              labelText="Price USD"
            />
          </div>
          <div css={style.inputForm_secondRow_secondColumn}>
            <InputField
              onChange={this.handleChange}
              id="Quantity"
              placeholder="Qty."
              labelText="Quantity"
            />
          </div>
        </div>
      </div>
    )
  }

  handleClick = () => {
    console.log(1)
  }

  renderPhoto = () => {
    return (
      <div css={style.photo}>
        <div css={style.photo__text}>Picture</div>
        <button
          css={style.photo__button}
          onClick={this.handleClick}
          type="button"
        >
          <div css={style.photo__icon}>
            <Icon.UploadCloud />
          </div>
          <div>Upload Photo</div>
          <div css={style.DashedBox}>
            <Icon.DashedBox />
          </div>
        </button>
      </div>
    )
  }

  renderFooter = () => {
    return (
      <div css={style.footer}>
        <FooterButton to={ROUTE.PATH.SIGN_UP}>Add a First Item</FooterButton>
      </div>
    )
  }

  render() {
    return (
      <div css={style.base}>
        {this.renderTitle()}
        {this.renderForm()}
        {this.renderPhoto()}
        {this.renderFooter()}
      </div>
    )
  }
}
