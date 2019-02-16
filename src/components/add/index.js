/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import Icon from 'components/common/icon'
import InputField from 'components/common/input-field'
import InputFieldNumerical from 'components/common/input-field-numerical'
import FooterButton from 'components/common/footer-button'
import Spinner from 'components/common/spinner'
import ROUTE from 'constants/route'
import imageUtil from 'utils/image'

import style from './index.style.js'

export default class Add extends React.Component {
  state = {
    name: '',
    price: 1,
    quantity: 1,
    photo: '',
    soldCount: '',
    isAdding: false,
  }

  ////////////////
  // RENDERINGS //
  ////////////////

  render() {
    console.log('AddItem render...', this.state)
    return (
      <div css={style.base}>
        {this.renderTitle()}
        {this.renderForm()}
        {this.state.photo === ''
          ? this.renderUploadPhoto()
          : this.renderPhoto()}
        {this.renderFooter()}
      </div>
    )
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
            onChange={this.handleChangeName}
            id="name"
            placeholder="Item name"
            labelText="Name"
          />
        </div>
        <div css={style.inputForm_secondRow}>
          <InputFieldNumerical
            onChange={this.handleChangePrice}
            labelText="Price USD"
            defaultValue={this.state.price}
            step="1"
          />
          <InputFieldNumerical
            onChange={this.handleChangeQuantity}
            labelText="Quantity"
            defaultValue={this.state.quantity}
            step="1"
          />
        </div>
      </div>
    )
  }

  renderUploadPhoto = () => {
    return (
      <div css={style.photo}>
        <div css={style.photo__text}>Picture</div>
        <button
          css={style.photo__button}
          onClick={this.handleUploadPhotoClick}
          type="button"
        >
          <input id="photo" hidden type="file" onChange={this.handleNewImage} />
          <div css={style.photo__icon}>
            <Icon.UploadCloud />
          </div>
          <div>Upload Photo</div>
        </button>
      </div>
    )
  }

  renderPhoto = () => {
    return (
      <div css={style.photo}>
        <div css={style.photo__text}>Picture</div>
        <div css={style.photo__button}>
          <img css={style.photo__img} src={this.state.photo} alt="go" />
        </div>
      </div>
    )
  }

  renderFooter = () => {
    return (
      <div css={style.footer}>
        <FooterButton onClick={this.handleAddItemClick}>
          {this.renderAddItemButtonText()}
        </FooterButton>
      </div>
    )
  }

  renderAddItemButtonText = () => {
    const { items } = this.props
    if (this.state.isAdding || items === undefined) {
      return <Spinner />
    }
    if (items.length > 0) {
      return 'Add an Item'
    }
    return 'Add a First Item'
  }

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleAddItemClick = async () => {
    this.setState({ isAdding: true })
    await this.props.addItem(this.state)
    this.setState({ isAdding: false })
    this.props.history.push(ROUTE.PATH.STORE)
  }

  handleChangeName = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleNewImage = async event => {
    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        const base64 = reader.result
        this.setState({
          photo: base64,
        })
      },
      false
    )

    const file = event.target.files[0]
    const resizedImage = await imageUtil.resize(file)

    if (resizedImage) {
      reader.readAsDataURL(resizedImage)
    }
  }

  handleChangeQuantity = newQuantity => {
    this.setState({
      quantity: newQuantity,
    })
  }

  handleChangePrice = newPrice => {
    this.setState({
      price: newPrice,
    })
  }

  handleUploadPhotoClick = () => {
    document.getElementById('photo').click()
  }
}
