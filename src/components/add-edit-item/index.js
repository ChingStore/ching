// @flow

import type {
  IdType,
  ItemType,
  ItemsOrderedType,
  ItemDataType,
} from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Flex from 'components/common/flex'
import Icon from 'components/common/icon'
import InputField from 'components/common/input-field'
import InputFieldNumerical from 'components/common/input-field-numerical'
import BackButton from 'components/common/back-button'
import FooterButton from 'components/common/footer-button'
import LinkButton from 'components/common/link-button'
import Spinner from 'components/common/spinner'
import ROUTE from 'constants/route'
import STYLE from 'constants/style'
import imageUtil from 'utils/image'

import style from './index.style.js'

export type PropsType = {
  item: ?ItemType,
  itemId: ?IdType,
  items: ItemsOrderedType,

  addItem: ItemDataType => Promise<void>,
  updateItem: ({ itemId: IdType, data: $Shape<ItemDataType> }) => Promise<void>,
  onDeleteItem: ({ itemId: IdType }) => Promise<void>,

  ...ReactRouter.ContextRouter,
}

type StateType = {
  isDeleting: boolean,
  isUploading: boolean,
  name: string,
  photo: ?string,
  price: number,
  stockCount: number,
}

class AddEditItem extends React.Component<PropsType, StateType> {
  /////////////
  // GETTERS //
  /////////////

  getTitleText = (): string =>
    this.isEditing() ? 'Edit an Item' : 'Add an Item'

  getItemName = (): string => _.get(this.props, 'item.name', '')

  getItemPhoto = (): ?string => _.get(this.props, 'item.photo')

  getItemPrice = (): number => _.get(this.props, 'item.price', 1)

  getItemStockCount = (): number => _.get(this.props, 'item.stockCount', 999)

  ///////////
  // STATE //
  ///////////

  state = {
    isUploading: false,
    isDeleting: false,
    name: this.getItemName(),
    photo: this.getItemPhoto(),
    price: this.getItemPrice(),
    stockCount: this.getItemStockCount(),
  }

  ////////////////
  // RENDERINGS //
  ////////////////

  render() {
    console.log('AddItem render...', this.state, this.props)
    return (
      <Flex grow column css={style.base}>
        <BackButton css={style.backButton} />
        {this.renderTitle()}
        {this.renderForm()}
        {this.renderPhotoTitle()}
        {this.state.photo ? this.renderPhoto() : this.renderUploadPhoto()}
        {this.renderSubmitButton()}
        {this.isEditing() && this.renderDeleteLink()}
      </Flex>
    )
  }

  renderTitle = () => {
    return (
      <Flex column justifyEnd css={style.title}>
        <Flex justifyStart css={style.title__text}>
          {this.getTitleText()}
        </Flex>
      </Flex>
    )
  }

  renderForm = () => {
    return [
      <Flex column justifyEnd css={style.inputItemName} key="inputItemName">
        <InputField
          defaultValue={this.getItemName()}
          id="name"
          labelText="Name"
          onChange={this.handleChangeName}
          placeholder="Type item name..."
        />
      </Flex>,
      <Flex
        column
        justifyEnd
        css={style.inputItemPriceAndStock}
        key="inputItemPriceAndStock"
      >
        <Flex spaceBetween>
          <InputFieldNumerical
            defaultValue={this.state.price}
            labelText="Price USD"
            onChange={this.handleChangePrice}
            step="1"
            underline
          />
          <InputFieldNumerical
            defaultValue={this.state.stockCount}
            labelText="Stock"
            onChange={this.handleChangeQuantity}
            step="1"
            underline
          />
        </Flex>
      </Flex>,
    ]
  }

  renderPhotoTitle = () => (
    <Flex column justifyEnd css={style.photo_title} key="photo_title">
      <Flex>Picture</Flex>
    </Flex>
  )

