/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import ReactReduxFirebase from 'react-redux-firebase'
import FooterButton from 'components/common/footer-button'
import FacebookButton from 'components/common/facebook-button'
import GoogleButton from 'components/common/google-button'
import GithubButton from 'components/common/github-button'
import ROUTE from 'constants/route'
import PROVIDER from 'constants/auth-provider'
import BackButton from 'components/common/back-button'
import style from './index.style.js'

export default class SignInOauth extends React.Component {
  state = {
    refreshIntervalId: null,
  }

  handleSignInWithEmail = async () => {
    const { history } = this.props
    history.push(ROUTE.PATH.SIGN_IN)
  }

  handleSignInOauth = async service => {
    const { signInWithOauth } = this.props
    try {
      signInWithOauth(service)
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

  signInWithGoogle = async () => {}

  renderButtons() {
    return <div css={style.buttons}>{this.renderContinueButton()}</div>
  }

  checkAuthStatusAndStage = () => {
    const { userId, storeId, history } = this.props

    if (ReactReduxFirebase.isLoaded()) {
      clearInterval(this.refreshIntervalId)

      if (userId && storeId) {
        history.push(ROUTE.PATH.STORE)
      }

      if (userId && !storeId) {
        history.push(ROUTE.PATH.SIGN_UP_STORE)
      }
    }
  }

  componentDidMount = () => {
    this.refreshIntervalId = setInterval(() => {
      this.checkAuthStatusAndStage()
    }, 1000)
  }

  renderContinueButton = () => {
    return (
      <div css={style.buttons}>
        <FooterButton onClick={this.handleSignInWithEmail}>
          Continue with e-mail
        </FooterButton>
        <div>or</div>

        <GoogleButton
          onClick={() => {
            this.handleSignInOauth(PROVIDER.GOOGLE)
          }}
        >
          <div>Log in with Google</div>
        </GoogleButton>

        <GithubButton
          onClick={() => {
            this.handleSignInOauth(PROVIDER.GITHUB)
          }}
        >
          <div>Log in with Github</div>
        </GithubButton>

        <FacebookButton
          onClick={() => {
            this.handleSignInOauth(PROVIDER.FACEBOOK)
          }}
        >
          <div>Log in with Facebook</div>
        </FacebookButton>
      </div>
    )
  }

  render() {
    const { authError } = this.props
    return (
      <div css={style.base}>
        <p>{authError}</p>
        <BackButton css={style.backButton} />
        {this.renderTitle()}
        {this.renderButtons()}
      </div>
    )
  }
}
