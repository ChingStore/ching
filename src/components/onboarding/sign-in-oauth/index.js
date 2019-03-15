/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import FooterButton from 'components/common/footer-button'
import BackButton from 'components/common/back-button'
import Icon from 'components/common/icon'
import style from './index.style.js'

export default class SignIn extends React.Component {
  renderTitle = () => {
    return (
      <div css={style.title}>
        <p css={style.title__text}>It’s nice to have you back!</p>
      </div>
    )
  }

  renderButtons() {
    return <div css={style.buttons}>{this.renderContinueButton()}</div>
  }

  renderContinueButton = () => {
    return (
      <div css={style.buttons}>
        <FooterButton onClick={this.handleSignIn}>
          Continue with e-mail
        </FooterButton>
        <div>or</div>

        <FooterButton onClick={this.handleSignIn} css={style.googleButton}>
          <div css={style.googleButton_icon}>
            <Icon.Google />
          </div>
          <div css={style.googleButton_text}>Log in with Google</div>
        </FooterButton>

        <FooterButton onClick={this.handleSignIn} css={style.githubButton}>
          <div css={style.githubButton_icon}>
            <Icon.Github />
          </div>
          <div css={style.githubButton_text}>Log in with Github</div>
        </FooterButton>

        <FooterButton onClick={this.handleSignIn} css={style.facebookButton}>
          <div css={style.facebookButton_icon}>
            <Icon.Facebook />
          </div>
          <div css={style.facebookButton_text}>Log in with Facebook</div>
        </FooterButton>
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
