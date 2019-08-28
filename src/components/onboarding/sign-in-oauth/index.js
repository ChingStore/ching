/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import ReactReduxFirebase from 'react-redux-firebase'
import FooterButton from 'components/common/footer-button'
import GoogleButton from 'components/common/google-button'
import Spinner from 'components/common/spinner'
import Flex from 'components/common/flex'
import STYLE from 'constants/style'
import ROUTE from 'constants/route'
import PROVIDER from 'constants/auth-provider'
import BackButton from 'components/common/back-button'
import style from './index.style.js'

export default class SignInOAuth extends React.Component {
  state = {
    refreshIntervalId: null,
    loading: true,
  }

  handleSignInWithEmail = async () => {
    const { history } = this.props
    history.push(ROUTE.PATH.SIGN_IN)
  }

  handleSignInOAuth = async service => {
    const { signInWithOAuth } = this.props
    try {
      signInWithOAuth(service)
    } catch (error) {
      console.log(error)
    }
  }

  renderTitle = () => {
    return (
      <div css={style.title}>
        <p css={style.title__text}>It’s nice to have you back!</p>
      </div>
    )
  }

  checkAuthStatusAndStage = () => {
    const { userId, storeId, history } = this.props
    const { refreshIntervalId } = this.state

    if (ReactReduxFirebase.isLoaded()) {
      clearInterval(refreshIntervalId)

      this.setState({ loading: false })

      if (userId && storeId) {
        history.push(ROUTE.PATH.STORE)
      }

      if (userId && !storeId) {
        history.push(ROUTE.PATH.SIGN_UP_STORE)
      }
    }
  }

  componentDidMount = () => {
    this.setState({
      refreshIntervalId: setInterval(() => {
        this.checkAuthStatusAndStage()
      }, 1000),
    })
  }

  renderSignUpProviderButtons = () => {
    return (
      <div css={style.buttons}>
        <FooterButton onClick={this.handleSignInWithEmail}>
          Continue with e-mail
        </FooterButton>
        <div>or</div>

        <GoogleButton
          onClick={() => {
            this.handleSignInOAuth(PROVIDER.GOOGLE)
          }}
        >
          <div>Log in with Google</div>
        </GoogleButton>
      </div>
    )
  }

  render() {
    const { authError } = this.props
    const { loading } = this.state

    if (loading) {
      return (
        <Flex column grow center>
          <Spinner fill={STYLE.COLOR.BLUE} />
        </Flex>
      )
    }

    return (
      <div css={style.base}>
        <p>{authError}</p>
        <BackButton css={style.backButton} />
        {this.renderTitle()}
        {this.renderSignUpProviderButtons()}
      </div>
    )
  }
}
