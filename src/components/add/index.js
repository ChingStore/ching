/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import InputField from 'components/common/input-field'
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

  renderPhoto = () => {
    return <div css={style.photo}>Photo</div>
  }

  renderFooter = () => {
    return <div css={style.footer}>Footer</div>
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
