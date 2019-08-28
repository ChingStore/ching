// @flow

import type { IdType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import * as React from 'react'
import ReactList from 'react-list'
import ReactResizeDetector from 'react-resize-detector'
import ReactReduxFirebase from 'react-redux-firebase'
import * as ReactRouter from 'react-router'

import ShoppingCart from 'components/shopping-cart/container'
import Flex from 'components/common/flex'
import LinkButton from 'components/common/link-button'
import Icon from 'components/common/icon'
import Spinner from 'components/common/spinner'
import STYLE from 'constants/style'

import STORE from './constants'
import ItemCardContainer from './container/item-card'
import AddItemCard from './add-item-card'

import style from './index.style'

export type PropsType = {
  order: Object,
  store: Object,
  walletAddress: string,
  storeId: IdType,
  itemsOrdered: Object,

  onEditStoreName: ({
    storeName: string,
    storeId: IdType,
  }) => void,
  onFinishOnboarding: ({ storeId: IdType }) => Promise<void>,

  ...ReactRouter.ContextRouter,
}

type StateType = {
  isEditing: boolean,
  isEditingStoreName: boolean,
  isSavingEdit: boolean,
  listWidth: number,
}

class StoreScene extends React.Component<PropsType, StateType> {
  state = {
    isEditing: false,
    isEditingStoreName: false,
    isSavingEdit: false,
    listWidth: 0,
  }

  render = () => (
    <Flex grow>
      <Flex grow relative>
        {this.renderScroller()}
        {this.renderLoadingSpinner()}
      </Flex>
      <ShoppingCart location={this.props.location} />
    </Flex>
  )

  renderLoadingSpinner = () =>
    this.isLoading() && (
      <Flex absoluteFill center>
        Loading...
      </Flex>
    )

  renderScroller = () => (
    <Flex absoluteFill css={style.scroller}>
      <Flex column grow css={{ paddingLeft: 40, paddingRight: 40 }}>
        {this.renderEditControls()}
        {this.renderStoreName()}
        {/* Don't render if it's loaded but width is not detected yet */}
        {!!this.state.listWidth && !this.isLoading() && (
          <ReactList
            itemRenderer={this.renderItemsRow}
            length={this.getListRowsCount()}
            type="uniform"
            useTranslate3d
            threshold={3000}
          />
        )}
        <div
          css={{
            marginTop: 'auto',
            padding: 30,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div>
            Disclaimer: This application is for educational purposes only.
          </div>
        </div>
        {this.renderResizeDetector()}
      </Flex>
    </Flex>
  )

  renderEditControls = () => {
    const { isSavingEdit } = this.state

    if (this.isLoading()) {
      return null
    }

    return this.isEditing() ? (
      <Flex noShrink spaceBetween>
        {isSavingEdit ? (
          <Spinner fill={STYLE.COLOR.RED} />
        ) : (
          <LinkButton
            onClick={this.handleEditToggle}
            css={[style.editControls, style.editControls__endButton]}
          >
            {this.isOnboarding() ? 'Start Selling' : 'Done'}
          </LinkButton>
        )}
        <div css={style.editControls}>Editing</div>
      </Flex>
    ) : (
      <Flex noShrink>
        <LinkButton
          onClick={this.handleEditToggle}
          css={[style.editControls, style.editControls__startButton]}
        >
          Edit inventory
        </LinkButton>
      </Flex>
    )
  }

  renderStoreName = () => {
    const { isEditingStoreName } = this.state

    if (this.isLoading()) {
      return null
    }

    return isEditingStoreName ? (
      <input
        autoFocus
        css={[style.storeName, style.storeName__input]}
        defaultValue={this.getStoreName()}
        onBlur={this.handleStoreNameInputBlur}
        maxLength={15}
        size={15}
        placeholder="Store name..."
        type="text"
      />
    ) : (
      <div css={style.storeName}>
        {this.getStoreName()}
        {this.isEditing() && (
          <>
            {' '}
            <LinkButton onClick={this.handleEditStoreName}>
              <Icon.Edit />
            </LinkButton>
          </>
        )}
      </div>
    )
  }

  renderItemsRow = (rowIndex: number, key: *) => {
    const { itemsOrdered } = this.props

    return (
      <Flex grow key={key} css={style.itemsRow}>
        {_.times(this.getListRowItemsCount(), columnIndex => {
          const itemIndex = this.getItemIndex({ rowIndex, columnIndex })
          const item = itemsOrdered[itemIndex]
          const isFirstInRow = columnIndex === 0
          const isLastItem = itemIndex === this.getScrollerItemsCount() - 1

          // Render add button instead of the last card if editing
          if (this.isEditing() && isLastItem) {
            return (
              <AddItemCard
                {...{
                  isFirst: this.getItemsCount() === 0,
                  isFirstInRow,
                  key: itemIndex,
                }}
              />
            )
          }
          // Skip extra card slots in the last row
          if (itemIndex >= this.getScrollerItemsCount()) {
            return null
          }
          const itemId = item.id
          return (
            <ItemCardContainer
              {...{
                isFirstInRow,
                itemId,
                isEditing: this.isEditing(),
                key: itemIndex,
              }}
            />
          )
        })}
      </Flex>
    )
  }

  renderAddItemCard = () => (
    <Flex column center css={style.addItem}>
      <Icon.Plus />
      Add another
    </Flex>
  )

  renderResizeDetector = () => (
    <ReactResizeDetector
      handleWidth
      refreshMode="debounce"
      refreshRate={500}
      refreshOptions={{ leading: true, trailing: true }}
      onResize={this.handleResize}
    />
  )

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleResize = (listWidth: number) => {
    this.setState({ listWidth })
  }

  handleEditToggle = async () => {
    const { storeId } = this.props

    if (this.isOnboarding()) {
      this.setState({ isSavingEdit: true })
      await this.props.onFinishOnboarding({ storeId })
      this.setState({ isSavingEdit: false })
      return
    }
    this.setState((prevState: StateType) => ({
      isEditing: !prevState.isEditing,
    }))
  }

  handleEditStoreName = () => {
    this.setState({
      isEditingStoreName: true,
    })
  }

  handleStoreNameInputBlur = async (
    e: SyntheticInputEvent<HTMLButtonElement>
  ) => {
    await this.props.onEditStoreName({
      storeName: e.currentTarget.value,
      storeId: this.props.storeId,
    })
    this.setState({
      isEditingStoreName: false,
    })
  }

  /////////////
  // GETTERS //
  /////////////

  getStoreName = () => _.get(this.props, 'store.storeName')

  getListRowItemsCount = () => {
    const { listWidth } = this.state

    // n * item + (n - 1) * spaces = width
    // n * item + n * spaces - spaces = width
    // n(item + spaces) - spaces = width
    // (width + spaces) / (item + spaces) = n
    return (
      Math.floor(
        (listWidth + STORE.MIN_SPACE_BETWEEN_ITEMS) /
          (STORE.ITEM_WIDTH + STORE.MIN_SPACE_BETWEEN_ITEMS)
      ) || 1
    )
  }

  getItemsCount = (): number => {
    const { itemsOrdered } = this.props
    return _.size(itemsOrdered)
  }

  getScrollerItemsCount = (): number =>
    this.getItemsCount() + (this.isEditing() && 1)

  getListRowsCount = (): number => {
    return Math.ceil(this.getScrollerItemsCount() / this.getListRowItemsCount())
  }

  getItemIndex = ({
    rowIndex,
    columnIndex,
  }: {
    rowIndex: number,
    columnIndex: number,
  }): number => rowIndex * this.getListRowItemsCount() + columnIndex

  //////////////
  // CHECKERS //
  //////////////

  isOnboarding = (): boolean => !_.get(this.props, 'store.isOnboardingDone')

  isEditing = (): boolean => this.state.isEditing || this.isOnboarding()

  isLoading = (): boolean =>
    !ReactReduxFirebase.isLoaded(this.props.store) ||
    !ReactReduxFirebase.isLoaded(this.props.itemsOrdered)
}

export default StoreScene