  renderPhoto = () => {
    return (
      <Flex
        column
        justifyEnd
        css={style.photo_imageWrapper}
        key="photo_imageWrapper"
      >
        <img
          css={style.photo_image}
          src={this.state.photo}
          alt={this.getItemName()}
        />
      </Flex>
    )
  }

  renderUploadPhoto = () => {
    return (
      <Flex
        column
        justifyEnd
        css={style.photo_imageWrapper}
        key="photo_imageWrapper__missing"
      >
        <button
          css={[style.photo_image, style.photo_image__missing]}
          onClick={this.handleUploadPhotoClick}
          type="button"
          key="photo_image__missing"
        >
          <input id="photo" hidden type="file" onChange={this.handleNewImage} />
          <Flex center>
            <Icon.UploadCloud />
          </Flex>
          <div>Upload Photo</div>
        </button>
      </Flex>
    )
  }

  renderSubmitButton = () => (
    <Flex column justifyEnd css={style.submitButtonWrapper}>
      <FooterButton onClick={this.handleAddItemClick}>
        {this.renderAddItemButtonText()}
      </FooterButton>
    </Flex>
  )

  renderDeleteLink = () => (
    <Flex column justifyEnd alignCenter css={style.deleteLinkWrapper}>
      {this.state.isDeleting ? (
        <Spinner fill={STYLE.COLOR.RED} />
      ) : (
        <LinkButton css={style.deleteLink} onClick={this.handleDeleteItemClick}>
          Delete this item
        </LinkButton>
      )}
    </Flex>
  )

  renderAddItemButtonText = () => {
    const { items } = this.props
    if (this.state.isUploading || items === undefined) {
      return <Spinner />
    }
    if (this.isEditing()) {
      return 'Update Item'
    }
    if (_.size(items) > 0) {
      return 'Add an Item'
    }
    return 'Add a First Item'
  }

  /////////////////////
  // LIFECYCLE HOOKS //
  /////////////////////

  componentDidMount() {
    this.setState({
      name: this.getItemName(),
      photo: this.getItemPhoto(),
      price: this.getItemPrice(),
      stockCount: this.getItemStockCount(),
    })
  }

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleAddItemClick = async () => {
    const { name, photo, price, stockCount } = this.state
    const { itemId, updateItem, addItem, history } = this.props

    if (!name) {
      alert('Name is missing, please type it in')
      return
    }
    if (!price && price !== 0) {
      alert('Price is missing, please type it in')
      return
    }
    if (!stockCount && stockCount !== 0) {
      alert('Stock count is missing, please type it in')
      return
    }

    this.setState({ isUploading: true })
    if (this.isEditing() && itemId) {
      await updateItem({ itemId, data: { name, photo, price, stockCount } })
    } else {
      await addItem({ name, photo, price, stockCount, soldCount: 0 })
    }
    this.setState({ isUploading: false })

    history.push(ROUTE.PATH.STORE)
  }

  handleDeleteItemClick = async () => {
    const { onDeleteItem, itemId, history } = this.props

    if (!itemId) {
      throw Error('itemId is missing')
    }

    this.setState({ isDeleting: true })
    await onDeleteItem({ itemId })
    this.setState({ isDeleting: false })

    history.push(ROUTE.PATH.STORE)
  }

  handleChangeName = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleNewImage = async (event: SyntheticInputEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        const base64 = reader.result
        if (typeof base64 !== 'string') {
          alert(
            "The file doesn't seem to be an image.\nPlease select a different file."
          )
          return
        }
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

  handleChangeQuantity = (stockCount: number) => {
    this.setState({
      stockCount,
    })
  }

  handleChangePrice = (price: number) => {
    this.setState({
      price,
    })
  }

  handleUploadPhotoClick = () => {
    const photoElement = document.getElementById('photo')
    if (!photoElement) {
      throw Error('Photo element not found')
    }
    photoElement.click()
  }

  //////////////
  // CHECKERS //
  //////////////

  isEditing = (): boolean => !!this.props.itemId
}

export default AddEditItem
