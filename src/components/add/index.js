/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Icon from 'components/common/icon'
import InputField from 'components/common/input-field'
import InputFieldNumerical from 'components/common/input-field-numerical'
import FooterButton from 'components/common/footer-button'
import style from './index.style.js'

export default class Add extends React.Component {
  state = {
    name: '',
    price: 1,
    quantity: 1,
    photo: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  changeQuantity = newQuantity => {
    this.setState({
      quantity: newQuantity,
    })
  }

  changePrice = newPrice => {
    this.setState({
      price: newPrice,
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
          <InputFieldNumerical
            onChange={this.changePrice}
            labelText="Price USD"
            defaultValue={this.state.price}
            step="1"
          />
          <InputFieldNumerical
            onChange={this.changeQuantity}
            labelText="Quantity"
            defaultValue={this.state.quantity}
            step="1"
          />
        </div>
      </div>
    )
  }

  handleClick = () => {
    document.getElementById('photo').click()
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
          <input id="photo" hidden type="file" onChange={this.handleChange} />
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
        <FooterButton onClick={() => console.log(this.state)}>
          Add a First Item
        </FooterButton>
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
