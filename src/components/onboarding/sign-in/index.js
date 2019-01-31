/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRedux from 'react-redux'
import ROUTE from 'constants/route'
import PropTypes from 'prop-types'
import InputField from 'components/common/input-field'
import NextButton from 'components/common/next-button'
import Icon from 'components/common/icon'
import authActions from 'redux/actions/auth'
import LinkButton from 'components/common/link-button'
import style from './index.style.js'

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
  handleSignIn = e => {
    e.preventDefault() //  prevent reload of the page
    this.props.signIn(this.state)
  }

  renderBackLink() {
    return (
      <div css={style.backLink}>
        <LinkButton to={ROUTE.PATH.HOME}>
          <div>
            <Icon.ArrowLeft />
          </div>
        </LinkButton>
      </div>
    )
  }

  renderTitle() {
    return (
      <div css={style.title}>
        <p css={style.titleText}>It's nice to have you back!</p>
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSignIn}>
        {this.renderUsernameField()}
        {this.renderPasswordField()}
        {this.renderForgot()}
        {this.renderContinueButton()}
      </form>
    )
  }
  renderUsernameField = () => {
    return (
      <div css={style.inputField}>
        <InputField
          onChange={this.handleChange}
          id="email"
          placeholder="E-mail"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    return (
      <div>
        <InputField
          onChange={this.handleChange}
          id="password"
          placeholder="Password"
          type="password"
        />
      </div>
    )
  }

  renderForgot = () => {
    return (
      <div css={style.forgot}>
        <LinkButton css={{ justifyContent: 'flex-end' }} to={ROUTE.PATH.HOME}>
          <div css={style.forgotText}>Forgot?</div>
        </LinkButton>
      </div>
    )
  }

  renderContinueButton = () => {
    return <NextButton to={ROUTE.PATH.INVENTORY}>Continue</NextButton>
  }

  render() {
    return (
      <div css={style.base}>
        {this.renderBackLink()}
        {this.renderTitle()}
        {this.renderForm()}
      </div>
    )
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProp = state => ({
  authError: state.auth.authError,
})

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(authActions.signIn(credentials)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignIn)
